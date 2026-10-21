<script setup>
import TheNavbar from './components/TheNavbar.vue'
import HeroBanner from './components/HeroBanner.vue'
import AgendaSection from './components/AgendaSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import ExpoSection from './components/ExpoSection.vue'
import GuideSection from './components/GuideSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="app">
    <TheNavbar />
    <main>
      <HeroBanner />
      <!-- <SpeakersSection /> -->
      <!-- <AgendaSection /> -->
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
</style>
