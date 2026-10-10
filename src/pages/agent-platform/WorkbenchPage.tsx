import React, { useState } from 'react';
import { AgpPage, AgpHero, AgpHead, AgpCta, AgpActionsBand, BuilderWindow, AgpIcon, type AgpIconName } from './shared';

/**
 * 产品与平台能力 · 智能体工作台（/agent-platform/workbench）
 * 布局语言：模板画廊 → 交互式配置 → 方式对比 → 垂直时间轴 → 发布桥接 → 行动带 → CTA
 */

type ConfigArt = { kind: 'model' } | { kind: 'role' } | { kind: 'knowledge' } | { kind: 'flow' };

const CONFIGS: { icon: AgpIconName; title: string; lead: string; label: string; art: ConfigArt }[] = [
  { icon: 'spark', title: '模型与参数', lead: '根据任务选择模型，调整生成表现，匹配不同业务需要。', label: '模型选择', art: { kind: 'model' } },
  { icon: 'person', title: '角色与指令', lead: '明确智能体职责、回答要求与输出形式。', label: '角色设定', art: { kind: 'role' } },
  { icon: 'book', title: '知识库', lead: '接入业务资料，为问答与内容处理提供知识依据。', label: '知识接入', art: { kind: 'knowledge' } },
  { icon: 'flow', title: '工作流', lead: '组织任务步骤与规则，让多步骤业务按流程执行。', label: '流程编排', art: { kind: 'flow' } },
];

function ConfigArt({ art }: { art: ConfigArt }) {
  if (art.kind === 'model') {
    return (
      <>
        <div className="agp-cfg-pill">
          {['通用模型', '长文本模型', '行业模型'].map((m, i) => (
            <span key={m} className={i === 1 ? 'is-on' : ''}>{m}</span>
          ))}
        </div>
        <span className="agp-cfg-sub">参数</span>
        <div className="agp-cfg-slider"><small>温度<span>Temperature</span></small><span className="track" style={{ '--fill': '38%' } as React.CSSProperties} /><em>0.7</em></div>
        <div className="agp-cfg-slider"><small>采样范围<span>Top P</span></small><span className="track" style={{ '--fill': '86%' } as React.CSSProperties} /><em>0.9</em></div>
        <div className="agp-cfg-slider"><small>最大输出<span>Max Tokens</span></small><span className="track" style={{ '--fill': '66%' } as React.CSSProperties} /><em>4096</em></div>
      </>
    );
  }
  if (art.kind === 'role') {
    return (
      <>
        <div className="agp-cfg-rolehead">
          <i><AgpIcon name="person" /></i>
          <div className="agp-cfg-roletext">
            <b>汽车销售顾问</b>
            <span>客户接待 · 车型推荐 · 用车答疑</span>
          </div>
        </div>
        <span className="agp-cfg-sub">指令</span>
        <div className="agp-cfg-prompt">
          <small>SYSTEM</small>
          <div className="agp-cfg-text">
            <p>你是一名资深汽车销售顾问，根据客户家庭结构与用车场景推荐合适车型。</p>
            <p>回答需引用车型手册参数；不确定的信息如实说明，并记录为客户线索。</p>
            <p>输出包含：推荐车型、对比要点与下一步跟进建议。</p>
          </div>
        </div>
      </>
    );
  }
  if (art.kind === 'knowledge') {
    const docs = [
      { title: '车型参数手册 2026', meta: 'PDF · 128 页' },
      { title: '试驾话术与流程', meta: 'DOCX · 36 页' },
      { title: '售后政策汇编', meta: 'PDF · 54 页' },
    ];
    return (
      <>
        {docs.map((d) => (
          <div className="agp-cfg-doc" key={d.title}>
            <i><AgpIcon name="doc" /></i>
            <div className="agp-cfg-doctext">
              <b>{d.title}</b>
              <span>{d.meta}</span>
            </div>
            <b aria-label="已接入" />
          </div>
        ))}
        <button type="button" className="agp-cfg-add">
          <i aria-hidden="true">＋</i>
          <span>接入更多业务资料</span>
        </button>
      </>
    );
  }
  return (
    <div className="agp-flow">
      <div className="agp-flow__node agp-flow__node--done" style={{ gridColumn: 1 }}><span className="dot" />开始<em>已完成</em></div>
      <i className="agp-flow__vlink" style={{ gridColumn: 1 }} aria-hidden="true" />
      <div className="agp-flow__node agp-flow__node--done" style={{ gridColumn: 1 }}><span className="dot" />知识检索<em>已完成</em></div>
      <i className="agp-flow__vlink" style={{ gridColumn: 1 }} aria-hidden="true" />
      <div className="agp-flow__node agp-flow__node--run" style={{ gridColumn: 1 }}><span className="dot" />规则判断<em>运行中</em></div>
      <i className="agp-flow__hlink" style={{ gridColumn: 2 }} aria-hidden="true" />
      <div className="agp-flow__branch" style={{ gridColumn: 3 }}><span className="dot" />需人工确认</div>
      <i className="agp-flow__vlink" style={{ gridColumn: 1 }} aria-hidden="true" />
      <div className="agp-flow__node agp-flow__node--wait" style={{ gridColumn: 1 }}><span className="dot" />输出<em>待运行</em></div>
    </div>
  );
}

export const WorkbenchPage: React.FC = () => {
  const [config, setConfig] = useState(0);

  const templates = [
    { cls: 'agp-tpl--chat', title: '企业知识问答', lead: '将制度、产品和项目资料组织为可查询的业务知识。' },
    { cls: 'agp-tpl--check', title: '业务材料预审', lead: '围绕材料要求检查内容，整理问题与补充建议。' },
    { cls: '', title: '报告内容生成', lead: '根据输入资料与输出要求，生成结构化报告。' },
    { cls: '', title: '业务咨询助手', lead: '结合专业知识与处理规则，回答常见业务问题。' },
  ];

  const timeline = [
    { title: '创建应用', lead: '确定业务目标，选择从模板或空白应用开始。' },
    { title: '完善配置并测试', lead: '补充模型、知识、指令与工作流，使用真实问题验证。' },
    { title: '发布使用', lead: '让完成配置的应用进入使用入口，服务更多工作。' },
  ];

  const current = CONFIGS[config];

  return (
    <AgpPage>
      <AgpHero
        eyebrow="智能体工作台 / 面向业务人员与应用搭建者"
        title={<>把业务知识和工作流程<br /><span className="grad">变成智能体应用</span></>}
        lead="自主选择模型、调整参数、配置知识库与工作流，构建适合业务需求的智能体，并发布到数字员工平台使用。"
        primary={{ label: '进入工作台', href: '#agp-wb-templates' }}
        secondary={{ label: '查看应用场景', href: '#agp-wb-templates' }}
        visual={
          <BuilderWindow
            compact
            comps={['开始', '知识检索', '规则判断', '输出']}
            nodes={['提交材料', '提取关键信息', '对照要求检查']}
            result="发现 3 项待补充内容"
          />
        }
      />

      {/* 01 从场景开始：模板画廊 */}
      <section className="agp-sec" id="agp-wb-templates">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="01 / 从场景开始" title="从熟悉的业务场景开始搭建" lead="先从清楚的业务需求出发，将处理规则、知识和工作流程转化为可使用的智能体应用。" />
          </div>
          <div className="agp-tpl-grid">
            {templates.map((t) => (
              <a href="#agp-wb-config" className={`agp-tpl ${t.cls} reveal`} key={t.title}>
                <div className="agp-tpl__view" aria-hidden="true"><i /><i /><i /><i /></div>
                <div className="agp-tpl__body">
                  <h3>{t.title}</h3>
                  <p>{t.lead}</p>
                  <b>使用模板</b>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02 应用配置：交互式配置探索 */}
      <section className="agp-sec agp-sec--soft" id="agp-wb-config">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="02 / 应用配置" title="应用如何工作，由你配置" lead="用四类能力配置智能体，让它的职责、依据和处理方式贴近实际业务。" />
          </div>
          <div className="agp-config reveal">
            <div className="agp-config__tabs" role="tablist" aria-label="应用配置项">
              {CONFIGS.map((c, i) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={config === i}
                  className={`agp-config__tab${config === i ? ' is-active' : ''}`}
                  key={c.title}
                  onClick={() => setConfig(i)}
                  onMouseEnter={() => setConfig(i)}
                >
                  <i><AgpIcon name={c.icon} /></i>
                  <span>
                    <b>{c.title}</b>
                    <small>{c.lead}</small>
                  </span>
                  <em>0{i + 1}</em>
                </button>
              ))}
            </div>
            <div className="agp-config__pane" aria-live="polite">
              <div className="agp-config__art" key={current.title}>
                <span className="agp-config__art-label">{current.label}</span>
                <ConfigArt art={current.art} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 选择搭建方式：双卡对比 */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="03 / 选择搭建方式" title="简单问答，或多步骤处理，都有合适的搭建方式" lead="通过两个并列示例，帮助业务人员判断应该配置知识应用，还是组织一条业务流程。" />
          </div>
          <div className="agp-mode reveal">
            <article className="agp-mode__panel">
              <em>方式一 · 知识问答</em>
              <h3>知识问答</h3>
              <p>适合围绕制度、产品与项目资料回答问题，重点配置模型、指令与知识库。</p>
              <div className="agp-path">
                <span>提出问题</span><i aria-hidden="true">→</i><span>检索资料</span><i aria-hidden="true">→</i><span>组织回答</span>
              </div>
            </article>
            <article className="agp-mode__panel">
              <em>方式二 · 材料预审</em>
              <h3>材料预审</h3>
              <p>适合需要多个处理步骤的任务，重点通过工作流组织检查规则与输出。</p>
              <div className="agp-path">
                <span>提交材料</span><i aria-hidden="true">→</i><span>提取信息</span><i aria-hidden="true">→</i><span>问题清单</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 调试与发布：垂直时间轴 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="04 / 调试与发布" title="边配置，边验证，让应用贴近业务" lead="通过实际问题测试效果、调整知识与指令，再把成熟的应用发布给真正需要它的人。" />
          </div>
          <div className="agp-timeline reveal">
            {timeline.map((t, i) => (
              <div className="agp-tl-item" key={t.title}>
                <small>{`STEP 0${i + 1}`}</small>
                <h3>{t.title}</h3>
                <p>{t.lead}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 连接开发端与使用端：发布桥接 */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="05 / 连接开发端与使用端" title="发布到数字员工平台，让应用服务更多工作" lead="同一个应用在工作台完成配置，再以易用的数字员工形态被团队成员按需使用。" />
          </div>
          <div className="agp-bridge reveal">
            <div className="agp-bridge__panel">
              <h3>开发端：智能体工作台</h3>
              <p>材料预审应用 · 已完成配置与测试</p>
              <div className="agp-bridge__meta">
                <span>模型</span><span>知识库</span><span>规则检查</span><span>问题清单</span>
              </div>
            </div>
            <div className="agp-bridge__mid" aria-hidden="true" />
            <div className="agp-bridge__panel">
              <h3>使用端：数字员工平台</h3>
              <p>用户选择“材料预审助理”，提交资料并获取结果。</p>
              <div className="agp-bridge__meta agp-bridge__meta--path">
                <span>上传材料</span><span>→</span><span>查看检查结果</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 持续使用 */}
      <AgpActionsBand
        tag="06 / 持续使用"
        title="让构建与使用，采用同一套积分体系"
        lead="订阅套餐与 API 充值所得积分通用，支持平台使用与外部调用。"
        actions={[{ label: '进入工作台', href: '#agp-wb-templates' }, { label: '查看使用文档', to: '/docs' }, { label: '查看定价', to: '/pricing' }]}
      />

      <AgpCta
        title="从一个业务需求，开始构建你的智能体"
        lead="从可验证的应用场景开始，把业务知识和流程沉淀为可复用的智能服务。"
        primary={{ label: '进入工作台', href: '#agp-wb-templates' }}
        secondary={{ label: '查看应用场景', href: '#agp-wb-templates' }}
      />
    </AgpPage>
  );
};
