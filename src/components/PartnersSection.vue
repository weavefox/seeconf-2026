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
        <div
          v-for="(partner, index) in duplicatedPartners"
          :key="index"
          class="partner-card"
        >
          <div class="partner-logo">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
          <p class="partner-name">{{ partner.name }}</p>
        </div>
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
  overflow: visible;
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
  animation-duration: 120s;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.partner-card {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  padding: 20px 32px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.partner-card:hover {
  transform: scale(1.15);
}

.partner-logo {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.partner-card:hover .partner-logo {
  background: #eee;
  color: var(--color-text);
}

.partner-name {
  font-size: 18px;
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
