import React from 'react';
import { useProtoReveal } from '@/proto/useProtoReveal';

interface ArchLayer {
  label: string;
  tone: 'l-purple' | 'l-teal';
  chips: string[];
}

const ARCH_LAYERS: ArchLayer[] = [
  {
    label: '服务对象与行业场景',
    tone: 'l-purple',
    chips: ['企业集团', '地市政府', '国区机构', '能源电力', '汽车制造', '烟草行业'],
  },
  {
    label: '统一 AI 服务门户与业务应用',
    tone: 'l-teal',
    chips: ['统一门户与服务体系', '模型 API 服务', '企业 AI 助手', '行业智能体应用', '业务系统集成'],
  },
  {
    label: '智能体与应用构建',
    tone: 'l-purple',
    chips: ['知识库与 RAG', '智能体编排', '业务工作流', 'Prompt 管理', '工具与插件', '应用发布', '效果评估', '开发接口'],
  },
  {
    label: '组织知识与模型服务',
    tone: 'l-teal',
    chips: ['文档与数据接入', '文档解析清洗', '知识库构建', '多模型接入', '模型部署推理', '模型路由管理', 'Token 用量管理', '模型评测优化'],
  },
  {
    label: '安全治理与运营管理',
    tone: 'l-purple',
    chips: ['组织、用户、权限', '调用审计与追溯', '内容安全与合规', '资源监控与告警', '成本与用量分析', '运营账单与核算'],
  },
  {
    label: '私有算力与部署环境',
    tone: 'l-teal',
    chips: ['本地机器部署', '私有云部署', '专属云部署', '混合云接入', 'GPU / NPU 接入', '异构资源管理', '容器与运行环境', '备份与容灾'],
  },
];

/** 私有化部署服务平台子页（docs/07 §4.3）：Hero → 产品 → 架构 → 优势 → 标语 → CTA */
export const PrivateDeployPage: React.FC = () => {
  useProtoReveal();

  return (
    <section className="private-deploy-page" id="page-private">
      {/* Hero */}
      <section className="pd-hero">
        <div className="pd-deco-ring r1" />
        <div className="pd-deco-ring r2" />
        <div className="pd-hero-inner reveal">
          <h1>
            建设属于<span className="grad-flow">组织自己的 AI 服务平台</span>
          </h1>
          <p className="pd-sub">让您安全可控前提下，持续向内部及生态客户提供 AI 服务</p>
        </div>
      </section>

      {/* 我们的产品 */}
      <section className="pd-products">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>我们的产品</h2>
            <p>提供从私有算力接入、大模型部署、Token 服务管理、知识库构建到智能体应用开发与运营结算的一体化平台</p>
          </div>
          <div className="pd-product-grid">
            <div className="pd-product-card reveal">
              <div className="pd-product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="6" rx="2" />
                  <rect x="3" y="14" width="18" height="6" rx="2" />
                  <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
                </svg>
              </div>
              <h3>异构算力统一接入与运营</h3>
              <p>
                支持 GPU、NPU、智算集群及本地/云端资源统一接入与管理，按组织、项目、服务进行资源分配、调度、监控和成本核算，让算力资源可用、可管、可运营。
              </p>
            </div>
            <div className="pd-product-card reveal">
              <div className="pd-product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
                  <path d="M5 22a7 7 0 0114 0" />
                  <circle cx="12" cy="14" r="2" />
                </svg>
              </div>
              <h3>多模型统一部署与服务化</h3>
              <p>支持开源模型、行业模型、专属模型及外部模型服务的统一接入与管理；将模型快速发布为标准 API 或业务服务，满足不同业务场景的调用需求。</p>
            </div>
            <div className="pd-product-card reveal">
              <div className="pd-product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l3-3 4 4 5-6" />
                </svg>
              </div>
              <h3>AI 服务统一计量</h3>
              <p>统一记录模型调用、智能体使用与资源成本，支持按部门、单位、项目、客户进行额度分配、费用核算、账单管理与运营分析。</p>
            </div>
            <div className="pd-product-card reveal">
              <div className="pd-product-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
                </svg>
              </div>
              <h3>智能体应用与生态持续运营</h3>
              <p>提供知识库、智能体、应用集成和服务运营能力，帮助客户快速构建办公、政务、行业等 AI 应用，并支持算力方、Token 方等生态伙伴统一接入与分成结算。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 私有化 AI 服务平台架构 */}
      <section className="pd-arch">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>私有化 AI 服务平台架构</h2>
            <p>一站式部署、统一服务、统一运营，让组织安全使用并持续扩展 AI 能力</p>
          </div>
          <div className="pd-arch-stack reveal">
            {ARCH_LAYERS.map((layer) => (
              <div className={`pd-arch-layer ${layer.tone}`} key={layer.label}>
                <div className="pd-arch-layer-label">{layer.label}</div>
                <div className="pd-arch-chips">
                  {layer.chips.map((chip) => (
                    <span className="pd-arch-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pd-arch-support reveal">
            <span className="sup-item">支持本地化、专属云与混合云部署</span>
            <span className="sup-sep">|</span>
            <span className="sup-item">数据不出域</span>
            <span className="sup-sep">|</span>
            <span className="sup-item">能力可扩展</span>
            <span className="sup-sep">|</span>
            <span className="sup-item">服务可持续运营</span>
          </div>
        </div>
      </section>

      {/* 产品优势 */}
      <section className="pd-advantages">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>产品优势</h2>
          </div>
          <div className="pd-adv-grid">
            <div className="pd-adv-card reveal">
              <h3>统一建设</h3>
              <p className="pd-adv-sub">一套平台，构建组织级 AI 服务底座</p>
              <ul className="pd-adv-list">
                <li>统一管理算力、模型、Token、知识库、智能体和应用服务</li>
                <li>从基础设施到业务应用形成完整 AI 服务闭环</li>
              </ul>
            </div>
            <div className="pd-adv-card reveal">
              <h3>自主可控</h3>
              <p className="pd-adv-sub">私有化部署，数据、模型与运营权掌握在自己手中</p>
              <ul className="pd-adv-list">
                <li>支持本地、专属云和混合云部署，关键数据可不出域</li>
                <li>模型、知识、应用和服务规则由客户自主配置与管理</li>
              </ul>
            </div>
            <div className="pd-adv-card reveal">
              <h3>服务可运营</h3>
              <p className="pd-adv-sub">不仅完成部署，更让每一项 AI 服务可计量、可核算、可持续经营</p>
              <ul className="pd-adv-list">
                <li>统一计量算力使用、模型调用、Token 消费和智能体服务</li>
                <li>支持收入、成本、伙伴分成和经营数据的统一核算</li>
              </ul>
            </div>
            <div className="pd-adv-card reveal">
              <h3>生态可连接</h3>
              <p className="pd-adv-sub">连接算力、Token 与行业客户，快速形成服务供给能力</p>
              <ul className="pd-adv-list">
                <li>对接算力租赁伙伴，丰富平台底层资源供给</li>
                <li>对接 Token 供应商伙伴，持续扩展模型服务能力</li>
                <li>支持面向下属单位、园区企业和行业客户提供分级 AI 服务</li>
              </ul>
            </div>
            <div className="pd-adv-card reveal">
              <h3>场景可扩展</h3>
              <p className="pd-adv-sub">从一个试点场景，扩展为全组织、全区域的 AI 服务体系</p>
              <ul className="pd-adv-list">
                <li>可先从知识问答、办公助手、政务助手等高价值场景启动</li>
                <li>可逐步扩展至多部门、多单位、多行业应用</li>
                <li>支持建设集团级、地市级或园区级 AI 服务运营平台</li>
              </ul>
            </div>
            <div className="pd-adv-card reveal">
              <h3>持续可演进</h3>
              <p className="pd-adv-sub">模型持续更新、应用持续扩展、运营持续优化</p>
              <ul className="pd-adv-list">
                <li>灵活接入新模型、行业模型及专属模型</li>
                <li>支持从模型 API 到智能体应用的持续迭代</li>
                <li>基于用量、成本、效果和服务数据，持续优化资源配置与运营策略</li>
              </ul>
            </div>
          </div>

          {/* 底部标语 */}
          <div className="pd-tagline reveal">
            <h3>
              让<span className="grad-flow">每一份算力</span>产生价值，让<span className="grad-flow">每一次 AI 服务</span>可持续运营
            </h3>
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="pd-cta">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2>开始构建您的专属 AI 服务平台</h2>
            <p>从私有算力接入、大模型部署到智能体应用与运营结算，我们提供从部署到持续运营的一体化服务</p>
          </div>
          <div className="btn-cta-fx-wrap reveal">
            <button className="btn btn-cta-fx">
              <span>我要合作</span>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
