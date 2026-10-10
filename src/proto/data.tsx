import type { ReactNode } from 'react';

/* ====================== 共享小图标 ====================== */

/** 品牌太阳 mark（header/footer logo 内，白色描边） */
export const LogoMarkSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
  </svg>
);

/** 对勾（cc-check / wc-check 仅线宽不同） */
export function CheckIcon({ sw = 3 }: { sw?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5 9-11" />
    </svg>
  );
}

/* ====================== 导航下拉（首页二级页面） ====================== */

export interface NavDropdownItem {
  path: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

export const NAV_DROPDOWN_ITEMS: NavDropdownItem[] = [
  {
    path: '/services/compute',
    title: 'AI 算力运营服务',
    desc: '助力算力服务化与持续变现',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
      </svg>
    ),
  },
  {
    path: '/services/gateway',
    title: '大模型服务网关',
    desc: '实现模型能力统一分发与结算',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="12" r="2" />
        <path d="M7 6h6M7 18h6M5 8v7M17 12h-7" />
      </svg>
    ),
  },
  {
    path: '/services/private-deployment',
    title: '私有化部署服务平台',
    desc: '构建安全可运营的专属 AI 平台',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 6v6c0 5 4 8 8 10 4-2 8-5 8-10V6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

/* ====================== 「产品与平台能力」气泡菜单（4 个产品页入口） ====================== */

export const AGENT_NAV_ITEMS: NavDropdownItem[] = [
  {
    path: '/agent-platform',
    title: '智能体开发平台',
    desc: '总览 · 选择适合你的 AI 使用方式',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </svg>
    ),
  },
  {
    path: '/agent-platform/digital-employee',
    title: '数字员工平台',
    desc: '面向办公使用者',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      </svg>
    ),
  },
  {
    path: '/agent-platform/workbench',
    title: '智能体工作台',
    desc: '面向业务人员与应用搭建者',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M7 6h10M6.5 7.8L10.8 16M17.5 7.8L13.2 16" />
      </svg>
    ),
  },
  {
    path: '/agent-platform/suite',
    title: '智能体开发套件',
    desc: '面向开发人员与技术团队',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" />
      </svg>
    ),
  },
];

/* ====================== 「行业解决方案」气泡菜单（3 个行业页入口） ====================== */

export const SOLUTION_NAV_ITEMS: NavDropdownItem[] = [
  {
    path: '/solutions/auto',
    title: '汽车行业解决方案',
    desc: '客户全旅程与经销运营',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 13l2-5h14l2 5M5 13h14v5H5zM7.5 18v2M16.5 18v2" />
        <circle cx="8" cy="15.5" r="1" />
        <circle cx="16" cy="15.5" r="1" />
      </svg>
    ),
  },
  {
    path: '/solutions/power',
    title: '电力行业解决方案',
    desc: '设备运检与现场作业',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
      </svg>
    ),
  },
  {
    path: '/solutions/tobacco',
    title: '烟草行业解决方案',
    desc: '供应链与终端经营',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 19C5 10.5 11 4 20 4c0 9-6 15-15 15z" />
        <path d="M5 19c2-5 5-8.5 9-10.5" />
      </svg>
    ),
  },
];

/* ====================== 「定价」气泡菜单（订阅套餐 / API充值） ====================== */

export const PRICING_NAV_ITEMS: NavDropdownItem[] = [
  {
    path: '/pricing',
    title: '订阅套餐',
    desc: '主套餐 + 套餐资源包，按周期订阅',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="15" rx="2.5" />
        <path d="M3 10h18M7 15h5" />
      </svg>
    ),
  },
  {
    path: '/pricing/topup',
    title: 'API充值',
    desc: '按量使用模型能力，积分长期有效',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
      </svg>
    ),
  },
];

/* ====================== 行业解决方案（首页 Tabs） ====================== */

export interface SolutionFeature {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface SolutionPanel {
  key: string;
  label: string;
  tabIcon: ReactNode;
  h3: string;
  img: string;
  alt: string;
  fallback: string;
  features: SolutionFeature[];
  gen: SolutionFeature;
}

export const SOLUTION_PANELS: SolutionPanel[] = [
  {
    key: 'car',
    label: '汽车',
    tabIcon: (
      <>
        <path d="M3 13l2-5h14l2 5M5 13h14v5H5zM7 18v2M17 18v2" />
        <circle cx="8" cy="16" r="1" />
        <circle cx="16" cy="16" r="1" />
      </>
    ),
    h3: '覆盖设计研发、生产制造、市场营销、产品销售与售后服务，以智能体贯通汽车产销服全链路。',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80&auto=format&fit=crop',
    alt: '智能汽车',
    fallback: '🚗',
    features: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 12h16M4 12a8 4 0 0116 0M8 12v4M12 12v6M16 12v4" /></svg>,
        title: '研发智能搜索',
        desc: '检索研发资料与车型数据，辅助研发提效、知识检索和专业决策。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 21V8l9-5 9 5v13M9 21V12h6v9M7 7h10" /></svg>,
        title: '门店智能工牌',
        desc: '沉淀线下销售与服务过程，支持客户互动分析、服务质检和经营复盘。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 17l4-12h6l4 12M7 17h10M9 21h6M12 5v12" /></svg>,
        title: '销售 AI 对练',
        desc: '以产品知识和真实销售场景开展模拟训练，提升线索转化与成交能力。',
      },
    ],
    gen: {
      icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" /></svg>,
      title: '生成定制化场景方案',
      desc: '描述你的业务场景，自动匹配最优的产品组合',
    },
  },
  {
    key: 'finance',
    label: '金融',
    tabIcon: (
      <>
        <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6" />
      </>
    ),
    h3: '以可信、可审计的 AI 能力，提升金融业务审核、客户服务与经营决策效率。',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop',
    alt: '金融',
    fallback: '🏦',
    features: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6M9 14l2 2 4-4" /></svg>,
        title: '合同审核智能体',
        desc: '基于合同条款、企业规则与历史案例，自动识别缺失、冲突及潜在风险条款，并生成审核意见与修订建议。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /><path d="M16 4l2 2 4-4" /></svg>,
        title: '客户洞察智能体',
        desc: '汇聚客户沟通、服务记录与业务信息，构建客户画像，辅助识别需求偏好、服务机会与重点跟进事项。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 5-7" /><path d="M7 19h14M5 5h16" /></svg>,
        title: '财务核算报告生成智能体',
        desc: '自动汇总业务与财务数据，生成标准化报告，支持同比、环比、波动分析与风险说明，提升经营分析效率。',
      },
    ],
    gen: {
      icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h16v16H4zM4 9h16M9 4v16" /></svg>,
      title: '客户运营智能助手',
      desc: '千人千面理财建议与触达，提升客户留存与交叉销售转化。',
    },
  },
  {
    key: 'power',
    label: '电力',
    tabIcon: (
      <>
        <path d="M13 2L4 14h6l-1 8 9-12h-6z" />
      </>
    ),
    h3: '覆盖设备监控、立体巡检、状态评价、检修策略与文档编制，推动电网运检从经验驱动走向数据驱动。',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80&auto=format&fit=crop',
    alt: '电力',
    fallback: '⚡',
    features: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" /><path d="M4 4v12a4 4 0 004 4M9 8h6M9 12h4" /></svg>,
        title: '电网设备知识库智能体',
        desc: '整合设备手册、故障诊断、技术规程与未结构化资料,构建面向运检人员的设备知识问答与辅助决策能力。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 5-7" /><circle cx="7" cy="15" r="1.2" /><circle cx="10" cy="11" r="1.2" /><circle cx="13" cy="13" r="1.2" /><circle cx="18" cy="8" r="1.2" /></svg>,
        title: '设备运行分析智能体',
        desc: '自动解析设备运行数据,识别异常趋势并生成运行分析与隐患研判报告,辅助设备状态监控与运维决策。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 2C8 7 6 11 6 14a6 6 0 0012 0c0-3-2-7-6-12z" /><path d="M12 14l3-3M3 21h18" /></svg>,
        title: '设备立体巡检策略智能体',
        desc: '综合设备状态、人员、无人机与车辆等资源，自动生成巡检点位、路线与计划。',
      },
    ],
    gen: {
      icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 8h10M7 12h6" /></svg>,
      title: '调度辅助决策',
      desc: '负荷预测与故障推演，辅助调度快速定方案、降损失。',
    },
  },
  {
    key: 'tobacco',
    label: '烟草',
    tabIcon: (
      <>
        <path d="M12 2v20M5 9c0-3 3-5 7-5s7 2 7 5M5 9v6c0 3 3 5 7 5s7-2 7-5V9" />
      </>
    ),
    h3: '覆盖烟叶收购、仓储、调拨运输、终端陈列与数字配方，以智能体连接烟草全链路业务。',
    img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=80&auto=format&fit=crop',
    alt: '烟草',
    fallback: '📦',
    features: [
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 7h13v8H3zM16 10h4l1 3v2h-5z" /><circle cx="7" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /><path d="M9 11h4" /></svg>,
        title: '货架陈列识别与断货趋势分析',
        desc: '识别货架陈列合规性、铺货饱满度与断货趋势，辅助市场走访与终端经营。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 22c4-3 7-7 7-12a7 7 0 10-14 0c0 5 3 9 7 12z" /><path d="M9 13l1.5-3M13 13l-1-3M15 9l3-2" /></svg>,
        title: '卷烟库存盘点',
        desc: '自动识别卷烟品类与数量，提升库存盘点效率与准确率。',
      },
      {
        icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 4h12a2 2 0 012 2v14H6a2 2 0 01-2-2V4z" /><path d="M8 8h6M8 12h6M8 16h4" /><circle cx="17" cy="16" r="2" /></svg>,
        title: '预约交烟调度分析',
        desc: '预测交烟节奏，优化烟站调度与现场秩序。',
      },
    ],
    gen: {
      icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M4 19V5M4 19h16M8 19v-6M13 19v-9M18 19v-4" /></svg>,
      title: '经营分析决策',
      desc: '多维度经营看板与预测，辅助管理层科学决策。',
    },
  },
];

/* ====================== 合作伙伴（3 行跑马灯） ====================== */

export interface Partner {
  n: string;
  e: string;
  /** 真实品牌素材，来源见 public/logos/sources.json。 */
  logo: string;
}

export const PARTNER_ROWS: Partner[][] = [
  [
    { n: '比亚迪', e: 'BYD', logo: '/logos/byd.png' },
    { n: '长安汽车', e: 'CHANGAN AUTO', logo: '/logos/changan.svg' },
    { n: '吉利汽车', e: 'GEELY AUTO', logo: '/logos/geely.svg' },
    { n: '上汽集团', e: 'SAIC MOTOR', logo: '/logos/saic.png' },
    { n: '上汽大众', e: 'SAIC VOLKSWAGEN', logo: '/logos/volkswagen.png' },
  ],
  [
    { n: '重庆烟草', e: 'CHONGQING TOBACCO', logo: '/logos/tobacco.gif' },
    { n: '广西烟草', e: 'GUANGXI TOBACCO', logo: '/logos/tobacco.gif' },
    { n: '国家电网', e: 'STATE GRID', logo: '/logos/state-grid.svg' },
    { n: '中国南方电网', e: 'CSG', logo: '/logos/csg.png' },
    { n: '山东电力', e: 'STATE GRID SD', logo: '/logos/state-grid.svg' },
  ],
  [
    { n: '同济大学', e: 'TONGJI UNIVERSITY', logo: '/logos/tongji.svg' },
    { n: '复旦大学', e: 'FUDAN UNIVERSITY', logo: '/logos/fudan.svg' },
    { n: '上海交通大学', e: 'SJTU', logo: '/logos/sjtu.png' },
    { n: '中科院声学所', e: 'IACAS', logo: '/logos/ioa.png' },
    { n: '罗氏', e: 'ROCHE', logo: '/logos/roche.png' },
    { n: '宁德时代', e: 'CATL', logo: '/logos/catl.svg' },
  ],
];

export interface Review {
  title: string;
  quote: string;
  nm: string;
}

export const REVIEWS: Review[] = [
  {
    title: '某大型企业集团',
    quote:
      '我们过去各部门分别尝试 AI 工具、模型、知识和数据分散，难以形成统一能力。通过私有化部署平台，集团能够统一管理模型服务、知识库和智能体应用，并按部门进行权限与用量管理。AI 从零散试点逐步成为可持续运营的基础能力。',
    nm: '数字化平台主管',
  },
  {
    title: '某地市级政府单位',
    quote:
      '对我们而言，AI 建设既要真正服务业务，也要保证数据安全和过程可控。平台支持本地化部署，将政策资料、业务知识和智能应用统一纳入管理，为不同部门提供按需可用的 AI 服务，也为后续规模化推广打下了基础。',
    nm: '信息化建设负责人',
  },
  {
    title: '某能源行业企业',
    quote:
      '行业资料多、专业门槛高，通用模型很难直接满足一线业务需求。我们将专业知识接入平台后，结合智能体应用服务于知识检索、运维辅助和工单处理等场景。平台不仅能用，也能清楚看到服务调用、资源消耗和实际运营情况。',
    nm: '数智化运营负责人',
  },
];
