import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useProtoReveal } from '@/proto/useProtoReveal';
import './pricing.css';

/* ====================== 轻提示 Toast ====================== */

const TOAST_EVENT = 'pri-toast';

export function priToast(msg: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: msg }));
}

export const PriToastHost: React.FC = () => {
  const [msg, setMsg] = useState('');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const onToast = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setMsg(text);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMsg(''), 2200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);
  if (!msg) return null;
  return <div className="pri-toast" role="status">{msg}</div>;
};

/* ====================== 页签（订阅套餐 / API充值） ====================== */

export const PriTabs: React.FC<{ active: 'subscription' | 'api' }> = ({ active }) => (
  <div className="pri-tabs" role="tablist" aria-label="定价方式">
    <Link
      to="/pricing"
      role="tab"
      aria-selected={active === 'subscription'}
      className={active === 'subscription' ? 'is-active' : ''}
    >
      订阅套餐
    </Link>
    <Link
      to="/pricing/topup"
      role="tab"
      aria-selected={active === 'api'}
      className={active === 'api' ? 'is-active' : ''}
    >
      API充值
    </Link>
  </div>
);

/* ====================== 计费周期切换 ====================== */

export const BillingToggle: React.FC<{ cycle: string; onChange: (c: 'monthly' | 'quarterly' | 'yearly') => void }> = ({
  cycle, onChange,
}) => (
  <div className="pri-cycle">
    <span className="pri-cycle__label">计费周期</span>
    <div className="pri-billing" role="group" aria-label="计费周期">
      {([
        ['monthly', '月付', ''],
        ['quarterly', '季付', ''],
        ['yearly', '年付', '省 2 个月'],
      ] as const).map(([value, label, save]) => (
        <button
          key={value}
          type="button"
          className={cycle === value ? 'is-active' : ''}
          onClick={() => onChange(value)}
        >
          {label}
          {save && <em>{save}</em>}
        </button>
      ))}
    </div>
  </div>
);

/* ====================== FAQ 手风琴 ====================== */

export const PriFaq: React.FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState<number[]>(() => items.map((_, i) => i));
  return (
    <div className="pri-faq__list">
      {items.map((f, i) => {
        const isOpen = open.includes(i);
        return (
          <div className={`pri-faq__item${isOpen ? ' open' : ''}`} key={f.q}>
            <button
              type="button"
              className="pri-faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))}
            >
              {f.q}
              <i aria-hidden="true" />
            </button>
            <div className="pri-faq__a" dangerouslySetInnerHTML={{ __html: f.a }} />
          </div>
        );
      })}
    </div>
  );
};

/* ====================== 二维码示意（21×21 确定性图案，与原型一致） ====================== */

export const QrMock: React.FC = () => {
  const dark = (r: number, c: number) => {
    const finder = (top: number, left: number) =>
      r >= top && r < top + 7 && c >= left && c < left + 7 &&
      (r === top || r === top + 6 || c === left || c === left + 6 || (r >= top + 2 && r <= top + 4 && c >= left + 2 && c <= left + 4));
    return finder(0, 0) || finder(0, 14) || finder(14, 0) || ((r * 13 + c * 7 + r * c) % 5 < 2);
  };
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      cells.push(<i key={`${r}-${c}`} className={dark(r, c) ? 'dark' : ''} />);
    }
  }
  return <div className="pri-qr" aria-label="支付二维码">{cells}</div>;
};

/* ====================== 页面容器 ====================== */

export const PriPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useProtoReveal();
  return (
    <div className="pri">
      {children}
      <PriToastHost />
    </div>
  );
};

/* ====================== 支付Logo角标 ====================== */

export const PayLogo: React.FC<{ channel: 'wechat' | 'alipay' }> = ({ channel }) => (
  <span className={`pri-paylogo ${channel}`}>{channel === 'wechat' ? '微' : '支'}</span>
);

/* ====================== 支付成功弹窗 ====================== */

export const PriSuccessModal: React.FC<{
  copy: string;
  onClose: () => void;
}> = ({ copy, onClose }) => (
  <div className="pri-overlay" role="dialog" aria-modal="true" aria-label="支付完成">
    <div className="pri-modal">
      <div className="pri-modal__ok">✓</div>
      <h3>支付完成</h3>
      <p>{copy}</p>
      <div className="pri-modal__actions">
        <button type="button" className="btn btn-primary" onClick={onClose}>返回套餐对比</button>
      </div>
    </div>
  </div>
);
