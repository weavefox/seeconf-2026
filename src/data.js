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
  { label: '分享嘉宾', anchor: 'speakers' },
  { label: '分享议程', anchor: 'agenda' },
  { label: '特邀嘉宾', anchor: 'guests' },
  { label: '参会指南', anchor: 'guide' },
]

// 专场列表
export const sessions = [
  {
    id: 'main',
    name: '主会场',
    subtitle: '创造力复兴',
    isLive: true,
    color: '#f3584c',
  },
  {
    id: 'ai-experience',
    name: '分会场',
    subtitle: 'AI 创新体验',
    color: '#0f83d3',
  },
  {
    id: 'ai-engineering',
    name: '分会场',
    subtitle: '卓越 AI 工程实践',
    color: '#12a7df',
  },
  {
    id: 'ai-interaction',
    name: '分会场',
    subtitle: 'AI 新交互与多端',
    color: '#29bae5',
  },
  {
    id: 'see-next',
    name: '分会场',
    subtitle: 'SEE Next',
    color: '#f3584c',
  },
  {
    id: 'tech-infra',
    name: '分会场',
    subtitle: '技术基础设施',
    color: '#0a5fa5',
  },
  {
    id: 'design-system',
    name: '分会场',
    subtitle: '设计体系与体验',
    color: '#12a7df',
  },
  {
    id: 'data-viz',
    name: '分会场',
    subtitle: '数据可视化',
    color: '#f39c8c',
  },
  {
    id: 'dev-efficiency',
    name: '分会场',
    subtitle: '研发效能',
    color: '#29bae5',
  },
  {
    id: 'open-source',
    name: '分会场',
    subtitle: '开源生态',
    color: '#0f83d3',
  },
]

// 议程数据
const agendaTemplates = {
  main: [
    { time: '09:00 - 09:45', title: 'AI 时代的终端体验技术演进', description: '分享 AI 时代下终端体验技术的战略思考与演进方向', speaker: '翁欣旦', speakerTitle: '蚂蚁集团 终端技术委员会负责人' },
    { time: '10:00 - 10:45', title: 'AI 重塑研发流程：从代码生成到智能架构', description: '探讨 AI 如何重塑从需求到交付的研发全链路', speaker: '徐达峰', speakerTitle: '蚂蚁集团 平台体验技术部负责人' },
    { time: '11:00 - 11:30', title: '开源生态与体验技术的融合发展', description: '分享蚂蚁开源生态建设经验与体验技术开源的未来方向', speaker: '江波', speakerTitle: '蚂蚁集团 开源技术增长负责人' },
    { time: '14:00 - 15:00', title: '圆桌对话：体验技术的下一个十年', description: '讲者圆桌讨论，共话体验技术的未来发展', speaker: '全体讲者', speakerTitle: '' },
  ],
  'ai-experience': [
    { time: '13:30 - 14:00', title: 'AI 原生应用的体验设计方法论', description: 'AI 原生时代如何重新定义用户体验设计', speaker: '朱兴民', speakerTitle: '蚂蚁集团 支付宝前端平台负责人' },
    { time: '14:00 - 14:30', title: '从 GUI 到 LUI：交互范式的转移', description: '从图形界面到语言界面，探索交互设计新范式', speaker: '徐文彬', speakerTitle: 'LobeHub 创始人' },
    { time: '14:30 - 15:00', title: 'AI 驱动的个性化体验引擎', description: '基于大模型的实时个性化用户体验生成与推荐', speaker: '张明', speakerTitle: '蚂蚁集团 高级技术专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：AI 体验的边界与可能', description: '探讨 AI 在体验设计中的能力边界与创新空间', speaker: '全体讲者', speakerTitle: '' },
  ],
  'ai-engineering': [
    { time: '13:30 - 14:00', title: 'AI 代码生成的质量保障体系', description: '构建 AI 生成代码的质量评估与保障机制', speaker: '陈伟', speakerTitle: '蚂蚁集团 技术专家' },
    { time: '14:00 - 14:30', title: '智能研发助手的设计与实践', description: '从用户需求到智能辅助的全链路设计思考', speaker: '李亚飞', speakerTitle: 'Clacky.ai CEO' },
    { time: '14:30 - 15:00', title: 'AI 驱动的自动化测试实践', description: 'AI 在测试用例生成与执行中的落地实践', speaker: '叶震杰', speakerTitle: 'ZenMux.ai Co-Founder' },
    { time: '15:00 - 15:30', title: '圆桌对话：AI 研发效能的落地挑战', description: '讨论 AI Coding 在企业级落地中的难点与解法', speaker: '全体讲者', speakerTitle: '' },
  ],
  'ai-interaction': [
    { time: '13:30 - 14:00', title: '端侧 AI Agent 的架构与实践', description: '端侧 AI Agent 的架构设计与落地案例', speaker: '许德刚', speakerTitle: 'Rokid 产品负责人' },
    { time: '14:00 - 14:30', title: '空间计算与交互范式革新', description: '空间计算时代的多模态交互设计探索', speaker: '党宇航', speakerTitle: 'Tripo VAST 产品研发负责人' },
    { time: '14:30 - 15:00', title: '视觉大模型驱动的 GUI 感知', description: '视觉大模型在 GUI 自动化中的应用探索', speaker: '孙磊', speakerTitle: '蚂蚁集团 跨端引擎技术专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：多端交互的未来', description: '探讨跨端体验与 AI 交互的融合趋势', speaker: '全体讲者', speakerTitle: '' },
  ],
  'see-next': [
    { time: '13:30 - 14:00', title: 'AI 原生应用的体验未来', description: 'AI 原生时代应用体验设计的前瞻思考', speaker: '徐文彬', speakerTitle: 'LobeHub 创始人' },
    { time: '14:00 - 14:30', title: '技术驱动下的体验进化', description: '前沿技术如何驱动用户体验的持续进化', speaker: '朱兴民', speakerTitle: '蚂蚁集团 支付宝前端平台负责人' },
    { time: '14:30 - 15:00', title: '创意编程与生成艺术的探索', description: '用代码创造视觉艺术的前沿实践', speaker: '林晓', speakerTitle: '蚂蚁集团 创意编程专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：体验技术的下一个十年', description: '讲者圆桌讨论，共话体验技术的未来方向', speaker: '全体讲者', speakerTitle: '' },
  ],
  'tech-infra': [
    { time: '13:30 - 14:00', title: '微前端架构的演进与实践', description: '蚂蚁微前端体系从 qiankun 到新一代架构的演进', speaker: '赵利超', speakerTitle: '蚂蚁集团 支付宝终端基础技术负责人' },
    { time: '14:00 - 14:30', title: '构建工具链的性能优化之路', description: '从 Webpack 到 Rspack，构建工具的性能突破', speaker: '吴峰', speakerTitle: '蚂蚁集团 可视化技术负责人' },
    { time: '14:30 - 15:00', title: '前端性能监控与优化实战', description: '从指标到优化，前端性能全链路监控实践', speaker: '郑凯', speakerTitle: '蚂蚁集团 端智能技术专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：基础设施的支撑力量', description: '探讨前端基础设施如何支撑大规模业务', speaker: '全体讲者', speakerTitle: '' },
  ],
  'design-system': [
    { time: '13:30 - 14:00', title: '设计系统的规模化落地', description: 'Ant Design 设计系统的企业级落地经验', speaker: '朱兴民', speakerTitle: '蚂蚁集团 支付宝前端平台负责人' },
    { time: '14:00 - 14:30', title: '设计	Token 驱动的主题体系', description: '基于 Design Token 的多主题管理与切换方案', speaker: '王芳', speakerTitle: '蚂蚁集团 设计系统专家' },
    { time: '14:30 - 15:00', title: '组件库的无障碍实践', description: '从 ARIA 到键盘导航，构建可访问性组件体系', speaker: '周杰', speakerTitle: '蚂蚁集团 前端性能专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：设计系统的可持续演进', description: '探讨设计系统在大型组织中的长期维护与迭代', speaker: '全体讲者', speakerTitle: '' },
  ],
  'data-viz': [
    { time: '13:30 - 14:00', title: '大数据可视化的性能突破', description: '百万级数据点的高性能渲染方案', speaker: '吴峰', speakerTitle: '蚂蚁集团 可视化技术负责人' },
    { time: '14:00 - 14:30', title: '3D 交互体验设计实践', description: 'Web 端 3D 交互体验的技术与设计融合', speaker: '党宇航', speakerTitle: 'Tripo VAST 产品研发负责人' },
    { time: '14:30 - 15:00', title: '数据驱动的动效设计', description: '从数据到动效，构建数据驱动的交互体验', speaker: '黄琪', speakerTitle: '蚂蚁集团 动效设计专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：可视化的艺术与工程', description: '探讨数据可视化中艺术表达与工程实现的平衡', speaker: '全体讲者', speakerTitle: '' },
  ],
  'dev-efficiency': [
    { time: '13:30 - 14:00', title: 'AI 驱动的代码搜索与推荐', description: '基于大模型的智能代码搜索与推荐系统', speaker: '叶震杰', speakerTitle: 'ZenMux.ai Co-Founder' },
    { time: '14:00 - 14:30', title: '端智能：从云到端的 AI 落地', description: '端侧 AI 推理优化与工程实践', speaker: '郑凯', speakerTitle: '蚂蚁集团 端智能技术专家' },
    { time: '14:30 - 15:00', title: '从 CI 到 CD 的全链路效能提升', description: '持续集成与持续交付的工程化最佳实践', speaker: '刘洋', speakerTitle: '蚂蚁集团 工程效能专家' },
    { time: '15:00 - 15:30', title: '圆桌对话：研发效能的度量与提升', description: '如何科学度量研发效能并持续改进', speaker: '全体讲者', speakerTitle: '' },
  ],
  'open-source': [
    { time: '13:30 - 14:00', title: '开源生态与体验技术的融合发展', description: '蚂蚁开源生态建设经验与未来方向', speaker: '江波', speakerTitle: '蚂蚁集团 开源技术增长负责人' },
    { time: '14:00 - 14:30', title: '从 Ant Design 到开源设计语言', description: '企业级 UI 设计语言的开源历程与社区运营', speaker: '朱兴民', speakerTitle: '蚂蚁集团 支付宝前端平台负责人' },
    { time: '14:30 - 15:00', title: '微前端框架 qiankun 的开源实践', description: 'qiankun 社区运营、版本演进与未来规划', speaker: '赵利超', speakerTitle: '蚂蚁集团 支付宝终端基础技术负责人' },
    { time: '15:00 - 15:30', title: '圆桌对话：开源的可持续之路', description: '探讨企业主导开源项目的可持续发展模式', speaker: '全体讲者', speakerTitle: '' },
  ],
}

export const agendaData = agendaTemplates

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
  { name: '张明', nickname: '', title: '高级技术专家', company: '蚂蚁集团', session: 'ai-coding', avatar: '' },
  { name: '陈伟', nickname: '', title: '技术专家', company: '蚂蚁集团', session: 'ai-coding', avatar: '' },
  { name: '吴峰', nickname: '', title: '可视化技术负责人', company: '蚂蚁集团', session: 'visualization', avatar: '' },
  { name: '孙磊', nickname: '', title: '跨端引擎技术专家', company: '蚂蚁集团', session: 'terminal', avatar: '' },
  { name: '林晓', nickname: '', title: '创意编程专家', company: '蚂蚁集团', session: 'visualization', avatar: '' },
]

// 特邀嘉宾
export const specialGuests = [
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
  { name: '嘉宾姓名', nickname: '花名', title: '所在机构 · 职务', avatar: '' },
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
