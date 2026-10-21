<script setup>
import { ref } from 'vue'
import { mainAgenda, sessionAgenda, sessions } from '../data.js'

const activeTab = ref('main')

const switchTab = (id) => {
  activeTab.value = id
}

const currentAgenda = ref(mainAgenda)

const getCurrentAgenda = () => {
  if (activeTab.value === 'main') return mainAgenda
  return sessionAgenda[activeTab.value] || []
}

const tabList = [
  { id: 'main', name: '主会场' },
  ...sessions.map(s => ({ id: s.id, name: s.name, icon: s.icon, color: s.color }))
]
</script>

<template>
  <section id="agenda" class="agenda">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">AGENDA</span>
        <h2 class="section-title">日程安排</h2>
        <p class="section-subtitle">2026年11月22日 · 中国·杭州</p>
      </div>

      <div class="tabs">
        <button
          v-for="tab in tabList"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
          <span>{{ tab.name }}</span>
        </button>
      </div>

      <!-- 主会场日程 -->
      <div v-if="activeTab === 'main'" class="timeline">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in getCurrentAgenda()"
          :key="index"
          class="timeline-item"
          :class="{ keynote: item.isKeynote, break: item.isBreak }"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-time">{{ item.time }}</div>
          <div class="timeline-card">
            <div class="card-header">
              <h3 class="card-title">{{ item.title }}</h3>
              <span v-if="item.isKeynote" class="badge-keynote">Keynote</span>
              <span v-if="item.isBreak" class="badge-break">Break</span>
            </div>
            <div v-if="item.speaker" class="card-speaker">
              <span class="speaker-name">{{ item.speaker }}</span>
              <span v-if="item.company" class="speaker-company">{{ item.company }}</span>
            </div>
            <p v-if="item.description" class="card-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- 分会场日程 -->
      <div v-else class="session-agenda">
        <div
          v-for="(item, index) in getCurrentAgenda()"
          :key="index"
          class="agenda-card"
        >
          <div class="agenda-time">{{ item.time }}</div>
          <div class="agenda-body">
            <h3 class="agenda-title">{{ item.title }}</h3>
            <div class="agenda-speaker">
              <span class="speaker-name">{{ item.speaker }}</span>
              <span v-if="item.company" class="speaker-company">· {{ item.company }}</span>
            </div>
            <p class="agenda-desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agenda {
  padding: 100px 0;
  background: linear-gradient(180deg, #f4f4f4 0%, #fff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
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

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  border-radius: 48px;
  background: #fff;
  border: 1px solid #e0e0e0;
  transition: all 0.3s;
}

.tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.tab.active {
  color: #fff;
  background: linear-gradient(90deg, #0f83d3, #f3584c);
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(243, 88, 76, 0.3);
}

.tab-icon {
  font-size: 16px;
}

/* 主会场时间轴 */
.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-left: 24px;
}

.timeline-line {
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, #0f83d3, #f3584c, #12a7df);
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -21px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--color-primary);
  z-index: 1;
}

.timeline-item.keynote .timeline-dot {
  border-color: #f3584c;
  background: linear-gradient(135deg, #0f83d3, #f3584c);
}

.timeline-item.break .timeline-dot {
  border-color: #f3584c;
  background: #f3584c;
}

.timeline-time {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.timeline-card {
  padding: 20px 24px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.timeline-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateX(4px);
}

.timeline-item.keynote .timeline-card {
  border-left: 4px solid #f3584c;
  background: linear-gradient(135deg, #fff 0%, #fff5f3 100%);
}

.timeline-item.break .timeline-card {
  border-left: 4px solid #f3584c;
  background: linear-gradient(135deg, #fff 0%, #fff5f3 100%);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  flex: 1;
}

.badge-keynote {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, #0f83d3, #f3584c);
  color: #fff;
  white-space: nowrap;
}

.badge-break {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 6px;
  background: #f3584c;
  color: #fff;
  white-space: nowrap;
}

.card-speaker {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.speaker-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.speaker-company {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.card-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 分会场卡片 */
.session-agenda {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.agenda-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.agenda-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateX(4px);
}

.agenda-time {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  min-width: 120px;
}

.agenda-body {
  flex: 1;
}

.agenda-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.agenda-speaker {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.agenda-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .agenda { padding: 60px 0; }
  .section-title { font-size: 28px; }
  .tabs { gap: 8px; }
  .tab { padding: 8px 16px; font-size: 13px; }
  .timeline { padding-left: 12px; }
  .timeline-item { padding-left: 28px; }
  .timeline-dot { left: -17px; width: 12px; height: 12px; }
  .timeline-card { padding: 16px; }
  .card-title { font-size: 15px; }
  .agenda-card {
    flex-direction: column;
    gap: 8px;
    padding: 16px;
  }
  .agenda-time { min-width: auto; }
}
</style>
