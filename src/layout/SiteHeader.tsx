import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { LogoMarkSvg, NAV_DROPDOWN_ITEMS } from '@/proto/data';

/**
 * 原型版顶部导航（docs/07 §3.1）：
 * sticky 毛玻璃 + 「首页」hover 下拉（3 个二级服务页入口）。
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
        <nav className="nav-links">
          <div className="nav-item has-dropdown">
            <Link to="/" className="nav-trigger nav-active">
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
