<script setup>
import { ref, computed } from 'vue'
import { sessions, agendaData } from '../data.js'

const activeSession = ref('main')

const avatarRed = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/IKJ3RJtJL_QAAAAAQmAAAAgADiiDAQFr/original'
const avatarBlue = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/iL5aSretd-wAAAAAQbAAAAgADiiDAQFr/original'

const mainCardBg = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/YnoYS6mJZPQAAAAASrAAAAgADiiDAQFr/original'
const topicCardBg1 = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/HJEzSZLc6v8AAAAASeAAAAgADiiDAQFr/original'
const topicCardBg2 = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/h4MnT4QBTVcAAAAAREAAAAgADiiDAQFr/original'

const getCardBg = (index) => {
  if (index === 0) return mainCardBg
  return (index - 1) % 2 === 0 ? topicCardBg1 : topicCardBg2
}

const globalOffset = computed(() => {
  let count = 0
  for (const session of sessions) {
    if (session.id === activeSession.value) break
    count += (agendaData[session.id] || []).length
  }
  return count
})

const currentAgenda = computed(() => {
  return agendaData[activeSession.value] || []
})

const getAvatar = (item, localIndex) => {
  const isBlue = (globalOffset.value + localIndex) % 2 === 0
  if (isBlue) {
    return item.avatarBlue || avatarBlue
  } else {
    return item.avatarRed || avatarRed
  }
}

const getBadgeClass = (localIndex) => {
  return (globalOffset.value + localIndex) % 2 === 0 ? 'badge-blue' : 'badge-red'
}

const selectSession = (id) => {
  activeSession.value = id
}

const isLongDesc = (item) => item.description && item.description.length >= 100

const expandedItems = ref(new Set())
const itemKey = (index) => `${activeSession.value}-${index}`

const isExpanded = (index) => expandedItems.value.has(itemKey(index))

const toggleExpand = (index) => {
  const key = itemKey(index)
  const newSet = new Set(expandedItems.value)
  if (newSet.has(key)) {
    newSet.delete(key)
  } else {
    newSet.add(key)
  }
  expandedItems.value = newSet
}
</script>

<template>
  <section id="agenda" class="agenda">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">AGENDA / 2026</span>
        <h2 class="section-title">会议议程</h2>
      </div>

      <!-- 专题卡片（5张平铺） -->
      <div class="session-cards">
        <div
          v-for="(session, index) in sessions"
          :key="session.id"
          class="session-card"
          :class="{ active: activeSession === session.id }"
          :style="{ backgroundImage: `url(${getCardBg(index)})` }"
          @click="selectSession(session.id)"
        >
          <div class="session-card-overlay">
            <p class="session-type">{{ session.name }}</p>
            <h3 class="session-subtitle">{{ session.subtitle }}</h3>
            <p class="session-producers">
              <span class="producers-label">出品人</span>
              <span class="producers-names">{{ session.producers.join(' / ') }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 纵向 timeline 议程列表 -->
      <div v-if="currentAgenda.length" class="timeline">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in currentAgenda"
          :key="index"
          class="timeline-item"
          :class="{ 'has-desc': isLongDesc(item) }"
        >
          <span class="timeline-badge" :class="getBadgeClass(index)"></span>
          <div v-if="item.time" class="timeline-time-col">
            <p class="timeline-time">{{ item.time }}</p>
          </div>
          <div class="timeline-content">
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p
              v-if="item.description"
              class="timeline-desc"
              :class="{ expanded: isExpanded(index), 'no-clamp': !isLongDesc(item) }"
            >{{ item.description }}</p>
            <button
              v-if="isLongDesc(item)"
              class="desc-toggle"
              @click="toggleExpand(index)"
            >
              {{ isExpanded(index) ? '收起' : '详情' }}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                :style="{ transform: isExpanded(index) ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          <div class="timeline-guest">
            <img
              v-if="item.avatarBlue || item.avatarRed"
              class="guest-avatar"
              :src="getAvatar(item, index)"
              alt="嘉宾头像"
            />
            <div class="guest-meta">
              <strong>{{ item.speaker }}</strong>
              <span v-if="item.speakerTitle">{{ item.speakerTitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agenda {
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
  font-size: 60px;
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.2;
  text-align: left;
}

/* 专题卡片（5张平铺） */
.session-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.session-card {
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.session-card:hover {
  transform: translateY(-3px);
}

.session-card.active {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transform: translateY(-3px);
}

.session-card-overlay {
  width: 100%;
  height: 100%;
  padding: 20px 16px 52px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2px);
  transition: background 0.3s, backdrop-filter 0.3s;
}

.session-card.active .session-card-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.25) 55%, rgba(0, 0, 0, 0) 100%);
  backdrop-filter: none;
}

.session-card:hover:not(.active) .session-card-overlay {
  background: rgba(255, 255, 255, 0.65);
}

.session-card.active .session-type,
.session-card.active .session-subtitle,
.session-card.active .session-producers {
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.session-card.active .producers-label {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.session-card.active .producers-names {
  color: #fff;
}

.session-type {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 6px;
}

.session-subtitle {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 10px;
  line-height: 1.3;
}

.session-producers {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
}

.producers-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.producers-names {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

/* 纵向 timeline */
.timeline {
  position: relative;
  padding: 24px 40px 24px 72px;
  border: 1px solid #d0d0d0;
  border-radius: 20px;
}

.timeline-line {
  position: absolute;
  left: 36px;
  top: 40px;
  bottom: 40px;
  width: 0;
  border-left: 1px dashed #c0c0c0;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 8px 0;
}

.timeline-item.has-desc {
  padding: 14px 0;
}

.timeline-item:not(:last-child) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-badge {
  position: absolute;
  left: -41px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 1;
}

.badge-blue {
  background: #00ebfa;
  box-shadow: 0 0 0 4px rgba(0, 235, 250, 0.12);
}

.badge-red {
  background: #f90b0d;
  box-shadow: 0 0 0 4px rgba(249, 11, 13, 0.12);
}

.timeline-content {
  flex: 1;
}

.timeline-time-col {
  flex-shrink: 0;
  width: 120px;
}

.timeline-time {
  font-size: 16px;
  font-weight: 600;
  color: #888;
  margin: 0;
}

.timeline-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px;
}

.timeline-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: -webkit-line-clamp 0.3s, line-clamp 0.3s;
}

.timeline-desc.no-clamp {
  -webkit-line-clamp: none;
  line-clamp: none;
  overflow: visible;
}

.timeline-desc.expanded {
  -webkit-line-clamp: 99;
  line-clamp: 99;
}

.desc-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.desc-toggle:hover {
  color: var(--color-text);
}

.timeline-guest {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 34px;
}

.guest-avatar {
  width: 160px;
  height: auto;
  border-radius: 16px;
  object-fit: contain;
  flex-shrink: 0;
}

.guest-meta {
  display: flex;
  flex-direction: column;
  width: 160px;
}

.guest-meta strong {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px;
}

.guest-meta span {
  font-size: 14px;
  color: var(--color-text-secondary);
  display: block;
  max-width: 100%;
}

@media (max-width: 1024px) {
  .session-cards { grid-template-columns: repeat(3, 1fr); }
  .session-card { aspect-ratio: 1; }
  .session-card-overlay { padding: 16px 12px 32px; }
  .session-type { font-size: 18px; }
  .session-subtitle { font-size: 24px; }
  .producers-label { font-size: 15px; padding: 2px 6px; }
  .producers-names { font-size: 16px; }
}

@media (max-width: 768px) {
  .agenda { padding: 60px 0; }
  .section-title { font-size: 40px; }
  .session-cards { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .session-card { aspect-ratio: 3 / 4; }
  .session-card-overlay { padding: 14px 10px 44px; }
  .session-type { font-size: 14px; }
  .session-subtitle { font-size: 19px; margin-bottom: 6px; }
  .producers-label { font-size: 12px; padding: 2px 5px; }
  .producers-names { font-size: 13px; }
  .timeline-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .timeline-guest {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .section-title { font-size: 30px; }
  .session-cards { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .session-card { aspect-ratio: 3 / 4; }
  .session-card-overlay { padding: 12px 8px 36px; }
  .session-type { font-size: 13px; }
  .session-subtitle { font-size: 17px; margin-bottom: 5px; }
  .producers-label { font-size: 11px; padding: 1px 4px; }
  .producers-names { font-size: 12px; }
  .session-card.active {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}
</style>
