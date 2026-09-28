import React from 'react';
import { useProtoReveal } from '@/proto/useProtoReveal';

/** 大模型服务网关子页（docs/07 §4.1）：Hero → 吸顶 Tab → 架构图 → 提供 → 收益 → CTA */
export const LlmGatewayPage: React.FC = () => {
  useProtoReveal();

  return (
    <section className="llm-gateway" id="page-llm">
      <div className="lg-hero">
        <div className="wrap">
          <h1 className="reveal">
            让您的模型能力<span className="grad-flow">高效触达</span>更多客户
          </h1>
          <p className="lg-sub reveal">统一接入 · 客户分发 · 调用计量 · 账单管理 — 让模型能力真正成为可运营的服务</p>
        </div>
      </div>

      <div className="lg-tabs-wrap">
        <div className="wrap">
          <div className="lg-tabs reveal">
            <button className="lg-tab" data-target="card-access" type="button">
              统一接入
            </button>
            <button className="lg-tab" data-target="card-distribute" type="button">
              客户分发
            </button>
            <button className="lg-tab active" data-target="card-metering" type="button">
              调用计量
            </button>
            <button className="lg-tab" data-target="card-billing" type="button">
              账单管理
            </button>
          </div>
        </div>
      </div>

      <section className="lg-arch">
        <div className="wrap">
          <h2 className="reveal">大模型服务网关</h2>
          <p className="lg-arch-sub reveal">连接模型供给与 AI 服务消费，让每一次调用可分发、可计量、可结算</p>
          <div className="lg-arch-diagram reveal">
            {/* 供给侧 */}
            <div className="lg-col">
              <div className="lg-panel-supply">
                <div className="lg-panel-title">模型与 Token 服务供给</div>
                <div className="lg-supply-card">
                  <span className="sc-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4L21 20H3L12 4Z" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <div>
                    <div className="sc-title">第三方模型服务</div>
                    <div className="sc-desc">通用、行业与多模态模型</div>
                  </div>
                </div>
                <div className="lg-supply-card">
                  <span className="sc-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <div>
                    <div className="sc-title">专属模型服务</div>
                    <div className="sc-desc">私有模型、行业微调模型</div>
                  </div>
                </div>
                <div className="lg-panel-foot">接入 · 配置 · 分发 · 结算</div>
              </div>
            </div>

            {/* 箭头：接入 */}
            <div className="lg-arrow l">
              <div className="lg-arrow-pill">
                <span className="al-icon">▶</span>
                <span className="al-txt">模型服务接入</span>
              </div>
            </div>

            {/* 网关中心 */}
            <div className="lg-col">
              <div className="lg-panel-gateway">
                <div className="lg-gateway-head">
                  <div className="lg-panel-title">统一模型服务网关</div>
                  <div className="lg-gateway-sub">为模型能力提供统一接入、运营与服务治理</div>
                </div>
                <div className="lg-gateway-body">
                  <div className="lg-feat-grid">
                    <div className="lg-feat-card">
                      <div className="ft-title">统一 API 与协议适配</div>
                      <div className="ft-desc">一次接入，多模型调用</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">智能路由与模型编排</div>
                      <div className="ft-desc">按策略匹配服务能力</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">Token 计量与额度管理</div>
                      <div className="ft-desc">实时记录调用与用量</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">套餐、账单与收益结算</div>
                      <div className="ft-desc">支持多方费用核算</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">流量治理与服务保障</div>
                      <div className="ft-desc">配额、限流、异常降级</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">权限管理与多组织隔离</div>
                      <div className="ft-desc">支持客户、项目、应用分级</div>
                    </div>
                    <div className="lg-feat-card">
                      <div className="ft-title">审计追踪与安全管理</div>
                      <div className="ft-desc">调用记录全程可追溯</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 箭头：分发 */}
            <div className="lg-arrow r">
              <div className="lg-arrow-pill">
                <span className="al-icon">▶</span>
                <span className="al-txt">统一服务分发</span>
              </div>
            </div>

            {/* 消费侧 */}
            <div className="lg-col">
              <div className="lg-panel-demand">
                <div className="lg-panel-title">AI 服务消费侧</div>
                <div className="lg-demand-card">
                  <div className="dc-row">
                    <span className="dc-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="3" width="12" height="18" rx="2" />
                        <path d="M11 18h2" />
                      </svg>
                    </span>
                    <div className="dc-title">企业 AI 应用</div>
                  </div>
                  <div className="dc-desc">业务系统与内部 AI 助手</div>
                </div>
                <div className="lg-demand-card">
                  <div className="dc-row">
                    <span className="dc-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M5 21c0-3.5 3-6.5 7-6.5s7 3 7 6.5" />
                      </svg>
                    </span>
                    <div className="dc-title">行业智能体</div>
                  </div>
                  <div className="dc-desc">面向场景的 AI 服务</div>
                </div>
                <div className="lg-demand-card">
                  <div className="dc-row">
                    <span className="dc-ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
                      </svg>
                    </span>
                    <div className="dc-title">开发者或合作伙伴</div>
                  </div>
                  <div className="dc-desc">API / SDK 服务调用</div>
                </div>
                <div className="lg-panel-foot">调用 · 消费 · 计量 · 反馈</div>
              </div>
            </div>
          </div>

          <div className="lg-strip">
            <span>模型能力统一供给</span>
            <span className="ls-sep">|</span>
            <span>Token 服务统一运营</span>
            <span className="ls-sep">|</span>
            <span>客户消费统一计量</span>
            <span className="ls-sep">|</span>
            <span>合作收益统一结算</span>
          </div>
        </div>
      </section>

      <section className="lg-provide">
        <div className="wrap">
          <h2 className="reveal">我们能提供什么</h2>
          <div className="provide-grid">
            <div className="provide-card reveal" id="card-access">
              <div className="provide-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a3 3 0 0 1 0-4.24l2-2a3 3 0 0 1 4.24 4.24l-1 1" />
                  <path d="M15 12a3 3 0 0 1 0 4.24l-2 2a3 3 0 0 1-4.24-4.24l1-1" />
                </svg>
              </div>
              <h4>模型服务统一接入</h4>
              <ul>
                <li>统一接入不同伙伴的模型服务</li>
                <li>适配不同模型协议，调用参数和计费规则</li>
                <li>将模型能力纳入平台统一模型目录与服务体系</li>
              </ul>
            </div>
            <div className="provide-card reveal" id="card-distribute">
              <div className="provide-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="12" r="2.5" />
                  <circle cx="18" cy="6" r="2.5" />
                  <circle cx="18" cy="18" r="2.5" />
                  <path d="M8.2 10.8 15.8 7.2M8.2 13.2 15.8 16.8" />
                </svg>
              </div>
              <h4>Token 服务统一分发</h4>
              <ul>
                <li>面向个人、企业、园区/机构等客户提供模型能力</li>
                <li>支持按 API 充值、套餐订阅等多种形式售卖</li>
                <li>支持将 Token 服务嵌入到平台智能体、行业应用及私有化项目</li>
              </ul>
            </div>
            <div className="provide-card reveal" id="card-metering">
              <div className="provide-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 17a8 8 0 1 1 16 0" />
                  <path d="M12 17l4-5" />
                  <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <h4>Token 调用计量</h4>
              <ul>
                <li>精细统计输入/输出 Token、请求次数、模型调用和客户用量</li>
                <li>支持额度控制、余量预警、超额策略</li>
              </ul>
            </div>
            <div className="provide-card reveal" id="card-billing">
              <div className="provide-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
                  <path d="M9 8h6M9 12h6M9 16h3" />
                </svg>
              </div>
              <h4>账单与收益分成</h4>
              <ul>
                <li>平台统一生成客户账单、消费明细和结算凭证</li>
                <li>Token 提供商可清晰查看服务收入、平台分成与结算记录</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lg-benefit">
        <div className="wrap">
          <h2 className="reveal">您可以获得什么</h2>
          <div className="benefit-list">
            <div className="benefit-item reveal">
              <span className="benefit-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 11h-6M19 8v6" />
                </svg>
              </span>
              快速获得平台客户、行业场景和区域市场入口
            </div>
            <div className="benefit-item reveal">
              <span className="benefit-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
                </svg>
              </span>
              降低渠道建设、客户运营、计量对账和结算成本
            </div>
            <div className="benefit-item reveal">
              <span className="benefit-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              将模型能力扩展到 API、智能体、行业应用和私有化部署等场景
            </div>
            <div className="benefit-item reveal">
              <span className="benefit-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              获得透明的调用数据、客户数据与收入数据
            </div>
            <div className="benefit-item reveal">
              <span className="benefit-ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M14 7h7v7" />
                </svg>
              </span>
              通过规模化分发提升消费量和持续服务收入
            </div>
          </div>
        </div>
      </section>

      <div className="lg-cta">
        <div className="btn-cta-fx-wrap">
          <button className="btn btn-cta-fx">
            <span>我要合作</span>
          </button>
        </div>
      </div>
    </section>
  );
};
