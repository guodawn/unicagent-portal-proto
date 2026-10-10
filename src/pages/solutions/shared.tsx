import React, { useState } from 'react';
import { Link } from 'react-router';
import { useProtoReveal } from '@/proto/useProtoReveal';
import './solutions.css';
import '../agent-platform/agent-platform.css'; /* 复用 agp-win 窗口骨架 / agp-chips / agp-lines */

/* ====================== 图标库 ====================== */

export type SolIconName =
  | 'car' | 'bolt' | 'leaf' | 'factory'
  | 'search' | 'badge' | 'chat' | 'gear' | 'building' | 'person' | 'users'
  | 'layers' | 'plug' | 'bulb' | 'refresh' | 'route' | 'pulse' | 'tool'
  | 'chart' | 'calendar' | 'box' | 'truck' | 'store' | 'scan' | 'flow'
  | 'database' | 'shield' | 'gauge' | 'alert' | 'clipboard';

const ICON_PATHS: Record<SolIconName, React.ReactNode> = {
  car: <><path d="M3 13l2-5h14l2 5M5 13h14v5H5zM7.5 18v2M16.5 18v2" /><circle cx="8" cy="15.5" r="1" /><circle cx="16" cy="15.5" r="1" /></>,
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6z" />,
  leaf: <><path d="M5 19C5 10.5 11 4 20 4c0 9-6 15-15 15z" /><path d="M5 19c2-5 5-8.5 9-10.5" /></>,
  factory: <path d="M3 21h18M4 21V9l5 3.5V9l5 3.5V5l5 3v13" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></>,
  badge: <path d="M8 3h8v4H8zM5 7h14v13H5zM9 12h6M9 16h4" />,
  chat: <path d="M4 5h16v11H9l-5 4zM8 9h8M8 12.5h5" />,
  gear: <path d="M12 9a3 3 0 110 6 3 3 0 010-6zM12 2.5l1 2.6 2.8-.6.5 2.8 2.6 1-1.2 2.6 1.2 2.6-2.6 1-.5 2.8-2.8-.6-1 2.6-1-2.6-2.8.6-.5-2.8-2.6-1L5.3 12.9 4.1 10.3l2.6-1 .5-2.8 2.8.6z" />,
  building: <path d="M4 21V7l7-4v18M11 21h9V11h-9M14 14h3M14 17.5h3M6.5 10h2M6.5 13.5h2M6.5 17h2" />,
  person: <path d="M12 4.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM5 20c0-3.5 3-6 7-6s7 2.5 7 6" />,
  users: <path d="M8.5 9.5a3 3 0 100-6 3 3 0 000 6zM2.5 19.5c0-3.2 2.7-5.2 6-5.2s6 2 6 5.2M15 4.3a3 3 0 010 5.4M16.5 14.6c2.8.5 4.5 2.4 4.5 4.9" />,
  layers: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 01-5 5 5 5 0 01-5-5zM12 16v5" />,
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.4 10.9c.8.6 1.4 1.3 1.4 2.1h4c0-.8.6-1.5 1.4-2.1A6 6 0 0012 3z" />,
  refresh: <path d="M4 12a8 8 0 0113.7-5.6M20 12a8 8 0 01-13.7 5.6M18 3v4h-4M6 21v-4h4" />,
  route: <><circle cx="5.5" cy="18.5" r="2" /><circle cx="18.5" cy="5.5" r="2" /><path d="M7.5 18.5H14a4 4 0 000-8H9.5a3.5 3.5 0 010-7h6.5" /></>,
  pulse: <path d="M3 12h4l2.5-6.5 4 13 2.5-6.5h5" />,
  tool: <path d="M14.5 6.5a3.5 3.5 0 00-4.6 4.6L4 17l3 3 5.9-5.9a3.5 3.5 0 004.6-4.6l-2.4 2.4-2-2z" />,
  chart: <path d="M4 4v16h16M8 16v-5M12.5 16V8M17 16v-8" />,
  calendar: <path d="M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M8 14h3M8 17.5h3" />,
  box: <path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8" />,
  truck: <path d="M2 6h11v10H2zM13 10h4l3 3v3h-7zM7 19.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6zM17 19.5a1.8 1.8 0 100-3.6 1.8 1.8 0 000 3.6z" />,
  store: <path d="M4.5 9L6 4h12l1.5 5M4.5 9a2.4 2.4 0 004.8 0 2.4 2.4 0 004.8 0 2.4 2.4 0 004.8 0M5.5 11.8V20h13v-8.2M9.5 20v-4.5h5V20" />,
  scan: <path d="M4 8V5.5A1.5 1.5 0 015.5 4H8M16 4h2.5A1.5 1.5 0 0120 5.5V8M20 16v2.5a1.5 1.5 0 01-1.5 1.5H16M8 20H5.5A1.5 1.5 0 014 18.5V16M4 12h16" />,
  flow: <path d="M5 5h5v4H5zM14 15h5v4h-5zM7.5 9v3.5A2.5 2.5 0 0010 15h4" />,
  database: <path d="M12 3c4.4 0 8 1.1 8 2.5S16.4 8 12 8 4 6.9 4 5.5 7.6 3 12 3zM4 5.5v13C4 19.9 7.6 21 12 21s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />,
  shield: <path d="M12 2l8 3v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5zM8.5 11.5l2.5 2.5 4.5-4.5" />,
  gauge: <><path d="M4.5 18.5a9 9 0 1115 0M12 14l4-4.5" /><circle cx="12" cy="14" r="1.2" /></>,
  alert: <path d="M12 3.5L22 21H2zM12 10v4.5M12 17.8v.4" />,
  clipboard: <path d="M9 4h6v3H9zM5 7h14v13H5zM9 12h6M9 16h4" />,
};

export const SolIcon: React.FC<{ name: SolIconName; className?: string }> = ({ name, className }) => (
  <svg
    className={className ? `sol-svg ${className}` : 'sol-svg'}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICON_PATHS[name]}
  </svg>
);

/* ====================== 页面容器 ====================== */

export type SolIndustry = 'auto' | 'power' | 'tobacco' | 'energy';

export const SolPage: React.FC<{ industry: SolIndustry; children: React.ReactNode }> = ({ industry, children }) => {
  useProtoReveal();
  return <div className={`sol sol--${industry}`}>{children}</div>;
};

/* ====================== 区块标题 ====================== */

export const SolHead: React.FC<{ tag: string; title: string; lead: string; left?: boolean }> = ({
  tag, title, lead, left,
}) => (
  <div className={`sol-head${left ? ' sol-head--left' : ''}`}>
    <span className="sol-tag">{tag}</span>
    <h2>{title}</h2>
    <p>{lead}</p>
  </div>
);

/* ====================== Hero ====================== */

export const SolHero: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  primaryLabel: string;
  secondary?: { label: string; href: string };
  visual: React.ReactNode;
}> = ({ eyebrow, title, lead, primaryLabel, secondary, visual }) => (
  <section className="sol-hero">
    <div className="sol-hero__mesh" aria-hidden="true" />
    <div className="wrap sol-hero__in">
      <div className="sol-hero__copy">
        <span className="sol-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
        <h1>{title}</h1>
        <p>{lead}</p>
        <div className="sol-hero__actions">
          <button type="button" className="btn btn-primary">{primaryLabel}</button>
          {secondary && <a href={secondary.href} className="btn btn-ghost">{secondary.label}</a>}
        </div>
      </div>
      <div className="sol-hero__visual">{visual}</div>
    </div>
  </section>
);

/* ====================== CTA ====================== */

export const SolCta: React.FC<{ title: string; lead: string; primaryLabel: string; secondaryLabel?: string }> = ({
  title, lead, primaryLabel, secondaryLabel,
}) => (
  <section className="sol-cta" id="sol-cta">
    <div className="wrap sol-cta__in reveal">
      <h2>{title}</h2>
      <p>{lead}</p>
      <div className="sol-cta__actions">
        <button type="button" className="btn btn-primary">{primaryLabel}</button>
        {secondaryLabel && <Link to="/" className="btn btn-ghost">{secondaryLabel}</Link>}
      </div>
    </div>
  </section>
);

/* ====================== 场景看板（左任务列表 + 右输出样例，点击切换） ====================== */

export interface SolScenarioOutput {
  title: string;
  input: React.ReactNode;
  chips: string[];
  next: string;
}

export interface SolScenario {
  no: string;
  title: string;
  lead: string;
  out: SolScenarioOutput;
}

/** 点击左侧任务卡（A1/A2/A2、T1/T2/T3…），右侧输出样例同步切换 */
export const SolBoard: React.FC<{ items: SolScenario[] }> = ({ items }) => {
  const [sel, setSel] = useState(0);
  const cur = items[sel];
  return (
    <div className="sol-board reveal">
      <div className="sol-board__list">
        {items.map((s, i) => (
          <button
            type="button"
            key={s.no}
            className={`sol-board__row${i === sel ? ' is-on' : ''}`}
            aria-pressed={i === sel}
            onClick={() => setSel(i)}
          >
            <span className="sol-board__no" aria-hidden="true">{s.no}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.lead}</p>
            </div>
          </button>
        ))}
      </div>
      <aside className="sol-outcome" aria-live="polite">
        <div className="sol-outcome__in" key={sel}>
          <span className="sol-outcome__label">输出样例</span>
          <h3>{cur.out.title}</h3>
          <div className="sol-outcome__input">{cur.out.input}</div>
          <div className="sol-outcome__chips">
            {cur.out.chips.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className="sol-outcome__next"><b>下一步</b>{cur.out.next}</div>
        </div>
      </aside>
    </div>
  );
};

/* ====================== Hero 窗口示意（各业不同，badge 可省略） ====================== */

/** 电力：提问 → 规程依据 + 排查路径 */
export const SolAskWindow: React.FC<{
  title: string; badge?: string; input: string; output: string; chips: string[];
}> = ({ title, badge, input, output, chips }) => (
  <div className="agp-win" aria-label={`${title}示意`}>
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>{title}</b>
      {badge && <span className="agp-win__badge">{badge}</span>}
    </div>
    <div className="sol-ask__body">
      <div className="sol-ask__q"><i aria-hidden="true">Q</i><span>{input}</span></div>
      <div className="sol-ask__a">
        <strong>{output}</strong>
        <div className="agp-lines" aria-hidden="true"><i style={{ width: '90%' }} /><i style={{ width: '74%' }} /><i style={{ width: '52%' }} /></div>
        <div className="agp-chips">
          {chips.map((c) => <span key={c}>{c}</span>)}
        </div>
      </div>
    </div>
  </div>
);

/** 烟草：货架陈列识别（空货位示意） */
export const SolScanWindow: React.FC<{
  title: string; badge?: string; task: string; output: string;
  slots: { state: 'full' | 'empty' }[];
  tags?: { text: string; tone: 'ok' | 'warn' }[];
  chips: string[];
}> = ({ title, badge, task, output, slots, tags, chips }) => (
  <div className="agp-win" aria-label={`${title}示意`}>
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>{title}</b>
      {badge && <span className="agp-win__badge">{badge}</span>}
    </div>
    <div className="sol-scan__body">
      <div className="sol-scan__task">{task}</div>
      <div className="sol-scan__shelf" aria-hidden="true">
        {slots.map((s, i) => <i key={i} className={s.state === 'empty' ? 'is-empty' : ''} />)}
      </div>
      {tags && tags.length > 0 && (
        <div className="sol-scan__tags">
          {tags.map((t) => <em key={t.text} className={t.tone === 'warn' ? 'is-warn' : 'is-ok'}>{t.text}</em>)}
        </div>
      )}
      <div className="sol-scan__out">
        <strong>{output}</strong>
        <div className="agp-chips">
          {chips.map((c) => <span key={c}>{c}</span>)}
        </div>
      </div>
    </div>
  </div>
);

/** 能源：班次行动票据 */
export const SolBillWindow: React.FC<{
  title: string; badge?: string; task: string; output: string;
  rows: { label: string; value: string; risk?: boolean }[];
  chips: string[];
}> = ({ title, badge, task, output, rows, chips }) => (
  <div className="agp-win" aria-label={`${title}示意`}>
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>{title}</b>
      {badge && <span className="agp-win__badge">{badge}</span>}
    </div>
    <div className="sol-bill__body">
      <div className="sol-bill__task">{task}</div>
      <div className="sol-bill__list">
        {rows.map((r) => (
          <div key={r.label} className={`sol-bill__row${r.risk ? ' sol-bill__row--risk' : ''}`}>
            <span>{r.label}</span>
            <b>{r.value}</b>
          </div>
        ))}
      </div>
      <div className="sol-scan__out">
        <strong>{output}</strong>
        <div className="agp-chips">
          {chips.map((c) => <span key={c}>{c}</span>)}
        </div>
      </div>
    </div>
  </div>
);
