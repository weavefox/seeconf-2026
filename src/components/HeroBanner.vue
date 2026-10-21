<script setup>
import { conferenceInfo } from '../data.js'
import ShaderCanvas from './ShaderCanvas.vue'

const scrollTo = (anchor) => {
  const el = document.getElementById(anchor)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const titleParts = [conferenceInfo.title.slice(0, 6), conferenceInfo.title.slice(6)]
</script>

<template>
  <section id="hero" class="hero">
    <ShaderCanvas />
    <!-- Main hero text -->
    <div class="hero-title">
      <h1><span class="h1-word">SEE</span> <span class="h1-word">Conf</span></h1>
      <div class="hero-text-body">
        <p class="hero-name">
          <span v-for="(part, i) in titleParts" :key="i" class="hero-name-part">{{ part }}</span>
        </p>
        <p class="hero-description">{{ conferenceInfo.slogan }}</p>
      </div>
      <a class="hero-buy-btn" href="https://www.bagevent.com/event/SEEConf2026" target="_blank" rel="noopener">预约购票<span class="btn-arrow">↗</span></a>
      <p class="hero-date"><span class="date-loc">杭州 · 蚂蚁 A 空间</span><span class="date-sep"> / </span>{{ conferenceInfo.date }}</p>
    </div>

    <div class="hero-scroll-hint" @click="scrollTo('agenda')">
      <span>向下滚动探索</span>
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f6f6f6 url('https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Yqq2SbdCWdQAAAAAZRAAAAgADiiDAQFr/original') center / cover no-repeat;
}

/* Hero title group — left-positioned, matching the reference page */
.hero-title {
  position: absolute;
  z-index: 3;
  left: 10%;
  top: 26%;
  pointer-events: none;
}

.hero-title h1 {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-synthesis: none;
  font-size: clamp(80px, 12.3vw, 244px);
  line-height: 1;
  letter-spacing: -0.2vw;
  margin: 0;
  white-space: nowrap;
  color: #121212;
}

.hero-text-body {
  display: block;
  width: fit-content;
}

.hero-name {
  font-size: clamp(24px, 3.6vw, 70px);
  font-weight: 600;
  letter-spacing: 0.1vw;
  line-height: 1.4;
  margin: 22px 0 8px;
  white-space: nowrap;
  color: #121212;
}

.hero-description {
  font-size: clamp(11px, 1.35vw, 27px);
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
  text-align-last: justify;
  color: #000;
}

.hero-buy-btn {
  display: inline-block;
  margin-top: 38px;
  padding: 11px 50px;
  vertical-align: middle;
  font-size: clamp(15px, 1.3vw, 20px);
  font-weight: 400;
  line-height: 1.4;
  color: #fff;
  border: 1px solid #121212;
  border-radius: 48px;
  background: #121212;
  transition: all 0.3s;
  pointer-events: auto;
}

.hero-buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.btn-arrow {
  font-size: 1.4em;
  line-height: 0;
  margin-left: 8px;
  position: relative;
  top: 2px;
}

.hero-date {
  font-size: clamp(11px, 0.9vw, 14px);
  font-weight: 500;
  letter-spacing: 0.05vw;
  color: rgba(18, 18, 18, 0.5);
  margin: 0;
  vertical-align: middle;
  margin-left: 5px;
  margin-top: 12px;
}

.hero-scroll-hint {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 10;
  color: rgba(18, 18, 18, 0.4);
  font-size: 12px;
}

.scroll-arrow {
  width: 20px;
  height: 32px;
  border: 1px solid rgba(18, 18, 18, 0.15);
  border-radius: 12px;
  position: relative;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: rgba(18, 18, 18, 0.35);
  animation: scroll-down 1.5s infinite;
}

@keyframes scroll-down {
  0% { opacity: 0; transform: translate(-50%, 0); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 12px); }
}

@media (max-width: 768px) {
  .hero-title {
    left: 8%;
    top: 20%;
  }
  .hero-title h1 {
    font-size: clamp(100px, 34vw, 220px);
    letter-spacing: -0.5vw;
  }
  .h1-word {
    display: block;
  }
  .hero-name {
    font-size: clamp(30px, 9vw, 56px);
    letter-spacing: 0.15vw;
    margin: 24px 0 10px;
  }
  .hero-name-part {
    display: block;
  }
  .hero-text-body {
    max-width: calc(6 * clamp(30px, 9vw, 56px) + 0.5vw);
  }
  .hero-description {
    font-size: clamp(12px, 3.2vw, 16px);
    letter-spacing: 0.05vw;
    text-align: left;
    text-align-last: left;
    line-height: 1.7;
    white-space: nowrap;
  }
  .hero-buy-btn {
    font-size: clamp(14px, 2vw, 22px);
    padding: 10px 36px;
    margin-top: 38px;
  }
  .hero-date {
    font-size: clamp(10px, 1vw, 12px);
    margin-left: 0;
    white-space: nowrap;
  }
  .hero-scroll-hint { display: none; }
}

@media (max-width: 480px) {
  .hero {
    background: #f6f6f6 url('https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ysraQ5_7UM4AAAAAUKAAAAgADiiDAQFr/original') center / cover no-repeat;
  }
}
</style>
