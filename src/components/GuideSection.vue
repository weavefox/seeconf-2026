<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const mapDesktop = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/0qPGRJO8Ge0AAAAAgCAAAAgADiiDAQFr/original'
const mapMobile = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/8yoKTYkxXoMAAAAAccAAAAgADiiDAQFr/original'

const transportInfo = [
  {
    iconType: 'metro',
    title: '地铁',
    list: [
      '3 号线 • 古墩路站C口',
      '地下通道向南 500 米 3 号口',
      'A 空间 2 号楼 1 楼大厅',
    ],
  },
  {
    iconType: 'taxi',
    title: '乘车',
    list: [
      '蚂蚁 A 空间 2 号门',
      '或接送客平台访客区停车场',
    ],
  },
  {
    iconType: 'car',
    title: '自驾',
    list: [
      '美帆广场',
      '建议优先选择公共交通'
    ]
  },
]
</script>

<template>
  <section id="guide" class="guide">
    <div class="container">
      <div class="guide-layout">
        <div class="guide-left">
          <div class="guide-left-inner">
            <p class="guide-time">9:00-9:20</p>
            <p class="guide-reminder">打印访客证 · 领取大会出行牌</p>
            <h2 class="guide-hero-title">相聚，<br>现场见</h2>
          </div>
        </div>

        <div class="guide-right">
          <a href="https://ditu.amap.com/ssr/place/B0GKN4522Z?id=B0GKN4522Z&maxHeight=800&mapOverviewRectPadding=%5Bobject%20Object%5D&fixedCloseButton=true&onlyShowSearchBar=true&hideDivider=true&fillInputFromParamsField=name&name=%E8%9A%82%E8%9A%81A%E7%A9%BA%E9%97%B4" target="_blank" rel="noopener">
            <img :src="isMobile ? mapMobile : mapDesktop" alt="蚂蚁A空间地图" class="guide-map" />
          </a>
        </div>
      </div>

      <div class="transport-grid">
        <div v-for="item in transportInfo" :key="item.title" class="transport-card">
          <div class="transport-header">
            <span class="transport-icon">
              <svg v-if="item.iconType === 'metro'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="3" width="14" height="13" rx="3"/>
                <line x1="5" y1="9" x2="19" y2="9"/>
                <line x1="12" y1="3" x2="12" y2="9"/>
                <circle cx="9" cy="13" r="0.5" fill="currentColor" stroke="none"/>
                <circle cx="15" cy="13" r="0.5" fill="currentColor" stroke="none"/>
                <path d="M7 16l-2 4"/>
                <path d="M17 16l2 4"/>
              </svg>
              <svg v-else-if="item.iconType === 'taxi'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 2h4"/>
                <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/>
                <path d="M7 14h.01"/>
                <path d="M17 14h.01"/>
                <rect width="18" height="8" x="3" y="10" rx="2"/>
                <path d="M5 18v2"/>
                <path d="M19 18v2"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/>
                <path d="M9 17h6"/>
                <circle cx="17" cy="17" r="2"/>
              </svg>
            </span>
            <h3 class="transport-title">{{ item.title }}</h3>
          </div>
          <p class="transport-desc">{{ item.desc }}</p>
          <ul v-if="item.list" class="transport-list">
            <li v-for="(li, i) in item.list" :key="i">{{ li }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guide {
  padding: 100px 0 48px;
  background: #fff;
}

.guide-layout {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 64px;
  align-items: stretch;
  justify-content: space-between;
}

.guide-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.guide-hero-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 600;
  color: #121212;
  line-height: 1.2;
  margin: 0 0 12px;
}

.guide-hero-desc {
  font-size: clamp(16px, 1.8vw, 24px);
  font-weight: 400;
  color: rgba(18, 18, 18, 0.5);
  margin: 0;
}

.guide-time {
  font-size: clamp(12px, 1vw, 15px);
  font-weight: 400;
  color: rgba(18, 18, 18, 0.75);
  margin: 0 0 4px;
}

.guide-reminder {
  font-size: clamp(11px, 0.85vw, 13px);
  font-weight: 400;
  color: rgba(18, 18, 18, 0.45);
  margin: 0 0 16px;
}

.guide-right {
  display: flex;
  align-items: center;
}

.guide-right a {
  display: block;
  width: 100%;
}

.guide-map {
  width: 100%;
  max-width: 1800px;
  height: 250px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid rgba(18, 18, 18, 0.1);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.guide-notice {
  margin-top: 0;
  margin-bottom: 48px;
  text-align: center;
}

.guide-notice p {
  font-size: clamp(12px, 1vw, 15px);
  color: rgba(18, 18, 18, 0.5);
  line-height: 1.7;
  margin: 0;
}

.guide-notice strong {
  font-weight: 400;
  color: rgba(18, 18, 18, 0.75);
}

.transport-grid {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 40px;
  justify-content: space-between;
}

.transport-card {
  padding-top: 0;
}

.transport-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.transport-icon {
  display: flex;
  align-items: center;
  color: rgba(18, 18, 18, 0.4);
}

.transport-title {
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  color: #121212;
  margin: 0;
}

.transport-desc {
  font-size: clamp(12px, 0.9vw, 14px);
  color: rgba(18, 18, 18, 0.5);
  line-height: 1.7;
  margin: 0;
}

.transport-list {
  margin-top: 6px;
  padding-left: 0;
  list-style: none;
}

.transport-list li {
  font-size: clamp(12px, 0.9vw, 14px);
  color: rgba(18, 18, 18, 0.5);
  line-height: 1.7;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .guide { padding: 30px 0; }
  .container {
    padding: 0 8%;
  }
  .guide-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .guide-map {
    max-width: 100%;
  }
  .transport-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
