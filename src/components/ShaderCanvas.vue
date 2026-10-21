<template>
  <canvas ref="canvasRef" class="shader-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)

/* ═════════════════════════════════════════════════════════════════
 * Shader sources — GLSL ES 3.00
 * Ported from the SEE Conf watercolor-reveal pipeline:
 *   Background image → Navier-Stokes fluid sim → dry/wet ink composite
 * with 3DL LUTs, paper textures and noise-driven advection.
 * ═════════════════════════════════════════════════════════════════ */

const vertexShader = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv;
void main(){ vUv = aPosition * .5 + .5; gl_Position = vec4(aPosition, 0., 1.); }`

/* Shared fragment header — every fragment program prepends this */
const sharedHeader = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 outColor;
uniform vec2 uTexel;
uniform vec2 uDomain;
uniform float uDt;
vec4 bilerp(sampler2D tex, vec2 uv){
  vec2 size = vec2(textureSize(tex, 0));
  vec2 p = uv * size - .5;
  vec2 f = fract(p), i = floor(p);
  vec2 t = 1. / size;
  vec4 a = texture(tex, (i + vec2(.5, .5)) * t);
  vec4 b = texture(tex, (i + vec2(1.5, .5)) * t);
  vec4 c = texture(tex, (i + vec2(.5, 1.5)) * t);
  vec4 d = texture(tex, (i + vec2(1.5, 1.5)) * t);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}`

/* force — deposit pointer momentum into the velocity field */
const forceFrag = `
  uniform sampler2D uVelocity;
  uniform vec2 uFrom, uTo, uForce;
  uniform float uRadius, uHasStroke;
  void main(){
    vec3 previous = texture(uVelocity, vUv).xyz;
    vec2 p = vUv * uDomain, a = uFrom * uDomain, b = uTo * uDomain;
    vec2 ab = b - a;
    float t = clamp(dot(p - a, ab) / max(dot(ab, ab), .000001), 0., 1.);
    vec2 delta = p - mix(a, b, t);
    float sdf = max(0., 1. - length(delta) / uRadius);
    float forceLength = length(uForce);
    vec2 radial = delta / max(length(delta), .000001) * forceLength;
    vec2 impulse = mix(uForce, radial, .2) * sdf * uHasStroke;
    float hasInk = step(.0001, sdf) * step(.0001, forceLength) * uHasStroke;
    float intensity = min(previous.z + .06 * hasInk * 60. * uDt, 1.);
    outColor = vec4(previous.xy + impulse * 60. * uDt, intensity, 1.);
  }`

/* advection — transport velocity with noise-directed backtrace */
const advectFrag = `
  uniform sampler2D uVelocity, uNoise;
  float cubicInOut(float t){ return t < .5 ? 4.*t*t*t : .5*pow(2.*t-2., 3.) + 1.; }
  void main(){
    vec3 data = texture(uVelocity, vUv).xyz;
    vec2 velocity = data.xy;
    vec3 n1 = texture(uNoise, vUv).rgb, n2 = texture(uNoise, vUv * 2.).rgb;
    vec2 noiseDirection = normalize((n1.gb - .5) * 2. + vec2(.00001));
    float threshold = cubicInOut(n1.r) * .05;
    bool below = length(velocity) < threshold;
    if (below) velocity *= smoothstep(.468, .51, n2.r);
    vec2 ratio = max(uDomain.x, uDomain.y) / uDomain;
    vec2 backtrace = mix(velocity, noiseDirection * length(velocity), .8) * (.008 * 60. * uDt) * ratio;
    if (below) backtrace *= mix(0., 3., n1.r);
    vec3 previous = bilerp(uVelocity, clamp(vUv - backtrace, vec2(0), vec2(1))).xyz;
    float dim = 1. + (1. - smoothstep(0., .001, length(backtrace))) * 3.;
    float intensity = max(max(previous.z, data.z) - .001 * dim * 60. * uDt, 0.);
    outColor = vec4(previous.xy * pow(.98, 60. * uDt), intensity, 1.);
  }`

/* divergence — velocity divergence for the pressure solve */
const divergenceFrag = `
  uniform sampler2D uVelocity;
  void main(){
    float l = texture(uVelocity, vUv - vec2(uTexel.x, 0)).x;
    float r = texture(uVelocity, vUv + vec2(uTexel.x, 0)).x;
    float b = texture(uVelocity, vUv - vec2(0, uTexel.y)).y;
    float t = texture(uVelocity, vUv + vec2(0, uTexel.y)).y;
    outColor = vec4((r - l + t - b) * .5, 0., 0., 1.);
  }`

/* pressure — single Jacobi iteration (reference uses one pass from zero) */
const pressureFrag = `
  uniform sampler2D uPressure, uDivergence;
  void main(){
    float l = texture(uPressure, vUv - vec2(uTexel.x, 0)).x;
    float r = texture(uPressure, vUv + vec2(uTexel.x, 0)).x;
    float b = texture(uPressure, vUv - vec2(0, uTexel.y)).x;
    float t = texture(uPressure, vUv + vec2(0, uTexel.y)).x;
    float d = texture(uDivergence, vUv).x;
    outColor = vec4((l + r + b + t - d) * .25, 0., 0., 1.);
  }`

/* project — subtract pressure gradient to make velocity divergence-free */
const projectFrag = `
  uniform sampler2D uPressure, uVelocity;
  void main(){
    float l = texture(uPressure, vUv - vec2(uTexel.x, 0)).x;
    float r = texture(uPressure, vUv + vec2(uTexel.x, 0)).x;
    float b = texture(uPressure, vUv - vec2(0, uTexel.y)).x;
    float t = texture(uPressure, vUv + vec2(0, uTexel.y)).x;
    vec2 v = texture(uVelocity, vUv).xy - .5 * vec2(r - l, t - b);
    outColor = vec4(v, texture(uVelocity, vUv).z, 1.);
  }`

/* accumulation — track wetness + material displacement along the velocity field */
const accumulationFrag = `
  uniform sampler2D uVelocity, uAccumulation;
  void main(){
    vec3 velocity = texture(uVelocity, vUv).xyz;
    vec2 travel = velocity.xy * (.008 * 60. * uDt);
    vec4 previous = bilerp(uAccumulation, clamp(vUv - travel / uDomain, vec2(0.), vec2(1.)));
    float speed = length(velocity.xy);
    float signal = speed > 0. ? 1. - smoothstep(0., speed, .01) : 0.;
    float wetness = max(signal, previous.b * pow(.96, 60. * uDt));
    vec2 displacement = previous.rg * pow(.98, 60. * uDt) + travel;
    outColor = vec4(displacement, wetness, velocity.z);
  }`

/* blur — separable nine-tap Gaussian (sigma ≈ 2 taps) */
const blurFrag = `
  uniform sampler2D uSource;
  uniform vec2 uDirection;
  void main(){
    vec4 c = texture(uSource, vUv) * .1633;
    c += (texture(uSource, vUv - uDirection) + texture(uSource, vUv + uDirection)) * .1531;
    c += (texture(uSource, vUv - 2.*uDirection) + texture(uSource, vUv + 2.*uDirection)) * .12245;
    c += (texture(uSource, vUv - 3.*uDirection) + texture(uSource, vUv + 3.*uDirection)) * .0918;
    c += (texture(uSource, vUv - 4.*uDirection) + texture(uSource, vUv + 4.*uDirection)) * .051;
    outColor = c;
  }`

/* display — sample the background image with CSS cover-fit + film grain */
const displayFrag = `
  uniform sampler2D uImage;
  uniform vec2 uResolution, uImagePosition;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  void main(){
    vec2 uv = vUv;
    float screenAspect = uResolution.x / uResolution.y;
    vec2 imageSize = vec2(textureSize(uImage, 0));
    float imageAspect = imageSize.x / imageSize.y;
    vec2 cover = vec2(min(1., screenAspect / imageAspect), min(1., imageAspect / screenAspect));
    vec2 baseCenter = cover * .5 + (1. - cover) * uImagePosition;
    vec2 sampleUv = (uv - .5) * cover + baseCenter;
    vec3 color = texture(uImage, vec2(sampleUv.x, 1. - sampleUv.y)).rgb;
    float grain = (hash(gl_FragCoord.xy) - .5) / 255.;
    outColor = vec4(color + grain, 1.);
  }`

/* composite — blend dry/wet watercolor over the image using 3DL LUTs */
const compositeFrag = `
  precision highp sampler3D;
  uniform sampler2D uSharp, uBlur, uAccumulation, uRevealNoise, uPaper, uPaperNormal;
  uniform sampler3D uDryLut, uInkLut;
  uniform float uDrySize, uInkSize, uReduced, uIdle;
  uniform vec2 uPaperScale;
  vec3 lookup(sampler3D lut, float size, vec3 color){
    return texture(lut, vec3(.5 / size) + clamp(color, 0., 1.) * (1. - 1. / size)).rgb;
  }
  vec3 onPaper(sampler3D lut, float size, vec3 color){
    vec3 paper = vec3(.965);
    return lookup(lut, size, color) * paper / lookup(lut, size, paper);
  }
  float quarticInOut(float t){
    return t < .5 ? 8. * pow(t, 4.) : 1. - 8. * pow(1. - t, 4.);
  }
  void main(){
    vec4 data = bilerp(uAccumulation, vUv);
    float wetness = clamp(data.b, 0., 1.);
    float coverage = clamp(mix(.8, 1.4, data.a) * wetness, 0., 1.);
    vec2 flow = -data.rg / (1. + length(data.rg) / .01) / uDomain;
    flow *= wetness * (1. - uReduced);
    vec2 materialUv = clamp(vUv + flow, vec2(0.), vec2(1.));
    vec2 surfaceUv = (vUv + flow) * uDomain;
    vec3 noise = texture(uRevealNoise, surfaceUv * .6).rgb;
    float pigment = coverage + (noise.r + noise.g - 1.) * coverage * (1. - coverage);
    float mixValue = mix(smoothstep(0., 1., pigment), 1., uReduced);
    vec3 sharp = texture(uSharp, materialUv).rgb;
    vec3 soft = texture(uBlur, materialUv).rgb;
    vec3 dry = onPaper(uDryLut, uDrySize, soft);
    vec3 ink = onPaper(uInkLut, uInkSize, sharp);
    vec2 paperUv = (vUv + flow) * uPaperScale;
    vec3 paperNormal = texture(uPaperNormal, paperUv).xyz * 2. - 1.;
    paperNormal = normalize(paperNormal);
    vec2 paperTexel = 1. / vec2(textureSize(uPaper, 0));
    float fibers = texture(uPaper, paperUv).r - texture(uPaper, paperUv + paperTexel).r;
    float fog = .20 + smoothstep(.25, .75, noise.b) * .28;
    vec3 absorption = max(vec3(.965) - soft, vec3(0.)) / .965;
    float pigmentAmount = clamp(max(max(absorption.r, absorption.g), absorption.b), 0., 1.);
    float dryPigment = pigmentAmount * (1. - fog);
    float thinPaint = 4. * dryPigment * (1. - dryPigment);
    float grainPatch = quarticInOut(texture(uRevealNoise, surfaceUv * .15).b);
    float exposedFibers = thinPaint * sqrt(pigmentAmount) * mix(.05, 1., grainPatch);
    float relief = (dot(paperNormal.xy, normalize(vec2(-1., 1.))) * .05 + fibers * .1) * exposedFibers;
    dry = mix(dry, vec3(.965), fog) + relief;
    vec3 watercolor = mix(dry, ink, mixValue);
    // uIdle is driven by JS-side time tracking (0 = mouse active, 1 = idle).
    // When idle, bypass ALL LUT/fog/paper processing and show the raw image directly.
    vec3 color = mix(watercolor, sharp, uIdle);
    outColor = vec4(color, 1.);
  }`

/* ═════════════════════════════════════════════════════════════════
 * WebGL2 setup + render loop
 * ═════════════════════════════════════════════════════════════════ */

let cleanupFn = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const body = document.body
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const coarse = matchMedia('(pointer: coarse)')

  /* design constants */
  const brushRadiusPx = 45
  const flowSmoothingPx = 4
  const paperTileSizePx = 256

  /* state */
  let paused = reduced.matches
  let lastFrame = 0
  let width = window.innerWidth, height = window.innerHeight
  let imagePosition = [0.5, 0.5]
  let lastPointer = null
  let pendingStroke = null
  let loopId = 0
  let lastInteractionTime = performance.now()

  const pointer = { x: .5, y: .5, ringX: .5, ringY: .5 }
  const damp = (a, b, rate, dt) => a + (b - a) * (1 - Math.exp(-rate * dt))

  function setPaused(value) {
    paused = value
    pendingStroke = null
    lastPointer = null
  }
  setPaused(paused)
  const onReducedChange = e => setPaused(e.matches)
  reduced.addEventListener('change', onReducedChange)

  /* pointer → fluid stroke */
  function onPointer(e) {
    const x = e.clientX / width
    const y = 1 - e.clientY / height
    pointer.x = x; pointer.y = y
    body.classList.add('pointer-visible')
    lastInteractionTime = performance.now()
    const now = lastInteractionTime
    if (lastPointer && !paused) {
      const sampleDt = Math.max((now - lastPointer.time) / 1000, 1 / 120)
      const dx = (x - lastPointer.x) * width / height
      const dy = y - lastPointer.y
      const speed = Math.hypot(dx, dy) / sampleDt
      const scale = speed > 3 ? 3 / speed : 1
      const vx = dx / sampleDt * scale, vy = dy / sampleDt * scale
      if (Math.hypot(dx, dy) > 0) {
        if (pendingStroke) { pendingStroke.to = [x, y]; pendingStroke.velocity = [vx, vy] }
        else pendingStroke = { from: [lastPointer.x, lastPointer.y], to: [x, y], velocity: [vx, vy] }
      }
    }
    lastPointer = { x, y, time: now }
  }
  const onPointerDown = e => { lastPointer = null; onPointer(e) }
  const onPointerUp = e => { if (e.pointerType === 'touch') lastPointer = null }
  const onPointerLeave = () => { lastPointer = null; body.classList.remove('pointer-visible') }
  const onBlur = () => { lastPointer = null; pendingStroke = null; body.classList.remove('pointer-visible') }

  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  document.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('blur', onBlur)

  /* WebGL2 context */
  const gl = canvas.getContext('webgl2', {
    alpha: false, antialias: false, depth: false, stencil: false,
    powerPreference: 'high-performance', preserveDrawingBuffer: false
  })
  const canSimulate = gl && gl.getExtension('EXT_color_buffer_float')
  if (!canSimulate) {
    canvas.style.display = 'none'
    body.dataset.renderer = 'static'
    return
  }

  function makeProgram(fragment) {
    const program = gl.createProgram()
    for (const [type, source] of [
      [gl.VERTEX_SHADER, vertexShader],
      [gl.FRAGMENT_SHADER, sharedHeader + fragment]
    ]) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader))
      gl.attachShader(program, shader)
      gl.deleteShader(shader)
    }
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program))
    const uniforms = {}
    for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i++) {
      const info = gl.getActiveUniform(program, i)
      uniforms[info.name] = gl.getUniformLocation(program, info.name)
    }
    return { program, uniforms }
  }

  const progs = {
    force: makeProgram(forceFrag),
    advect: makeProgram(advectFrag),
    divergence: makeProgram(divergenceFrag),
    pressure: makeProgram(pressureFrag),
    project: makeProgram(projectFrag),
    accumulate: makeProgram(accumulationFrag),
    blur: makeProgram(blurFrag),
    display: makeProgram(displayFrag),
    composite: makeProgram(compositeFrag),
  }

  /* full-screen quad VAO */
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW)
  for (const p of Object.values(progs)) {
    const loc = gl.getAttribLocation(p.program, 'aPosition')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  }

  /* background image texture */
  const imageTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, imageTexture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  /* framebuffer / texture helpers */
  let simulationWidth = 0, simulationHeight = 0
  let velocity, inkField, pressureField, divergenceField
  let sharpTarget, blurX, blurY, flowX, flowY
  let noiseTexture, revealNoiseTexture, paperTexture, paperNormalTexture, dryLut, inkLut
  let sourceReady = false
  let resources = []

  function target(w, h, color = false, linear = false) {
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, color || linear ? gl.LINEAR : gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, color || linear ? gl.LINEAR : gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, color ? gl.RGBA8 : gl.RGBA16F, w, h, 0, gl.RGBA,
      color ? gl.UNSIGNED_BYTE : gl.HALF_FLOAT, null)
    const fb = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE)
      throw new Error('Incomplete fluid framebuffer')
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    const out = { texture: tex, framebuffer: fb, w, h }
    resources.push(out)
    return out
  }

  function pair(w, h, linear = false) {
    return {
      read: target(w, h, false, linear),
      write: target(w, h, false, linear),
      swap() { [this.read, this.write] = [this.write, this.read] }
    }
  }

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75)
    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    const longest = coarse.matches ? 512 : 1024
    simulationWidth = Math.max(24, Math.round(longest * width / Math.max(width, height)))
    simulationHeight = Math.max(24, Math.round(longest * height / Math.max(width, height)))
    for (const r of resources) { gl.deleteTexture(r.texture); gl.deleteFramebuffer(r.framebuffer) }
    resources = []
    velocity = pair(simulationWidth, simulationHeight)
    inkField = pair(simulationWidth, simulationHeight, true)
    flowX = target(simulationWidth, simulationHeight, false, true)
    flowY = target(simulationWidth, simulationHeight, false, true)
    sharpTarget = target(canvas.width, canvas.height, true)
    blurX = target(Math.ceil(canvas.width / 2), Math.ceil(canvas.height / 2), true)
    blurY = target(blurX.w, blurX.h, true)
    pressureField = pair(simulationWidth, simulationHeight)
    divergenceField = target(simulationWidth, simulationHeight)
    pendingStroke = null
    lastPointer = null
    /* Read fallback img object-position to match CSS cover-fit on resize */
    const fbImg = document.querySelector('.hero-fallback img')
    if (fbImg) {
      const pos = getComputedStyle(fbImg).objectPosition.split(' ').map(v => parseFloat(v) / 100)
      if (pos.length >= 2 && pos.every(v => !isNaN(v))) imagePosition = pos
    }
  }

  const onResize = () => resize()
  window.addEventListener('resize', onResize, { passive: true })
  resize()

  /* uniform helpers */
  let textureSlot = 0
  function useProg(p, dt) {
    gl.useProgram(p.program)
    textureSlot = 0
    if (p.uniforms.uTexel) gl.uniform2f(p.uniforms.uTexel, 1 / simulationWidth, 1 / simulationHeight)
    if (p.uniforms.uDomain) gl.uniform2f(p.uniforms.uDomain, width / height, 1)
    if (p.uniforms.uDt) gl.uniform1f(p.uniforms.uDt, dt)
  }
  function bindTex(p, name, texture, type = gl.TEXTURE_2D) {
    gl.activeTexture(gl.TEXTURE0 + textureSlot)
    gl.bindTexture(type, texture)
    gl.uniform1i(p.uniforms[name], textureSlot++)
  }
  function drawTo(out) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, out ? out.framebuffer : null)
    gl.viewport(0, 0, out ? out.w : canvas.width, out ? out.h : canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  /* fluid simulation step */
  function simulate(dt) {
    const stroke = pendingStroke
    useProg(progs.force, dt)
    bindTex(progs.force, 'uVelocity', velocity.read.texture)
    gl.uniform2fv(progs.force.uniforms.uFrom, stroke ? stroke.from : [-10, -10])
    gl.uniform2fv(progs.force.uniforms.uTo, stroke ? stroke.to : [-10, -10])
    gl.uniform2fv(progs.force.uniforms.uForce, stroke ? stroke.velocity.map(v => v / 60 * 50) : [0, 0])
    gl.uniform1f(progs.force.uniforms.uRadius, brushRadiusPx / height)
    gl.uniform1f(progs.force.uniforms.uHasStroke, stroke ? 1 : 0)
    drawTo(velocity.write); velocity.swap(); pendingStroke = null

    useProg(progs.advect, dt)
    bindTex(progs.advect, 'uVelocity', velocity.read.texture)
    bindTex(progs.advect, 'uNoise', noiseTexture)
    drawTo(velocity.write); velocity.swap()

    useProg(progs.divergence, dt)
    bindTex(progs.divergence, 'uVelocity', velocity.read.texture)
    drawTo(divergenceField)

    gl.bindFramebuffer(gl.FRAMEBUFFER, pressureField.read.framebuffer)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    useProg(progs.pressure, dt)
    bindTex(progs.pressure, 'uDivergence', divergenceField.texture)
    bindTex(progs.pressure, 'uPressure', pressureField.read.texture)
    drawTo(pressureField.write); pressureField.swap()

    useProg(progs.project, dt)
    bindTex(progs.project, 'uPressure', pressureField.read.texture)
    bindTex(progs.project, 'uVelocity', velocity.read.texture)
    drawTo(velocity.write); velocity.swap()

    useProg(progs.accumulate, dt)
    bindTex(progs.accumulate, 'uVelocity', velocity.read.texture)
    bindTex(progs.accumulate, 'uAccumulation', inkField.read.texture)
    drawTo(inkField.write); inkField.swap()

    /* flow smoothing — separable Gaussian on the material map */
    useProg(progs.blur, dt)
    bindTex(progs.blur, 'uSource', inkField.read.texture)
    gl.uniform2f(progs.blur.uniforms.uDirection, flowSmoothingPx / (2 * width), 0)
    drawTo(flowX)
    useProg(progs.blur, dt)
    bindTex(progs.blur, 'uSource', flowX.texture)
    gl.uniform2f(progs.blur.uniforms.uDirection, 0, flowSmoothingPx / (2 * height))
    drawTo(flowY)
  }

  /* render frame */
  function frame(now) {
    const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 1 / 30) : 1 / 60
    lastFrame = now
    pointer.ringX = damp(pointer.ringX, pointer.x, 11, dt)
    pointer.ringY = damp(pointer.ringY, pointer.y, 11, dt)
    const root = document.documentElement
    root.style.setProperty('--cursor-x', `${pointer.x * width}px`)
    root.style.setProperty('--cursor-y', `${(1 - pointer.y) * height}px`)
    root.style.setProperty('--ring-x', `${pointer.ringX * width}px`)
    root.style.setProperty('--ring-y', `${(1 - pointer.ringY) * height}px`)

    if (sourceReady) {
      if (!paused) simulate(dt)

      /* display — render background image to sharpTarget */
      useProg(progs.display, dt)
      bindTex(progs.display, 'uImage', imageTexture)
      gl.uniform2f(progs.display.uniforms.uResolution, width, height)
      gl.uniform2fv(progs.display.uniforms.uImagePosition, imagePosition)
      drawTo(sharpTarget)

      /* blur the displayed image in two separable passes */
      const scale = canvas.width / width
      useProg(progs.blur, dt)
      bindTex(progs.blur, 'uSource', sharpTarget.texture)
      gl.uniform2f(progs.blur.uniforms.uDirection, 2.2 * scale / canvas.width, 0)
      drawTo(blurX)
      useProg(progs.blur, dt)
      bindTex(progs.blur, 'uSource', blurX.texture)
      gl.uniform2f(progs.blur.uniforms.uDirection, 0, 2.2 * scale / canvas.height)
      drawTo(blurY)

      /* composite — final watercolor ink reveal to screen */
      useProg(progs.composite, dt)
      bindTex(progs.composite, 'uSharp', sharpTarget.texture)
      bindTex(progs.composite, 'uBlur', blurY.texture)
      bindTex(progs.composite, 'uAccumulation', flowY.texture)
      bindTex(progs.composite, 'uRevealNoise', revealNoiseTexture)
      bindTex(progs.composite, 'uPaper', paperTexture)
      bindTex(progs.composite, 'uPaperNormal', paperNormalTexture)
      gl.uniform2f(progs.composite.uniforms.uPaperScale, width / paperTileSizePx, height / paperTileSizePx)
      bindTex(progs.composite, 'uDryLut', dryLut.texture, gl.TEXTURE_3D)
      bindTex(progs.composite, 'uInkLut', inkLut.texture, gl.TEXTURE_3D)
      gl.uniform1f(progs.composite.uniforms.uDrySize, dryLut.size)
      gl.uniform1f(progs.composite.uniforms.uInkSize, inkLut.size)
      gl.uniform1f(progs.composite.uniforms.uReduced, reduced.matches ? 1 : 0)
      // JS-side idle tracking: 0.3s grace after last pointer event, then ramp to 1 over 0.5s.
      // When idle=1, composite shader shows raw background image (no LUT/fog), preventing blank page.
      const sinceInteraction = (now - lastInteractionTime) / 1000
      const idleAmount = Math.min(Math.max((sinceInteraction - 0.3) / 0.5, 0), 1)
      gl.uniform1f(progs.composite.uniforms.uIdle, idleAmount)
      drawTo(null)
    }
    loopId = requestAnimationFrame(frame)
  }

  /* texture loaders */
  function loadImage(url, existing, { wrap = gl.CLAMP_TO_EDGE, mipmaps = false } = {}) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const tex = existing || gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, tex)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipmaps ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, wrap !== gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
        if (mipmaps) gl.generateMipmap(gl.TEXTURE_2D)
        resolve(tex)
      }
      img.onerror = () => reject(new Error(`Failed to load ${url}`))
      img.src = url
    })
  }

  async function loadLut(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to load ${url}`)
    const rows = (await res.text())
      .split(/\r?\n/)
      .filter(l => l.trim() && !l.startsWith('#'))
      .map(l => l.trim().split(/\s+/).map(Number))
    const size = rows.shift().length
    if (rows.length !== size ** 3) throw new Error(`Invalid 3DL lattice: ${rows.length} != ${size}^3`)
    const maximum = rows.reduce((m, r) => Math.max(m, ...r), 0)
    const divisor = 2 ** Math.ceil(Math.log2(maximum + 1)) - 1
    const data = new Uint8Array(size ** 3 * 4)
    rows.forEach((row, i) => {
      const r = Math.floor(i / (size * size))
      const g = Math.floor(i / size) % size
      const b = i % size
      const idx = (r + g * size + b * size * size) * 4
      row.forEach((v, c) => { data[idx + c] = Math.round(v / divisor * 255) })
      data[idx + 3] = 255
    })
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_3D, tex)
    for (const f of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_3D, f, gl.LINEAR)
    for (const a of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T, gl.TEXTURE_WRAP_R]) gl.texParameteri(gl.TEXTURE_3D, a, gl.CLAMP_TO_EDGE)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGBA8, size, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, data)
    return { texture: tex, size }
  }

  Promise.all([
    loadImage('https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Yqq2SbdCWdQAAAAAZRAAAAgADiiDAQFr/original', imageTexture),
    loadImage('/textures/ink-noise.png', null, { wrap: gl.REPEAT }),
    loadImage('/textures/reveal-noise.png', null, { wrap: gl.MIRRORED_REPEAT }),
    loadImage('/textures/paper-texture.jpg', null, { wrap: gl.MIRRORED_REPEAT, mipmaps: true }),
    loadImage('/textures/paper-normal.png', null, { wrap: gl.REPEAT, mipmaps: true }),
    loadLut('/textures/lut/dry.3dl'),
    loadLut('/textures/lut/ink.3dl'),
  ]).then(([, noise, revealNoise, paper, paperNormal, dry, ink]) => {
    noiseTexture = noise
    revealNoiseTexture = revealNoise
    paperTexture = paper
    paperNormalTexture = paperNormal
    dryLut = dry
    inkLut = ink
    sourceReady = true
    body.dataset.renderer = 'webgl2-ink-reveal'
    body.classList.add('ready')
    loopId = requestAnimationFrame(frame)
  }).catch(error => {
    body.dataset.renderer = 'asset-error'
    console.error('Shader asset load failed:', error)
  })

  /* context loss handling */
  const onContextLost = e => {
    e.preventDefault()
    cancelAnimationFrame(loopId)
    body.classList.remove('ready')
    body.dataset.renderer = 'context-lost'
  }
  const onContextRestored = () => location.reload()
  canvas.addEventListener('webglcontextlost', onContextLost)
  canvas.addEventListener('webglcontextrestored', onContextRestored)

  const onVisibility = () => {
    if (document.hidden) { cancelAnimationFrame(loopId); lastFrame = 0; pendingStroke = null }
    else if (sourceReady) { cancelAnimationFrame(loopId); loopId = requestAnimationFrame(frame) }
  }
  document.addEventListener('visibilitychange', onVisibility)

  cleanupFn = () => {
    cancelAnimationFrame(loopId)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointerup', onPointerUp)
    document.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('blur', onBlur)
    reduced.removeEventListener('change', onReducedChange)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('webglcontextlost', onContextLost)
    canvas.removeEventListener('webglcontextrestored', onContextRestored)
    body.classList.remove('ready', 'pointer-visible')
    for (const r of resources) { gl.deleteTexture(r.texture); gl.deleteFramebuffer(r.framebuffer) }
    gl.deleteTexture(imageTexture)
    Object.values(progs).forEach(p => { gl.deleteProgram(p.program) })
    gl.deleteBuffer(buffer)
    gl.deleteVertexArray(vao)
  }
})

onUnmounted(() => {
  if (cleanupFn) cleanupFn()
})
</script>

<style scoped>
.shader-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

/* When assets are ready the canvas fades in and the CSS fallback fades out */
:global(body.ready) .shader-canvas {
  opacity: 1;
}
</style>
