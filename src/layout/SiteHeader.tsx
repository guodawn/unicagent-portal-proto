import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LogoMarkSvg, NAV_DROPDOWN_ITEMS, AGENT_NAV_ITEMS, type NavDropdownItem } from '@/proto/data';

/**
 * 一级 Tab 气泡菜单：点击 Tab 弹出气泡卡片，选中任一项（或点击外部 / Esc / 路由变化）后收起。
 */
function NavMenuTab({
  label,
  items,
  active,
  ariaLabel,
}: {
  label: string;
  items: NavDropdownItem[];
  active: boolean;
  ariaLabel: string;
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // 选中任一项导航后收起气泡
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`nav-item${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className={`nav-trigger${active ? ' nav-active' : ''}`}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <i className="nav-caret" aria-hidden="true" />
      </button>
      <div className="nav-dropdown" role="menu" aria-label={ariaLabel}>
        {items.map((item) => (
          <Link key={item.path} to={item.path} className="dd-item" role="menuitem" onClick={() => setOpen(false)}>
            <span className="dd-icon">{item.icon}</span>
            <span className="dd-text">
              <span className="dd-title">{item.title}</span>
              <span className="dd-desc">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * 原型版顶部导航（docs/07 §3.1）：
 * sticky 毛玻璃 + 两个一级 Tab 气泡菜单（首页服务入口 / 产品与平台能力）。
 * 「行业解决方案」保持原型锚点行为：非首页先回首页，140ms 后平滑滚动。
 */
export const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const scroll = () => {
      const t = document.querySelector(href);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 140);
    } else {
      scroll();
    }
  };

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="logo">
          <span className="mark">{LogoMarkSvg}</span>
          众调AI生态服务平台
        </Link>
        <nav className="nav-links" aria-label="主导航">
          <NavMenuTab
            label="首页"
            items={NAV_DROPDOWN_ITEMS}
            active={pathname === '/' || pathname.startsWith('/services')}
            ariaLabel="首页子菜单"
          />
          <NavMenuTab
            label="产品与平台"
            items={AGENT_NAV_ITEMS}
            active={pathname.startsWith('/agent-platform')}
            ariaLabel="产品与平台菜单"
          />
          <Link to="/models">大模型广场</Link>
          <Link to="/pricing">定价</Link>
          <a
            href="#solutions"
            onClick={(e) => {
              handleAnchor(e, '#solutions');
            }}
          >
            行业解决方案
          </a>
          <Link to="/docs">文档</Link>
        </nav>
        <div className="nav-cta">
          <a href="#auth" className="btn btn-ghost">
            注册/登录
          </a>
        </div>
      </div>
    </header>
  );
};
