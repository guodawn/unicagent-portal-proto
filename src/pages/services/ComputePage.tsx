import React from 'react';
import { useProtoReveal } from '@/proto/useProtoReveal';
import { CheckIcon } from '@/proto/data';

const COOP_CHECK = <CheckIcon sw={3} />;
const WHY_CHECK = <CheckIcon sw={2.5} />;

/** AI 算力运营服务子页（docs/07 §4.2）：Hero → 运营模式 → 提供 → 合作方式 → 为什么 → CTA */
export const ComputePage: React.FC = () => {
  useProtoReveal();

  return (
    <section className="compute-page" id="page-compute">
      <section className="cp-hero">
        <div className="wrap">
          <h1 className="reveal">让算力资源成为持续增长的 AI 服务收入</h1>
          <p className="cp-sub reveal">您提供稳定算力资源，平台负责模型适配、服务封装、客户触达、调用计量与收益结算</p>
          <p className="cp-sub2 reveal">将算力能力转化为可售卖的模型服务、AI 应用服务</p>
        </div>
      </section>

      <section className="cp-flow">
        <div className="wrap">
          <div className="cp-flow-grid">
            {/* 左：叙事 */}
            <div className="cp-flow-left reveal">
              <span className="cp-flow-tag">
                <span className="cp-tg-dot" />
                运营模式
              </span>
              <h2 className="cp-flow-title">
                从算力供给
                <br />
                到<span className="hl">服务收益</span>
              </h2>
              <p className="cp-flow-body">
                将 GPU、NPU 与智算资源接入统一运营体系，通过<b>模型部署</b>、<b>Token 服务</b>
                与应用分发，让每一份算力都转化为可计量、可结算的 AI 服务收入。
              </p>
              <div className="cp-partner-card">
                <span className="pc-label">合作伙伴角色</span>
                <span className="pc-title">算力租赁伙伴</span>
              </div>
            </div>

            {/* 右：5 张层叠卡 */}
            <div className="cp-flow-right reveal">
              <div className="cp-steps">
                <div className="cp-step featured">
                  <span className="cs-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l2.5 5 5.5.5-4 4 1 5.5L12 15l-5 3 1-5.5-4-4 5.5-.5z" />
                    </svg>
                  </span>
                  <div className="cs-text">
                    <div className="cs-title">AI 服务与客户场景</div>
                    <div className="cs-desc">模型 API · 行业智能体 · 企业应用 · 园区服务</div>
                  </div>
                </div>

                <div className="cp-step-arrow">
                  <span className="sa-arrow">↑ 服务分发</span>
                </div>

                <div className="cp-step">
                  <span className="cs-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 6h14M5 12h14M5 18h14" />
                    </svg>
                  </span>
                  <div className="cs-text">
                    <div className="cs-title">AI 服务交付与收益结算</div>
                    <div className="cs-desc">客户服务 · 调用消费 · 收益分成 · 经营分析</div>
                  </div>
                </div>

                <div className="cp-step-arrow">
                  <span className="sa-arrow">↑ Token 运营</span>
                </div>

                <div className="cp-step">
                  <span className="cs-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M9 9h6M9 13h6M9 17h3" />
                    </svg>
                  </span>
                  <div className="cs-text">
                    <div className="cs-title">Token 服务运营</div>
                    <div className="cs-desc">服务封装 · 调用计量 · 套餐管理 · 账单结算</div>
                  </div>
                </div>

                <div className="cp-step-arrow">
                  <span className="sa-arrow">↑ 模型服务化</span>
                </div>

                <div className="cp-step">
                  <span className="cs-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                      <path d="M9 9h6v6H9z" />
                    </svg>
                  </span>
                  <div className="cs-text">
                    <div className="cs-title">模型部署与推理服务</div>
                    <div className="cs-desc">模型适配 · 推理部署 · 弹性调度 · 服务监控</div>
                  </div>
                </div>

                <div className="cp-step-arrow">
                  <span className="sa-arrow">↑ 资源整合</span>
                </div>

                <div className="cp-step">
                  <span className="cs-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="12" rx="2" />
                      <path d="M7 10h2M15 10h2M7 14h10" />
                    </svg>
                  </span>
                  <div className="cs-text">
                    <div className="cs-title">算力资源接入</div>
                    <div className="cs-desc">GPU / NPU · 智算中心 · 云端与本地集群 · 异构资源池</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cp-strip">
            <span>资源统一接入</span>
            <span className="cs-sep">|</span>
            <span>服务统一运营</span>
            <span className="cs-sep">|</span>
            <span>使用统一计量</span>
            <span className="cs-sep">|</span>
            <span>收益统一结算</span>
          </div>
        </div>
      </section>

      <section className="cp-provide">
        <div className="wrap">
          <h2 className="cp-h2 reveal">平台为算力伙伴提供什么</h2>
          <p className="cp-sub3 reveal">
            提供从私有算力接入、大模型部署、Token 服务管理、知识库构建到智能体应用开发与运营结算的一体化平台
          </p>

          <div className="cp-provide-grid">
            <div className="cp-provide-card reveal">
              <h4>算力资源统一接入</h4>
              <ul>
                <li>接入 GPU、NPU、智算集群、云端或本地算力资源。</li>
                <li>统一管理资源状态、可用容量、利用率和服务负载。</li>
                <li>适配不同品牌、不同架构、不同区域的算力环境。</li>
              </ul>
            </div>
            <div className="cp-provide-card reveal">
              <h4>算力转模型服务</h4>
              <ul>
                <li>在算力资源上完成大模型部署、推理服务发布和弹性调度。</li>
                <li>将底层算力封装为可调用的模型 API 能力。</li>
                <li>支持通用模型、行业模型、开源模型及客户专属模型运行</li>
              </ul>
            </div>
            <div className="cp-provide-card reveal">
              <h4>算力转应用服务</h4>
              <ul>
                <li>支撑平台智能体、行业应用和客户私有化部署服务。</li>
                <li>算力伙伴可参与应用服务供给，获得持续调用收入。</li>
                <li>从基础资源供给延伸至 AI 应用服务生态。</li>
              </ul>
            </div>
            <div className="cp-provide-card reveal">
              <h4>统一运营与收益结算</h4>
              <ul>
                <li>统一记录算力使用、模型调用、Token 消费和客户账单。</li>
                <li>支持资源供给、服务调用、合作伙伴等多维经营分析。</li>
                <li>按约定规则自动核算算力服务收益与分成。</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-coop">
        <div className="wrap">
          <h2 className="cp-coop-title reveal">
            <span className="grad-flow">灵活的合作方式</span>
          </h2>
          <div className="cp-coop-grid">
            {/* 卡 1：联合运营 */}
            <div className="cp-coop-card-v2 reveal">
              <div className="cp-coop-head">
                <span className="cp-coop-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <h3 className="cp-coop-title-txt">联合运营</h3>
              </div>
              <p className="cp-coop-desc">适合拥有算力资源，希望快速具备 Token 服务提供能力，与众调AI生态服务平台共同服务终端客户。</p>
              <div className="cp-coop-divider" />
              <p className="cp-coop-label">典型合作方</p>
              <p className="cp-coop-partners">IDC 运营商、区域智算中心、GPU 云服务商、国产芯片厂商等</p>
              <div className="cp-coop-divider" />
              <p className="cp-coop-label">价值收益</p>
              <ul className="cp-coop-benefits">
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>完整的 Token 生产链路，无需自建技术团队
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>同等算力下，推理吞吐量大幅提升
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>按实际服务量结算的收益分成
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>众调AI生态服务平台品牌背书与市场支持
                </li>
              </ul>
              <div className="cp-coop-action">
                <div className="btn-cta-fx-wrap">
                  <button className="btn btn-cta-fx">
                    <span>咨询联合运营合作 →</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 卡 2：算力消纳 / 算力服务化 */}
            <div className="cp-coop-card-v2 reveal">
              <div className="cp-coop-head">
                <span className="cp-coop-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <h3 className="cp-coop-title-txt">算力消纳 / 算力服务化</h3>
              </div>
              <p className="cp-coop-desc">适合已有自建 GPU 集群，希望提升推理效率、降低运维成本，或将冗余资源转化为 Token 服务收益。</p>
              <div className="cp-coop-divider" />
              <p className="cp-coop-label">典型合作方</p>
              <p className="cp-coop-partners">有自建算力的政企客户、大型互联网企业、金融机构、运营商等</p>
              <div className="cp-coop-divider" />
              <p className="cp-coop-label">价值收益</p>
              <ul className="cp-coop-benefits">
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>推理效率大幅提升，同等算力支撑更大业务规模
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>GPU 性能充分发挥，解决适配难题
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>数据在自有环境内运行，满足安全合规要求
                </li>
                <li>
                  <span className="cc-check">{COOP_CHECK}</span>冗余算力可对外提供 Token 服务，形成额外收益
                </li>
              </ul>
              <div className="cp-coop-action">
                <div className="btn-cta-fx-wrap-dark">
                  <button className="btn btn-cta-fx-dark">
                    <span>咨询算力消纳合作 →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-why">
        <div className="wrap">
          <h3 className="reveal">为什么选择我们</h3>
          <ul className="cp-why-list reveal">
            <li>
              <span className="wc-check">{WHY_CHECK}</span>提高算力利用率，降低闲置风险
            </li>
            <li>
              <span className="wc-check">{WHY_CHECK}</span>从算力租赁升级至模型服务和应用服务收入
            </li>
            <li>
              <span className="wc-check">{WHY_CHECK}</span>获得平台的模型、应用、客户和运营能力支持
            </li>
            <li>
              <span className="wc-check">{WHY_CHECK}</span>使用统一计量、账单、对账和分成体系，降低运营成本。
            </li>
            <li>
              <span className="wc-check">{WHY_CHECK}</span>沉淀资源使用和服务经营数据，持续优化资源配置
            </li>
          </ul>
        </div>
      </section>

      <section className="cp-cta">
        <div className="wrap">
          <h2 className="reveal">快速激活算力价值</h2>
          <p className="reveal">
            如果您拥有 GPU、NPU 或智算中心资源，希望将算力转化为可运营、可计量、可持续增长的 AI
            服务收入，欢迎联系我们了解更多
          </p>
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
