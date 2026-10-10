import React from 'react';
import { Link } from 'react-router';
import { AgpPage, AgpHero, AgpHead, AgpCta, AgpActionsBand, ChatWindow, AgpIcon } from './shared';

/**
 * 产品与平台能力 · 平台总览（/agent-platform）
 * 布局语言：产品矩阵 → 旅程管线 → 能力栈 → 行动带 → CTA
 */
export const AgentPlatformHome: React.FC = () => {
  const products = [
    {
      to: '/agent-platform/digital-employee',
      cls: 'agp-prod--emp',
      icon: 'person' as const,
      role: '面向办公与业务使用者',
      title: '数字员工平台',
      lead: '找到合适的 AI 助手，协助写作、整理会议、查询知识与分析数据。',
      link: '探索数字员工',
    },
    {
      to: '/agent-platform/workbench',
      cls: 'agp-prod--wb',
      icon: 'flow' as const,
      role: '面向业务人员与应用搭建者',
      title: '智能体工作台',
      lead: '配置模型、参数、知识库与工作流，将业务经验转化为智能体应用。',
      link: '了解工作台',
    },
    {
      to: '/agent-platform/suite',
      cls: 'agp-prod--kit',
      icon: 'code' as const,
      role: '面向开发人员与技术团队',
      title: '智能体开发套件',
      lead: '组合智能能力与业务逻辑，满足复杂场景的定制开发与系统集成需要。',
      link: '了解开发套件',
    },
  ];

  const journey = [
    { icon: 'gear' as const, title: '智能体工作台 / 开发套件', lead: '可视化配置，或代码开发与系统集成。' },
    { icon: 'spark' as const, title: '智能体应用', lead: '承载业务知识、处理逻辑与可复用的工作流程。', mid: true },
    { icon: 'release' as const, title: '数字员工 / 业务系统', lead: '发布供用户使用，或结合业务完成集成。' },
  ];

  const stack = [
    { icon: 'spark' as const, title: '模型能力', lead: '按任务选择模型，为应用提供智能支持。', c1: '#7C3AED', c2: '#A78BFA' },
    { icon: 'book' as const, title: '业务知识', lead: '结合企业资料，让应用理解业务背景。', c1: '#6366F1', c2: '#8AB4FF' },
    { icon: 'flow' as const, title: '工作流程', lead: '组织任务步骤，让多步处理符合业务要求。', c1: '#4F46E5', c2: '#8B5CF6' },
    { icon: 'code' as const, title: '代码集成', lead: '连接现有系统，将智能能力融入业务操作。', c1: '#7C3AED', c2: '#6366F1' },
  ];

  return (
    <AgpPage>
      <AgpHero
        className="agp-hero--overview"
        eyebrow="智能体开发平台 / 总览"
        title={<>从智能体开发到<br /><span className="grad agp-hero__title-line">数字员工应用，让 AI 融入业务</span></>}
        lead="直接使用数字员工，自主配置智能体，或通过代码完成系统集成。让业务需求转化为可用的 AI 应用。"
        primary={{ label: '体验智能体应用', to: '/agent-platform/digital-employee' }}
        secondary={{ label: '探索平台能力 ↓', href: '#agp-overview-products' }}
        visual={
          <ChatWindow
            title="企业知识助理"
            badge="应用示意"
            input="新项目启动，需要准备哪些材料？"
            output="项目启动准备清单"
            chips={['业务知识', '智能体应用', '工作成果']}
          />
        }
      />

      {/* 01 选择使用方式：产品矩阵 */}
      <section className="agp-sec" id="agp-overview-products">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="01 / 选择使用方式" title="选择适合你的 AI 使用方式" lead="办公使用、业务搭建、代码开发，都有清晰的起点。" />
          </div>
          <div className="agp-prod-grid">
            {products.map((p) => (
              <Link to={p.to} className={`agp-prod ${p.cls} reveal`} key={p.title}>
                <span className="agp-prod__ic"><AgpIcon name={p.icon} /></span>
                <span className="agp-prod__role">{p.role}</span>
                <h3>{p.title}</h3>
                <p>{p.lead}</p>
                <b>{p.link}</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 02 连接开发与使用：旅程管线 */}
      <section className="agp-sec agp-sec--soft">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="02 / 连接开发与使用" title="让开发成果，走进实际工作" lead="两种构建方式可按需求独立选择，形成智能体应用后，再发布给用户使用或接入现有业务系统。" />
          </div>
          <div className="agp-pipeline reveal">
            {journey.map((n, i) => (
              <React.Fragment key={n.title}>
                <div className={`agp-pipeline__node${n.mid ? ' agp-pipeline__node--mid' : ''}`}>
                  <i><AgpIcon name={n.icon} /></i>
                  <h3>{n.title}</h3>
                  <p>{n.lead}</p>
                </div>
                {i < journey.length - 1 && <div className="agp-pipeline__arrow" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 03 平台能力支撑：能力栈 */}
      <section className="agp-sec">
        <div className="wrap">
          <div className="reveal">
            <AgpHead tag="03 / 平台能力支撑" title="连接模型、知识与业务流程" lead="为不同应用提供支撑，把智能能力与业务需求结合起来。" />
          </div>
          <div className="agp-stack reveal">
            <div className="agp-stack__rail" aria-hidden="true" />
            {stack.map((s, i) => (
              <div className="agp-stack__row" style={{ '--c1': s.c1, '--c2': s.c2 } as React.CSSProperties} key={s.title}>
                <i><AgpIcon name={s.icon} /></i>
                <h3>{s.title}</h3>
                <p>{s.lead}</p>
                <em>{`0${i + 1}`}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 灵活付费 */}
      <AgpActionsBand
        tag="04 / 灵活付费"
        title="两种付费方式，积分通用"
        lead="订阅套餐与 API 充值均可获得积分，支持平台内使用与外部 API 调用。"
        actions={[{ label: '查看订阅套餐', to: '/pricing' }, { label: 'API 充值', to: '/pricing/topup' }]}
      />

      <AgpCta
        title="找到你的起点，让 AI 开始服务业务"
        lead="从一项工作任务，或一个业务需求开始。"
        primary={{ label: '体验智能体应用', to: '/agent-platform/digital-employee' }}
        secondary={{ label: '进入智能体工作台', to: '/agent-platform/workbench' }}
      />
    </AgpPage>
  );
};
