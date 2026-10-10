import React from 'react';
import { Link } from 'react-router';
import { useProtoReveal } from '@/proto/useProtoReveal';
import './agent-platform.css';

/* ====================== 路由出口 ====================== */

export const AGP_LINKS = {
  overview: '/agent-platform',
  employees: '/agent-platform/digital-employee',
  workbench: '/agent-platform/workbench',
  suite: '/agent-platform/suite',
} as const;

/* ====================== 图标库 ====================== */

export type AgpIconName =
  | 'spark' | 'book' | 'flow' | 'code' | 'person' | 'grid' | 'chat' | 'doc'
  | 'check' | 'tool' | 'release' | 'search' | 'building' | 'headset' | 'chart'
  | 'portal' | 'layers' | 'gear' | 'plug';

const ICON_PATHS: Record<AgpIconName, React.ReactNode> = {
  spark: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />,
  book: <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2zM4 5v16M8 7h7M8 11h5" />,
  flow: <path d="M5 5h5v4H5zM14 15h5v4h-5zM7.5 9v3.5A2.5 2.5 0 0010 15h4" />,
  code: <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" />,
  person: <path d="M12 4.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM5 20c0-3.5 3-6 7-6s7 2.5 7 6" />,
  grid: <path d="M3 3h7.5v7.5H3zM13.5 3H21v7.5h-7.5zM3 13.5h7.5V21H3zM13.5 13.5H21V21h-7.5z" />,
  chat: <path d="M4 5h16v11H9l-5 4zM8 9h8M8 12.5h5" />,
  doc: <path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h6M9 16h6M9 8h3" />,
  check: <path d="M4 5h16v14H4zM7.5 12l3 3 6-6.5" />,
  tool: <path d="M14.5 6.5a3.5 3.5 0 00-4.6 4.6L4 17l3 3 5.9-5.9a3.5 3.5 0 004.6-4.6l-2.4 2.4-2-2z" />,
  release: <path d="M12 3v11M8 10l4 4 4-4M5 17v2a2 2 0 002 2h10a2 2 0 002-2v-2" />,
  search: <path d="M10.5 4a6.5 6.5 0 110 13 6.5 6.5 0 010-13zM15.5 15.5L21 21" />,
  building: <path d="M4 21V7l7-4v18M11 21h9V11h-9M14 14h3M14 17.5h3M6.5 10h2M6.5 13.5h2M6.5 17h2" />,
  headset: <path d="M4 13a8 8 0 0116 0M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 2zM20 13v4a2 2 0 01-2 2h-1v-6h1a2 2 0 012 2zM17 19v1a2 2 0 01-2 2h-3" />,
  chart: <path d="M4 4v16h16M8 16v-5M12.5 16V8M17 16v-8" />,
  portal: <path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8" />,
  layers: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  gear: <path d="M12 9a3 3 0 110 6 3 3 0 010-6zM12 2.5l1 2.6 2.8-.6.5 2.8 2.6 1-1.2 2.6 1.2 2.6-2.6 1-.5 2.8-2.8-.6-1 2.6-1-2.6-2.8.6-.5-2.8-2.6-1L5.3 12.9 4.1 10.3l2.6-1 .5-2.8 2.8.6z" />,
  plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 01-5 5 5 5 0 01-5-5zM12 16v5" />,
};

export const AgpIcon: React.FC<{ name: AgpIconName; className?: string }> = ({ name, className }) => (
  <svg
    className={className ? `agp-svg ${className}` : 'agp-svg'}
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

/* ====================== 区块标题 ====================== */

export const AgpHead: React.FC<{ tag: string; title: string; lead: string; left?: boolean; light?: boolean }> = ({
  tag, title, lead, left, light,
}) => (
  <div className={`agp-head${left ? ' agp-head--left' : ''}${light ? ' agp-head--light' : ''}`}>
    <span className="agp-tag">{tag}</span>
    <h2>{title}</h2>
    <p>{lead}</p>
  </div>
);

/* ====================== Hero ====================== */

interface HeroAction {
  label: string;
  to?: string;
  href?: string;
}

export const AgpHero: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  primary: HeroAction;
  secondary?: HeroAction;
  visual: React.ReactNode;
  className?: string;
}> = ({ eyebrow, title, lead, primary, secondary, visual, className }) => {
  useProtoReveal();
  const renderAction = (a: HeroAction, cls: string) =>
    a.to ? (
      <Link to={a.to} className={`btn ${cls}`}>{a.label}</Link>
    ) : (
      <a href={a.href} className={`btn ${cls}`}>{a.label}</a>
    );
  return (
    <section className={`agp-hero${className ? ` ${className}` : ''}`}>
      <div className="agp-hero__mesh" aria-hidden="true" />
      <div className="wrap agp-hero__in">
        <div className="agp-hero__copy">
          <span className="agp-eyebrow"><i aria-hidden="true" />{eyebrow}</span>
          <h1>{title}</h1>
          <p>{lead}</p>
          <div className="agp-hero__actions">
            {renderAction(primary, 'btn-primary')}
            {secondary && renderAction(secondary, 'btn-ghost')}
          </div>
        </div>
        <div className="agp-hero__visual">{visual}</div>
      </div>
    </section>
  );
};

/* ====================== 窗口示意（CSS 截图） ====================== */

/** 对话式成果窗口：问题输入 → 成果卡片（badge 可省略，省略时不渲染角标） */
export const ChatWindow: React.FC<{
  title: string;
  badge?: string;
  input: string;
  output: string;
  chips: string[];
}> = ({ title, badge, input, output, chips }) => (
  <div className="agp-win agp-chat" aria-label={`${title}示意`}>
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>{title}</b>
      {badge && <span className="agp-win__badge">{badge}</span>}
    </div>
    <div className="agp-win__body">
      <div className="agp-chat__q"><span>{input}</span></div>
      <div className="agp-chat__a">
        <div className="agp-chat__who"><i aria-hidden="true">AI</i>智能体</div>
        <strong>{output}</strong>
        <div className="agp-chips">
          {chips.map((c) => <span key={c}>{c}</span>)}
        </div>
        <div className="agp-lines" aria-hidden="true"><i style={{ width: '92%' }} /><i style={{ width: '78%' }} /><i style={{ width: '46%' }} /></div>
      </div>
    </div>
  </div>
);

/** 工作台搭建示意：组件栏 + 画布节点 + 运行结果 */
export const BuilderWindow: React.FC<{
  comps: string[];
  nodes: string[];
  result: string;
  compact?: boolean;
}> = ({ comps, nodes, result, compact = false }) => (
  <div className={`agp-win agp-builder${compact ? ' agp-builder--compact' : ''}`} aria-label="智能体工作台示意">
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>智能体工作台</b>
      <span className="agp-win__badge">搭建示意</span>
    </div>
    <div className="agp-builder__body">
      <aside className="agp-builder__side">
        <small>组件</small>
        {comps.map((c, i) => (
          <span key={c} className={i === 0 ? 'is-on' : ''}>{c}</span>
        ))}
      </aside>
      <div className="agp-builder__canvas">
        {nodes.map((n, i) => (
          <React.Fragment key={n}>
            <span className="agp-builder__node">{n}</span>
            {i < nodes.length - 1 && <i className="agp-builder__link" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="agp-builder__result">
        <small>运行结果</small>
        <b>{result}</b>
        <div className="agp-lines" aria-hidden="true"><i style={{ width: '84%' }} /><i style={{ width: '60%' }} /></div>
        <em className="agp-builder__ok">运行成功</em>
      </div>
    </div>
  </div>
);

/** 代码接入示意：编辑器 + 返回结果 */
export const CodeWindow: React.FC<{
  file: string;
  code: React.ReactNode;
  output: string;
}> = ({ file, code, output }) => (
  <div className="agp-win agp-code" aria-label="代码接入示意">
    <div className="agp-win__bar">
      <span className="agp-win__dots" aria-hidden="true"><i /><i /><i /></span>
      <b>{file}</b>
      <span className="agp-win__badge">代码开发</span>
    </div>
    <pre className="agp-code__pre">{code}</pre>
    <div className="agp-code__out">
      <small>200 · 返回结果</small>
      <strong>{output}</strong>
      <div className="agp-lines" aria-hidden="true"><i style={{ width: '88%' }} /><i style={{ width: '64%' }} /></div>
    </div>
  </div>
);

/* ====================== 定价区 ====================== */

/** 概览 / 工作台 / 套件：说明 + 按钮的行动带 */
export const AgpActionsBand: React.FC<{
  tag: string; title: string; lead: string; actions: HeroAction[];
}> = ({ tag, title, lead, actions }) => (
  <section className="agp-sec agp-sec--tight" id="agp-pricing">
    <div className="wrap">
      <div className="agp-band reveal">
        <AgpHead tag={tag} title={title} lead={lead} />
        <div className="agp-band__actions">
          {actions.map((a, i) =>
            a.to ? (
              <Link key={a.label} to={a.to} className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>{a.label}</Link>
            ) : (
              <a key={a.label} href={a.href} className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>{a.label}</a>
            )
          )}
        </div>
      </div>
    </div>
  </section>
);

/** 数字员工：双卡 + 积分通用说明 */
export const AgpPricingCards: React.FC<{
  tag: string; title: string; lead: string;
  cards: { pill: string; title: string; lead: string; link: string; to: string }[];
  shared: { left: string; right: string; parts: string[] };
}> = ({ tag, title, lead, cards, shared }) => (
  <section className="agp-sec agp-sec--soft" id="agp-pricing">
    <div className="wrap">
      <AgpHead tag={tag} title={title} lead={lead} />
      <div className="agp-price reveal">
        {cards.map((c) => (
          <article key={c.title}>
            <span>{c.pill}</span>
            <h3>{c.title}</h3>
            <p>{c.lead}</p>
            <Link to={c.to} className="agp-price__link">{c.link}　→</Link>
          </article>
        ))}
      </div>
      <div className="agp-shared reveal" aria-label="积分通用说明">
        <div className="agp-shared__src">
          <span className="agp-shared__chip agp-shared__chip--a"><i aria-hidden="true" />{shared.left}</span>
          <i className="agp-shared__op" aria-hidden="true">＋</i>
          <span className="agp-shared__chip agp-shared__chip--b"><i aria-hidden="true" />{shared.right}</span>
        </div>
        <div className="agp-shared__mid">
          <i className="agp-shared__line" aria-hidden="true" />
          <em>均可用于</em>
          <i className="agp-shared__line" aria-hidden="true" />
        </div>
        <div className="agp-shared__use">
          {shared.parts.map((p) => <span key={p}>{p}</span>)}
        </div>
      </div>
    </div>
  </section>
);

/* ====================== CTA ====================== */

export const AgpCta: React.FC<{ title: string; lead: string; primary: HeroAction; secondary?: HeroAction }> = ({
  title, lead, primary, secondary,
}) => {
  const renderAction = (a: HeroAction, cls: string) =>
    a.to ? <Link to={a.to} className={`btn ${cls}`}>{a.label}</Link> : <a href={a.href} className={`btn ${cls}`}>{a.label}</a>;
  return (
    <section className="agp-cta">
      <div className="wrap agp-cta__in reveal">
        <h2>{title}</h2>
        <p>{lead}</p>
        <div className="agp-cta__actions">
          {renderAction(primary, 'btn-primary')}
          {secondary && renderAction(secondary, 'btn-ghost')}
        </div>
      </div>
    </section>
  );
};

/* ====================== 页面容器 ====================== */

export const AgpPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useProtoReveal();
  return <div className="agp">{children}</div>;
};
