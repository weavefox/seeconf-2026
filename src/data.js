// SEE Conf 2026 数据配置

export const conferenceInfo = {
  name: 'SEE Conf 2026',
  title: '蚂蚁终端体验科技大会',
  slogan: '创造力复兴，探索AI时代的用户体验与工程实践',
  date: '2026.11.28',
  location: '中国·杭州',
  venue: '中国·杭州',
  applyDeadline: '2026.01.10',
  capacity: '名额有限，先到先得',
}

export const navItems = [
  { label: '参会指南', anchor: 'guide' },
]

// 专场列表
export const sessions = [
  {
    id: 'ai-coding',
    name: 'AI Coding',
    icon: '🤖',
    color: '#0f83d3',
    description: '聚焦 AI 辅助编程与代码智能生成，探讨 AI 在研发效能提升中的前沿实践。',
    topics: ['AI 代码生成的质量与安全', '智能研发助手的设计与落地', 'AI 驱动的自动化测试探索'],
  },
  {
    id: 'frontend',
    name: '基础前端',
    icon: '⚡',
    color: '#0a5fa5',
    description: '前端基础设施与框架演进，关注性能优化、工程化体系与构建效率的深度实践。',
    topics: ['前端微架构的演进之路', '构建工具的性能极致优化', '设计系统的规模化落地'],
  },
  {
    id: 'visualization',
    name: '互动与可视化',
    icon: '📊',
    color: '#f3584c',
    description: '数据可视化与交互体验设计，探索 3D、动效与创意编程的无限可能。',
    topics: ['大数据可视化的性能突破', '3D 交互体验设计实践', '创意编程与生成艺术'],
  },
  {
    id: 'terminal',
    name: '终端技术',
    icon: '📱',
    color: '#29bae5',
    description: '端侧 AI Agent、跨端技术、视觉大模型 GUI 感知等终端技术前沿方向。',
    topics: ['端侧 AI Agent 的架构与实践', '跨端渲染引擎的技术演进', '视觉大模型驱动的 GUI 感知'],
  },
  {
    id: 'see-next',
    name: 'SEE Next',
    icon: '🚀',
    color: '#f3584c',
    description: '展望前沿技术趋势，探索 AI 与体验工程的下一个十年。',
    topics: ['AI 原生应用的体验设计', '空间计算与交互范式革新', '技术驱动下的体验未来'],
  },
]

// 主会场日程
export const mainAgenda = [
  {
    time: '08:30 - 09:00',
    title: '签到入场',
    speaker: '',
    company: '',
    description: '参会签到，领取资料',
  },
  {
    time: '09:00 - 09:15',
    title: '大会开场致辞',
    speaker: '李俊奎',
    company: '蚂蚁集团 支付宝技术部负责人',
    description: '大会开场致辞，介绍 SEE Conf 2026 的主题与愿景',
  },
  {
    time: '09:15 - 10:00',
    title: 'AI 时代的终端体验技术演进',
    speaker: '翁欣旦',
    company: '蚂蚁集团 终端技术委员会负责人',
    description: 'Keynote：分享 AI 时代下终端体验技术的战略思考与演进方向',
    isKeynote: true,
  },
  {
    time: '10:00 - 10:30',
    title: '出品人开场',
    speaker: '各专场出品人',
    company: '蚂蚁集团',
    description: '五大平行专场主题与亮点预告，帮助参会者选择感兴趣的分会场',
  },
  {
    time: '10:30 - 11:30',
    title: 'AI 重塑研发流程：从代码生成到智能架构',
    speaker: '徐达峰',
    company: '蚂蚁集团 平台体验技术部负责人',
    description: '探讨 AI 如何重塑从需求到交付的研发全链路，分享蚂蚁在 AI Coding 领域的实践',
    isKeynote: true,
  },
  {
    time: '11:30 - 12:00',
    title: '开源生态与体验技术的融合发展',
    speaker: '江波',
    company: '蚂蚁集团 开源技术增长负责人',
    description: '分享蚂蚁开源生态建设的经验与体验技术开源的未来方向',
  },
  {
    time: '12:00 - 13:30',
    title: '中场休息 & 乐队演出 & 技术展台',
    speaker: '',
    company: '',
    description: '午餐时间，现场乐队演出，技术展台参观交流',
    isBreak: true,
  },
  {
    time: '13:30 - 14:15',
    title: 'AI 原生时代的用户体验设计',
    speaker: '朱兴民',
    company: '蚂蚁集团 支付宝前端平台负责人',
    description: '探讨 AI 原生应用如何重新定义用户体验设计的方法论与实践',
    isKeynote: true,
  },
  {
    time: '14:15 - 15:00',
    title: '从 GUI 到 LUI：交互范式的范式转移',
    speaker: '徐文彬',
    company: 'LobeHub 创始人',
    description: '从图形界面到语言界面，探索 AI 时代交互设计的新范式',
  },
  {
    time: '15:00 - 15:30',
    title: '大会总结与展望',
    speaker: '大会组委会',
    company: '蚂蚁集团',
    description: '大会总结回顾，SEE Conf 未来展望',
  },
]

// 各分会场日程
export const sessionAgenda = {
  'ai-coding': [
    { time: '13:30 - 14:00', title: 'AI 代码生成的质量保障体系', speaker: '张明', company: '蚂蚁集团', description: '如何构建 AI 生成代码的质量评估与保障机制' },
    { time: '14:00 - 14:30', title: '智能研发助手的设计哲学', speaker: '李亚飞', company: 'Clacky.ai CEO', description: '从用户需求到智能辅助的设计思考' },
    { time: '14:30 - 15:00', title: 'AI 驱动的自动化测试实践', speaker: '陈伟', company: '蚂蚁集团', description: 'AI 在测试用例生成与执行中的落地实践' },
    { time: '15:00 - 15:30', title: '大模型时代的代码搜索与推荐', speaker: '叶震杰', company: 'ZenMux.ai', description: '基于大模型的智能代码搜索与推荐系统' },
  ],
  'frontend': [
    { time: '13:30 - 14:00', title: '微前端架构的演进与实践', speaker: '赵利超', company: '蚂蚁集团', description: '蚂蚁微前端体系从 qiankun 到新一代架构的演进' },
    { time: '14:00 - 14:30', title: '构建工具链的性能优化之路', speaker: '刘洋', company: '蚂蚁集团', description: '从 Webpack 到 Rspack，构建工具的性能突破' },
    { time: '14:30 - 15:00', title: '设计系统的规模化落地', speaker: '王芳', company: '蚂蚁集团', description: 'Ant Design 设计系统的企业级落地经验' },
    { time: '15:00 - 15:30', title: '前端性能监控与优化实战', speaker: '周杰', company: '蚂蚁集团', description: '从指标到优化，前端性能全链路监控实践' },
  ],
  'visualization': [
    { time: '13:30 - 14:00', title: '大数据可视化的性能突破', speaker: '吴峰', company: '蚂蚁集团', description: '百万级数据点的高性能渲染方案' },
    { time: '14:00 - 14:30', title: '3D 交互体验设计实践', speaker: '党宇航', company: 'Tripo VAST', description: 'Web 端 3D 交互体验的技术与设计融合' },
    { time: '14:30 - 15:00', title: '创意编程与生成艺术', speaker: '林晓', company: '蚂蚁集团', description: '用代码创造视觉艺术的探索与实践' },
    { time: '15:00 - 15:30', title: '数据驱动的动效设计', speaker: '黄琪', company: '蚂蚁集团', description: '从数据到动效，构建数据驱动的交互体验' },
  ],
  'terminal': [
    { time: '13:30 - 14:00', title: '端侧 AI Agent 的架构与实践', speaker: '许德刚', company: 'Rokid', description: '端侧 AI Agent 的架构设计与落地实践' },
    { time: '14:00 - 14:30', title: '跨端渲染引擎的技术演进', speaker: '孙磊', company: '蚂蚁集团', description: '一次编写多端运行的跨端渲染引擎设计' },
    { time: '14:30 - 15:00', title: '视觉大模型驱动的 GUI 感知', speaker: '杨帆', company: '蚂蚁集团', description: '视觉大模型在 GUI 自动化中的应用探索' },
    { time: '15:00 - 15:30', title: '端智能：从云到端的 AI 落地', speaker: '郑凯', company: '蚂蚁集团', description: '端侧 AI 推理优化与工程实践' },
  ],
  'see-next': [
    { time: '13:30 - 14:00', title: 'AI 原生应用的体验设计', speaker: '徐文彬', company: 'LobeHub', description: 'AI 原生时代的应用体验设计方法论' },
    { time: '14:00 - 14:30', title: '空间计算与交互范式革新', speaker: '许德刚', company: 'Rokid', description: '空间计算时代的交互设计探索' },
    { time: '14:30 - 15:00', title: '技术驱动下的体验未来', speaker: '朱兴民', company: '蚂蚁集团', description: '前沿技术如何驱动用户体验的持续进化' },
    { time: '15:00 - 15:30', title: '圆桌讨论：体验技术的下一个十年', speaker: '全体讲者', company: '', description: '讲者圆桌讨论，共话体验技术的未来方向' },
  ],
}

// 讲者列表
export const speakers = [
  { name: '李俊奎', nickname: '向秀', title: '支付宝技术部负责人', company: '蚂蚁集团', session: 'main', avatar: '' },
  { name: '翁欣旦', nickname: '钱唐', title: '终端技术委员会负责人', company: '蚂蚁集团', session: 'main', avatar: '' },
  { name: '徐达峰', nickname: '达峰', title: '平台体验技术部负责人', company: '蚂蚁集团', session: 'main', avatar: '' },
  { name: '朱兴民', nickname: '偏右', title: '支付宝前端平台负责人', company: '蚂蚁集团', session: 'main', avatar: '' },
  { name: '江波', nickname: '菠酱', title: '开源技术增长负责人', company: '蚂蚁集团', session: 'main', avatar: '' },
  { name: '赵利超', nickname: '鬼畏', title: '支付宝终端基础技术负责人', company: '蚂蚁集团', session: 'frontend', avatar: '' },
  { name: '徐文彬', nickname: '闻冰', title: '创始人', company: 'LobeHub', session: 'see-next', avatar: '' },
  { name: '许德刚', nickname: '', title: '产品负责人', company: 'Rokid', session: 'terminal', avatar: '' },
  { name: '李亚飞', nickname: '', title: 'CEO', company: 'Clacky.ai', session: 'ai-coding', avatar: '' },
  { name: '叶震杰', nickname: '', title: 'Co-Founder & Product Lead', company: 'ZenMux.ai', session: 'ai-coding', avatar: '' },
  { name: '党宇航', nickname: '', title: '产品研发负责人', company: 'Tripo VAST', session: 'visualization', avatar: '' },
]

// 出品人
export const producers = [
  { name: '李俊奎', title: '支付宝技术部负责人', company: '蚂蚁集团', session: '大会总出品人' },
  { name: '翁欣旦', title: '终端技术委员会负责人', company: '蚂蚁集团', session: '终端技术专场出品人' },
  { name: '徐达峰', title: '平台体验技术部负责人', company: '蚂蚁集团', session: 'AI Coding 专场出品人' },
  { name: '朱兴民', title: '支付宝前端平台负责人', company: '蚂蚁集团', session: '基础前端专场出品人' },
]

// 开源项目 / 合作伙伴
export const openSourceProjects = [
  { name: 'Ant Design', description: '企业级 UI 设计语言与组件库', url: 'https://ant.design' },
  { name: 'Umi', description: '可插拔的企业级前端框架', url: 'https://umijs.org' },
  { name: 'qiankun', description: '微前端框架', url: 'https://qiankun.umijs.org' },
  { name: 'Dva', description: '数据流方案', url: 'https://dvajs.com' },
  { name: 'L7', description: '地理空间数据可视化', url: 'https://l7.antv.antgroup.com' },
  { name: 'G6', description: '图可视化与图分析引擎', url: 'https://g6.antv.antgroup.com' },
  { name: 'AntV', description: '数据可视化解决方案', url: 'https://antv.antgroup.com' },
  { name: 'WeaveFox', description: 'AI 驱动的研发效能平台', url: '#' },
]

// 往届回顾
export const pastConferences = [
  { year: '2025', url: 'https://seeconf2025.alipay.com/' },
  { year: '2022', url: 'https://seeconf2022.alipay.com/' },
  { year: '2021', url: 'https://seeconf2021.antfin.com/' },
  { year: '2020', url: 'http://seeconf2020.antfin.com/' },
  { year: '2019', url: 'https://seeconf2019.antfin.com/' },
  { year: '2018', url: 'https://seeconf2018.alipay.com/' },
]
