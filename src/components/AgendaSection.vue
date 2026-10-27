<script setup>
import { ref, computed } from 'vue'
import { sessions, agendaData } from '../data.js'

const activeSession = ref('main')

const avatarRed = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/IKJ3RJtJL_QAAAAAQmAAAAgADiiDAQFr/original'
const avatarBlue = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/iL5aSretd-wAAAAAQbAAAAgADiiDAQFr/original'
const sessionCardBg = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/kJUaRo3LirwAAAAAQPAAAAgADiiDAQFr/original'

const getAvatar = (index) => {
  return index % 2 === 0 ? avatarBlue : avatarRed
}

const currentAgenda = computed(() => {
  return agendaData[activeSession.value] || []
})

const selectSession = (id) => {
  activeSession.value = id
}

const sessionSliderRef = ref(null)
const sliderProgress = ref(0)
const sliderRatio = ref(0)

const updateSliderProgress = () => {
  const el = sessionSliderRef.value
  if (!el) return
  const maxScroll = el.scrollWidth - el.clientWidth
  sliderProgress.value = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0
  sliderRatio.value = maxScroll > 0 ? el.clientWidth / el.scrollWidth : 1
}

const onSliderScroll = () => {
  updateSliderProgress()
}

const scrollSessionsNext = () => {
  if (sessionSliderRef.value) {
    sessionSliderRef.value.scrollBy({ left: 560, behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="agenda" class="agenda">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">AGENDA / 2026</span>
        <h2 class="section-title">会议议程</h2>
      </div>

      <!-- 专场卡片选择 + 右箭头 -->
      <div class="session-wrapper">
        <div ref="sessionSliderRef" class="session-cards" @scroll="onSliderScroll">
          <div
            v-for="session in sessions"
            :key="session.id"
            class="session-card"
            :class="{ active: activeSession === session.id }"
            :style="{ backgroundImage: `url(${sessionCardBg})` }"
            @click="selectSession(session.id)"
          >
            <div class="session-card-overlay">
              <p class="session-type">{{ session.name }}</p>
              <h3 class="session-subtitle">{{ session.subtitle }}</h3>
            </div>
          </div>
        </div>
        <div class="slider-indicator">
          <div class="slider-track">
            <div
              class="slider-thumb"
              :style="{ left: `${sliderProgress * (1 - sliderRatio)}%`, width: `${sliderRatio * 100}%` }"
            ></div>
          </div>
        </div>
        <button class="session-arrow" @click="scrollSessionsNext" aria-label="向右滚动">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <!-- 纵向 timeline 议程列表 -->
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
  font-size: 90px;
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.2;
  text-align: left;
}

/* 专场卡片 + 箭头 */
.session-wrapper {
  position: relative;
  margin-bottom: 48px;
}

.session-cards {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 4px 4px 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.session-cards::-webkit-scrollbar {
  display: none;
}

.session-card {
  flex-shrink: 0;
  width: 300px;
  aspect-ratio: 1;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.session-card:hover {
  transform: translateY(-2px);
}

.session-card.active {
  box-shadow: 0 0 0 1px #1a1a1a;
}

.session-card.active .session-card-overlay {
  background: rgba(255, 255, 255, 0.85);
}

.session-card.active .session-type,
.session-card.active .session-subtitle {
  color: var(--color-text);
}

.session-card-overlay {
  width: 100%;
  height: 100%;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  transition: background 0.3s;
}

.session-card:hover .session-card-overlay {
  background: rgba(255, 255, 255, 0.75);
}

.live-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  background: #f3584c;
  padding: 2px 8px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.session-type {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin: 0 0 4px;
}

.session-subtitle {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

/* 右箭头 */
.session-arrow {
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 10;
  border: none;
  flex-shrink: 0;
}

.session-arrow:hover {
  background: #333;
  transform: translateY(-50%) scale(1.1);
}

/* slider 指示器 */
.slider-indicator {
  width: 100%;
  margin-top: 30px;
}

.slider-track {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.slider-thumb {
  position: absolute;
  top: 0;
  height: 100%;
  border-radius: 2px;
  background: #1a1a1a;
  transition: left 0.2s ease, width 0.2s ease;
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

@media (max-width: 768px) {
  .agenda { padding: 60px 0; }
  .section-title { font-size: 48px; }
  .session-cards { gap: 12px; }
  .session-card { width: 160px; }
  .session-arrow { width: 40px; height: 40px; right: -8px; }
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
  .section-title { font-size: 36px; }
}
</style>
