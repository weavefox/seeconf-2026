<script setup>
import { ref, computed } from 'vue'
import { speakers, producers, sessions } from '../data.js'

const activeFilter = ref('all')

const filterTabs = computed(() => [
  { id: 'all', name: '全部讲者' },
  ...sessions.map(s => ({ id: s.id, name: s.name })),
])

const filteredSpeakers = computed(() => {
  if (activeFilter.value === 'all') return speakers
  return speakers.filter(s => s.session === activeFilter.value)
})

const scrollToAgenda = () => {
  const el = document.getElementById('agenda')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

// 生成头像首字母
const getInitials = (name) => {
  if (!name) return '?'
  return name.charAt(0)
}

// 根据名字生成头像颜色
const getAvatarColor = (name) => {
  const colors = ['#0f83d3', '#f3584c', '#12a7df', '#f39c8c', '#29bae5', '#c7e7ef', '#f3584c', '#0f83d3']
  if (!name) return colors[0]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}
</script>

<template>
  <section id="speakers" class="speakers">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">SPEAKERS</span>
        <h2 class="section-title">分享嘉宾</h2>
        <p class="section-subtitle">来自蚂蚁集团与行业顶尖企业的技术专家，分享前沿实践经验</p>
      </div>

      <!-- 出品人板块 -->
      <div class="producers">
        <h3 class="block-title">
          <span class="block-icon">⭐</span>
          大会出品人
        </h3>
        <div class="producers-grid">
          <div v-for="p in producers" :key="p.name" class="producer-card">
            <div class="producer-avatar" :style="{ background: getAvatarColor(p.name) }">
              {{ getInitials(p.name) }}
            </div>
            <div class="producer-info">
              <div class="producer-name">{{ p.name }}</div>
              <div class="producer-title">{{ p.title }}</div>
              <div class="producer-company">{{ p.company }}</div>
              <div class="producer-role">{{ p.session }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 讲者筛选 -->
      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          class="filter-tab"
          :class="{ active: activeFilter === tab.id }"
          @click="activeFilter = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- 讲者卡片列表 -->
      <div class="speakers-grid">
        <div
          v-for="speaker in filteredSpeakers"
          :key="speaker.name"
          class="speaker-card"
          @click="scrollToAgenda"
        >
          <div class="speaker-avatar" :style="{ background: getAvatarColor(speaker.name) }">
            {{ getInitials(speaker.name) }}
            <div class="avatar-decoration"></div>
          </div>
          <div class="speaker-info">
            <div class="speaker-name-row">
              <span class="speaker-name">{{ speaker.name }}</span>
              <span v-if="speaker.nickname" class="speaker-nickname">{{ speaker.nickname }}</span>
            </div>
            <div class="speaker-title">{{ speaker.title }}</div>
            <div class="speaker-company">{{ speaker.company }}</div>
            <div class="speaker-session-tag">
              {{ sessions.find(s => s.id === speaker.session)?.name || '主会场' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.speakers {
  padding: 100px 0;
  background: #fff;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-tag {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.section-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--color-text);
}

.section-subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin-top: 12px;
}

/* 出品人板块 */
.producers {
  margin-bottom: 60px;
  padding: 40px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f4f4f4 0%, #f0f0f0 100%);
  border: 1px solid #f0f0f0;
}

.block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.block-icon {
  font-size: 24px;
}

.producers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.producer-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.producer-avatar {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.producer-info {
  flex: 1;
}

.producer-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.producer-title {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 2px;
}

.producer-company {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.producer-role {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background: rgba(18, 167, 223, 0.06);
  padding: 2px 8px;
  border-radius: 6px;
  display: inline-block;
}

/* 筛选标签 */
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
}

.filter-tab {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-radius: 48px;
  background: #f5f5f5;
  border: none;
  transition: all 0.3s;
}

.filter-tab:hover {
  background: #e8e8e8;
  color: var(--color-text);
}

.filter-tab.active {
  color: #fff;
  background: linear-gradient(90deg, #0f83d3, #f3584c);
  box-shadow: 0 2px 8px rgba(243, 88, 76, 0.3);
}

/* 讲者卡片 */
.speakers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.speaker-card {
  cursor: pointer;
  transition: all 0.3s;
}

.speaker-card:hover {
  transform: translateY(-4px);
}

.speaker-avatar {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  overflow: visible;
}

.avatar-decoration {
  position: absolute;
  bottom: -12px;
  right: -12px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f83d3, #f3584c);
  opacity: 0.9;
}

.speaker-card:hover .avatar-decoration {
  transform: scale(1.1);
  transition: transform 0.3s;
}

.speaker-info {
  max-width: 200px;
}

.speaker-name-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}

.speaker-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
}

.speaker-nickname {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.speaker-title {
  font-size: 13px;
  color: var(--color-text);
  margin-bottom: 2px;
}

.speaker-company {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.speaker-session-tag {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  background: rgba(15, 131, 211, 0.08);
  padding: 2px 8px;
  border-radius: 6px;
  display: inline-block;
}

@media (max-width: 1024px) {
  .speakers-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .producers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .speakers { padding: 60px 0; }
  .section-title { font-size: 28px; }
  .producers { padding: 24px; }
  .producers-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .speakers-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .speaker-avatar {
    width: 140px;
    height: 140px;
    font-size: 48px;
  }
  .speaker-name { font-size: 16px; }
}

@media (max-width: 480px) {
  .speakers-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .speaker-info { text-align: center; }
  .speaker-name-row { justify-content: center; }
}
</style>
