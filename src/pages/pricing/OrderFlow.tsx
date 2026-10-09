import React, { useEffect, useRef, useState } from 'react';
import {
  CYCLE_MONTHS_TEXT,
  CYCLE_TEXT,
  PRICE_SUFFIX,
  TRANSACTION_CONFIG,
  type BillingCycle,
} from './data';
import {
  activePlanOf,
  bundleById,
  calculateUpgradeRefund,
  formatDate,
  getBundlePauseNotice,
  parsePortalDate,
  planById,
  planPriceForCycle,
  calculatePlanExpiry,
  type PlanSnapshot,
} from './planStore';
import { PayLogo, QrMock, priToast } from './shared';

/* ============================================================
   订单确认弹窗（主套餐 / 资源包两种订单，逻辑与原型一致）
   ============================================================ */

export type OrderTarget =
  | { type: 'PLAN'; planId: string }
  | { type: 'BUNDLE'; bundleId: string; quantity: number };

export const OrderModal: React.FC<{
  target: OrderTarget;
  cycle: BillingCycle;
  snap: PlanSnapshot;
  onClose: () => void;
  onConfirm: (payment: 'wechat' | 'alipay', autoRenew: boolean, quantity: number) => void;
}> = ({ target, cycle, snap, onClose, onConfirm }) => {
  const [payment, setPayment] = useState<'wechat' | 'alipay'>('wechat');
  const [autoRenew, setAutoRenew] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [quantity, setQuantity] = useState(target.type === 'BUNDLE' ? target.quantity : 1);

  const isPlan = target.type === 'PLAN';
  const plan = isPlan ? planById(target.planId) : undefined;
  const bundle = !isPlan ? bundleById(target.bundleId) : undefined;

  if (isPlan && !plan) return null;
  if (!isPlan && !bundle) return null;

  const upgrade = isPlan ? calculateUpgradeRefund(snap, target.planId) : null;
  const active = activePlanOf(snap);

  const confirm = () => {
    if (isPlan && autoRenew && !agreed) {
      priToast('开启自动续费前，请阅读并勾选两份服务协议。');
      return;
    }
    onConfirm(payment, isPlan ? autoRenew : false, quantity);
  };

  const totalCredits = bundle ? bundle.unitCredits * quantity : 0;
  const totalPrice = bundle ? bundle.price * quantity : 0;
  const notice = bundle ? getBundlePauseNotice(snap, bundle) : null;

  const renewalBase = active?.id === plan?.id ? parsePortalDate(snap.expireAt) : null;
  const expiryText = upgrade
    ? `当前套餐有效期至：${formatDate(upgrade.expiry)}`
    : renewalBase
      ? `续订后有效期至：${formatDate(parsePortalDate(calculatePlanExpiry(cycle, renewalBase))!)}`
      : `购买后有效期至：${formatDate(parsePortalDate(calculatePlanExpiry(cycle))!)}`;

  return (
    <div className="pri-overlay" role="dialog" aria-modal="true" aria-label="确认订单">
      <section className="pri-order">
        <div className="pri-order__head">
          <h2>{isPlan ? '确认主套餐订单' : '确认资源包订单'}</h2>
          <button type="button" className="pri-order__close" onClick={onClose} aria-label="关闭">×</button>
        </div>
        <div className="pri-order__body">
          <div className="pri-order__plan">
            <div className="pri-order__level">{isPlan ? plan!.code : 'CR'}</div>
            <div className="pri-order__copy">
              <strong>{isPlan ? plan!.name : bundle!.name}</strong>
              <span>
                {isPlan
                  ? plan!.desc
                  : `单份 ${bundle!.unitCredits.toLocaleString()}积分 · 独立有效期 ${bundle!.validDays} 天`}
              </span>
              <em>
                {isPlan
                  ? expiryText
                  : `支付成功后生效，预计有效至 ${notice ? formatDate(notice.bundleExpiry) : ''}`}
              </em>
            </div>
            <div className="pri-order__price">
              <span>¥{isPlan ? planPriceForCycle(plan!, cycle) : totalPrice}</span>
              <small>{isPlan ? PRICE_SUFFIX[cycle] : '合计'}</small>
            </div>
          </div>

          {isPlan ? (
            <div className="pri-order__meta">
              <div><label>用户类型</label><strong>个人账号</strong></div>
              <div><label>套餐等级</label><strong>{plan!.code}</strong></div>
              <div><label>套餐积分/月</label><strong>{plan!.credits}</strong></div>
              <div><label>模型权益</label><strong>全部模型可用</strong></div>
              <div><label>有效期</label><strong>{CYCLE_MONTHS_TEXT[cycle]}</strong></div>
            </div>
          ) : (
            <div className="pri-order__bundle">
              <div className="pri-order__qty">
                <span>购买数量</span>
                <div className="pri-qty">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
                  <output>{quantity}</output>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)}>＋</button>
                </div>
              </div>
              <div className="pri-order__total">
                <span>合计额度</span>
                <strong>{totalCredits.toLocaleString()}积分</strong>
              </div>
              <p className="pri-order__notice">
                {notice?.needsAcknowledgement
                  ? `资源包有效至 ${formatDate(notice.bundleExpiry)}；主套餐于 ${notice.planExpiry ? formatDate(notice.planExpiry) : ''} 到期后暂停使用，续订后未到期额度自动恢复。资源包有效期不顺延。`
                  : '资源包自支付成功起独立计时，仅在主套餐有效期间可使用。资源包不支持自动续费。'}
              </p>
            </div>
          )}

          {isPlan && upgrade && (
            <div className="pri-refund">
              <div className="pri-refund__title">升级说明</div>
              <p className="pri-refund__desc">升级成功后，系统将按剩余有效天数退还原套餐费用，并立即生效新套餐。</p>
              <div className="pri-refund__flow">
                <div className="pri-refund__card">
                  <i aria-hidden="true">
                    <svg className="rf-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M7 3v3M17 3v3M4.5 9h15M6 5h12a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                  </i>
                  <div><label>原套餐剩余</label><strong>{upgrade.remainingDays} 天</strong></div>
                </div>
                <i className="pri-refund__arrow" aria-hidden="true">→</i>
                <div className="pri-refund__card">
                  <i className="yuan" aria-hidden="true">¥</i>
                  <div><label>预计退款</label><strong>¥{upgrade.refundAmount.toFixed(2)}</strong></div>
                </div>
                <i className="pri-refund__arrow" aria-hidden="true">→</i>
                <div className="pri-refund__card">
                  <i aria-hidden="true">
                    <svg className="rf-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="3.5" y="6" width="17" height="12" rx="2" />
                      <path d="M3.5 10h17M15.5 14h2" />
                    </svg>
                  </i>
                  <div><label>新套餐支付</label><strong>¥{planPriceForCycle(plan!, cycle)}{PRICE_SUFFIX[cycle]}</strong></div>
                </div>
              </div>
              <div className="pri-refund__rules">
                <span><b>退款说明：</b>支付成功后发起，预计 1–3 个工作日原路退回</span>
                <span><b>生效说明：</b>支付成功后，新套餐立即生效，期间可正常使用服务</span>
              </div>
            </div>
          )}

          <div className="pri-order__paytitle">支付方式</div>
          <div className="pri-order__options">
            <button type="button" className={payment === 'wechat' ? 'is-active' : ''} onClick={() => setPayment('wechat')}>
              <PayLogo channel="wechat" />微信支付
            </button>
            <button type="button" className={payment === 'alipay' ? 'is-active' : ''} onClick={() => setPayment('alipay')}>
              <PayLogo channel="alipay" />支付宝支付
            </button>
          </div>

          {isPlan && (
            <>
              <div className="pri-renew">
                <div>
                  <strong>自动续费</strong>
                  <span>套餐到期前自动从当前支付方式扣款，可在账户中心关闭。</span>
                </div>
                <button
                  type="button"
                  className={`pri-switch${autoRenew ? ' on' : ''}`}
                  aria-label="切换自动续费"
                  aria-pressed={autoRenew}
                  onClick={() => setAutoRenew((v) => !v)}
                />
              </div>
              <label className="pri-check">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>开启即表示已阅读并同意《自动续费服务协议》及《支付渠道代扣协议》。</span>
              </label>
            </>
          )}
        </div>
        <div className="pri-order__foot">
          <button type="button" className="btn btn-ghost" onClick={onClose}>取消</button>
          <button type="button" className="btn btn-primary" onClick={confirm}>确认支付</button>
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   收银台视图（二维码 + 倒计时 + 支付状态，逻辑与原型一致）
   ============================================================ */

export const PaymentView: React.FC<{
  chip: string;
  amount: number;
  onPaid: () => void;
  onCancel: () => void;
}> = ({ chip, amount, onPaid, onCancel }) => {
  const [method, setMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [seconds, setSeconds] = useState(TRANSACTION_CONFIG.paymentDeadlineMinutes * 60);
  const [done, setDone] = useState(false);
  const paidRef = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(timer);
          if (!paidRef.current) onCancel();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [onCancel]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  const simulateCallback = () => {
    if (paidRef.current) return;
    paidRef.current = true;
    setDone(true);
    window.setTimeout(onPaid, 420);
  };

  return (
    <section className="pri-paypage">
      <div className="pri-paypage__shell">
        <a
          className="pri-paypage__back"
          href="#pricing-plans"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          ← 返回套餐对比
        </a>
        <div className="pri-paypage__card">
          <h1>完成订单支付</h1>
          <p>请在服务端订单截止时间前完成付款。支付结果以渠道回调验签为准，页面将自动刷新状态。</p>
          <div className="pri-paypage__chip">{chip}</div>
          <div className="pri-paypage__amount">
            <span>应付金额</span>
            <strong>¥{amount}</strong>
          </div>
          <div className="pri-paypage__tabs">
            <button type="button" className={method === 'wechat' ? 'is-active' : ''} onClick={() => setMethod('wechat')}>
              <PayLogo channel="wechat" />微信支付
            </button>
            <button type="button" className={method === 'alipay' ? 'is-active' : ''} onClick={() => setMethod('alipay')}>
              <PayLogo channel="alipay" />支付宝支付
            </button>
          </div>
          <div className="pri-paypage__qrlabel">{method === 'wechat' ? '请使用微信扫码支付' : '请使用支付宝扫码支付'}</div>
          <QrMock />
          <div className="pri-paypage__hint">
            请使用对应渠道扫码支付 <span className="pri-paypage__countdown">剩余 {mm}:{ss}</span>
          </div>
          <div className="pri-paypage__note">支付结果将自动确认，请勿重复付款。</div>
          <div className={`pri-paypage__status${done ? ' done' : ''}`}>
            {done ? '已收到并验证支付回调，正在发放权益' : '等待支付渠道回调'}
          </div>
          <div className="pri-paypage__actions">
            <button type="button" className="btn btn-ghost" onClick={() => setMethod(method === 'wechat' ? 'alipay' : 'wechat')}>
              更换支付方式
            </button>
            <button type="button" className="btn btn-ghost" onClick={onCancel}>取消订单</button>
          </div>
          <button type="button" className="pri-paypage__sim" onClick={simulateCallback}>
            模拟支付回调（原型演示）
          </button>
        </div>
      </div>
    </section>
  );
};

