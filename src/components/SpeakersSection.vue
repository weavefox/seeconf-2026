<script setup>
import { speakers } from '../data.js'

const avatarRed = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/IKJ3RJtJL_QAAAAAQmAAAAgADiiDAQFr/original'
const avatarBlue = 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/iL5aSretd-wAAAAAQbAAAAgADiiDAQFr/original'

const getAvatar = (index) => {
  const row = Math.floor(index / 4)
  const col = index % 4
  return (row + col) % 2 === 0 ? avatarBlue : avatarRed
}

const formatBio = (speaker) => {
  if (speaker.company && speaker.title) {
    return `${speaker.company} · ${speaker.title}`
  }
  return speaker.company || speaker.title || ''
}
</script>

<template>
  <section id="speakers" class="speakers">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">SPEAKERS / 2026</span>
        <h2 class="section-title">分享嘉宾</h2>
      </div>

      <div class="speakers-grid">
        <div
          v-for="(speaker, index) in speakers"
          :key="index"
          class="speaker-card"
        >
          <img
            class="speaker-avatar"
            :src="getAvatar(index)"
            alt="嘉宾头像"
          />
          <p class="speaker-name">
            <span>嘉宾姓名</span>
            <span class="speaker-nickname">花名</span>
          </p>
          <p class="speaker-bio">所在机构 · 职务</p>
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
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  text-align: left;
}

/* 讲者卡片 */
.speakers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  row-gap: 4px;
}

.speaker-card {
  transition: transform 0.3s;
}

.speaker-card:hover {
  transform: translateY(-4px);
}

.speaker-avatar {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: contain;
  display: block;
  border-radius: 20px;
}

.speaker-name {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text);
  margin: -8px 0 4px 36px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.speaker-nickname {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.speaker-bio {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 0 36px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .speakers-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .speakers { padding: 60px 0; }
  .section-title { font-size: 28px; }
  .speakers-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .speaker-name { font-size: 16px; }
  .speaker-avatar { border-radius: 16px; }
}

@media (max-width: 480px) {
  .speakers-grid {
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .speaker-card {
    max-width: 280px;
    text-align: center;
  }
  .speaker-name {
    justify-content: center;
  }
}
</style>
