<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { navItems, conferenceInfo, pastConferences } from '../data.js'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const pastDropdownOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 60
}

const scrollTo = (anchor) => {
  const el = document.getElementById(anchor)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closePastDropdown = () => {
  pastDropdownOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closePastDropdown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closePastDropdown)
})
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="navbar-inner">
      <div class="logo">
        <img class="logo-img" src="https://mdn.alipayobjects.com/huamei_m96plz/afts/img/9_q5Rp7HjuMAAAAAQSAAAAgADiiDAQFr/original" alt="SEE Conf 2026" />
      </div>

      <nav class="nav-links" :class="{ open: mobileMenuOpen }">
        <a
          v-for="item in navItems"
          :key="item.anchor"
          @click="scrollTo(item.anchor)"
          class="nav-link"
        >
          {{ item.label }}
        </a>

        <!-- 往届回顾下拉 -->
        <div
          class="nav-dropdown"
          @click.stop
          @mouseenter="pastDropdownOpen = true"
          @mouseleave="pastDropdownOpen = false"
        >
          <span class="nav-link dropdown-trigger" @click="pastDropdownOpen = !pastDropdownOpen">
            往届回顾
            <svg class="dropdown-arrow" :class="{ open: pastDropdownOpen }" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
          <div class="dropdown-menu" :class="{ show: pastDropdownOpen }">
            <a
              v-for="conf in pastConferences"
              :key="conf.year"
              class="dropdown-item"
              :href="conf.url"
              target="_blank"
              rel="noopener"
            >
              {{ conf.year }}
            </a>
          </div>
        </div>
      </nav>

      <button class="mobile-toggle" @click="mobileMenuOpen = !mobileMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.navbar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 200px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.2) 65%, transparent 100%);
  pointer-events: none;
}

/* Hero area (unscrolled) — dark text on light watercolor background */
.navbar .nav-link {
  color: rgba(0, 0, 0, 0.72);
}

.navbar .nav-link:hover {
  color: #000;
}

.navbar .dropdown-menu {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.navbar .dropdown-item {
  color: rgba(0, 0, 0, 0.72);
}

.navbar .dropdown-item:hover {
  color: #000;
  background: rgba(0, 0, 0, 0.04);
}

.navbar .mobile-toggle span {
  background: #1a1a1a;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  box-shadow: none;
}

.navbar-inner {
  height: 100%;
  padding: 0 10%;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  user-select: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: auto;
}

.nav-link {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
  position: relative;
}

.nav-link:hover {
  color: #000;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0f83d3, #f3584c);
  transform: scaleX(0);
  transition: transform 0.3s;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-dropdown {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.dropdown-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.dropdown-arrow {
  transition: transform 0.3s;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
  min-width: 80px;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.25s ease;
  z-index: 20;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(4px);
}

.dropdown-item {
  display: block;
  padding: 10px 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.72);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.dropdown-item:hover {
  color: #000;
  background: rgba(0, 0, 0, 0.04);
}

.mobile-toggle {
  margin-left: 16px;
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  padding: 4px;
}

.mobile-toggle span {
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .navbar-inner {
    padding: 0 16px;
  }

  .logo-img {
    height: 22px;
  }

  .nav-links {
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    padding: 0;
    max-height: 0;
    overflow: hidden;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), padding 0.35s ease;
  }

  .nav-links.open {
    max-height: 600px;
    padding: 12px 16px 20px;
    overflow-y: auto;
  }

  .nav-link {
    width: 100%;
    padding: 14px 16px;
    text-align: left;
    border-radius: 12px;
    font-size: 15px;
    transition: background 0.2s;
  }

  .nav-link::after {
    display: none;
  }

  .nav-link:hover, .nav-link:active {
    background: rgba(0, 0, 0, 0.04);
  }

  .nav-dropdown {
    width: 100%;
    flex-direction: column;
  }

  .dropdown-trigger {
    width: 100%;
    justify-content: flex-start;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 15px;
    transition: background 0.2s;
  }

  .dropdown-trigger:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  .dropdown-arrow {
    display: none;
  }

  .navbar .dropdown-menu {
    position: static;
    transform: none;
    min-width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 8px 0 4px 16px;
    opacity: 1;
    visibility: visible;
    max-height: none;
    overflow: visible;
    transition: none;
  }

  .navbar .dropdown-menu.show {
    max-height: none;
  }

  .navbar .dropdown-item {
    display: inline-block;
    padding: 6px 14px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .navbar .dropdown-item:hover {
    color: rgba(0, 0, 0, 0.85);
    background: rgba(0, 0, 0, 0.08);
  }

  .mobile-toggle {
    display: flex;
    margin-left: auto;
  }
}
</style>
