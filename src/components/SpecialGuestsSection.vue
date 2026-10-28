<script setup>
import { specialGuests } from '../data.js'

const getAvatar = (index) => {
  const row = Math.floor(index / 4)
  const col = index % 4
  const isBlue = (row + col) % 2 === 0
  const guest = specialGuests[index]
  return isBlue ? guest.avatarBlue : guest.avatarRed
}
</script>

<template>
  <section id="guests" class="guests">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">GUESTS / 2026</span>
        <h2 class="section-title">特邀嘉宾</h2>
      </div>

      <div class="guests-grid">
        <div
          v-for="(guest, index) in specialGuests"
          :key="index"
          class="guest-card"
        >
          <img
            class="guest-avatar"
            :src="getAvatar(index)"
            alt="特邀嘉宾头像"
          />
          <p class="guest-name">
            <span>{{ guest.name }}</span>
            <span class="guest-nickname">{{ guest.nickname }}</span>
          </p>
          <p class="guest-bio">{{ guest.title }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guests {
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

.guests-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  row-gap: 0;
}

.guest-card {
  transition: transform 0.3s;
}

.guest-card:hover {
  transform: translateY(-4px);
}

.guest-avatar {
  width: 100%;
  width: 100%;
  aspect-ratio: 3.2/3;
  object-fit: contain;
  display: block;
  border-radius: 20px;
}

.guest-name {
  font-size: 20px;
  font-weight: 500;
  color: var(--color-text);
  margin: -8px 0 4px 36px;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.guest-nickname {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.guest-bio {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 0 36px;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .guests-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .guests { padding: 60px 0; }
  .section-title { font-size: 40px; }
  .guests-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .guest-name { font-size: 16px; }
  .guest-avatar { border-radius: 16px; }
}

@media (max-width: 480px) {
  .section-title { font-size: 30px; }
  .guests-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .guest-name {
    margin-left: 16px;
    font-size: 14px;
  }
  .guest-bio {
    margin-left: 16px;
    font-size: 12px;
  }
}
</style>
