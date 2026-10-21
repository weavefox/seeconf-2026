<template>
  <canvas ref="canvasRef" class="shader-canvas" :class="{ ready }" :data-renderer="renderer" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref(null)
const ready = ref(false)
const renderer = ref('loading')
let dispose = () => {}
let unmounted = false

onMounted(async () => {
  try {
    const { mountWatercolor } = await import('../effects/watercolor.js')
    if (unmounted) return
    dispose = mountWatercolor(canvasRef.value, state => {
      renderer.value = state
      ready.value = state === 'galacean-watercolor'
    })
  } catch (error) {
    if (unmounted) return
    renderer.value = 'static-error'
    console.error('Watercolor module failed to load:', error)
  }
})

onBeforeUnmount(() => {
  unmounted = true
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
