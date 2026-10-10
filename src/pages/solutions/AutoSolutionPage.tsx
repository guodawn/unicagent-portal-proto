import React from 'react';
import { ChatWindow } from '../agent-platform/shared';
import { SolPage, SolHero, SolHead, SolCta, SolIcon, SolBoard, type SolScenario } from './shared';

/**
 * 汽车行业解决方案（/solutions/auto）
 * 文案来自 docs/design/agent-products-wireframes.html #auto-page
 * 布局：Hero 对话窗 → 标杆卡 → 横向业务旅程 → 场景看板 → 运营闭环 → CTA
 */
export const AutoSolutionPage: React.FC = () => {
  const benchmarks = [
    {
      glyph: '搜',
      title: '研发智能搜索',
      lead: '面向工程专家统一检索文本、图纸、表格、图片与 3D 等多模态资料，支持参数对比、成本分析、结构化报告和来源追溯。',
      ext: '可延展：技术知识、竞品洞察与决策支持',
    },
    {
      glyph: '牌',
      title: '门店智能工牌',
      lead: '沉淀展厅接待、试乘试驾与客户互动过程，形成会话回溯、流程质检、客户标签与门店经营日报。',
      ext: '可延展：客户洞察、服务质检与渠道经营',
    },
    {
      glyph: '练',
      title: '销售 AI 对练',
      lead: '以车型知识、客户画像和优秀话术构建拟真演练，支持多模式对练、多维评分、逐句复盘和能力成长追踪。',
      ext: '可延展：岗位培训、合规检核与能力运营',
    },
  ];

  const journey = [
    {
      icon: 'gear' as const,
      order: '01 / 产品研发',
      title: '工程知识与决策智能',
      lead: '统一理解技术资料、参数、图纸、图片和车型数据，支持专业检索、多维对比、成本研判与可追溯报告。',
    },
    {
      icon: 'building' as const,
      order: '02 / 渠道经营',
      title: '门店过程与经营洞察',
      lead: '连接展厅接待、试驾、客户互动和业务数据，识别服务执行、客户需求与区域运营中的关键改善点。',
    },
    {
      icon: 'person' as const,
      order: '03 / 客户运营',
      title: '全生命周期服务协同',
      lead: '围绕线索、购车、交付、用车与售后服务，沉淀客户画像、下一步行动和跨触点协同建议。',
    },
    {
      icon: 'layers' as const,
      order: '04 / 组织能力',
      title: '知识沉淀与人才增长',
      lead: '把优秀经验、岗位标准和真实业务反馈转为知识助手、训练场景与能力运营机制，支持规模化复制。',
    },
  ];

  const scenarios: SolScenario[] = [
    {
      no: 'A1',
      title: '研发专家：完成一次跨车型技术研判',
      lead: '以自然语言检索参数、BOM、技术资料和多模态信息，形成有来源依据的对比视图、结论摘要与专业报告。',
      out: {
        title: '研发研判 · 跨车型对比',
        input: <>汇总 2 个车型的<br />参数与结构差异</>,
        chips: ['参数对比', '来源追溯'],
        next: '生成结论摘要与专业报告',
      },
    },
    {
      no: 'A2',
      title: '区域运营：定位一组渠道经营改善机会',
      lead: '聚合门店互动过程、客户标签和服务节点，按区域、门店、人员与议题识别服务短板、客户信号和待办事项。',
      out: {
        title: '区域经营 · 本周改善清单',
        input: <>识别 3 家门店的<br />试驾后跟进缺口</>,
        chips: ['客户信号', '店端任务'],
        next: '分派跟进动作，并回收执行结果',
      },
    },
    {
      no: 'A3',
      title: '客户服务：编排一次跨触点跟进行动',
      lead: '结合客户画像、当前阶段、互动记录和服务规则，生成下一步任务、沟通建议及需要协同的业务角色。',
      out: {
        title: '客户服务 · 跟进行动编排',
        input: <>为增购客户生成<br />下周触达任务</>,
        chips: ['沟通建议', '协同角色'],
        next: '下发跟进任务并同步相关角色',
      },
    },
  ];

  const loop = [
    { icon: 'plug' as const, title: '连接', lead: '接入研发资料、车型数据、客户互动、服务记录和渠道业务系统。' },
    { icon: 'bulb' as const, title: '洞察', lead: '用行业知识和规则理解技术问题、经营信号、客户需求与组织能力缺口。' },
    { icon: 'users' as const, title: '协同', lead: '生成报告、任务、建议和岗位辅助，把判断转为可执行的跨角色行动。' },
    { icon: 'refresh' as const, title: '演进', lead: '回收结果、反馈和优秀案例，持续优化知识、模型、规则与业务标准。' },
  ];

  return (
    <SolPage industry="auto">
      <SolHero
        eyebrow="汽车行业解决方案 / 产销服一体化"
        title={<>贯通汽车产销服全链路<br /><span className="grad">让 AI 服务每个业务现场</span></>}
        lead="覆盖设计研发、生产制造、市场营销、产品销售与售后服务，支持研发提效、线索转化与服务提升。"
        primaryLabel="预约方案沟通"
        secondary={{ label: '查看业务旅程 ↓', href: '#sol-auto-journey' }}
        visual={
          <ChatWindow
            title="门店服务作战台"
            input="客户：家庭增购，关注空间、智驾与置换方案"
            output="销售助手建议"
            chips={['车型匹配', '试驾路线', '权益说明']}
          />
        }
      />

      {/* 01 标杆项目 */}
      <section className="sol-sec">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="01 / 标杆项目"
              title="来自汽车产销服全链路的规模化实践"
              lead="从研发智能搜索到门店智能工牌与销售 AI 对练，形成可复制的行业智能体能力。"
            />
          </div>
          <div className="sol-bench">
            {benchmarks.map((b) => (
              <article className="sol-bench__card reveal" key={b.title}>
                <span className="sol-bench__ic" aria-hidden="true">{b.glyph}</span>
                <h3>{b.title}</h3>
                <p>{b.lead}</p>
                <div className="sol-bench__ext">{b.ext}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 业务地图：横向旅程 */}
      <section className="sol-sec sol-sec--soft" id="sol-auto-journey">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="02 / 业务地图"
              title="覆盖研发、制造、营销、销售与服务"
              lead="围绕产销服全链路连接知识、数据与行动，形成可持续扩展的业务网络。"
            />
          </div>
          <div className="sol-journey reveal">
            <i className="sol-journey__rail" aria-hidden="true" />
            {journey.map((j) => (
              <div className="sol-journey__item" key={j.title}>
                <span className="sol-journey__dot"><SolIcon name={j.icon} /></span>
                <div className="sol-journey__body">
                  <span className="sol-journey__order">{j.order}</span>
                  <h3>{j.title}</h3>
                  <p>{j.lead}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 场景拆解：任务列表 + 输出样例 */}
      <section className="sol-sec">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="03 / 场景拆解"
              title="让每个角色获得一致的智能支持"
              lead="每个场景均保留数据与知识、智能处理、业务结果三层，兼顾当前项目与后续扩展。"
            />
            <p className="sol-hint">点击左侧任务卡，右侧同步展示对应的输出样例</p>
          </div>
          <SolBoard items={scenarios} />
        </div>
      </section>

      {/* 04 运营闭环 */}
      <section className="sol-sec sol-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="04 / 运营闭环"
              title="将业务互动沉淀为运营能力"
              lead="让数据、知识、行动和组织经验持续循环增值。"
            />
          </div>
          <div className="reveal">
            <div className="sol-loop">
              {loop.map((l) => (
                <div className="sol-loop__step" key={l.title}>
                  <i className="sol-loop__ic"><SolIcon name={l.icon} /></i>
                  <h3>{l.title}</h3>
                  <p>{l.lead}</p>
                </div>
              ))}
            </div>
            <div className="sol-loop__back" aria-hidden="true">
              <i />
              <em>结果回流 · 持续循环</em>
              <i />
            </div>
          </div>
        </div>
      </section>

      <SolCta
        title="从一条高价值业务链，构建汽车智能能力"
        lead="从工程知识、渠道运营、客户服务或岗位赋能切入，连接更多数据、流程与业务角色。"
        primaryLabel="获取汽车行业方案"
        secondaryLabel="返回行业总览"
      />
    </SolPage>
  );
};
