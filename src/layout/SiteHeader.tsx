import React from 'react';
import { Link, useLocation } from 'react-router';
import { LogoMarkSvg, NAV_DROPDOWN_ITEMS, AGENT_NAV_ITEMS, SOLUTION_NAV_ITEMS, MODEL_DROPDOWN_ITEMS, type NavDropdownItem } from '@/proto/data';

/**
 * 一级 Tab 直接进入默认页；悬停或键盘聚焦时展示二级气泡菜单（紧贴 Tab，移开即收起）。
 */
function NavMenuTab({
  label,
  to,
  items,
  active,
  ariaLabel,
}: {
  label: string;
  to: string;
  items: NavDropdownItem[];
  active: boolean;
  ariaLabel: string;
}) {
  return (
    <div className="nav-item">
      <Link
        to={to}
        className={`nav-trigger${active ? ' nav-active' : ''}`}
        aria-haspopup="menu"
        aria-label={ariaLabel}
      >
        {label}
      </Link>
      <div className="nav-dropdown" role="menu" aria-label={ariaLabel}>
        {items.map((item) => (
          <Link key={item.path} to={item.path} className="dd-item" role="menuitem">
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
 * sticky 毛玻璃 + 四个悬停二级菜单入口（首页 / 智能体开发平台 / 行业解决方案 / 大模型广场）；
 * 「定价」为普通入口（订阅套餐 / API充值 在定价页内切换），「行业解决方案」默认进入通用方案页。
 */
export const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();

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
            to="/"
            items={NAV_DROPDOWN_ITEMS}
            active={pathname === '/' || pathname.startsWith('/services')}
            ariaLabel="首页子菜单"
          />
          <NavMenuTab
            label="智能体开发平台"
            to="/agent-platform"
            items={AGENT_NAV_ITEMS}
            active={pathname.startsWith('/agent-platform')}
            ariaLabel="智能体开发平台菜单"
          />
          <NavMenuTab
            label="行业解决方案"
            to="/solutions/general"
            items={SOLUTION_NAV_ITEMS}
            active={pathname.startsWith('/solutions')}
            ariaLabel="行业解决方案菜单"
          />
          <NavMenuTab
            label="大模型广场"
            to="/models"
            items={MODEL_DROPDOWN_ITEMS}
            active={pathname.startsWith('/models')}
            ariaLabel="大模型广场菜单"
          />
          <Link to="/pricing" className={pathname.startsWith('/pricing') ? 'nav-active' : ''}>定价</Link>
          <Link to="/docs">文档</Link>
        </nav>
        <div className="nav-cta">
          <Link to="/auth" className="btn btn-ghost">
            注册/登录
          </Link>
        </div>
      </div>
    </header>
  );
};
