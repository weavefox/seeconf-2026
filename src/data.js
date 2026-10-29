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
  // { label: '分享嘉宾', anchor: 'speakers' },
  { label: '会议议程', anchor: 'agenda' },
  { label: '特邀嘉宾', anchor: 'guests' },
  { label: '特色展台', anchor: 'expo' },
  { label: '参会指南', anchor: 'guide' },
  { label: '合作伙伴', anchor: 'partners' },
]

// 专题列表
export const sessions = [
  {
    id: 'main',
    name: '主会场',
    subtitle: '创造力复兴',
    isLive: true,
    color: '#f3584c',
    producers: ['达峰'],
  },
  {
    id: 'ai-experience',
    name: '专题',
    subtitle: 'AI 创新体验',
    color: '#0f83d3',
    producers: ['韵锦', '勾玉'],
  },
  {
    id: 'ai-engineering',
    name: '专题',
    subtitle: '卓越 AI 工程实践',
    color: '#12a7df',
    producers: ['云谦', '明是'],
  },
  {
    id: 'ai-interaction',
    name: '专题',
    subtitle: 'AI 新交互与多端',
    color: '#29bae5',
    producers: ['竹光', '祯逸'],
  },
  {
    id: 'see-next',
    name: '专题',
    subtitle: 'SEE Next',
    color: '#f3584c',
    producers: ['鲁直', '达峰'],
  },
]

// 议程数据
export const agendaData = {
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
  {
    name: '何征宇',
    nickname: '梁纥',
    title: '蚂蚁集团 · CTO',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ETOVSLjIvU8AAAAAT7AAAAgADiiDAQFr/original',
    avatarRed: ''
  },
  {
    name: '郑叶飞',
    nickname: '圆心',
    title: '阿里国际 · AliExpress CTO',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/aBCqS6Aod14AAAAAUjAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/My63RoF3vQ0AAAAAVTAAAAgADiiDAQFr/original'
  },
  {
    name: '郭虹宇',
    nickname: '老郭',
    title: '淘天集团 · 淘宝终端技术负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/z_12Q7JUxhoAAAAAReAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Nl0jSLG5oRIAAAAAVjAAAAgADiiDAQFr/original'
  },
  {
    name: '郭旻桢',
    nickname: '臻儿',
    title: '蚂蚁集团 · 支付宝 AI 创新产品中心负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/AEw4R6TeJz8AAAAAT4AAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/2wYgTIWsUMkAAAAAReAAAAgADiiDAQFr/original'
  },
  {
    name: '王保平',
    nickname: '玉伯',
    title: 'YouMind · 创始人 & CEO',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ItyQS5pPFywAAAAAUAAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/tDmxT4tWA7oAAAAAUNAAAAgADiiDAQFr/original'
  },
  {
    name: '翁欣旦',
    nickname: '钱唐',
    title: '蚂蚁集团 · 终端技术委员会负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/o0bkSYCqwhsAAAAAT5AAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/6OiZQ7eDyMUAAAAAUqAAAAgADiiDAQFr/original'
  },
  // {
  //   name: '徐达峰',
  //   nickname: '达峰',
  //   title: '蚂蚁集团 · 平台体验技术负责人',
  //   avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/o0bkSYCqwhsAAAAAT5AAAAgADiiDAQFr/original',
  //   avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/6OiZQ7eDyMUAAAAAUqAAAAgADiiDAQFr/original'
  // },
  {
    name: '王姣',
    nickname: '杜素',
    title: '蚂蚁集团 · 支付宝设计负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/5zdjQaqmrzcAAAAAUiAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/-VTqRbVyF80AAAAAUZAAAAgADiiDAQFr/original'
  },
  {
    name: '于海泽',
    nickname: '镜同',
    title: '蚂蚁集团 · AI 支付产品总监',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/gUmuQJYf8uoAAAAAWVAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/WDd1R4MiNCIAAAAAUCAAAAgADiiDAQFr/original'
  },
  {
    name: '舒文亮',
    nickname: '舒文',
    title: '中国计算机学会 TF 智能前端 SIG 主席，蚂蚁集团 · 财富保险事业群终端负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/nN6FQIa_JGAAAAAAT5AAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/a6MATKvK0xkAAAAAUTAAAAgADiiDAQFr/original'
  },
  {
    name: '王卓',
    nickname: '完颜',
    title: '蚂蚁集团 · 消费金融新体验技术部负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/HZHJR5D4guQAAAAATsAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/_FXqR6AQLUYAAAAAUDAAAAgADiiDAQFr/original'
  },
  {
    name: '管维刚',
    nickname: '古云',
    title: '网商银行 · 普惠信贷体验技术部负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/movBRaaXmNQAAAAAUHAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/wSP0Q6m_ALkAAAAARhAAAAgADiiDAQFr/original'
  },
  {
    name: '朱兴民',
    nickname: '偏右',
    title: '蚂蚁集团 · 阿宝产品评测负责人',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/dCTHSqpNwAUAAAAAT5AAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/AJZERKSeXDUAAAAAUPAAAAgADiiDAQFr/original'
  },
  {
    name: '夏炎',
    nickname: '莫非',
    title: '阿里巴巴 · 资深技术专家',
    avatarBlue: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Sld-RLjH_-oAAAAATPAAAAgADiiDAQFr/original',
    avatarRed: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/_TMuQ5A9mG0AAAAAVaAAAAgADiiDAQFr/original'
  },
]

// 特色展台
export const exhibitions = [
  { name: '蚂蚁阿福', description: '你的 AI 健康朋友。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Q86OQ455uroAAAAAS2AAAAgADiiDAQFr/256w_256h', link: '' },
  { name: '', description: '灵光，能管事的个人助理。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/fgPETaAe-k8AAAAAcNAAAAgADiiDAQFr/fmt.avif', link: 'https://www.lingguang.com/' },
  { name: '百灵', description: '为真实世界而生的开放智能。Open intelligence for the real-world.', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/lXz6Safe1GcAAAAAQWAAAAgADiiDAQFr/original', link: 'https://www.ant-ling.com/' },
  { name: '', description: '以创新的 AI 支付助力AI时代。Powering the AI Era with Innovative AI Payments.', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/JwfPSq2DBxQAAAAAQFAAAAgADiiDAQFr/original', link: 'https://aipay.alipay.com/' },
  { name: '阿宝', description: '作为 AI 版支付宝，阿宝是你的专属 Personal Agent 生活助手，现设立千万奖池发起智能体涌现奖大赛，旨在征集有用、有趣的生活消费智能体和 Agent、Skill，赋能开发者及其智能体作品商业潜力，落地支付宝生态。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/hpbmSKcqrngAAAAAgEAAAAgADiiDAQFr/512w_512h', link: 'https://abaoemerge.alipay.com' },
  { name: '', description: '千问办公是阿里巴巴全新推出的一站式 AI 办公平台。当前深度融入钉钉生态，实现与钉钉功能体系的无缝衔接；未来将进一步打通企业数据库及主流 åIM 工具，构建更广泛的连接能力。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/DzCTTra6k4MAAAAAQFAAAAgADiiDAQFr/original', link: 'https://qwenwork.cn', logoHeight: 36 },
  { name: 'WeaveFox', description: 'AI 全栈应用创作平台，通过自然语言对话，自由创造个人专属的工具与独立应用，快速实现创意变现。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ZAv4TKvxmvYAAAAAQEAAAAgADiiDAQFr/original', link: 'https://www.weavefox.cn/' },
  { name: 'Ant Design', description: 'Ant Design 是蚂蚁集团开源的企业级设计体系，提供设计规范、高质量 React 组件及配套生态。通过灵活的主题定制与 AI 友好的开发能力，帮助设计者和开发者高效构建风格统一、富有个性的产品体验。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/2eedSL8R2lUAAAAAQLAAAAgADiiDAQFr/original', link: 'https://ant.design/' },
  { name: 'AntV', description: '蚂蚁企业级 AI 数据可视化解决方案，让人们在数据世界里获得视觉化思考能力。Turning data into a visual language for better thinking.', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/RSVoSYTISmYAAAAAQDAAAAgADiiDAQFr/original', link: 'https://antv.antgroup.com/' },
  { name: 'Galacean', description: 'Galacean Engine 是蚂蚁集团开源的 AI-Native 图形与游戏引擎，秉承 AI-First、移动端优先、Web 优先的设计理念，让创作者通过 Harness，以自然语言构建游戏与 3D 互动应用，将一个念头变成可探索、可交互的数字世界。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/8eM2T5UX840AAAAAQwAAAAgADiiDAQFr/original', link: 'https://galacean.antgroup.com/engine' },
  { name: 'Qoder', description: 'Qoder 是一个面向真实工作的 Agentic 平台，将 AI 带入软件开发、终端工作流、云端托管执行、日常办公和持续运行的数字岗位。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/29jjRZAGimcAAAAAQOAAAAgADiiDAQFr/original', link: 'https://qoder.cn/' },
  { name: 'QMuse', description: 'QMuse 是支付宝旗下的 AI 原生生产力平台，融合自然语言与多模态生成能力，支持PC/移动双端低门槛创作网页/小程序/PPT 等多类型产物，出品即精品、产物即交付', logo: 'https://mdn.alipayobjects.com/huamei_eyqazd/afts/img/sMEPS7FjAtoAAAAAQJAAAAgADlqOAQJr/original', link: 'https://qmuse.cn/' },
  { name: '画眉', description: 'AI Native 创意生产平台，全面助力 超级个体 和 业务 快速生产高质量的图片、动效、视频、UI，用好创意驱动业务增长。过去一年累计完成 3.6 亿次生成。', logo: 'https://mdn.alipayobjects.com/huamei_9ip1jn/afts/img/A*tyd5RKlUt5IAAAAAAAAAAAAADn95AQ/original', link: 'https://idesign.alipay.com/' },
  { name: '哆啦', description: '意图发生，供给抵达。哆啦是面向消费金融场景的 AI Native 生产与经营平台，围绕用户意图，连接需求理解、服务生成与按需交付，让合适的服务在用户需要时抵达。', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/KHScQqyLEFAAAAAAQKAAAAgADiiDAQFr/original', link: 'https://dora.antgroup.com' },
]

// 合作伙伴（hideName 表示 logo 已含品牌名，不再重复显示名称）
export const partners = [
  { name: '蚂蚁阿福', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/Q86OQ455uroAAAAAS2AAAAgADiiDAQFr/256w_256h', link: '' },
  { name: '蚂蚁开源', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ddpmRqQj3uEAAAAAQQAAAAgADiiDAQFr/fmt.avif', link: 'https://github.com/antgroup', hideName: true },
  { name: '魔搭社区', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/PZfcSp9US2wAAAAAQHAAAAgADiiDAQFr/fmt.avif', link: 'https://www.modelscope.cn', hideName: true },
  { name: '百灵', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/lXz6Safe1GcAAAAAQWAAAAgADiiDAQFr/fmt.avif', link: 'https://www.ant-ling.com/' },
  { name: 'InfoQ', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/e9eqSpHVRFYAAAAAQJAAAAgADiiDAQFr/fmt.avif', link: 'https://www.infoq.cn', hideName: true },
  { name: '观猹', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/my9eTaylR4kAAAAAQMAAAAgADiiDAQFr/original', link: 'https://watcha.cn/', hideName: true },
  { name: 'WeaveFox', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/ZAv4TKvxmvYAAAAAQEAAAAgADiiDAQFr/original', link: 'https://www.weavefox.cn' },
  { name: '量子位', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/aKh8RIPWwj8AAAAAQFAAAAgADiiDAQFr/fmt.avif', link: 'https://www.qbitai.com/', hideName: true },
  { name: 'CSDN', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/mm4OSpNGpGUAAAAAQJAAAAgADiiDAQFr/fmt.avif', link: '', hideName: true },
  { name: '开源江湖', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/IVGSRIjfq6oAAAAAQ2AAAAgADiiDAQFr/fmt.avif', link: '', hideName: true },
  { name: '极星会', logo: 'https://mdn.alipayobjects.com/huamei_m96plz/afts/img/HMQGS4WP8WIAAAAAQMAAAAgADiiDAQFr/fmt.avif', link: 'https://www.gitfund.cn', hideName: true },
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
