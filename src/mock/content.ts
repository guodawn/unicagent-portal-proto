export interface Announcement {
  id: string;
  tag: string;
  title: string;
  link: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  metrics: { value: string; label: string }[];
}

export interface PromoBannerContent {
  tag: string;
  title: string;
  subtitle: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
}

export interface CardMatrixItem {
  id: string;
  title: string;
  description: string;
  link: string;
  btnText: string;
  badge?: string;
  iconName: 'agent' | 'models' | 'compute' | 'gateway';
}

export interface AdvantageItem {
  id: string;
  title: string;
  highlightText: string;
  description: string;
  iconName: 'speed' | 'cost' | 'stability' | 'intelligence' | 'security' | 'autonomy';
}

export interface IndustryItem {
  id: string;
  name: string;
  tag: string;
  title: string;
  description: string;
  scenarios: string[];
  link: string;
}

export interface LogoClient {
  id: string;
  name: string;
  category: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  tag: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; url: string; isExternal?: boolean }[];
}

// 1. 公告轮播数据
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    tag: '平台上线',
    title: '众调 AI 生态平台全新发布：全栈国产化大模型网关与智能体引擎现已开放体验',
    link: '/models',
  },
  {
    id: 'ann-2',
    tag: '算力纳管',
    title: '面向算力租赁商的「智算运营联盟」正式启动，支持多异构芯片调度分成',
    link: '/services/compute',
  },
  {
    id: 'ann-3',
    tag: '政企私有化',
    title: '私有化部署服务平台一体机方案升级，全面适配主流信创基础设施',
    link: '/services/private-deployment',
  },
];

// 2. Hero 核心区数据
export const HERO_CONTENT: HeroContent = {
  title: '企业级 AI 基础设施与智能体双侧生态平台',
  subtitle: '连接供给侧算力与模型资源，赋能消费侧企业级智能体开发、大模型统一网关与高安全私有化交付。',
  ctaPrimaryText: '立即体验',
  ctaPrimaryLink: '/models',
  ctaSecondaryText: '预约方案演示',
  ctaSecondaryLink: '/services/private-deployment',
  metrics: [
    { value: '10x+', label: '推理加速性能' },
    { value: '120+', label: '主流大模型集成' },
    { value: '99.99%', label: '企业级可用性保障' },
    { value: '65%', label: '平均闲置算力降低' },
  ],
};

// 3. 私有化部署重点横幅
export const PROMO_BANNER: PromoBannerContent = {
  tag: '政企专享',
  title: '私有化部署服务平台 · 软硬一体化高标准交付',
  subtitle: '面向企业集团与地市级政府单位，全套平台能力整装交付本地机房，数据物理隔离，支持联合运营分成共赢。',
  features: [
    '核心数据与知识库资产不出域',
    '深度适配信创芯片生态（昇腾/海光等）',
    '一体化专有设备开箱即用',
    '灵活运营分成合作模式',
  ],
  ctaText: '了解私有化方案',
  ctaLink: '/services/private-deployment',
};

// 4. 四大核心能力卡片矩阵
export const CARD_MATRIX: CardMatrixItem[] = [
  {
    id: 'matrix-agent',
    title: '智能体开发平台',
    description: '涵盖开箱即用数字员工、无代码拖拽工作台与面向工程师的代码级开发套件，让全员皆可落地 AI 生产力。',
    link: '/agent-platform',
    btnText: '进入智能体平台 →',
    badge: '全场景覆盖',
    iconName: 'agent',
  },
  {
    id: 'matrix-models',
    title: '大模型广场',
    description: '汇聚国内外主流顶尖开源与商业基座模型，提供透明单价对照、基准评测分与在线单/双模型 Arena 对比体验。',
    link: '/models',
    btnText: '浏览模型清单 →',
    badge: '即开即测',
    iconName: 'models',
  },
  {
    id: 'matrix-compute',
    title: 'AI 算力运营服务',
    description: '面向算力租赁提供商，实现异构闲置算力动态纳管、集群高效调度与流水按比例分成结算，盘活重资产。',
    link: '/services/compute',
    btnText: '了解算力合作 →',
    badge: '供给侧共赢',
    iconName: 'compute',
  },
  {
    id: 'matrix-gateway',
    title: '大模型服务网关',
    description: '面向 Token 提供商与企业技术中台，兼容 OpenAI 规范，提供高并发统一路由、多模型熔断容灾与全链路审计。',
    link: '/services/gateway',
    btnText: '接入服务网关 →',
    badge: '工业级高可用',
    iconName: 'gateway',
  },
];

// 5. 平台六大核心优势
export const ADVANTAGE_GRID: AdvantageItem[] = [
  {
    id: 'adv-speed',
    title: '高速推理加速',
    highlightText: '10 倍提速',
    description: '自研高性能算子融合与并行调度引擎，大幅降低首字延迟与端到端响应时间，支撑海量并发。',
    iconName: 'speed',
  },
  {
    id: 'adv-cost',
    title: '极致性价比与分成',
    highlightText: '降本 60%',
    description: '异构算力错峰调度与量化压缩，带来极具竞争力的 Token 成本，并为供给侧提供清晰的按量分成收益。',
    iconName: 'cost',
  },
  {
    id: 'adv-stability',
    title: '工业级高稳定性',
    highlightText: '99.99% SLA',
    description: '多云多活容灾与自动化故障自愈，任一节点异常毫秒级无感降级，关键核心业务不中断。',
    iconName: 'stability',
  },
  {
    id: 'adv-intelligence',
    title: '全栈丰富智能',
    highlightText: '120+ 模型',
    description: '从通用大语言模型、深度推理思维链、专业代码专家到工业高精多模态视觉，按需自由组合。',
    iconName: 'intelligence',
  },
  {
    id: 'adv-security',
    title: '金融级安全合规',
    highlightText: '等保合规',
    description: '全链路加密、多租户物理/逻辑隔离、内置国家生成式 AI 安全过滤规则与审计追踪。',
    iconName: 'security',
  },
  {
    id: 'adv-autonomy',
    title: '全栈自主可控',
    highlightText: '信创适配',
    description: '全面兼容国产 CPU 与 GPU/NPU 算力架构，支持政企央企完全自主可控与纯离线私有交付。',
    iconName: 'autonomy',
  },
];

// 6. 行业解决方案轮播
export const INDUSTRY_CAROUSEL: IndustryItem[] = [
  {
    id: 'ind-auto',
    name: '汽车制造',
    tag: '智能座舱 · 研发 · 售后',
    title: '智能网联汽车全流程智能体解决方案',
    description: '赋能车载拟人智能座舱伴驾体验、AUTOSAR 研发代码审查与 4S 店疑难故障工单智能排障。',
    scenarios: [
      '端云协同超低延迟车载座舱语音助手',
      '汽车工程代码规范与自动化测试用例生成',
      '数十万维修案例知识库智能排查引导',
    ],
    link: '/solutions/auto',
  },
  {
    id: 'ind-power',
    name: '智慧电力',
    tag: '电网安规 · 视觉巡检',
    title: '智慧电网大模型运检与调度辅助解决方案',
    description: '利用无人机高空巡检多模态视觉识别与电网“两票三制”调度规程大模型专家助手。',
    scenarios: [
      '输电导线断股、绝缘子缺陷视觉自动毫秒级告警',
      '现场作业安全规程语音实时交互与工作票开具',
      '高精度气象出力推演与负荷趋势预测',
    ],
    link: '/solutions/power',
  },
  {
    id: 'ind-energy',
    name: '能源石化',
    tag: '安全生产 · 勘探解译',
    title: '石油化工数字化安全生产与地质辅助解决方案',
    description: '从地下测井曲线智能解译到地上炼化园区周界违规智能安监，大模型落地能源实战。',
    scenarios: [
      '全天候视频流分析，未穿戴劳保用品2秒内告警',
      '多模态测井曲线自动识别油气藏储层特征',
      '大型炼化联合装置运行参数自适应动态优化',
    ],
    link: '/solutions/energy',
  },
  {
    id: 'ind-general',
    name: '通用企业',
    tag: 'AI 工牌 · 销售对练',
    title: '面向全员的高效协同：智能工牌与实战对练',
    description: '为每位员工配备贴身 AI 教练与数字化记录员，革新线下销售培训与沟通质检效能。',
    scenarios: [
      'AI 智能工牌一键语音转录与客户意向结构化分析',
      '挑剔客户 1v1 仿真互动对练系统与多维赛后打分',
      '全自动会议决策提取与钉钉/企微任务协同派发',
    ],
    link: '/solutions/general',
  },
];

// 7. 典型客户与合作伙伴 LOGO 墙（12个脱敏虚构）
export const LOGO_WALL: LogoClient[] = [
  { id: 'logo-1', name: '某头部新能源车企', category: '汽车制造' },
  { id: 'logo-2', name: '华东某省级电网公司', category: '智慧电力' },
  { id: 'logo-3', name: '南方某特大型能源集团', category: '石油化工' },
  { id: 'logo-4', name: '华北某国家级智算中心', category: '算力中心' },
  { id: 'logo-5', name: '某全国性综合运营商', category: '算力运营' },
  { id: 'logo-6', name: '某知名智能客服 SaaS 厂商', category: '企业软件' },
  { id: 'logo-7', name: '某装备制造领军央企', category: '高端装备' },
  { id: 'logo-8', name: '某地市级数字政府创新中心', category: '数字政务' },
  { id: 'logo-9', name: '某全国零售连锁品牌', category: '商业零售' },
  { id: 'logo-10', name: '某信创芯片研发创新联合体', category: '芯片生态' },
  { id: 'logo-11', name: '某互联网金融服务平台', category: '金融科技' },
  { id: 'logo-12', name: '某省级高新技术产业园区', category: '产业平台' },
];

// 8. 客户评价证言
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: '接入众调算力运营平台后，我们的异构集群闲置率从 55% 降至 18%，按月自动核算分成，为基础设施运营提供了极其稳定的业务增量。',
    author: '周总',
    title: '首席技术官',
    company: '某智算中心运营企业',
    tag: '算力运营客户',
  },
  {
    id: 't-2',
    quote: '私有化部署仅用了 3 天就完成了信创机房的适配与验收。零代码工作台让业务一线部门能够自主配置数字员工，落地非常扎实。',
    author: '林总',
    title: '数字化转型负责人',
    company: '某大型装备制造集团',
    tag: '私有化部署客户',
  },
  {
    id: 't-3',
    quote: '大模型网关的多供应商动态容灾与限流策略帮我们顶住了百万级突发调用，延迟透明可控，API 成本相比直连优化了近 30%。',
    author: '张经理',
    title: 'AI 架构师',
    company: '某头部企业级 SaaS 平台',
    tag: '模型网关客户',
  },
];

// 9. 底部行动号召
export const BOTTOM_CTA = {
  title: '立即开启企业级智能体与大模型协同新纪元',
  subtitle: '注册即享专属技术顾问支持与体验额度，亦可申请政企私有化部署环境深度实测。',
  btnPrimaryText: '立即体验',
  btnPrimaryLink: '/models',
  btnSecondaryText: '联系方案架构师',
  btnSecondaryLink: '/services/private-deployment',
};

// 10. 品牌口号
export const BRAND_SLOGAN = {
  slogan: '让 AI 生产力触手可及',
  copyright: '© 2026 众调 AI 生态平台 UnicAgent · 版权所有（原型演示版本，数据均为模拟）',
};

// 11. 页脚结构化链接
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: '产品能力',
    links: [
      { label: '智能体开发平台', url: '/agent-platform' },
      { label: '数字员工平台', url: '/agent-platform/digital-employee' },
      { label: '智能体工作台', url: '/agent-platform/workbench' },
      { label: '智能体开发套件', url: '/agent-platform/suite' },
      { label: '大模型广场', url: '/models' },
      { label: '大模型对比体验', url: '/models/playground' },
    ],
  },
  {
    title: '服务与方案',
    links: [
      { label: 'AI 算力运营服务', url: '/services/compute' },
      { label: '大模型服务网关', url: '/services/gateway' },
      { label: '私有化部署服务平台', url: '/services/private-deployment' },
      { label: '汽车制造解决方案', url: '/solutions/auto' },
      { label: '智慧电力解决方案', url: '/solutions/power' },
      { label: '能源石化解决方案', url: '/solutions/energy' },
      { label: '通用企业解决方案', url: '/solutions/general' },
    ],
  },
  {
    title: '商业与支持',
    links: [
      { label: '套餐购买', url: '/pricing' },
      { label: 'API 充值', url: '/pricing/topup' },
      { label: '开发者文档', url: '/docs' },
      { label: '服务可用性 (SLA)', url: '/docs' },
      { label: '算力伙伴分成细则', url: '/services/compute' },
    ],
  },
];
