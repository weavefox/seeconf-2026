<script setup>
import { partners } from '../data.js'

const duplicatedPartners = [...partners, ...partners]
</script>

<template>
  <section id="partners" class="partners">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">PARTNERS / 2026</span>
        <h2 class="section-title">合作伙伴</h2>
      </div>
    </div>

    <div class="marquee">
      <div class="marquee-track">
        <component
          :is="partner.link ? 'a' : 'div'"
          v-for="(partner, index) in duplicatedPartners"
          :key="index"
          :href="partner.link || undefined"
          :target="partner.link ? '_blank' : undefined"
          rel="noopener"
          :class="['partner-card', { 'partner-card--wide': partner.hideName }]"
        >
          <div class="partner-logo">
            <img :src="partner.logo" :alt="partner.name" />
          </div>
          <p v-if="!partner.hideName" class="partner-name">{{ partner.name }}</p>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  padding: 42px 0;
  background: #fff;
  overflow: visible;
}

.section-header {
  text-align: left;
  margin-bottom: 24px;
}

.section-tag {
  display: block;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--color-text);
  margin-bottom: 12px;
}

.section-title {
  font-size: 90px;
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.2;
  text-align: left;
}

.marquee {
  width: 100%;
  overflow: hidden;
  padding: 10px 0;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 16px;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.partner-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-shrink: 0;
  width: 280px;
  padding: 20px 32px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
}

.partner-card:hover {
  transform: scale(1.05);
}

.partner-logo {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.partner-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.partner-card--wide .partner-logo {
  width: auto;
}

.partner-card--wide .partner-logo img {
  width: auto;
  max-width: 200px;
}

.partner-name {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
}

.partner-card:hover .partner-name {
  color: var(--color-text);
}

@media (max-width: 768px) {
  .partners { padding: 60px 0; }
  .section-title { font-size: 48px; }
}

@media (max-width: 480px) {
  .section-title { font-size: 36px; }
}
</style>
