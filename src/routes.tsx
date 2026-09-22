import React, { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { SiteLayout } from './layout/SiteLayout';
import { PlaceholderPage } from './components/PlaceholderPage';
import { NotFoundPage } from './components/NotFoundPage';

const HomePage = lazy(() =>
  import('./pages/home/HomePage').then((m) => ({ default: m.HomePage }))
);

function RouteLoading() {
  return (
    <div className="route-loading" aria-busy="true">
      正在加载…
    </div>
  );
}

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<RouteLoading />}>{node}</Suspense>;

/** 占位页路由（见 docs/03 路由表，V0.1 仅首页完整实现） */
const placeholder = (title: string): RouteObject => ({
  element: <PlaceholderPage title={title} />,
});

export const PORTAL_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },

      // 2. 智能体开发平台
      { path: 'agent-platform', ...placeholder('智能体开发平台') },
      { path: 'agent-platform/digital-employee', ...placeholder('数字员工平台') },
      { path: 'agent-platform/workbench', ...placeholder('智能体工作台') },
      { path: 'agent-platform/suite', ...placeholder('智能体开发套件') },

      // 3. 大模型广场
      { path: 'models', ...placeholder('大模型广场') },
      { path: 'models/playground', ...placeholder('大模型体验') },

      // 4. 定价
      { path: 'pricing', ...placeholder('套餐购买') },
      { path: 'pricing/topup', ...placeholder('API 充值') },

      // 5. 行业解决方案
      { path: 'solutions/auto', ...placeholder('汽车行业解决方案') },
      { path: 'solutions/power', ...placeholder('电力行业解决方案') },
      { path: 'solutions/energy', ...placeholder('能源行业解决方案') },
      { path: 'solutions/general', ...placeholder('通用行业解决方案') },

      // 供给侧 / 政企营销页
      { path: 'services/compute', ...placeholder('AI 算力运营服务') },
      { path: 'services/gateway', ...placeholder('大模型服务网关') },
      { path: 'services/private-deployment', ...placeholder('私有化部署服务平台') },

      // 6. 文档
      { path: 'docs', ...placeholder('文档中心') },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
