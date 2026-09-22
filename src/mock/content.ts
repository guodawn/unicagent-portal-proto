/**
 * 全站文案内容层（唯一入口，规范见 docs/05）。
 * PM 修改文案只改这里；组件只负责渲染。
 * 所有客户名称、评价、指标均为虚构脱敏占位。
 */

export const BRAND = {
  name: '众调 AI 生态平台',
  en: 'UnicAgent',
  slogan: '让 AI 生产力触手可及',
  description: '汇聚算力、模型与智能体能力的企业级 AI 生态平台。',
  contactEmail: 'bd@unicagent.example',
  copyright: '© 2026 众调 AI 生态平台 UnicAgent · 版权所有',
  prototypeNote: '原型演示版本，数据均为模拟',
} as const;

/* ---------------- 顶部导航（docs/03 信息结构） ---------------- */

export interface NavChild {
  label: string;
  path: string;
  description: string;
  tag?: string;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: '首页', path: '/' },
  {
    label: '智能体开发平台',
    path: '/agent-platform',
    children: [
      {
        label: '平台介绍',
        path: '/agent-platform',
        description: '面向办公场景、业务开发者与代码开发者的平台总览',
      },
      {
        label: '数字员工平台',
        path: '/agent-platform/digital-employee',
        description: '办公场景开箱即用的工作台，支持登录体验与购买',
        tag: '开箱即用',
      },
      {
        label: '智能体工作台',
        path: '/agent-platform/workbench',
        description: '面向业务人员，无代码拖拽配置开发智能体',
        tag: '低代码',
      },
      {
        label: '智能体开发套件',
        path: '/agent-platform/suite',
        description: '面向开发人员，代码整合实现复杂智能体与系统集成',
        tag: '面向开发者',
      },
    ],
  },
  {
    label: '大模型广场',
    path: '/models',
    children: [
      {
        label: '模型清单',
        path: '/models',
        description: '所有已部署大模型清单与报价，支持详情抽屉查看',
      },
      {
        label: '大模型体验',
        path: '/models/playground',
        description: '单模型独立体验，同类模型对比体验',
        tag: '对比评测',
      },
    ],
  },
  {
    label: '定价',
    path: '/pricing',
    children: [
      { label: '套餐购买', path: '/pricing', description: '初创版、专业版、旗舰版权益与订购' },
      { label: 'API 充值', path: '/pricing/topup', description: '按量充值阶梯折扣与在线试算' },
    ],
  },
  {
    label: '行业解决方案',
    path: '/solutions/auto',
    children: [
      { label: '汽车行业', path: '/solutions/auto', description: '智能座舱、售后知识库与研发助手' },
      { label: '电力行业', path: '/solutions/power', description: '调度辅助、巡检报告与安规对练' },
      { label: '能源行业', path: '/solutions/energy', description: '生产数据分析与经营决策支持' },
      { label: '通用场景', path: '/solutions/general', description: 'AI 智能工牌、AI 对练等通用场景' },
    ],
  },
  { label: '文档', path: '/docs' },
];

/* ---------------- 首页：公告轮播 ---------------- */

export interface Announcement {
  tag: string;
  text: string;
  path: string;
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    tag: '上新',
    text: '数字员工平台 3.0 发布：覆盖文档、会议、工牌等 30+ 办公场景，开箱即用',
    path: '/agent-platform/digital-employee',
  },
  {
    tag: '模型',
    text: '高速版 DeepSeek-V4 与 GLM-5 系列接入大模型广场，统一 API 按量计费',
    path: '/models',
  },
  {
    tag: '私有化',
    text: '一站式私有化部署服务平台开放预约：完整能力交付 + 运营分成模式',
    path: '/services/private-deployment',
  },
  {
    tag: '生态',
    text: '大模型服务网关开放 Token 提供商接入，上架即运营，收益透明结算',
    path: '/services/gateway',
  },
];

/* ---------------- 首页：Hero ---------------- */

export const HERO = {
  titleLead: '让每个企业都拥有',
  titleHighlight: '自己的 AI 生产力',
  subtitle:
    '众调 AI 生态平台汇聚算力、模型与智能体能力，为企业与开发者提供从接入、开发到运营的一站式 AI 基础设施。',
  primaryCta: { label: '立即体验', path: '/models/playground' },
  secondaryCta: { label: '联系我们' },
} as const;

/* ---------------- 首页：私有化部署横幅 ---------------- */

export const PRIVATE_PROMO = {
  tag: '私有化部署服务平台',
  title: '面向企业集团与地市级政府的一站式平台交付',
  points: ['全栈能力私有化交付', '运营分成模式', '伙伴费用透明可查', '政企级安全合规'],
  cta: { label: '查看方案', path: '/services/private-deployment' },
} as const;

/* ---------------- 首页：产品矩阵（四大能力） ---------------- */

export type MatrixIconKey = 'apps' | 'plaza' | 'cloud' | 'gateway';

export interface MatrixItem {
  icon: MatrixIconKey;
  title: string;
  description: string;
  ctaLabel: string;
  path: string;
}

export const MATRIX_HEAD = {
  title: '全场景 AI 能力矩阵，一站式接入与运营',
  lead: '从算力供给到智能体应用，众调打通 AI 服务全链路',
} as const;

export const MATRIX_ITEMS: MatrixItem[] = [
  {
    icon: 'apps',
    title: '智能体开发平台',
    description: '数字员工、智能体工作台与开发套件，覆盖办公人员、业务人员到开发者的全场景智能体开发。',
    ctaLabel: '立即体验',
    path: '/agent-platform',
  },
  {
    icon: 'plaza',
    title: '大模型广场',
    description: '全量已部署大模型清单与实时报价，支持单模型体验与同类模型对比评测。',
    ctaLabel: '前往广场',
    path: '/models',
  },
  {
    icon: 'cloud',
    title: 'AI 算力运营服务',
    description: '面向算力租赁提供商，算力接入、智能调度与商业化运营一站式托管，闲置算力持续变现。',
    ctaLabel: '了解详情',
    path: '/services/compute',
  },
  {
    icon: 'gateway',
    title: '大模型服务网关',
    description: '面向 Token 提供商，统一接入标准与高并发路由，模型上架即运营，收益账单透明分成。',
    ctaLabel: '了解详情',
    path: '/services/gateway',
  },
];

/* ---------------- 首页：六大优势 ---------------- */

export type AdvantageIconKey = 'shield' | 'plaza' | 'apps' | 'billing' | 'share' | 'globe';

export interface Advantage {
  icon: AdvantageIconKey;
  title: string;
  description: string;
  metric?: string;
}

export const ADVANTAGES_HEAD = {
  title: '为什么选择众调 AI 生态平台',
  lead: '成熟的企业级平台能力，让 AI 落地更简单、更可控',
} as const;

export const ADVANTAGES: Advantage[] = [
  {
    icon: 'shield',
    title: '安全合规',
    description: '私有化部署与计算、网络、存储隔离，满足政企级等保与行业合规要求。',
  },
  {
    icon: 'plaza',
    title: '多模型聚合',
    description: '主流开源与商业模型一站式接入，统一 API、统一计费、统一体验。',
  },
  {
    icon: 'apps',
    title: '低代码智能体',
    description: '可视化拖拽编排，业务人员无需写代码即可开发数字员工与智能体。',
    metric: '两周上线',
  },
  {
    icon: 'billing',
    title: '灵活计费',
    description: '按量计费、资源包、预留实例多种模式，成本可视、可预算、可优化。',
  },
  {
    icon: 'share',
    title: '运营分成共赢',
    description: '算力方、模型方与平台多方分成，账期透明、结算高效。',
    metric: '月度结算',
  },
  {
    icon: 'globe',
    title: '全栈国产化',
    description: '适配国产算力与模型，从芯片到应用全栈自主可控。',
  },
];

/* ---------------- 首页：行业解决方案轮播 ---------------- */

export interface Industry {
  key: string;
  emoji: string;
  name: string;
  headline: string;
  scenarios: string[];
  path: string;
}

export const INDUSTRIES_HEAD = {
  title: '面向不同行业，提供成熟落地方案',
  lead: '从行业知识库到业务智能体，开箱即用',
} as const;

export const INDUSTRIES: Industry[] = [
  {
    key: 'auto',
    emoji: '🚗',
    name: '汽车行业',
    headline: '智能网联汽车数字化',
    scenarios: ['智能座舱车载问答', '售后知识库与工单辅助', '研发设计知识助手'],
    path: '/solutions/auto',
  },
  {
    key: 'power',
    emoji: '⚡',
    name: '电力行业',
    headline: '电力电网智能化升级',
    scenarios: ['电网调度辅助决策', '设备巡检报告自动生成', '安全规程 AI 对练'],
    path: '/solutions/power',
  },
  {
    key: 'energy',
    emoji: '🔋',
    name: '能源行业',
    headline: '能源企业生产运营提质',
    scenarios: ['生产数据智能分析', '能耗优化与碳排管理', '经营决策支持'],
    path: '/solutions/energy',
  },
  {
    key: 'general',
    emoji: '💼',
    name: '通用场景',
    headline: '通用企业场景开箱即用',
    scenarios: ['AI 智能工牌', '销售 / 客服 AI 对练', '办公数字员工'],
    path: '/solutions/general',
  },
];

/* ---------------- 首页：LOGO 墙（虚构脱敏） ---------------- */

export const LOGO_WALL_HEAD = '典型客户与合作伙伴';

export const LOGO_WALL: string[] = [
  '某头部车企集团',
  '华东某省级电网',
  '南方某能源集团',
  '华北某地市政务云',
  '某全国性股份制银行',
  '某大型装备制造集团',
  '某省交通投资集团',
  '某三甲医院',
  '某双一流高校',
  '某运营商省级公司',
  '某物流科技企业',
  '某大型保险集团',
];

/* ---------------- 首页：客户评价（虚构脱敏） ---------------- */

export interface Testimonial {
  quote: string;
  company: string;
  role: string;
}

export const TESTIMONIALS_HEAD = {
  title: '客户如何评价众调',
  lead: '来自制造、电网与算力伙伴的真实反馈（示例数据）',
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: '私有化平台 8 周完成交付，3000 名员工日常使用数字员工处理文档与会议纪要，IT 支撑人力投入下降约 40%。',
    company: '某大型装备制造集团',
    role: 'CIO',
  },
  {
    quote: '业务同事用智能体工作台自己搭出合规问答机器人，两周内上线，全程没有占用研发排期。',
    company: '华东某省级电网',
    role: '数字化负责人',
  },
  {
    quote: '算力接入众调平台后，闲置资源利用率提升 35%，分成账单清晰透明，每月结算准时到账。',
    company: '某算力服务商',
    role: '运营总监',
  },
];

/* ---------------- 首页：底部 CTA ---------------- */

export interface BottomCtaItem {
  title: string;
  description: string;
  ctaLabel: string;
  path: string;
}

export const BOTTOM_CTA: BottomCtaItem[] = [
  {
    title: '快速获取您的智能体服务',
    description: '注册即体验大模型广场与数字员工平台',
    ctaLabel: '立即体验',
    path: '/models/playground',
  },
  {
    title: '获取私有化与行业方案',
    description: '政企交付与运营分成模式一对一咨询',
    ctaLabel: '联系我们',
    path: '/services/private-deployment',
  },
];

/* ---------------- 页脚（docs/04 §11） ---------------- */

export interface FooterLink {
  label: string;
  path: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: '产品',
    links: [
      { label: '智能体开发平台', path: '/agent-platform' },
      { label: '数字员工平台', path: '/agent-platform/digital-employee' },
      { label: '智能体工作台', path: '/agent-platform/workbench' },
      { label: '智能体开发套件', path: '/agent-platform/suite' },
      { label: '大模型广场', path: '/models' },
      { label: '大模型体验', path: '/models/playground' },
    ],
  },
  {
    title: '服务与方案',
    links: [
      { label: 'AI 算力运营服务', path: '/services/compute' },
      { label: '大模型服务网关', path: '/services/gateway' },
      { label: '私有化部署服务平台', path: '/services/private-deployment' },
      { label: '行业解决方案', path: '/solutions/auto' },
      { label: '套餐购买', path: '/pricing' },
      { label: 'API 充值', path: '/pricing/topup' },
    ],
  },
  {
    title: '支持',
    links: [
      { label: '文档中心', path: '/docs' },
      { label: '登录 / 控制台', path: '/login' },
      { label: '用户协议', path: '/agreement' },
      { label: '隐私政策', path: '/privacy' },
    ],
  },
];
