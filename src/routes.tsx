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

// 3. 大模型广场 / 大模型体验
const ModelSquarePage = lazy(() =>
  import('./pages/models/ModelSquarePage').then((m) => ({ default: m.ModelSquarePage }))
);
const ModelExperiencePage = lazy(() =>
  import('./pages/models/ModelExperiencePage').then((m) => ({ default: m.ModelExperiencePage }))
);

// 4. 定价（订阅套餐 / API充值，页内切换）
const PlansPage = lazy(() =>
  import('./pages/pricing/PlansPage').then((m) => ({ default: m.PlansPage }))
);
const TopupPage = lazy(() =>
  import('./pages/pricing/TopupPage').then((m) => ({ default: m.TopupPage }))
);

// 5. 行业解决方案（通用 + 三行业页，一级菜单「行业解决方案」默认进入通用方案）
const GeneralSolutionPage = lazy(() =>
  import('./pages/solutions/GeneralSolutionPage').then((m) => ({ default: m.GeneralSolutionPage }))
);
const AutoSolutionPage = lazy(() =>
  import('./pages/solutions/AutoSolutionPage').then((m) => ({ default: m.AutoSolutionPage }))
);
const PowerSolutionPage = lazy(() =>
  import('./pages/solutions/PowerSolutionPage').then((m) => ({ default: m.PowerSolutionPage }))
);
const TobaccoSolutionPage = lazy(() =>
  import('./pages/solutions/TobaccoSolutionPage').then((m) => ({ default: m.TobaccoSolutionPage }))
);

// 登录/注册
const AuthPage = lazy(() => import('./pages/auth/AuthPage').then((m) => ({ default: m.AuthPage })));

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

      // 2. 产品与平台能力（4 个产品页）
      { path: 'agent-platform', element: withSuspense(<AgentPlatformHome />) },
      { path: 'agent-platform/digital-employee', element: withSuspense(<DigitalEmployeePage />) },
      { path: 'agent-platform/workbench', element: withSuspense(<WorkbenchPage />) },
      { path: 'agent-platform/suite', element: withSuspense(<SuitePage />) },

      // 3. 大模型广场
      { path: 'models', element: withSuspense(<ModelSquarePage />) },
      { path: 'models/playground', element: withSuspense(<ModelExperiencePage />) },

      // 4. 定价（订阅套餐 / API充值）
      { path: 'pricing', element: withSuspense(<PlansPage />) },
      { path: 'pricing/topup', element: withSuspense(<TopupPage />) },

      // 5. 行业解决方案（一级菜单默认落 /solutions/general）
      { path: 'solutions', element: <Navigate to="/solutions/general" replace /> },
      { path: 'solutions/general', element: withSuspense(<GeneralSolutionPage />) },
      { path: 'solutions/auto', element: withSuspense(<AutoSolutionPage />) },
      { path: 'solutions/power', element: withSuspense(<PowerSolutionPage />) },
      { path: 'solutions/tobacco', element: withSuspense(<TobaccoSolutionPage />) },
      { path: 'solutions/energy', ...placeholder('能源行业解决方案') },

      // 6. 文档
      { path: 'docs', ...placeholder('文档中心') },

      // 登录/注册
      { path: 'auth', element: withSuspense(<AuthPage />) },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
