import React from 'react';
import { Link } from 'react-router';
import { AgpPage, AgpHero, AgpHead, AgpCta, AgpPricingCards, ChatWindow } from './shared';

/**
 * 产品与平台能力 · 数字员工平台（/agent-platform/digital-employee）
 * 布局语言：任务矩阵 → 横向步骤 → 工作台窗口 → 双面板桥接 → 定价 → CTA
 */
export const DigitalEmployeePage: React.FC = () => {
  const tasks = [
    { ch: '写', title: '写作助理', lead: '协助起草、修改与润色邮件、通知、方案和报告。', res: '成果：结构完整的文稿', c1: '#7C3AED', c2: '#A78BFA' },
    { ch: '会', title: '会议助理', lead: '从会议记录中整理议题、结论与行动项。', res: '成果：会议纪要与待办', c1: '#6366F1', c2: '#8AB4FF' },
    { ch: '研', title: '资料研究员', lead: '梳理指定资料、比较信息、提炼观点与结论。', res: '成果：调研简报与对比表', c1: '#4F46E5', c2: '#8B5CF6' },
    { ch: '数', title: '数据分析员', lead: '从业务表格中汇总数据、比较差异、发现问题。', res: '成果：图表与分析结论', c1: '#7C3AED', c2: '#6366F1' },
    { ch: '知', title: '企业知识助理', lead: '围绕制度、产品与项目资料回答工作问题。', res: '成果：带依据的答案', c1: '#8B5CF6', c2: '#A78BFA' },
    { ch: '报', title: '汇报助理', lead: '将零散材料整理为汇报提纲、内容和讲述思路。', res: '成果：结构化汇报内容', c1: '#6366F1', c2: '#8B5CF6' },
  ];

  const steps = [
    { title: '提供任务与资料', lead: '描述工作目标，补充周报、会议记录或参考材料。' },
    { title: '数字员工处理', lead: '理解任务要求，组织内容并生成可查看的工作成果。' },
    { title: '查看、调整、使用', lead: '继续完善内容，转为下一步工作输入或交付物。' },
  ];

  const tiles = [
    { task: '写材料', a: '写作助理', b: '汇报助理' },
    { task: '查资料', a: '资料研究员', b: '企业知识助理' },
    { task: '看数据', a: '数据分析员', b: '结果解读' },
  ];

  return (
    <AgpPage>
      <AgpHero
        eyebrow="数字员工平台 / 面向办公使用者"
        title={<>为日常工作<br /><span className="grad">配备你的数字员工</span></>}
        lead="写材料、整理会议、查资料、分析数据。选择适合任务的数字员工，说明需求、提供资料，让 AI 协助你完成工作。"
        primary={{ label: '体验数字员工', href: '#agp-employee-tasks' }}
        secondary={{ label: '查看套餐', href: '#agp-pricing' }}
        visual={
          <ChatWindow
            title="汇报助理"
            badge="任务示意"
            input="请根据这些项目周报，整理本月进展、主要风险和下月计划。"
            output="项目月度总结"
            chips={['项目进展', '风险清单', '下月计划']}
          />
        }
      />

      {/* 01 按任务选择：任务矩阵 */}
      <section className="agp-sec" id="agp-employee-tasks">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="01 / 按任务选择" title="这些工作，交给数字员工协助" lead="从常见办公任务开始，选择合适的 AI 助手，获得可以继续使用的工作成果。" />
          </div>
          <div className="agp-task-grid">
            {tasks.map((t) => (
              <article className="agp-task reveal" style={{ '--c1': t.c1, '--c2': t.c2 } as React.CSSProperties} key={t.title}>
                <span className="agp-task__ic" aria-hidden="true">{t.ch}</span>
                <h3>{t.title}</h3>
                <p>{t.lead}</p>
                <span className="agp-task__res">{t.res}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 任务到成果：横向步骤 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="02 / 任务到成果" title="从一句需求，到一份工作成果" lead="让用户看见一次完整的工作交付：提供材料与要求，生成结果，再按需要调整使用。" />
          </div>
          <div className="agp-steps reveal">
            {steps.map((s, i) => (
              <React.Fragment key={s.title}>
                <div className="agp-step">
                  <span className="agp-step__no">{`0${i + 1}`}</span>
                  <h3>{s.title}</h3>
                  <p>{s.lead}</p>
                </div>
                {i < steps.length - 1 && <div className="agp-step__arrow" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 03 统一工作入口：工作台窗口（截图式示意） */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="03 / 统一工作入口" title="围绕工作任务，使用不同的 AI 助手" lead="通过统一入口选择应用、提交资料、获得结果，让 AI 服务于每天的具体工作。" />
          </div>
          <div className="agp-win agp-workspace reveal" aria-label="数字员工工作台示意">
            <div className="agp-win__bar">
              <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
              <b>数字员工工作台</b>
              <span className="agp-win__badge">入口示意</span>
            </div>
            <div className="agp-workspace__body">
              <aside className="agp-workspace__side">
                <span className="is-on">我的数字员工</span>
                <span>常用任务</span>
                <span>工作成果</span>
              </aside>
              <div className="agp-workspace__main">
                <small>根据任务，选择合适的助手</small>
                <div className="agp-ws-tiles">
                  {tiles.map((t) => (
                    <div className="agp-ws-tile" key={t.task}>
                      <b>{t.task}</b>
                      <span>{t.a}</span>
                      <span>{t.b}</span>
                    </div>
                  ))}
                </div>
                <p className="agp-workspace__more">
                  需要专属应用？ <Link to="/agent-platform/workbench">去智能体工作台 →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 个性化业务应用：双面板桥接 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="04 / 个性化业务应用" title="让数字员工更懂你的业务" lead="当通用应用无法完全满足需要时，可以配置业务知识、处理要求与工作流，再发布为团队可用的数字员工。" />
          </div>
          <div className="agp-bridge reveal">
            <div className="agp-bridge__panel">
              <h3>智能体工作台</h3>
              <p>配置模型、知识库与工作流，构建专属业务应用。</p>
              <Link to="/agent-platform/workbench"><b>了解智能体工作台</b></Link>
            </div>
            <div className="agp-bridge__mid" aria-hidden="true" />
            <div className="agp-bridge__panel">
              <h3>数字员工平台</h3>
              <p>将应用发布给实际使用者，按任务进入并持续使用。</p>
              <Link to="/agent-platform"><b>查看发布方式</b></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 费用与权益 */}
      <AgpPricingCards
        tag="05 / 费用与权益"
        title="按需选择套餐，积分灵活使用"
        lead="订阅套餐与 API 充值均可获得通用积分，支持平台内使用与外部 API 调用。"
        cards={[
          { pill: '适合持续使用', title: '订阅套餐', lead: '面向持续使用需求，选择套餐并获得相应积分与权益。', link: '查看订阅套餐', to: '/pricing' },
          { pill: '适合灵活补充', title: 'API 充值', lead: '按需补充积分，灵活满足平台使用与外部调用需求。', link: '了解积分规则', to: '/pricing/topup' },
        ]}
        shared={{ left: '套餐积分', right: '充值积分', parts: ['平台内使用', '外部 API 调用'] }}
      />

      <AgpCta
        title="从一项日常任务开始，体验数字员工的帮助"
        lead="先完成一件具体的工作，再逐步找到适合团队的应用方式。"
        primary={{ label: '体验数字员工', href: '#agp-employee-tasks' }}
        secondary={{ label: '查看套餐', to: '/pricing' }}
      />
    </AgpPage>
  );
};
