import React, { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router';
import { Spin } from '@douyinfe/semi-ui';
import { SiteLayout } from './layout/SiteLayout';
import { PlaceholderPage } from './components/PlaceholderPage';

const HomePage = lazy(() => import('./pages/home/HomePage').then((m) => ({ default: m.HomePage })));

const withSuspense = (node: React.ReactNode) => (
  <Suspense
    fallback={
      <div style={{ padding: '120px 0', display: 'flex', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    }
  >
    {node}
  </Suspense>
);

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      // 智能体开发平台路由
      {
        path: 'agent-platform',
        element: <PlaceholderPage title="智能体开发平台" description="面向办公场景、业务开发者、代码开发者的全景平台介绍页面将在后续版本交付。" />,
      },
      {
        path: 'agent-platform/digital-employee',
        element: <PlaceholderPage title="数字员工平台" description="办公场景开箱即用的数字员工工作台，具备即买即用与角色预设能力。" />,
      },
      {
        path: 'agent-platform/workbench',
        element: <PlaceholderPage title="智能体工作台" description="面向业务人员的无代码可视化拖拽编排工作台。" />,
      },
      {
        path: 'agent-platform/suite',
        element: <PlaceholderPage title="智能体开发套件" description="面向专业研发人员的原生代码套件与多智能体协作框架。" />,
      },
      // 大模型广场
      {
        path: 'models',
        element: <PlaceholderPage title="大模型广场" description="已部署的主流开源与商业大模型清单、报价与参数详情。" />,
      },
      {
        path: 'models/playground',
        element: <PlaceholderPage title="大模型体验中心" description="支持单模型实操体验与同类模型同题 Arena 对比评测。" />,
      },
      // 定价
      {
        path: 'pricing',
        element: <PlaceholderPage title="套餐购买" description="初创版、专业版、旗舰尊享版权益对比与采购方案。" />,
      },
      {
        path: 'pricing/topup',
        element: <PlaceholderPage title="API Token 充值" description="阶梯充值优惠与用量抵扣核算中心。" />,
      },
      // 行业解决方案
      {
        path: 'solutions/auto',
        element: <PlaceholderPage title="汽车制造解决方案" description="涵盖车载智能座舱、研发展讯与 4S 店售后智能排障。" />,
      },
      {
        path: 'solutions/power',
        element: <PlaceholderPage title="智慧电力解决方案" description="多模态高空巡检视觉识别与电网安全调度专家模型。" />,
      },
      {
        path: 'solutions/energy',
        element: <PlaceholderPage title="能源石化解决方案" description="厂区智能安监视觉识别与地下测井曲线智能解译。" />,
      },
      {
        path: 'solutions/general',
        element: <PlaceholderPage title="通用企业场景解决方案" description="AI 智能工牌沟通质检与员工 1v1 销售实战仿真对练。" />,
      },
      // 营销服务
      {
        path: 'services/compute',
        element: <PlaceholderPage title="AI 算力运营服务" description="面向算力租赁提供商的异构算力纳管、调度与收益分成合作专区。" />,
      },
      {
        path: 'services/gateway',
        element: <PlaceholderPage title="大模型服务网关" description="面向 Token 提供商的高并发统一路由、智能熔断与安全审计网关。" />,
      },
      {
        path: 'services/private-deployment',
        element: <PlaceholderPage title="私有化部署服务平台" description="面向大型企业集团与地市级政府的高标准全栈私有交付与伙伴运营分成。" />,
      },
      // 文档
      {
        path: 'docs',
        element: <PlaceholderPage title="开发者文档中心" description="快速入门、OpenAI API 兼容协议参考与 SDK 工具链手册。" />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
];
