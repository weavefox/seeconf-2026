<script setup>
import { exhibitions } from '../data.js'

const sessionCardBg = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/kJUaRo3LirwAAAAAQPAAAAgADiiAQFr/original'

const icons = [
  'M12 2L4 7v10l8 5 8-5V7l-8-5zM12 4.5L18 8v8l-6 3.5L6 16V8l6-3.5z',
  'M4 4h10v10H4V4zm6 6h10v10H10V10z',
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  'M12 2L8 6h2v4H6v2H4l4 4 4-4h-2V6h2l-4-4zm6 8l-4 4 4 4 4-4-4-4z',
  'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
  'M2 6l8 4-8 4V6zm10 0l8 4-8 4V6zm-5 2.5L12 11l5-2.5L12 6 7 8.5z',
  'M12 2C8 6 4 8 4 12a8 8 0 0 0 16 0c0-4-4-6-8-10zm0 4c2 2 4 4 4 6a4 4 0 0 1-8 0c0-2 2-4 4-6z',
  'M3 20h18v-2H3v2zm2-4h2v-6H5v6zm4 0h2V8H9v8zm4 0h2V4h-2v12zm4 0h2v-9h-2V16z',
]
</script>

<template>
  <section id="expo" class="expo">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">EXHIBITION / 2026</span>
        <h2 class="section-title">特色展台</h2>
      </div>

      <div class="expo-grid">
        <div
          v-for="(item, index) in exhibitions"
          :key="index"
          class="expo-card"
          :style="{ backgroundImage: `url(${sessionCardBg})` }"
        >
          <div class="expo-card-overlay">
            <div class="expo-card-top">
              <span class="expo-icon" :class="index % 2 === 0 ? 'icon-blue' : 'icon-red'">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path :d="icons[index % icons.length]" />
                </svg>
              </span>
              <a href="#" class="expo-arrow" aria-label="查看更多">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
            <h3 class="expo-name">{{ item.name }}</h3>
            <p class="expo-desc">{{ item.description }}</p>
          </div>
        </div>
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
  background-size: cover;
  background-position: center;
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
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-blue {
  color: #00ebfa;
  background: rgba(0, 235, 250, 0.1);
}

.icon-red {
  color: #f90b0d;
  background: rgba(249, 11, 13, 0.1);
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
