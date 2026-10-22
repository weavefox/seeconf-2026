<template>
  <canvas ref="canvasRef" class="shader-canvas" :class="{ ready }" :data-renderer="renderer" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const ready = ref(false)
const renderer = ref('waiting')
const emit = defineEmits(['ready-change'])
let dispose = () => {}
let unmounted = false
let idleId, timerId

function setState(state) {
  renderer.value = state
  ready.value = state === 'galacean-watercolor'
  emit('ready-change', ready.value)
}

async function start() {
  if (unmounted) return
  setState('loading')
  try {
    const { mountWatercolor } = await import('../effects/watercolor.js')
    if (unmounted) return
    dispose = mountWatercolor(canvasRef.value, setState)
  } catch (error) {
    if (unmounted) return
    setState('static-error')
    console.error('Watercolor module failed to load:', error)
  }
}

function scheduleStart() {
  if ('requestIdleCallback' in window) {
    idleId = requestIdleCallback(start, { timeout: 2000 })
  } else {
    timerId = setTimeout(start, 0)
  }
}

onMounted(() => {
  // The static homepage and its resources take priority over the optional engine.
  if (document.readyState === 'complete') scheduleStart()
  else window.addEventListener('load', scheduleStart, { once: true })
})

onBeforeUnmount(() => {
  unmounted = true
  window.removeEventListener('load', scheduleStart)
  if (idleId !== undefined) cancelIdleCallback(idleId)
  clearTimeout(timerId)
  dispose()
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

/* Keep the CSS artwork visible until the first complete shader frame. */
.shader-canvas.ready {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .shader-canvas { transition: none; }
}
</style>
