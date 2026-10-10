import React, { useState } from 'react';
import {
  CYCLE_TEXT,
  FREE_PLAN,
  PLANS,
  PRICE_SUFFIX,
  PRICING_HERO,
  RESOURCE_BUNDLES,
  SUBSCRIPTION_FAQS,
  type BillingCycle,
  type BundleItem,
  type PlanItem,
} from './data';
import {
  activePlanOf,
  bundleById,
  calculateUpgradeRefund,
  formatDate,
  hasEligiblePlanForBundle,
  parsePortalDate,
  planById,
  planOriginalForCycle,
  planPriceForCycle,
  usePlanStore,
  daysUntil,
} from './planStore';
import { BillingToggle, PriPage, PriFaq, PriSuccessModal, PriTabs, priToast } from './shared';
import { OrderModal, PaymentView, type OrderTarget } from './OrderFlow';

/**
 * 定价 · 订阅套餐（/pricing）
 * 逻辑取自《众调AI生态服务平台V0.2.1-API充值》原型 plansView：
 * 周期切换 → 套餐卡（订阅/升级/当前态） → 套餐资源包（主套餐有效方可增购）
 * → 权益对比 → FAQ → 订单确认 → 收银台（二维码/倒计时）→ 支付回调发放权益
 */
export const PlansPage: React.FC = () => {
  const { snap, purchasePlan, purchaseBundle } = usePlanStore();
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [order, setOrder] = useState<OrderTarget | null>(null);
  const [paying, setPaying] = useState<{ chip: string; amount: number; target: OrderTarget; autoRenew: boolean; payment: 'wechat' | 'alipay' } | null>(null);
  const [successCopy, setSuccessCopy] = useState('');

  const active = activePlanOf(snap);
  const activeExpiry = parsePortalDate(snap.expireAt);

  const planAction = (plan: PlanItem): { label: string; disabled: boolean; kind: 'primary' | 'current' | 'disabled' } => {
    if (!active) return { label: '立即订阅', disabled: false, kind: 'primary' };
    if (plan.level === active.level) return { label: '当前套餐', disabled: true, kind: 'current' };
    if (plan.level < active.level) return { label: '不可订阅', disabled: true, kind: 'disabled' };
    return { label: '升级套餐', disabled: false, kind: 'primary' };
  };

  const openPlanOrder = (planId: string) => {
    if (planAction(planById(planId)!).disabled) return;
    setOrder({ type: 'PLAN', planId });
  };

  const openBundleOrder = (bundleId: string) => {
    const bundle = bundleById(bundleId);
    if (!bundle) return;
    if (!active) {
      priToast('请先订阅主套餐后再增购资源包。');
      return;
    }
    if (!hasEligiblePlanForBundle(snap, bundle)) {
      priToast('当前套餐不支持购买该资源包。');
      return;
    }
    setOrder({ type: 'BUNDLE', bundleId, quantity: 1 });
  };

  const handleConfirm = (payment: 'wechat' | 'alipay', autoRenew: boolean, quantity: number) => {
    if (!order) return;
    if (order.type === 'PLAN') {
      const plan = planById(order.planId)!;
      setPaying({ chip: `${plan.name} · ${CYCLE_TEXT[cycle]}`, amount: planPriceForCycle(plan, cycle), target: order, autoRenew, payment });
    } else {
      const bundle = bundleById(order.bundleId)!;
      setPaying({ chip: `${bundle.name} · ${quantity} 份`, amount: bundle.price * quantity, target: { type: 'BUNDLE', bundleId: order.bundleId, quantity }, autoRenew: false, payment });
    }
    setOrder(null);
  };

  const handlePaid = () => {
    if (!paying) return;
    if (paying.target.type === 'BUNDLE') {
      const bundle = bundleById(paying.target.bundleId)!;
      const notice = purchaseBundle(bundle, paying.target.quantity);
      setSuccessCopy(notice.needsAcknowledgement
        ? `${bundle.name} ${paying.target.quantity} 份已发放，有效至 ${formatDate(notice.bundleExpiry)}。主套餐有效至 ${notice.planExpiry ? formatDate(notice.planExpiry) : ''}；到期后资源包暂停，未到期部分将在续订后自动恢复。`
        : `${bundle.name} ${paying.target.quantity} 份已发放，有效至 ${formatDate(notice.bundleExpiry)}。`);
    } else {
      const upgrade = purchasePlan(paying.target.planId, cycle, paying.autoRenew);
      const plan = planById(paying.target.planId)!;
      setSuccessCopy(upgrade
        ? `${plan.name} 已成功开通；原套餐预计退款 ¥${upgrade.refundAmount.toFixed(2)} 已进入退款处理中。`
        : `${plan.name} 已成功开通，套餐权益已更新。`);
    }
    setPaying(null);
  };

  /* 收银台视图（与原型一致：支付期间整页切换） */
  if (paying) {
    return (
      <PriPage>
        <PaymentView chip={paying.chip} amount={paying.amount} onPaid={handlePaid} onCancel={() => setPaying(null)} />
        {successCopy && <PriSuccessModal copy={successCopy} onClose={() => setSuccessCopy('')} />}
      </PriPage>
    );
  }

  const bundleStatus = active && activeExpiry
    ? `主套餐有效至 ${formatDate(activeExpiry)} · 剩 ${daysUntil(activeExpiry)} 天`
    : active ? '主套餐生效中，可增购资源包' : '需先订阅主套餐';

  const compareCols = [FREE_PLAN, ...PLANS];

  return (
    <PriPage>
      {/* 首屏 */}
      <section className="pri-hero">
        <div className="wrap">
          <PriTabs active="subscription" />
          <h1>{PRICING_HERO.subscription.title}</h1>
          <p>{PRICING_HERO.subscription.lead}</p>
          <div className="pri-hero__action">
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </div>
      </section>

      {/* 升级退款状态 */}
      {snap.refund && (
        <div className="wrap">
          <div className={`pri-refundbar ${snap.refund.status}`}>
            <div className="pri-refundbar__main">
              <i aria-hidden="true">↺</i>
              <div>
                <strong>套餐升级退款</strong>
                <p>
                  原 {snap.refund.fromPlanName} 剩余权益退款 ¥{snap.refund.amount.toFixed(2)} 正在原路处理；新套餐已正常生效。
                </p>
              </div>
            </div>
            <span className="pri-refundbar__badge">退款处理中</span>
          </div>
        </div>
      )}

      {/* 套餐卡片 */}
      <section className="pri-sec" id="pricing-plans">
        <div className="wrap">
          <div className="pri-plans">
            {PLANS.map((plan) => {
              const action = planAction(plan);
              const isCurrent = active?.id === plan.id;
              const upgrade = active ? calculateUpgradeRefund(snap, plan.id) : null;
              return (
                <article
                  key={plan.id}
                  className={`pri-plan${plan.recommended ? ' recommended' : ''}${isCurrent ? ' current' : ''} reveal`}
                >
                  {isCurrent && <span className="pri-plan__ribbon">当前套餐</span>}
                  <div className="pri-plan__head">
                    <h2>{plan.name}</h2>
                    <span className="pri-plan__level">{plan.code}</span>
                  </div>
                  <p className="pri-plan__desc" title={plan.desc}>{plan.desc}</p>
                  <div className="pri-plan__price">
                    <strong>¥{planPriceForCycle(plan, cycle)}</strong>
                    <span>{PRICE_SUFFIX[cycle]}</span>
                  </div>
                  <div className="pri-plan__original">
                    {CYCLE_TEXT[cycle]} <del>¥{planOriginalForCycle(plan, cycle)}</del>
                  </div>
                  <div className="pri-plan__benefits">
                    <div className="pri-plan__benefit"><span><i>1</i>套餐积分/月</span><strong>{plan.credits}</strong></div>
                    <div className="pri-plan__benefit"><span><i>2</i>支持智能体</span><strong>{plan.agents} 个</strong></div>
                    <div className="pri-plan__benefit"><span><i>3</i>模型权益</span><strong>全部模型可用</strong></div>
                    <div className="pri-plan__benefit"><span><i>4</i>自动续费</span><strong>支持</strong></div>
                    <div className="pri-plan__benefit"><span><i>5</i>套餐升级</span><strong>支持</strong></div>
                  </div>
                  <div className="pri-plan__agents">
                    {plan.agentNames.map((n) => <span key={n}>{n}</span>)}
                  </div>
                  {upgrade && !action.disabled && (
                    <div className="pri-plan__upgrade">升级预计退款 ¥{upgrade.refundAmount.toFixed(2)}</div>
                  )}
                  <button
                    type="button"
                    className={`btn ${action.kind === 'primary' ? 'btn-primary' : 'btn-ghost'} pri-plan__action${action.kind === 'current' ? ' is-current' : ''}`}
                    disabled={action.disabled}
                    onClick={() => openPlanOrder(plan.id)}
                  >
                    {action.label}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 套餐资源包 */}
      <section className="pri-sec pri-sec--soft">
        <div className="wrap">
          <div className="pri-bundlehead">
            <div className="pri-bundlehead__copy">
              <h2>套餐资源包</h2>
              <p>资源包用于扩充平台内 Agent 与模型的套餐积分，不是独立会员。主套餐到期后，未到期资源包将暂停使用。</p>
            </div>
            <span className={`pri-bundlestatus${active ? ' active' : ''}`}>{bundleStatus}</span>
          </div>
          <div className="pri-bundles">
            {RESOURCE_BUNDLES.map((b: BundleItem) => {
              const eligible = hasEligiblePlanForBundle(snap, b);
              return (
                <article className="pri-bundle reveal" key={b.id}>
                  <h3>{b.name}</h3>
                  <p>{b.desc}</p>
                  <div className="pri-bundle__price">
                    <strong>¥{b.price}</strong>
                    <span>{b.unitCredits.toLocaleString()}积分</span>
                  </div>
                  <div className="pri-bundle__validity">
                    <span>独立有效期</span>
                    <b>{b.validDays} 天</b>
                    <em>支付后独立计时</em>
                  </div>
                  <button
                    type="button"
                    className={`btn ${eligible ? 'btn-primary' : 'btn-ghost'}`}
                    aria-disabled={!eligible}
                    onClick={() => openBundleOrder(b.id)}
                  >
                    立即购买
                  </button>
                </article>
              );
            })}
          </div>
          {snap.bundles.length > 0 && (
            <div className="pri-bundlestock">
              <span className="pri-bundlestock__label">已购资源包</span>
              {snap.bundles.map((s) => (
                <span className="pri-bundlestock__item" key={s.id}>
                  {s.name} × {s.quantity} · 剩余 {s.remaining.toLocaleString()}积分 · 有效至 {formatDate(parsePortalDate(s.expiresAt) || new Date())}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 套餐权益对比 */}
      <section className="pri-sec">
        <div className="wrap">
          <div className="pri-comphead">
            <h2>套餐权益对比</h2>
            <p>对比不同套餐的使用额度与智能体权益，选择更适合当前业务阶段的方案。</p>
          </div>
          <div className="pri-comptable-wrap">
            <table className="pri-comptable">
              <thead>
                <tr>
                  <th scope="col">套餐权益</th>
                  {compareCols.map((p) => <th scope="col" key={p.id}>{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>订阅价格</td>
                  <td>¥0/月</td>
                  {PLANS.map((p) => <td key={p.id}>¥{planPriceForCycle(p, cycle)}{PRICE_SUFFIX[cycle]}</td>)}
                </tr>
                <tr>
                  <td>套餐积分/月</td>
                  {compareCols.map((p) => <td key={p.id}>{p.credits}</td>)}
                </tr>
                <tr>
                  <td>支持智能体</td>
                  {compareCols.map((p) => <td key={p.id}>{typeof p.agents === 'number' ? `${p.agents} 个` : p.agents}</td>)}
                </tr>
                <tr>
                  <td>模型权益</td>
                  <td>仅支持体验</td>
                  {PLANS.map((p) => <td key={p.id}>全部模型可用</td>)}
                </tr>
                <tr>
                  <td>自动续费</td>
                  <td><span className="pri-muted">—</span></td>
                  {PLANS.map((p) => <td key={p.id}><span className="pri-check">✓</span></td>)}
                </tr>
                <tr>
                  <td>套餐升级</td>
                  <td><span className="pri-muted">—</span></td>
                  {PLANS.map((p) => <td key={p.id}><span className="pri-check">✓</span></td>)}
                </tr>
                <tr className="agents-row">
                  <td>可用智能体</td>
                  {compareCols.map((p) => (
                    <td key={p.id}>
                      <div className="pri-agentcopy">
                        {p.agentNames.map((n, i) => (
                          <React.Fragment key={n}>
                            {i > 0 && <br />}
                            {n}
                          </React.Fragment>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ（标题居中，列表与上方内容同宽） */}
      <section className="pri-sec pri-sec--soft">
        <div className="wrap">
          <div className="pri-faqhead">
            <h2>常见问题</h2>
            <p>了解套餐订阅、资源包使用与权益生效规则。</p>
          </div>
          <PriFaq items={SUBSCRIPTION_FAQS} />
        </div>
      </section>

      {order && (
        <OrderModal target={order} cycle={cycle} snap={snap} onClose={() => setOrder(null)} onConfirm={handleConfirm} />
      )}
      {successCopy && <PriSuccessModal copy={successCopy} onClose={() => setSuccessCopy('')} />}
    </PriPage>
  );
};
