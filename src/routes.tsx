import React, { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { SiteLayout } from './layout/SiteLayout';
import { PlaceholderPage } from './components/PlaceholderPage';
import { NotFoundPage } from './components/NotFoundPage';

const HomePage = lazy(() =>
  import('./pages/home/HomePage').then((m) => ({ default: m.HomePage }))
);

// 「首页」下拉的 3 个二级服务页（docs/07 §1 路由映射）
const LlmGatewayPage = lazy(() =>
  import('./pages/services/LlmGatewayPage').then((m) => ({ default: m.LlmGatewayPage }))
);
const ComputePage = lazy(() =>
  import('./pages/services/ComputePage').then((m) => ({ default: m.ComputePage }))
);
const PrivateDeployPage = lazy(() =>
  import('./pages/services/PrivateDeployPage').then((m) => ({ default: m.PrivateDeployPage }))
);

// 2. 产品与平台能力（4 个产品页：总览 / 数字员工 / 工作台 / 开发套件）
const AgentPlatformHome = lazy(() =>
  import('./pages/agent-platform/AgentPlatformHome').then((m) => ({ default: m.AgentPlatformHome }))
);
const DigitalEmployeePage = lazy(() =>
  import('./pages/agent-platform/DigitalEmployeePage').then((m) => ({ default: m.DigitalEmployeePage }))
);
const WorkbenchPage = lazy(() =>
  import('./pages/agent-platform/WorkbenchPage').then((m) => ({ default: m.WorkbenchPage }))
);
const SuitePage = lazy(() =>
  import('./pages/agent-platform/SuitePage').then((m) => ({ default: m.SuitePage }))
);

function RouteLoading() {
  return (
    <div className="route-loading" aria-busy="true">
      正在加载…
    </div>
  );
}

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<RouteLoading />}>{node}</Suspense>;

/** 占位页路由（见 docs/03 路由表） */
const placeholder = (title: string): RouteObject => ({
  element: <PlaceholderPage title={title} />,
});

export const PORTAL_ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },

      // 供给侧 / 政企营销页（原型还原）
      { path: 'services/gateway', element: withSuspense(<LlmGatewayPage />) },
      { path: 'services/compute', element: withSuspense(<ComputePage />) },
      { path: 'services/private-deployment', element: withSuspense(<PrivateDeployPage />) },

      // 2. 产品与平台能力（4 个产品页，头部「产品与平台」气泡菜单入口）
      { path: 'agent-platform', element: withSuspense(<AgentPlatformHome />) },
      { path: 'agent-platform/digital-employee', element: withSuspense(<DigitalEmployeePage />) },
      { path: 'agent-platform/workbench', element: withSuspense(<WorkbenchPage />) },
      { path: 'agent-platform/suite', element: withSuspense(<SuitePage />) },

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

      // 6. 文档
      { path: 'docs', ...placeholder('文档中心') },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
