import {
  AssetType, Blitter, Camera, ContentRestorer, EngineEventType, Material,
  PostProcessPass, RenderTarget, Shader, Texture2D, TextureFilterMode,
  TextureFormat, TextureWrapMode, Vector2, WebGLEngine, WebGLMode,
} from '@galacean/engine'
import watercolorShaderUrl from './.compiled/Watercolor.shaderc?url'

const BRUSH_RADIUS = 45
const FLOW_SMOOTHING = 4
const PAPER_TILE_SIZE = 256

class TextureRestorer extends ContentRestorer {
  constructor(texture, upload) {
    super(texture)
    this.upload = upload
  }

  restoreContent() {
    this.upload()
  }
}

/**
 * Mount the watercolor interaction in a hero's canvas.
 * @param {HTMLCanvasElement} canvas - Canvas whose parent owns the CSS artwork.
 * @param {(state: string) => void} onState - Receives loading, ready or fallback state.
 * @returns {() => void} Dispose listeners, pending loads and GPU resources.
 */
export function mountWatercolor(canvas, onState) {
  const hero = canvas.parentElement
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const coarse = matchMedia('(pointer: coarse)')
  const abort = new AbortController()
  const listeners = { signal: abort.signal, passive: true }
  let engine, material, passIndices
  let disposed = false
  let failed = false
  let contextLost = false
  let sourceReady = false
  let visible = true
  let width = 0, height = 0
  let simulationWidth = 0, simulationHeight = 0
  let frameId = 0, lastFrame = 0, dt = 1 / 60
  let lastPointer = null, pendingStroke = null
  let backgroundUrl = '', backgroundRequest = 0, backgroundReady = false
  let imageTexture, noiseTexture, revealNoiseTexture, paperTexture, paperNormalTexture, dryLut, inkLut
  let velocity, inkField, pressureField, divergenceField, sharpTarget, blurX, blurY, flowX, flowY
  let targets = []
  let clearPending = true, artworkDirty = true, firstFrame = true
  let imagePosition = new Vector2(.5, .5)
  const assetTextures = new Set()

  function setVector(name, x, y) {
    const vector = material.shaderData.getVector2(name) ?? new Vector2()
    material.shaderData.setVector2(name, vector.set(x, y))
  }

  function resetPointer() {
    lastPointer = null
    pendingStroke = null
  }

  function onPointer(event) {
    if (event.target.closest('[data-hero-scroll]')) {
      resetPointer()
      return
    }
    if (reduced.matches || !backgroundReady || !sourceReady || contextLost) return
    const bounds = canvas.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = 1 - (event.clientY - bounds.top) / bounds.height
    const now = performance.now()
    if (lastPointer) {
      const sampleDt = Math.max((now - lastPointer.time) / 1000, 1 / 120)
      const dx = (x - lastPointer.x) * width / height
      const dy = y - lastPointer.y
      const speed = Math.hypot(dx, dy) / sampleDt
      const scale = speed > 3 ? 3 / speed : 1
      if (speed > 0) {
        const force = [dx / sampleDt * scale * 50 / 60, dy / sampleDt * scale * 50 / 60]
        if (pendingStroke) {
          pendingStroke.to = [x, y]
          pendingStroke.force = force
        } else {
          pendingStroke = { from: [lastPointer.x, lastPointer.y], to: [x, y], force }
        }
      }
    }
    lastPointer = { x, y, time: now }
  }

  function makeTarget(w, h, color = false, linear = false) {
    const texture = new Texture2D(engine, w, h,
      color ? TextureFormat.R8G8B8A8 : TextureFormat.R16G16B16A16, false, false)
    texture.filterMode = color || linear ? TextureFilterMode.Bilinear : TextureFilterMode.Point
    texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Clamp
    const target = new RenderTarget(engine, w, h, texture, null)
    target.autoGenerateMipmaps = false
    targets.push(target)
    return target
  }

  function pair(w, h, linear = false) {
    return {
      read: makeTarget(w, h, false, linear),
      write: makeTarget(w, h, false, linear),
      swap() { [this.read, this.write] = [this.write, this.read] },
    }
  }

  function releaseTargets() {
    for (const target of targets) {
      const texture = target.getColorTexture()
      target.destroy()
      texture.destroy()
    }
    targets = []
  }

  function resize() {
    if (!engine || disposed || contextLost) return
    const w = hero.clientWidth, h = hero.clientHeight
    if (!w || !h) return
    const ratio = Math.min(devicePixelRatio || 1, 1.75)
    const bufferWidth = Math.round(w * ratio), bufferHeight = Math.round(h * ratio)
    if (w !== width || h !== height || bufferWidth !== canvas.width || bufferHeight !== canvas.height) {
      width = w
      height = h
      engine.canvas.setResolution(bufferWidth, bufferHeight)
      const longest = coarse.matches ? 512 : 1024
      simulationWidth = Math.max(24, Math.round(longest * width / Math.max(width, height)))
      simulationHeight = Math.max(24, Math.round(longest * height / Math.max(width, height)))
      releaseTargets()
      velocity = pair(simulationWidth, simulationHeight)
      inkField = pair(simulationWidth, simulationHeight, true)
      pressureField = pair(simulationWidth, simulationHeight)
      divergenceField = makeTarget(simulationWidth, simulationHeight)
      flowX = makeTarget(simulationWidth, simulationHeight, false, true)
      flowY = makeTarget(simulationWidth, simulationHeight, false, true)
      sharpTarget = makeTarget(bufferWidth, bufferHeight, true)
      blurX = makeTarget(Math.ceil(bufferWidth / 2), Math.ceil(bufferHeight / 2), true)
      blurY = makeTarget(blurX.width, blurX.height, true)
      canvas.dataset.simulation = `${simulationWidth}x${simulationHeight}`
      clearPending = artworkDirty = true
      resetPointer()
    }
    loadBackground().then(updatePlayback).catch(onError)
  }

  function bind(name, texture) {
    material.shaderData.setTexture(name, texture instanceof RenderTarget ? texture.getColorTexture() : texture)
  }

  function draw(passName, destination) {
    Blitter.blitTexture(engine, imageTexture, destination, 0, undefined, material, passIndices[passName])
  }

  function simulate() {
    const stroke = pendingStroke
    bind('uVelocity', velocity.read)
    setVector('uFrom', ...(stroke?.from ?? [-10, -10]))
    setVector('uTo', ...(stroke?.to ?? [-10, -10]))
    setVector('uForce', ...(stroke?.force ?? [0, 0]))
    material.shaderData.setFloat('uRadius', BRUSH_RADIUS / height)
    material.shaderData.setFloat('uHasStroke', stroke ? 1 : 0)
    draw('force', velocity.write)
    velocity.swap()
    pendingStroke = null

    bind('uVelocity', velocity.read)
    bind('uNoise', noiseTexture)
    draw('advect', velocity.write)
    velocity.swap()

    bind('uVelocity', velocity.read)
    draw('divergence', divergenceField)
    draw('clear', pressureField.read)
    bind('uPressure', pressureField.read)
    bind('uDivergence', divergenceField)
    draw('pressure', pressureField.write)
    pressureField.swap()
    bind('uPressure', pressureField.read)
    draw('project', velocity.write)
    velocity.swap()

    bind('uVelocity', velocity.read)
    bind('uAccumulation', inkField.read)
    draw('accumulate', inkField.write)
    inkField.swap()
    bind('uSource', inkField.read)
    setVector('uDirection', FLOW_SMOOTHING / (2 * width), 0)
    draw('blur', flowX)
    bind('uSource', flowX)
    setVector('uDirection', 0, FLOW_SMOOTHING / (2 * height))
    draw('blur', flowY)
  }

  class WatercolorPass extends PostProcessPass {
    onRender(camera, source, destination) {
      setVector('uTexel', 1 / simulationWidth, 1 / simulationHeight)
      setVector('uDomain', width / height, 1)
      material.shaderData.setFloat('uDt', dt)
      if (clearPending) {
        for (const target of targets) draw('clear', target)
        clearPending = false
      }
      if (!reduced.matches) simulate()

      // The source art is static; only the fluid field needs per-frame updates.
      if (artworkDirty) {
        bind('uImage', imageTexture)
        setVector('uImageSize', imageTexture.width, imageTexture.height)
        setVector('uResolution', width, height)
        material.shaderData.setVector2('uImagePosition', imagePosition)
        draw('display', sharpTarget)
        bind('uSource', sharpTarget)
        setVector('uDirection', 2.2 / width, 0)
        draw('blur', blurX)
        bind('uSource', blurX)
        setVector('uDirection', 0, 2.2 / height)
        draw('blur', blurY)
        artworkDirty = false
      }
      bind('uSharp', sharpTarget)
      bind('uBlur', blurY)
      bind('uAccumulation', flowY)
      bind('uRevealNoise', revealNoiseTexture)
      bind('uPaper', paperTexture)
      bind('uPaperNormal', paperNormalTexture)
      bind('uDryLut', dryLut.texture)
      bind('uInkLut', inkLut.texture)
      setVector('uPaperScale', width / PAPER_TILE_SIZE, height / PAPER_TILE_SIZE)
      setVector('uPaperTexel', 1 / paperTexture.width, 1 / paperTexture.height)
      material.shaderData.setFloat('uDrySize', dryLut.size)
      material.shaderData.setFloat('uInkSize', inkLut.size)
      material.shaderData.setFloat('uReduced', reduced.matches ? 1 : 0)
      draw('composite', destination)
    }
  }

  function frame(now) {
    frameId = 0
    dt = lastFrame ? Math.min((now - lastFrame) / 1000, 1 / 30) : 1 / 60
    lastFrame = now
    try {
      engine.update()
      if (firstFrame) {
        firstFrame = false
        onState('galacean-watercolor')
      }
      if (!reduced.matches) frameId = requestAnimationFrame(frame)
    } catch (error) {
      onError(error)
    }
  }

  function updatePlayback() {
    cancelAnimationFrame(frameId)
    frameId = 0
    lastFrame = 0
    resetPointer()
    if (sourceReady && backgroundReady && visible && !document.hidden && !disposed && !failed && !contextLost) {
      frameId = requestAnimationFrame(frame)
    }
  }

  function loadImage(url, { wrap = TextureWrapMode.Clamp, mipmaps = false } = {}) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      const cancel = () => {
        image.onload = image.onerror = null
        image.src = ''
        reject(new DOMException('Watercolor disposed', 'AbortError'))
      }
      abort.signal.addEventListener('abort', cancel, { once: true })
      image.onload = () => {
        abort.signal.removeEventListener('abort', cancel)
        if (disposed) { resolve(null); return }
        const texture = new Texture2D(engine, image.width, image.height, TextureFormat.R8G8B8A8, mipmaps, false)
        texture.wrapModeU = texture.wrapModeV = wrap
        texture.filterMode = mipmaps ? TextureFilterMode.Trilinear : TextureFilterMode.Bilinear
        const upload = () => {
          texture.setImageSource(image, 0, wrap !== TextureWrapMode.Clamp)
          if (mipmaps) texture.generateMipmaps()
        }
        upload()
        engine.resourceManager.addContentRestorer(new TextureRestorer(texture, upload))
        assetTextures.add(texture)
        resolve(texture)
      }
      image.onerror = () => {
        abort.signal.removeEventListener('abort', cancel)
        reject(new Error(`Failed to load ${url}`))
      }
      image.src = url
    })
  }

  async function loadBackground() {
    const style = getComputedStyle(hero)
    const url = style.backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1]
    const position = style.backgroundPosition.split(' ').map(value => parseFloat(value) / 100)
    if (position.length === 2 && position.every(Number.isFinite)) {
      if (position[0] !== imagePosition.x || position[1] !== imagePosition.y) artworkDirty = true
      imagePosition.set(...position)
    }
    if (url === backgroundUrl) return
    if (!url) throw new Error('Hero background image is missing')
    backgroundUrl = url
    const request = ++backgroundRequest
    backgroundReady = false
    onState('loading')
    let texture
    try {
      texture = await loadImage(url)
    } catch (error) {
      if (!disposed && request === backgroundRequest) throw error
      return
    }
    if (disposed) return
    if (request !== backgroundRequest) {
      texture.destroy()
      assetTextures.delete(texture)
      return
    }
    const previous = imageTexture
    imageTexture = texture
    if (previous) { previous.destroy(); assetTextures.delete(previous) }
    backgroundReady = true
    artworkDirty = firstFrame = true
  }

  async function loadLut(url) {
    const texture = await loadImage(url)
    if (disposed) return null
    return { texture, size: texture.height }
  }

  function onError(error) {
    if (disposed) return
    failed = true
    cancelAnimationFrame(frameId)
    onState('static-error')
    console.error('Watercolor initialization/render failed:', error)
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    updatePlayback()
  })
  const resizeObserver = new ResizeObserver(resize)
  observer.observe(hero)
  resizeObserver.observe(hero)
  hero.addEventListener('pointermove', onPointer, listeners)
  hero.addEventListener('pointerdown', event => { resetPointer(); onPointer(event) }, listeners)
  hero.addEventListener('pointerup', event => { if (event.pointerType === 'touch') resetPointer() }, listeners)
  hero.addEventListener('pointercancel', resetPointer, listeners)
  hero.addEventListener('pointerleave', resetPointer, listeners)
  window.addEventListener('blur', resetPointer, listeners)
  window.addEventListener('scroll', resetPointer, listeners)
  window.addEventListener('resize', resize, listeners)
  document.addEventListener('visibilitychange', updatePlayback, listeners)
  reduced.addEventListener('change', () => {
    clearPending = artworkDirty = true
    updatePlayback()
  }, listeners)

  async function initialize() {
    engine = await WebGLEngine.create({
      canvas,
      graphicDeviceOptions: { webGLMode: WebGLMode.WebGL2, alpha: false, depth: false, stencil: false },
    })
    if (disposed) { engine.destroy(); return }
    // Sampling support alone does not guarantee renderable float targets.
    if (!canvas.getContext('webgl2').getExtension('EXT_color_buffer_float')) {
      onState('static-unsupported')
      engine.destroy()
      engine = null
      return
    }
    const shader = Shader.find('SEEConf/Watercolor') ?? await engine.resourceManager.load({
      url: watercolorShaderUrl, type: AssetType.Shader,
    })
    if (disposed) return
    if (!shader.compileVariant(engine, [])) throw new Error('Watercolor shader compilation failed')
    material = new Material(engine, shader)
    passIndices = Object.fromEntries(shader.subShaders[0].passes.map((pass, index) => [pass.name, index]))
    const camera = engine.sceneManager.activeScene.createRootEntity('Watercolor').addComponent(Camera)
    camera.enablePostProcess = true
    camera.enableHDR = true
    engine.addPostProcessPass(new WatercolorPass(engine))
    engine.on(EngineEventType.DeviceLost, () => {
      contextLost = true
      onState('context-lost')
      updatePlayback()
    })
    engine.on(EngineEventType.DeviceRestored, () => {
      contextLost = false
      clearPending = artworkDirty = firstFrame = true
      resize()
      updatePlayback()
    })
    resize()
    const [noise, reveal, paper, normal, dry, ink] = await Promise.all([
      loadImage('https://mdn.alipayobjects.com/rms/afts/img/A*3-RtSp6fzjUAAAAAW0AAAAgAehQnAQ/original/ink-noise.png', { wrap: TextureWrapMode.Repeat }),
      loadImage('https://mdn.alipayobjects.com/rms/afts/img/A*9xrSRo1OAjwAAAAAUqAAAAgAehQnAQ/original/reveal-noise.png', { wrap: TextureWrapMode.Mirror }),
      loadImage('https://mdn.alipayobjects.com/rms/afts/img/A*vyE5S7vF8RIAAAAARqAAAAgAehQnAQ/original/paper-texture.jpg', { wrap: TextureWrapMode.Mirror, mipmaps: true }),
      loadImage('https://mdn.alipayobjects.com/rms/afts/img/A*acb2RYDOKloAAAAAZQAAAAgAehQnAQ/original/paper-normal.png', { wrap: TextureWrapMode.Repeat, mipmaps: true }),
      loadLut('https://mdn.alipayobjects.com/rms/afts/img/A*ejmET5y9CRYAAAAAOgAAAAgAehQnAQ/original/dry-lut.png'),
      loadLut('https://mdn.alipayobjects.com/rms/afts/img/A*-6hASLWB5n0AAAAACNAAAAgAehQnAQ/original/ink-lut.png'),
    ])
    if (disposed) return
    noiseTexture = noise
    revealNoiseTexture = reveal
    paperTexture = paper
    paperNormalTexture = normal
    dryLut = dry
    inkLut = ink
    sourceReady = true
    updatePlayback()
  }

  initialize().catch(onError)
  return () => {
    disposed = true
    abort.abort()
    cancelAnimationFrame(frameId)
    observer.disconnect()
    resizeObserver.disconnect()
    if (engine && !engine.destroyed) engine.destroy()
  }
}
