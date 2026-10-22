<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const anchor = ref(null)
const cursor = ref(null)
const dot = ref(null)
const ring = ref(null)
const mounted = ref(false)
let cleanup = () => {}

onMounted(() => {
  const hero = anchor.value.parentElement
  const finePointer = window.matchMedia('(min-width: 701px) and (hover: hover) and (pointer: fine)')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const activeClass = 'seeconf-hero-cursor-active'
  let visible = false
  let frameId = 0
  let lastFrame = 0
  let pointerX = 0
  let pointerY = 0
  let ringX = 0
  let ringY = 0

  mounted.value = true

  const hide = () => {
    visible = false
    hero.classList.remove(activeClass)
    cursor.value?.classList.remove('is-visible')
    cancelAnimationFrame(frameId)
    frameId = 0
    lastFrame = 0
  }

  const isOverHero = () => {
    const target = document.elementFromPoint(pointerX, pointerY)
    return target !== null && hero.contains(target)
  }

  const draw = (now) => {
    if (!isOverHero()) {
      hide()
      return
    }
    const dt = lastFrame ? (now - lastFrame) / 1000 : 0
    const follow = 1 - Math.exp(-11 * dt)
    lastFrame = now
    ringX += (pointerX - ringX) * follow
    ringY += (pointerY - ringY) * follow
    dot.value.style.transform = `translate3d(${pointerX - 2}px, ${pointerY - 2}px, 0)`
    ring.value.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0)`
    frameId = requestAnimationFrame(draw)
  }

  const onPointer = (event) => {
    if (!cursor.value) return
    if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches || document.hidden) {
      hide()
      return
    }
    pointerX = event.clientX
    pointerY = event.clientY
    if (!isOverHero()) {
      hide()
      return
    }
    if (!visible) {
      visible = true
      ringX = pointerX
      ringY = pointerY
      hero.classList.add(activeClass)
      cursor.value.classList.add('is-visible')
      draw(performance.now())
    }
  }

  const onViewportChange = () => {
    if (visible && !isOverHero()) hide()
  }
  const onVisibilityChange = () => {
    if (document.hidden) hide()
  }

  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('pointerover', onPointer, { passive: true })
  window.addEventListener('pointerdown', onPointer, { passive: true })
  window.addEventListener('scroll', onViewportChange, { passive: true, capture: true })
  window.addEventListener('resize', onViewportChange, { passive: true })
  window.addEventListener('blur', hide)
  document.addEventListener('pointerleave', hide)
  document.addEventListener('visibilitychange', onVisibilityChange)
  finePointer.addEventListener('change', hide)
  reducedMotion.addEventListener('change', hide)

  cleanup = () => {
    hide()
    window.removeEventListener('pointermove', onPointer)
    window.removeEventListener('pointerover', onPointer)
    window.removeEventListener('pointerdown', onPointer)
    window.removeEventListener('scroll', onViewportChange, true)
    window.removeEventListener('resize', onViewportChange)
    window.removeEventListener('blur', hide)
    document.removeEventListener('pointerleave', hide)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    finePointer.removeEventListener('change', hide)
    reducedMotion.removeEventListener('change', hide)
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <span ref="anchor" hidden aria-hidden="true"></span>
  <Teleport v-if="mounted" to="body">
    <div ref="cursor" class="hero-cursor" aria-hidden="true">
      <i ref="dot" class="hero-cursor-dot"></i>
      <span ref="ring" class="hero-cursor-ring"></span>
    </div>
  </Teleport>
</template>

<style scoped>
:global(.seeconf-hero-cursor-active),
:global(.seeconf-hero-cursor-active *) {
  cursor: none !important;
}

.hero-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s;
}

.hero-cursor.is-visible {
  opacity: 1;
}

.hero-cursor-dot,
.hero-cursor-ring {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

.hero-cursor-dot {
  width: 4px;
  height: 4px;
  background: #111b;
}

.hero-cursor-ring {
  width: 48px;
  height: 48px;
  border: 1px solid #14141425;
}

@media (prefers-reduced-motion: reduce) {
  .hero-cursor {
    display: none;
  }
}
</style>
