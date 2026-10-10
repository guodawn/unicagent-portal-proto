import React, { useState } from 'react';
import { useProtoReveal } from '@/proto/useProtoReveal';
import './GeneralSolutionPage.css';

/** 通用行业解决方案（原型 page-general，HTML 3206-3428）：Hero → 两类高频场景 → 四个关键难题 → 闭环 → CTA */

type ScenarioKey = 'practice' | 'badge';

/** 四个关键难题 */
const PROBLEMS = [
  {
    num: '01',
    title: '培训成本高',
    desc: '减少对核心骨干反复带教的依赖，让训练可随时随地开展。',
  },
  {
    num: '02',
    title: '多场景数据缺失',
    desc: 'DCC、电话邀约、展厅接待和试驾缺少真实过程数据，难衡量服务表现。',
  },
  {
    num: '03',
    title: '消费者反馈不足',
    desc: '难识别客户在不同环节的关注点与接受度，服务策略缺少依据。',
  },
  {
    num: '04',
    title: 'SOP 迭代和管理低效',
    desc: '新车型与门店差异带来流程适配压力，数据失真影响总部决策。',
  },
];

/** 从能力建设到业务增长的闭环 */
const STEPS = [
  { num: '01', title: '沉淀标准', desc: '梳理金牌话术、服务规范与全场景销售 SOP。' },
  { num: '02', title: '训练赋能', desc: 'AI 对练帮助员工反复演练、即时纠偏。' },
  { num: '03', title: '现场留痕', desc: '智能工牌采集真实服务过程，连接门店现场。' },
  { num: '04', title: '数据优化', desc: 'SaaS、BI 与标准 API 联动，推动总部和门店协同改善。' },
];

/** AI 对练 / 智能工牌 两套场景面板 */
const SCENARIOS: Record<
  ScenarioKey,
  {
    whiteTitle: string;
    whiteDesc: string;
    features: { title: string; desc: string }[];
    darkTitle: string;
    darkDesc: string;
    loops: { num: string; title: string; desc: string }[];
  }
> = {
  practice: {
    whiteTitle: 'AI 对练：让每一次练习，都更接近实战',
    whiteDesc:
      '以拟真客户与智能检核，帮助员工在零风险环境中高频演练；将销冠经验转化为可复用的标准剧本，让培训从“凭感觉”走向可衡量、可优化。',
    features: [
      { title: '拟真演练', desc: '自定义客户画像与情绪，让应对复杂沟通成为日常训练。' },
      { title: '智能检核', desc: '围绕关键意图、流程与合规要求，自动诊断表达缺口。' },
      { title: '经验沉淀', desc: '萃取优秀话术与话术，把销冠能力转化为组织资产。' },
      { title: '效果可视', desc: '关联能力增长与业务数据，让培训 ROI 看得见。' },
    ],
    darkTitle: 'AI 对练闭环',
    darkDesc: '从场景到复盘，构建可量化的训练闭环。',
    loops: [
      { num: '1', title: '场景构建', desc: '客户角色、产品要点、业务流程与话术标准一键配置。' },
      { num: '2', title: '多模态对练', desc: '支持语音与文本，实时模拟真实客户的追问与异议。' },
      { num: '3', title: '秒级复盘', desc: '生成得分、遗漏项、风险提示与示范话术，指导下一次提升。' },
    ],
  },
  badge: {
    whiteTitle: '智能工牌：让每一次服务，都可分析可优化',
    whiteDesc:
      '智能工牌以多模态感知实时记录一线服务过程，把无形的沟通转化为可分析的数据资产，帮助门店沉淀金牌经验、规范服务标准。',
    features: [
      { title: '实时记录', desc: '音视频、对话与位置数据自动留痕，无需人工介入。' },
      { title: '智能辅助', desc: '服务过程中实时推送话术与知识，提升一线应对能力。' },
      { title: '数据沉淀', desc: '把每一次服务转化为结构化数据，沉淀到知识资产中。' },
      { title: '复盘分析', desc: '自动识别服务亮点与短板，生成个性化提升建议。' },
    ],
    darkTitle: '智能工牌闭环',
    darkDesc: '从现场到总部，让服务数据驱动业务决策。',
    loops: [
      { num: '1', title: '现场留痕', desc: '多模态采集一线服务过程，关键节点自动标记。' },
      { num: '2', title: '智能分析', desc: '识别客户意图、服务质量与销售机会，输出实时洞察。' },
      { num: '3', title: '决策优化', desc: '服务数据回流总部，反哺流程、培训与产品决策。' },
    ],
  },
};

export const GeneralSolutionPage: React.FC = () => {
  useProtoReveal();
  const [scenario, setScenario] = useState<ScenarioKey>('practice');

  const active = SCENARIOS[scenario];

  return (
    <section className="general-solutions-page" id="page-general">
      {/* Hero */}
      <div className="gs-hero">
        <div className="gs-wrap">
          <div className="gs-hero-grid">
            <div className="gs-hero-text reveal">
              <h1>
                以 <span className="gs-accent">AI</span> 重塑服务体验
                <br />
                让一线能力持续进化
              </h1>
              <p className="gs-hero-desc">
                面向销售、服务与现场运营场景，沉淀优秀经验、规范服务过程，并以可量化的数据帮助企业实现人员能力与业务效率的双重提升。
              </p>
              <div className="gs-hero-actions">
                <button type="button" className="gs-btn-primary">
                  预约方案演示
                </button>
                <button type="button" className="gs-btn-outline">
                  查看解决方案
                </button>
              </div>
            </div>
            <div className="gs-hero-visual reveal">
              <div className="gs-orb-wrap">
                <div className="gs-orb-ring" />
                <div className="gs-orb-center">
                  <div className="gs-orb">AI</div>
                </div>
                <div className="gs-orb-card gs-orb-card-1">
                  <div className="gs-orb-card-label">对练</div>
                  <div className="gs-orb-card-sub">能力提升</div>
                </div>
                <div className="gs-orb-card gs-orb-card-2">
                  <div className="gs-orb-card-label">工牌</div>
                  <div className="gs-orb-card-sub">服务辅助</div>
                </div>
                <div className="gs-orb-card gs-orb-card-3">
                  <div className="gs-orb-card-label">数据</div>
                  <div className="gs-orb-card-sub">量化评估</div>
                </div>
                <div className="gs-orb-card gs-orb-card-4">
                  <div className="gs-orb-card-label">经验</div>
                  <div className="gs-orb-card-sub">持续沉淀</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 两类高频场景 */}
      <div className="gs-section">
        <div className="gs-wrap">
          <div className="gs-section-head reveal">
            <h2>两类高频场景，一套能力闭环</h2>
            <p>从员工训练到现场服务，将优秀经验标准化、数字化、可复制。</p>
          </div>
          <div className="gs-tabs reveal">
            <button
              type="button"
              className={`gs-tab${scenario === 'practice' ? ' active' : ''}`}
              onClick={() => setScenario('practice')}
            >
              AI 对练
            </button>
            <button
              type="button"
              className={`gs-tab${scenario === 'badge' ? ' active' : ''}`}
              onClick={() => setScenario('badge')}
            >
              智能工牌
            </button>
          </div>

          <div className="gs-scenario-grid">
            <div className="gs-scenario-card white">
              <h3 className="gs-scenario-title">{active.whiteTitle}</h3>
              <p className="gs-scenario-desc">{active.whiteDesc}</p>
              <div className="gs-feature-grid">
                {active.features.map((f) => (
                  <div className="gs-feature-item" key={f.title}>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="gs-scenario-card dark">
              <h3 className="gs-scenario-title">{active.darkTitle}</h3>
              <p className="gs-scenario-desc">{active.darkDesc}</p>
              <div className="gs-loop-list">
                {active.loops.map((l) => (
                  <div className="gs-loop-item" key={l.num}>
                    <span className="gs-loop-item-num">{l.num}</span>
                    <h4>{l.title}</h4>
                    <p>{l.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 四个关键难题 */}
      <div className="gs-section gs-problems-section">
        <div className="gs-wrap">
          <div className="gs-section-head reveal">
            <h2>回应一线增长的四个关键难题</h2>
            <p>将“人、流程、数据”连接起来，让经验可复制、问题可定位、成效可衡量。</p>
          </div>
          <div className="gs-problems-grid">
            {PROBLEMS.map((p) => (
              <div className="gs-problem-card reveal" key={p.num}>
                <span className="gs-problem-num">{p.num}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 从能力建设到业务增长的闭环 */}
      <div className="gs-section">
        <div className="gs-wrap">
          <div className="gs-section-head reveal">
            <h2>从能力建设到业务增长的闭环</h2>
            <p>以数据贯通“训练—执行—复盘—优化”，让每一次服务都成为组织进化的素材。</p>
          </div>
          <div className="gs-timeline reveal">
            {STEPS.map((s) => (
              <div className="gs-step" key={s.num}>
                <div className="gs-step-circle">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="gs-cta">
        <div className="gs-wrap">
          <div className="gs-cta-content">
            <div className="gs-cta-text">
              <h2>让 AI 成为一线增长的新生产力</h2>
              <p>获取适配您业务场景的通用解决方案与落地建议。</p>
            </div>
            <button type="button" className="gs-cta-btn">
              立即咨询
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
