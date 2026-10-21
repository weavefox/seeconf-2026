# SEE Conf 2026 官网

> 创造力复兴 · 探索 AI 时代的用户体验与工程实践

![SEE Conf 2026](https://mdn.alipayobjects.com/huamei_m96plz/afts/img/KWxXTbzAYu0AAAAAXqAAAAgADiiDAQFr/original)

SEE Conf（蚂蚁终端体验科技大会）2026 官方网站。大会将于 2026.11.28 在中国·杭州举办。

## 内容板块

网站基于 Vue 3 单页应用构建，包含以下内容板块：

- **主视觉横幅（HeroBanner）**：大会主题展示
- **讲者介绍（SpeakersSection）**：大会讲者与出品人
- **大会日程（AgendaSection）**：主会场日程，以及分会场日程
- **技术展台（ExpoSection）**：蚂蚁开源生态项目展示
- **参会指南（GuideSection）**：大会时间地点、报名等参会信息
- **往届回顾**：历届 SEE Conf 链接（2018 - 2025）

## 技术栈

- [Vue 3](https://vuejs.org/) + `<script setup>` 单文件组件
- [Vite](https://vite.dev/) 构建工具
- [@tslsmart/font-puhuiti](https://www.npmjs.com/package/@tslsmart/font-puhuiti) 蒲公英字体

## 快速开始

```bash
# 安装依赖
npm install

# 启动本地开发服务器
npm run dev

# 构建生产包
npm run build

# 本地预览构建产物
npm run preview
```

## 目录结构

```
seeconf2026/
├── index.html              # 入口 HTML
├── vite.config.js          # Vite 配置
├── public/                 # 静态资源
├── seeconf2026-deploy.zip  # 部署打包产物
└── src/
    ├── main.js             # 应用入口
    ├── App.vue             # 根组件
    ├── data.js             # 大会数据配置（日程、讲者、专场等）
    ├── style.css           # 全局样式
    └── components/         # 页面组件
        ├── TheNavbar.vue       # 导航栏
        ├── HeroBanner.vue      # 主视觉横幅
        ├── ShaderCanvas.vue    # 着色器画布动画
        ├── SpeakersSection.vue # 讲者介绍
        ├── AgendaSection.vue   # 大会日程
        ├── ExpoSection.vue     # 技术展台
        ├── GuideSection.vue    # 参会指南
        └── TheFooter.vue       # 页脚
```
