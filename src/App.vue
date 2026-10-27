<script setup>
import { useHead } from '@unhead/vue'
import TheNavbar from './components/TheNavbar.vue'
import HeroBanner from './components/HeroBanner.vue'
import AgendaSection from './components/AgendaSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import ExpoSection from './components/ExpoSection.vue'
import GuideSection from './components/GuideSection.vue'
import TheFooter from './components/TheFooter.vue'

useHead({
  htmlAttrs: { lang: 'zh-CN' },
})
</script>

<template>
  <div class="app">
    <TheNavbar />
    <main>
      <HeroBanner />
      <SpeakersSection />
      <div class="section-divider"></div>
      <AgendaSection />
      <!-- <ExpoSection /> -->
      <GuideSection />
    </main>
    <TheFooter />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
}

.section-divider {
  width: 100%;
  height: 18px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 20px 6px rgba(255, 255, 255, 0.9), 0 0 40px 12px rgba(220, 220, 220, 0.3);
  filter: blur(1px);
}
</style>
