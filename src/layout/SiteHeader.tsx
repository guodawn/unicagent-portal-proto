import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Button, Dropdown, SideSheet, Toast } from '@douyinfe/semi-ui';
import { IconMenu } from '@douyinfe/semi-icons';
import { BRAND, NAV_ITEMS, type NavItem } from '@/mock/content';

function isItemActive(item: NavItem, pathname: string): boolean {
  if (pathname === item.path) return true;
  if (item.children) {
    return item.children.some(
      (child) => pathname === child.path || pathname.startsWith(`${child.path}/`)
    );
  }
  return pathname.startsWith(`${item.path}/`);
}

function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <div className="sh-logo-mark" style={{ width: size, height: size, fontSize: size * 0.45 }}>
      众
    </div>
  );
}

const DesktopNav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="sh-nav" aria-label="主导航">
      {NAV_ITEMS.map((item) => {
        const active = isItemActive(item, pathname);
        const trigger = (
          <Link
            to={item.path}
            className={`sh-nav-item${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
            {item.children ? <span className="sh-caret" aria-hidden /> : null}
          </Link>
        );

        if (!item.children) {
          return <div key={item.path}>{trigger}</div>;
        }

        return (
          <Dropdown
            key={item.path}
            trigger="hover"
            position="bottomLeft"
            className="sh-dropdown"
            render={
              <div className="sh-dropdown-panel">
                {item.children.map((child) => (
                  <Link key={child.path} to={child.path} className="sh-dropdown-item">
                    <div className="sh-dropdown-item-head">
                      {child.label}
                      {child.tag ? <span className="sh-dropdown-tag">{child.tag}</span> : null}
                    </div>
                    <div className="sh-dropdown-item-desc">{child.description}</div>
                  </Link>
                ))}
              </div>
            }
          >
            {trigger}
          </Dropdown>
        );
      })}
    </nav>
  );
};

export const SiteHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    Toast.info('原型演示：登录功能待建设');
  };

  const handleExperience = () => {
    navigate('/models/playground');
  };

  return (
    <header className="sh-header">
      <div className="p-container sh-inner">
        <Link to="/" className="sh-logo" aria-label={`${BRAND.name} 首页`}>
          <BrandMark />
          <span className="sh-logo-text">
            <strong>{BRAND.name}</strong>
            <small>{BRAND.en} · 企业级 AI 生态平台</small>
          </span>
        </Link>

        <DesktopNav />

        <div className="sh-actions">
          <Button theme="borderless" className="sh-login" onClick={handleLogin}>
            登录
          </Button>
          <Button theme="solid" size="default" className="sh-cta" onClick={handleExperience}>
            立即体验
          </Button>
          <Button
            theme="borderless"
            icon={<IconMenu />}
            className="sh-burger"
            aria-label="打开菜单"
            onClick={() => setMobileOpen(true)}
          />
        </div>
      </div>

      <SideSheet
        visible={mobileOpen}
        onCancel={() => setMobileOpen(false)}
        placement="left"
        width={300}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: '16px' }}
      >
        <div className="sh-mobile-nav">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.path} className="sh-mobile-group">
                <div className="sh-mobile-group-title">{item.label}</div>
                {item.children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className="sh-mobile-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="sh-mobile-link sh-mobile-link--top"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Button block theme="solid" className="sh-mobile-cta" onClick={handleExperience}>
            立即体验
          </Button>
        </div>
      </SideSheet>
    </header>
  );
};
