/* ============================================================
   定价模块数据（文案与数值取自《众调AI生态服务平台V0.2.1-API充值》原型）
   订阅套餐 / 套餐资源包 / API充值 / FAQ / 支付配置
   ============================================================ */

export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface PlanItem {
  id: string;
  groupId: string;
  level: number;
  code: string;
  name: string;
  desc: string;
  monthly: number;
  quarterly: number;
  yearly: number;
  originalMonthly: number;
  originalQuarterly: number;
  originalYearly: number;
  credits: string;
  agents: number;
  agentNames: string[];
  features: string[];
  recommended?: boolean;
}

export const PLANS: PlanItem[] = [
  {
    id: 'basic',
    groupId: 'personal-general',
    level: 1,
    code: 'L1',
    name: '个人通用智能体套餐-基础版',
    desc: '适合个人用户入门使用，满足日常智能体需求。',
    monthly: 89,
    quarterly: 249,
    yearly: 890,
    originalMonthly: 99,
    originalQuarterly: 297,
    originalYearly: 1068,
    credits: '500积分/月',
    agents: 1,
    agentNames: ['智能搜索'],
    features: ['自动续费', '套餐升级'],
  },
  {
    id: 'pro',
    groupId: 'personal-general',
    level: 2,
    code: 'L2',
    name: '个人通用智能体套餐-专业版',
    desc: '更高额度与更多智能体，满足进阶办公与分析场景。',
    monthly: 269,
    quarterly: 759,
    yearly: 2690,
    originalMonthly: 299,
    originalQuarterly: 897,
    originalYearly: 3228,
    credits: '5,000积分/月',
    agents: 2,
    agentNames: ['智能搜索', '智能工牌'],
    features: ['自动续费', '套餐升级'],
    recommended: true,
  },
  {
    id: 'flagship',
    groupId: 'personal-general',
    level: 3,
    code: 'L3',
    name: '个人通用智能体套餐-旗舰版',
    desc: '面向高频个人用户，提供更高额度与完整智能体能力。',
    monthly: 509,
    quarterly: 1439,
    yearly: 5090,
    originalMonthly: 599,
    originalQuarterly: 1797,
    originalYearly: 6108,
    credits: '20,000积分/月',
    agents: 3,
    agentNames: ['智能搜索', '智能工牌', 'AI 对练'],
    features: ['自动续费', '套餐升级', '优先咨询'],
  },
];

export const FREE_PLAN = {
  id: 'free',
  level: 0,
  name: 'Free',
  credits: '—',
  agents: '仅支持体验',
  autoRenew: false,
  upgrade: false,
  agentNames: ['智能搜索体验'],
};

export interface BundleItem {
  id: string;
  groupId: string;
  name: string;
  desc: string;
  unitCredits: number;
  price: number;
  validDays: number;
}

export const RESOURCE_BUNDLES: BundleItem[] = [
  { id: 'credits-1000', groupId: 'personal-general', name: '轻量套餐资源包', desc: '按需补充日常任务用量。', unitCredits: 1000, price: 39, validDays: 90 },
  { id: 'credits-5000', groupId: 'personal-general', name: '标准套餐资源包', desc: '适合阶段性高频使用。', unitCredits: 5000, price: 169, validDays: 180 },
  { id: 'credits-20000', groupId: 'personal-general', name: '高频套餐资源包', desc: '为持续使用预留更充足额度。', unitCredits: 20000, price: 599, validDays: 365 },
];

/** 原型内为运营后台已发布快照；生产环境由商品与交易配置接口返回。 */
export const TRANSACTION_CONFIG = { paymentDeadlineMinutes: 30, availableChannels: ['wechat', 'alipay'] as const };

export const CYCLE_TEXT: Record<BillingCycle, string> = { monthly: '月付', quarterly: '季付', yearly: '年付' };
export const PRICE_SUFFIX: Record<BillingCycle, string> = { monthly: '/月', quarterly: '/季', yearly: '/年' };
export const CYCLE_MONTHS_TEXT: Record<BillingCycle, string> = { monthly: '1 个月', quarterly: '3 个月', yearly: '12 个月' };

/* ====================== 页签与首屏文案 ====================== */

export const PRICING_HERO = {
  subscription: {
    kicker: '订阅套餐',
    title: '选择适合你的订阅套餐',
    lead: '选择主套餐获得平台使用资格与每月套餐积分；需要更多用量时，可在有效主套餐内增购套餐资源包。',
  },
  api: {
    kicker: 'API 充值',
    title: '灵活充值，按量使用模型能力',
    lead: '面向开发接入与模型体验场景。充值获得 API充值积分，可用于外部模型 API 调用和平台内模型体验，积分长期有效。',
  },
} as const;

/* ====================== FAQ（订阅套餐） ====================== */

export const SUBSCRIPTION_FAQS = [
  {
    q: '关于套餐权益生效规则',
    a: '支付成功后立即生效，订阅到期自动失效。若选择连续付费，订阅到期前一天自动扣费。',
  },
  {
    q: '如何升级会员计划',
    a: '打开订阅套餐，选择更高等级套餐并完成升级支付即可。<br/>升级时，原套餐按剩余有效天数折算退款；新套餐按当前完整价格支付。支付成功后新套餐立即生效，原套餐自动终止并进入退款处理，退款处理中不影响新套餐使用。',
  },
  {
    q: '会员权益有效期是多久',
    a: '月付、季付、年付套餐均按所选订阅周期生效。套餐积分按每个订阅月发放，并在该订阅月末重置，未用积分不结转；具体积分明细由控制台展示。',
  },
  {
    q: '资源包有哪些使用限制',
    a: '资源包不是独立会员，仅可用于平台内 Agent 与模型的套餐积分消费，不能用于外部模型 API。同类资源包可叠加购买，支付成功后不可退订或退款。资源包按商品定义的有效期独立计时；只有同套餐组的主套餐有效时才能使用。主套餐到期后，未到期资源包会暂停；在资源包到期前重新订阅同套餐组主套餐，剩余积分将自动恢复使用，资源包有效期不顺延。系统优先消耗最近到期的可用积分。',
  },
];

/* ====================== API充值页 ====================== */

export const API_FAQS = [
  { q: 'API充值积分有有效期吗？', a: '没有。API充值积分长期有效，可持续使用，直到账户积分消耗完毕。' },
  { q: 'API充值积分可以用于哪些场景？', a: '可用于外部模型 API 调用和平台内模型体验；当前暂不支持智能体应用调用。' },
  { q: 'API充值积分可以购买订阅套餐吗？', a: '不可以。API充值积分与订阅套餐权益相互独立，不可用于购买、续费或升级订阅套餐。' },
];

export const API_SCOPE_CARDS = [
  {
    supported: true,
    head: '支持使用',
    headDesc: '适用于模型按量调用场景',
    items: [
      { title: '外部模型 API 调用', desc: '面向企业系统与开发应用接入模型能力。', state: '可使用' },
      { title: '平台内模型体验', desc: '可用于模型广场与模型体验的按量使用。', state: '可使用' },
    ],
  },
  {
    supported: false,
    head: '暂不支持',
    headDesc: '请使用对应场景的积分或套餐权益',
    items: [
      { title: '智能体应用调用', desc: '可使用套餐积分、套餐资源包积分或平台奖励积分。', state: '不适用' },
      { title: '订阅套餐购买', desc: '订阅套餐需使用对应支付方式完成购买、续费或升级。', state: '不适用' },
    ],
  },
];

export const API_DIFFERENCE_ROWS = [
  { label: '主要场景', sub: '平台内智能体应用、模型体验', api: '外部模型 API、平台内模型体验', kind: 'text' },
  { label: '积分来源', sub: '套餐积分、平台奖励积分', api: 'API充值积分', kind: 'text' },
  { label: '有效期', sub: '按套餐或奖励规则管理', api: '长期有效', kind: 'text' },
  { label: '智能体应用', sub: true, api: '暂不支持', kind: 'check' },
  { label: '模型应用', sub: true, api: true, kind: 'check' },
  { label: '外部模型 API', sub: '不支持', api: true, kind: 'check' },
] as const;
