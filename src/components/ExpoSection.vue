<script setup>
import { openSourceProjects } from '../data.js'
</script>

<template>
  <section id="expo" class="expo">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">EXPO</span>
        <h2 class="section-title">技术展台 & 生态</h2>
        <p class="section-subtitle">现场开源项目 Demo 展示，近距离体验蚂蚁开源技术生态</p>
      </div>

      <div class="expo-intro">
        <div class="intro-card">
          <div class="intro-icon">🎪</div>
          <h3 class="intro-title">技术展台</h3>
          <p class="intro-desc">
            大会现场设置技术展台区域，展示蚂蚁集团及社区优秀开源项目。
            参会者可在中场休息期间近距离体验技术 Demo，与项目维护者面对面交流。
          </p>
        </div>
        <div class="intro-card">
          <div class="intro-icon">🌱</div>
          <h3 class="intro-title">开源生态</h3>
          <p class="intro-desc">
            蚂蚁集团长期投入开源社区建设，涵盖前端框架、数据可视化、微前端、
            研发工具等多个领域，致力于推动体验技术生态的繁荣发展。
          </p>
        </div>
      </div>

      <div class="projects-grid">
        <a
          v-for="project in openSourceProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="project-card"
        >
          <div class="project-header">
            <div class="project-logo">
              {{ project.name.charAt(0) }}
            </div>
            <div class="project-arrow">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
          <h4 class="project-name">{{ project.name }}</h4>
          <p class="project-desc">{{ project.description }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.expo {
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

.expo-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;
}

.intro-card {
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #f4f4f4 0%, #f0f0f0 100%);
  border: 1px solid #e0e0e0;
}

.intro-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.intro-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}

.intro-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.project-card {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
  display: block;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border-color: rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.project-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f83d3, #f3584c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
}

.project-arrow {
  color: var(--color-text-secondary);
  transition: all 0.3s;
}

.project-card:hover .project-arrow {
  color: var(--color-primary);
  transform: translate(2px, -2px);
}

.project-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.project-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .expo { padding: 60px 0; }
  .section-title { font-size: 28px; }
  .expo-intro { grid-template-columns: 1fr; }
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .projects-grid { grid-template-columns: 1fr; }
}
</style>
