<script setup>
import { exhibitions } from '../data.js'
</script>

<template>
  <section id="expo" class="expo">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">EXHIBITION / 2026</span>
        <h2 class="section-title">特色展台</h2>
      </div>

      <div class="expo-grid">
        <component
          :is="item.link ? 'a' : 'div'"
          v-for="(item, index) in exhibitions"
          :key="index"
          :href="item.link || undefined"
          :target="item.link ? '_blank' : undefined"
          :rel="item.link ? 'noopener' : undefined"
          class="expo-card"
        >
          <div class="expo-card-overlay">
            <div class="expo-card-top">
              <span class="expo-icon">
                <img v-if="item.logo" :src="item.logo" :alt="item.name" class="expo-logo" />
                <svg v-else viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="icons[index % icons.length]" />
                </svg>
              </span>
              <span v-if="item.link" class="expo-arrow" aria-label="查看更多">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </div>
            <h3 class="expo-name">{{ item.name }}</h3>
            <p class="expo-desc">{{ item.description }}</p>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expo {
  padding: 42px 0;
  background: #fff;
}

.section-header {
  text-align: left;
  margin-bottom: 16px;
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

.expo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  row-gap: 20px;
}

.expo-card {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  transition: transform 0.3s;
}

.expo-card:hover {
  transform: translateY(-4px);
}

.expo-card-overlay {
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  min-height: 120px;
}

.expo-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.expo-icon {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.expo-logo {
  height: 48px;
  width: auto;
  object-fit: contain;
}

.icon-blue {
  color: var(--color-text-secondary);
  background: transparent;
}

.icon-red {
  color: var(--color-text-secondary);
  background: transparent;
}

.expo-arrow {
  color: #999;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.expo-card:hover .expo-arrow {
  color: #1a1a1a;
  transform: translate(2px, -2px);
}

.expo-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 6px;
}

.expo-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .expo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .expo { padding: 60px 0; }
  .section-title { font-size: 48px; }
  .expo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .section-title { font-size: 36px; }
  .expo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
