import React, { useState } from 'react';
import { Button, Dropdown, SideSheet, Space, Toast } from '@douyinfe/semi-ui';
import { IconChevronDown, IconMenu } from '@douyinfe/semi-icons';
import { Link, useLocation, useNavigate } from 'react-router';
import { BrandLogoIcon } from '../components/icons';

export const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // 1. 智能体开发平台下拉
  const agentMenu = (
    <Dropdown.Menu style={{ padding: '8px 0', minWidth: '180px' }}>
      <Dropdown.Item onClick={() => navigate('/agent-platform')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>平台介绍</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>全景架构与选型导引</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/agent-platform/digital-employee')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>数字员工平台</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>办公场景开箱即用</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/agent-platform/workbench')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>智能体工作台</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>业务人员零代码拖拽</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/agent-platform/suite')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>智能体开发套件</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>面向专业研发人员</div>
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  // 2. 大模型广场下拉
  const modelsMenu = (
    <Dropdown.Menu style={{ padding: '8px 0', minWidth: '180px' }}>
      <Dropdown.Item onClick={() => navigate('/models')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>模型清单与报价</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>主流大模型实时单价</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/models/playground')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>大模型体验中心</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>单模型体验 / Arena 对比</div>
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  // 3. 定价下拉
  const pricingMenu = (
    <Dropdown.Menu style={{ padding: '8px 0', minWidth: '160px' }}>
      <Dropdown.Item onClick={() => navigate('/pricing')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>套餐购买</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>阶梯版型与权益对比</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/pricing/topup')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>API 充值</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>Token 按量抵扣充值</div>
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  // 4. 行业解决方案下拉
  const solutionsMenu = (
    <Dropdown.Menu style={{ padding: '8px 0', minWidth: '180px' }}>
      <Dropdown.Item onClick={() => navigate('/solutions/auto')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>汽车行业解决方案</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>智能座舱与售后工单</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/solutions/power')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>智慧电力解决方案</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>安规问答与视觉巡检</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/solutions/energy')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>能源石化解决方案</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>地质测井与安全生产</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => navigate('/solutions/general')}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>通用企业解决方案</div>
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>AI 智能工牌与实战对练</div>
        </div>
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: 'var(--portal-header-h)',
        backgroundColor: 'var(--semi-color-bg-0)',
        borderBottom: '1px solid var(--semi-color-border)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BrandLogoIcon size={34} />
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--semi-color-text-0)', lineHeight: 1.2 }}>
              众调 AI 生态平台
            </div>
            <div style={{ fontSize: '11px', color: 'var(--semi-color-text-2)', letterSpacing: '0.04em' }}>
              UnicAgent
            </div>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: isActive('/') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
              transition: 'var(--portal-transition)',
            }}
          >
            首页
          </Link>

          <Dropdown render={agentMenu} trigger="hover" position="bottomLeft">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: isActive('/agent-platform') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              智能体开发平台 <IconChevronDown style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }} />
            </span>
          </Dropdown>

          <Dropdown render={modelsMenu} trigger="hover" position="bottomLeft">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: isActive('/models') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              大模型广场 <IconChevronDown style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }} />
            </span>
          </Dropdown>

          <Dropdown render={pricingMenu} trigger="hover" position="bottomLeft">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: isActive('/pricing') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              定价 <IconChevronDown style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }} />
            </span>
          </Dropdown>

          <Dropdown render={solutionsMenu} trigger="hover" position="bottomLeft">
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: isActive('/solutions') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              行业解决方案 <IconChevronDown style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }} />
            </span>
          </Dropdown>

          <Link
            to="/docs"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: isActive('/docs') ? 'var(--semi-color-primary)' : 'var(--semi-color-text-0)',
              transition: 'var(--portal-transition)',
            }}
          >
            文档
          </Link>
        </nav>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button
            theme="borderless"
            style={{ color: 'var(--semi-color-text-1)', fontWeight: 500 }}
            onClick={() => Toast.info('登录：已模拟登录状态')}
          >
            登录
          </Button>

          <Button
            theme="solid"
            type="primary"
            style={{ height: '36px', borderRadius: '6px', fontWeight: 600 }}
            onClick={() => navigate('/models')}
          >
            立即体验
          </Button>

          {/* Mobile Hamburger Button */}
          <Button
            className="mobile-hamburger"
            theme="borderless"
            icon={<IconMenu />}
            style={{ display: 'none' }}
            onClick={() => setMobileDrawerOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <SideSheet
        title="众调 AI 生态平台"
        visible={mobileDrawerOpen}
        onCancel={() => setMobileDrawerOpen(false)}
        width={280}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
          <Link to="/" onClick={() => setMobileDrawerOpen(false)} style={{ fontSize: '15px', fontWeight: 600 }}>
            首页
          </Link>
          <div style={{ height: '1px', backgroundColor: 'var(--semi-color-border)' }} />
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)', fontWeight: 600 }}>智能体开发平台</div>
          <Link to="/agent-platform" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            平台介绍
          </Link>
          <Link to="/agent-platform/digital-employee" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            数字员工平台
          </Link>
          <Link to="/agent-platform/workbench" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            智能体工作台
          </Link>
          <Link to="/agent-platform/suite" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            智能体开发套件
          </Link>
          <div style={{ height: '1px', backgroundColor: 'var(--semi-color-border)' }} />
          <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)', fontWeight: 600 }}>大模型与服务</div>
          <Link to="/models" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            大模型广场
          </Link>
          <Link to="/models/playground" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            大模型体验与对比
          </Link>
          <Link to="/pricing" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            套餐购买
          </Link>
          <Link to="/pricing/topup" onClick={() => setMobileDrawerOpen(false)} style={{ paddingLeft: '8px' }}>
            API 充值
          </Link>
          <div style={{ height: '1px', backgroundColor: 'var(--semi-color-border)' }} />
          <Link to="/docs" onClick={() => setMobileDrawerOpen(false)} style={{ fontSize: '15px', fontWeight: 600 }}>
            文档中心
          </Link>
        </div>
      </SideSheet>
    </header>
  );
};
