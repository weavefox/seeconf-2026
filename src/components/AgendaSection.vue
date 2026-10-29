<script setup>
import { ref, computed } from 'vue'
import { sessions, agendaData } from '../data.js'

const activeSession = ref('main')

const avatarRed = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/IKJ3RJtJL_QAAAAAQmAAAAgADiiDAQFr/original'
const avatarBlue = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/iL5aSretd-wAAAAAQbAAAAgADiiDAQFr/original'

const mainCardBg = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/YnoYS6mJZPQAAAAASrAAAAgADiiDAQFr/original'
const topicCardBg1 = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/HJEzSZLc6v8AAAAASeAAAAgADiiDAQFr/original'
const topicCardBg2 = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/h4MnT4QBTVcAAAAAREAAAAgADiiDAQFr/original'

const getAvatar = (index) => {
  return index % 2 === 0 ? avatarBlue : avatarRed
}

const getCardBg = (index) => {
  if (index === 0) return mainCardBg
  return (index - 1) % 2 === 0 ? topicCardBg1 : topicCardBg2
}

const currentAgenda = computed(() => {
  return agendaData[activeSession.value] || []
})

const selectSession = (id) => {
  activeSession.value = id
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

      <!-- 纵向 timeline 议程列表
      <div class="timeline">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in currentAgenda"
          :key="index"
          class="timeline-item"
        >
          <span class="timeline-badge" :class="index % 2 === 0 ? 'badge-blue' : 'badge-red'"></span>
          <div class="timeline-time-col">
            <p class="timeline-time">{{ item.time }}</p>
          </div>
          <div class="timeline-content">
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-desc">{{ item.description }}</p>
          </div>
          <div class="timeline-guest">
            <img
              class="guest-avatar"
              :src="getAvatar(index)"
              alt="嘉宾头像"
            />
            <div class="guest-meta">
              <strong>{{ item.speaker }}</strong>
              <span v-if="item.speakerTitle">{{ item.speakerTitle }}</span>
            </div>
          </div>
        </div>
      </div> -->
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
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.session-card {
  flex: 1;
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
  padding: 12px 40px 12px 72px;
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
}

@media (max-width: 1024px) {
  .session-card { aspect-ratio: 1; }
  .session-subtitle { font-size: 16px; }
}

@media (max-width: 768px) {
  .agenda { padding: 60px 0; }
  .section-title { font-size: 40px; }
  .session-cards { gap: 10px; }
  .session-card { aspect-ratio: 3 / 4; }
  .session-card-overlay { padding: 14px 10px; }
  .session-type { font-size: 13px; }
  .session-subtitle { font-size: 16px; }
  .producers-label { font-size: 11px; padding: 1px 4px; }
  .producers-names { font-size: 12px; }
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
  .session-subtitle { font-size: 14px; }
}
</style>
