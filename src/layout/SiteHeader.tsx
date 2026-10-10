import React from 'react';
import { Link, useLocation } from 'react-router';
import { LogoMarkSvg, MODEL_DROPDOWN_ITEMS, NAV_DROPDOWN_ITEMS } from '@/proto/data';

/**
 * 原型版顶部导航（docs/07 §3.1）：
 * sticky 毛玻璃 + 「首页」「大模型广场」hover 下拉。
 * 「行业解决方案」直接跳转 /solutions/general（原「通用行业解决方案」页）。
 */
export const SiteHeader: React.FC = () => {
  const { pathname } = useLocation();

  // 一级菜单高亮（原型 navMap：子页高亮其所属一级菜单）
  const onHome = pathname === '/';
  const onModels = pathname.startsWith('/models');
  const onSolutions = pathname.startsWith('/solutions');

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="logo">
          <span className="mark">{LogoMarkSvg}</span>
          众调AI生态服务平台
        </Link>
        <nav className="nav-links">
          <div className="nav-item has-dropdown">
            <Link to="/" className={`nav-trigger${onHome ? ' nav-active' : ''}`}>
              首页
            </Link>
            <div className="nav-dropdown" role="menu" aria-label="首页子菜单">
              {NAV_DROPDOWN_ITEMS.map((item) => (
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
          <Link to="/agent-platform">智能体开发平台</Link>
          <div className="nav-item has-dropdown">
            <Link to="/models" className={`nav-trigger${onModels ? ' nav-active' : ''}`}>
              大模型广场
            </Link>
            <div className="nav-dropdown" role="menu" aria-label="大模型广场子菜单">
              {MODEL_DROPDOWN_ITEMS.map((item) => (
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
          <Link to="/pricing">定价</Link>
          <Link to="/solutions/general" className={onSolutions ? 'nav-active' : undefined}>
            行业解决方案
          </Link>
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
