import React, { useState } from 'react';
import { SolPage, SolHero, SolHead, SolCta, SolIcon, SolBillWindow } from './shared';

/**
 * 能源行业解决方案（/solutions/energy）
 * 文案来自 docs/design/agent-products-wireframes.html #energy-page
 * 布局：Hero 班次票据 → 业务域+调度票据（点击切换） → 纵向场景路径 → 管理视角 → CTA
 */
export const EnergySolutionPage: React.FC = () => {
  const [zone, setZone] = useState(0);
  const zones = [
    {
      icon: 'shield' as const,
      label: '安全生产',
      title: '风险识别与作业协同',
      lead: '关联作业票、规程和现场记录，辅助班前交底、风险核验与异常上报。',
      ticket: [
        { label: '风险提示', value: '受限空间作业票待核验', risk: true },
        { label: '关联依据', value: '作业票 · 规程 · 现场记录' },
        { label: '建议动作', value: '班前交底补充 2 项风险' },
        { label: '流转对象', value: '安监 · 班组长' },
      ],
    },
    {
      icon: 'gear' as const,
      label: '资产设备',
      title: '状态诊断与检维修支持',
      lead: '结合设备档案、监测数据和历史案例，形成检查建议与维修知识辅助。',
      ticket: [
        { label: '风险提示', value: '循环泵振动趋势异常', risk: true },
        { label: '关联依据', value: '设备档案 · 监测数据 · 历史案例' },
        { label: '建议动作', value: '生成检维修建议与清单' },
        { label: '流转对象', value: '设备 · 检维修班组' },
      ],
    },
    {
      icon: 'gauge' as const,
      label: '能效运营',
      title: '分析、优化与持续复盘',
      lead: '从能耗波动和运行事件中识别改进空间，支持班组与管理层协同决策。',
      ticket: [
        { label: '风险提示', value: '换热系统能耗偏高', risk: true },
        { label: '关联依据', value: '运行曲线 · 设备台账' },
        { label: '建议动作', value: '优先核查 3 个设备点位' },
        { label: '流转对象', value: '工艺 · 设备 · 班组长' },
      ],
    },
  ];

  const stack = [
    { title: '发现问题', lead: '从实时数据、点检记录、作业票与班组反馈中识别异常、风险和待确认事项。' },
    { title: '理解判断', lead: '调用规程、设备档案、历史案例和工艺知识，生成可解释的排查依据与优先级。' },
    { title: '组织执行', lead: '将建议转为检查清单、处置任务或协同工单，明确责任人、时点与关注项。' },
    { title: '沉淀复盘', lead: '回收处理结果与现场经验，补充知识库和运营规则，提升下一次响应质量。' },
  ];

  const audience = [
    { icon: 'person' as const, title: '现场班组', lead: '快速查资料、做判断、领任务，让经验和规程在现场真正可用。' },
    { icon: 'building' as const, title: '专业部门', lead: '聚合异常、对比案例、追踪整改，把跨系统的信息转为专业研判依据。' },
    { icon: 'chart' as const, title: '运营管理', lead: '观察风险、设备和能效趋势，从单次处置走向持续的运营改善。' },
  ];

  return (
    <SolPage industry="energy">
      <SolHero
        eyebrow="能源行业解决方案 / 安全生产与能效运营"
        title={<>把现场信息转为<br /><span className="grad">可执行的运营动作</span></>}
        lead="面向生产装置、场站和能源管理，融合专业知识、实时数据与作业流程，兼顾安全、效率和持续优化。"
        primaryLabel="预约方案沟通"
        secondary={{ label: '查看运营地图 ↓', href: '#sol-energy-zones' }}
        visual={
          <SolBillWindow
            title="能源运营助手"
            task="任务：汇总今日异常能耗，并提出现场排查优先级"
            output="班次行动清单"
            rows={[
              { label: '风险提示', value: '换热系统能耗偏高', risk: true },
              { label: '建议动作', value: '优先核查 3 个设备点位' },
              { label: '流转对象', value: '工艺 · 设备 · 班组长' },
            ]}
            chips={['异常定位', '规程核验', '工单分派']}
          />
        }
      />

      {/* 01 运营地图：三类业务域 + 调度票据 */}
      <section className="sol-sec" id="sol-energy-zones">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="01 / 运营地图"
              title="围绕安全、资产与能效提供智能服务"
              lead="以三类业务域界定方案边界，点击查看对应的班次任务。"
            />
          </div>
          <div className="sol-zones reveal">
            <div className="sol-zones__list">
              {zones.map((z, i) => (
                <button
                  type="button"
                  key={z.title}
                  className={`sol-zone${i === zone ? ' is-on' : ''}`}
                  aria-pressed={i === zone}
                  onClick={() => setZone(i)}
                >
                  <i className="sol-zone__ic"><SolIcon name={z.icon} /></i>
                  <div>
                    <span className="sol-zone__label">{z.label}</span>
                    <h3>{z.title}</h3>
                    <p>{z.lead}</p>
                  </div>
                </button>
              ))}
            </div>
            <aside className="sol-dispatch" aria-label="当前班次示例任务" aria-live="polite">
              <div className="sol-dispatch__in" key={zone}>
                <span className="sol-dispatch__label">{`当前班次 / ${zones[zone].label}`}</span>
                {zones[zone].ticket.map((d) => (
                  <div key={d.label} className={`sol-dispatch__row${d.risk ? ' sol-dispatch__row--risk' : ''}`}>
                    <span>{d.label}</span>
                    <b>{d.value}</b>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 02 场景路径：纵向处理链 */}
      <section className="sol-sec sol-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="02 / 场景路径"
              title="让现场问题被发现、处置与复盘"
              lead="呈现能源场景中跨角色、跨系统的处理链路。"
            />
          </div>
          <div className="sol-stack reveal">
            {stack.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="sol-stack__step">
                  <div className="sol-stack__key">
                    <em aria-hidden="true">{`0${i + 1}`}</em>
                    <b>{s.title}</b>
                  </div>
                  <div className="sol-stack__body">
                    <p>{s.lead}</p>
                  </div>
                </div>
                {i < stack.length - 1 && <i className="sol-stack__link" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 03 面向管理 */}
      <section className="sol-sec">
        <div className="wrap">
          <div className="reveal">
            <SolHead
              tag="03 / 面向管理"
              title="服务现场，也支持经营与安全管理"
              lead="从不同层级呈现方案输出，避免智能化停留在单点操作。"
            />
          </div>
          <div className="sol-aud">
            {audience.map((a) => (
              <article className="sol-aud__card reveal" key={a.title}>
                <i className="sol-aud__ic"><SolIcon name={a.icon} /></i>
                <h3>{a.title}</h3>
                <p>{a.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SolCta
        title="从一个现场问题开始，构建跨系统的智能运营"
        lead="从安全作业、设备诊断或能效分析切入，逐步连接更多数据和流程。"
        primaryLabel="获取能源行业方案"
        secondaryLabel="返回行业总览"
      />
    </SolPage>
  );
};
