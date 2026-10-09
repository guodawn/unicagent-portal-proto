import React from 'react';
import { Link } from 'react-router';
import { AgpPage, AgpHero, AgpHead, AgpCta, AgpActionsBand, CodeWindow, AgpIcon, type AgpIconName } from './shared';

/**
 * 产品与平台能力 · 智能体开发套件（/agent-platform/suite）
 * 布局语言：深色 hero + 代码窗口 → 编号接入方式 → 能力组合图 → 系统网格 → 集成示例 → 开发资源 → 行动带 → CTA
 */
export const SuitePage: React.FC = () => {
  const ways: { icon: AgpIconName; title: string; lead: string }[] = [
    { icon: 'plug', title: '调用已有智能体', lead: '将智能体应用的处理结果接入业务页面与服务流程。' },
    { icon: 'code', title: '开发自定义逻辑', lead: '根据业务要求编写处理逻辑，组合智能能力与系统接口。' },
    { icon: 'gear', title: '集成现有系统', lead: '在已有应用中引入知识问答、内容生成和智能分析能力。' },
  ];

  const comboA = [
    { icon: 'spark' as const, title: '模型调用', lead: '完成基础智能处理' },
    { icon: 'book' as const, title: '知识服务', lead: '结合企业资料提供依据' },
  ];
  const comboB = [
    { icon: 'chat' as const, title: '应用调用', lead: '复用已配置的智能体能力' },
    { icon: 'tool' as const, title: '工具连接', lead: '与业务服务进行协同' },
  ];

  const systems = [
    { icon: 'building' as const, title: '企业办公系统', lead: '提供知识查询、材料处理与内容辅助。', c1: '#7C3AED', c2: '#A78BFA' },
    { icon: 'headset' as const, title: '客户服务系统', lead: '结合业务知识和服务流程，提供智能支持。', c1: '#6366F1', c2: '#8AB4FF' },
    { icon: 'chart' as const, title: '经营分析系统', lead: '将数据处理与智能分析融入原有界面。', c1: '#4F46E5', c2: '#8B5CF6' },
    { icon: 'portal' as const, title: '企业门户与自有应用', lead: '在统一入口中提供面向用户的智能服务。', c1: '#7C3AED', c2: '#6366F1' },
  ];

  const flow = ['业务端发起请求', '智能体处理', '返回结果', '业务界面展示'];

  const resources = [
    { icon: 'doc' as const, title: '接入指南', lead: '了解调用方式、接入流程与开发准备。', link: '查看接入方案' },
    { icon: 'code' as const, title: '接口文档', lead: '查询请求参数、返回结果与接口说明。', link: '查看开发文档' },
    { icon: 'grid' as const, title: '示例工程', lead: '参考典型场景的调用与集成方式。', link: '浏览示例工程' },
  ];

  return (
    <AgpPage>
      <AgpHero
        eyebrow="智能体开发套件 / 面向代码开发者"
        title={<>用代码拓展智能能力<br /><span className="grad">让 AI 接入业务系统</span></>}
        lead="将模型能力、智能体应用与业务逻辑结合，通过代码完成定制开发和系统集成，满足复杂业务场景的需要。"
        primary={{ label: '了解接入方案', href: '#agp-suite-ways' }}
        secondary={{ label: '预约咨询', href: '#agp-cta' }}
        visual={
          <CodeWindow
            file="agent-service.ts"
            code={
              <>
                <span className="cm">{'// 调用智能体，接入业务系统'}</span>{'\n'}
                <span className="kw">const</span> result = <span className="kw">await</span> agent.<span className="fn">run</span>({'{'}{'\n'}
                {'  '}query: <span className="str">"查询项目启动准备材料"</span>,{'\n'}
                {'  '}knowledge: <span className="str">"project-space"</span>{'\n'}
                {'}'});{'\n'}
                <span className="kw">return</span> result.answer;
              </>
            }
            output="项目启动准备清单"
          />
        }
      />

      {/* 01 开发方式：编号列表 */}
      <section className="agp-sec" id="agp-suite-ways">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="01 / 开发方式" title="面向不同开发需求，选择合适的接入方式" lead="让开发者先理解目标，再判断是调用已有应用、编写自定义逻辑，还是将智能能力嵌入现有系统。" />
          </div>
          <div className="agp-ways reveal">
            {ways.map((w, i) => (
              <Link to="/docs" className="agp-way" key={w.title}>
                <em>{`0${i + 1}`}</em>
                <i><AgpIcon name={w.icon} /></i>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.lead}</p>
                </div>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 02 能力组合：组合图 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="02 / 能力组合" title="连接智能能力与业务代码" lead="围绕模型调用、应用调用、知识服务与业务接口组织开发，让 AI 的理解与生成能力进入已有程序。" />
          </div>
          <div className="agp-combo reveal">
            <div className="agp-combo__col">
              {comboA.map((c) => (
                <div className="agp-combo__box" key={c.title}>
                  <b><AgpIcon name={c.icon} />{c.title}</b>
                  <small>{c.lead}</small>
                </div>
              ))}
            </div>
            <div className="agp-combo__op" aria-hidden="true">＋</div>
            <div className="agp-combo__col">
              {comboB.map((c) => (
                <div className="agp-combo__box" key={c.title}>
                  <b><AgpIcon name={c.icon} />{c.title}</b>
                  <small>{c.lead}</small>
                </div>
              ))}
            </div>
            <div className="agp-combo__op" aria-hidden="true">→</div>
            <div className="agp-combo__col">
              <div className="agp-combo__box agp-combo__box--result">
                <b><AgpIcon name="code" />业务逻辑</b>
                <small>形成面向具体任务的应用</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 系统集成：系统网格 */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="03 / 系统集成" title="让 AI 出现在业务需要的地方" lead="以业务系统类别说明可接入的应用场景。" />
          </div>
          <div className="agp-sys-grid">
            {systems.map((s) => (
              <article className="agp-sys reveal" style={{ '--c1': s.c1, '--c2': s.c2 } as React.CSSProperties} key={s.title}>
                <i><AgpIcon name={s.icon} /></i>
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 集成示例：调用链 + 页面内嵌 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="04 / 集成示例" title="从一次调用，到完整业务体验" lead="以企业知识助手为例，说明智能服务如何在原有系统中接收问题、返回结果并被用户继续使用。" />
          </div>
          <div className="agp-integr reveal">
            <div className="agp-integr__flow">
              {flow.map((f, i) => (
                <React.Fragment key={f}>
                  <span>{f}</span>
                  {i < flow.length - 1 && <i aria-hidden="true">→</i>}
                </React.Fragment>
              ))}
            </div>
            <div className="agp-integr__demo">
              <div className="agp-integr__page" aria-label="原有业务页面示意">
                <div className="bar"><i /><i /><i /><em>business.example.com</em></div>
                <div className="content">
                  <div className="agp-lines"><i style={{ width: '38%', height: 12 }} /></div>
                  <div className="agp-lines"><i style={{ width: '86%' }} /><i style={{ width: '74%' }} /><i style={{ width: '66%' }} /></div>
                  <div className="agp-integr__embed">
                    <i>AI</i>
                    <span>企业知识助手 · 已就绪</span>
                  </div>
                </div>
              </div>
              <div className="agp-integr__note">
                <h3>集成后，用户无需离开原有系统</h3>
                <p>在熟悉的业务页面获取智能服务结果；具体接口、认证及运行方式由开发资料统一说明。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 开发资源 */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="05 / 开发资源" title="从接入说明开始，逐步完成开发" lead="门户提供入口和概览；请求参数、返回结果、语言与协议等具体信息进入对应开发资料。" />
          </div>
          <div className="agp-res-list reveal">
            {resources.map((r) => (
              <Link to="/docs" className="agp-res" key={r.title}>
                <i><AgpIcon name={r.icon} /></i>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.lead}</p>
                </div>
                <b>{r.link}　→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 调用与支持 */}
      <AgpActionsBand
        tag="06 / 调用与支持"
        title="平台使用与外部调用，积分通用"
        lead="订阅套餐与 API 充值均可获得通用积分，支持平台内使用与外部 API 调用。"
        actions={[{ label: '查看定价', to: '/pricing' }, { label: 'API 充值', to: '/pricing/topup' }, { label: '预约咨询', href: '#agp-cta' }]}
      />

      <div id="agp-cta">
        <AgpCta
          title="把智能体能力，接入你的下一项业务"
          lead="从一个明确的业务系统与智能任务开始，逐步完成开发、集成与交付。"
          primary={{ label: '了解接入方案', href: '#agp-suite-ways' }}
          secondary={{ label: '预约咨询', href: '#agp-cta' }}
        />
      </div>
    </AgpPage>
  );
};
