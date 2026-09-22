# 03 - 信息架构与路由规划

> 本文档定义门户的导航信息结构（IA）、路由表与页面交付状态。
> 最后更新：2026-09-22（V0.1）

---

## 1. 顶部导航信息结构（IA 共识）

```
顶部导航
├── 1. 首页 (/)
│     一句话定位 + 行业案例速览 + LOGO 墙 + 客户评价 → 传达"平台成熟、可信任"
│     （AI 算力运营服务 / 大模型服务网关 / 私有化部署 三个营销内容以首页区块 + 页脚入口承载）
│
├── 2. 智能体开发平台 ▾（平台能力入口）
│     ├── 平台介绍 (/agent-platform) —— 面向办公场景 / 业务开发者 / 代码开发者的总览
│     ├── 数字员工平台 (/agent-platform/digital-employee) —— 办公开箱即用工作台，跳转登录体验、购买
│     ├── 智能体工作台 (/agent-platform/workbench) —— 面向业务人员，无代码拖拽开发智能体
│     └── 智能体开发套件 (/agent-platform/suite) —— 面向开发者，代码整合复杂智能体与系统集成
│
├── 3. 大模型广场 ▾（平台能力入口）
│     ├── 模型清单 (/models) —— 已部署大模型清单与报价 → 抽屉详情 → 体验页
│     └── 大模型体验 (/models/playground) —— 单模型体验 + 同类模型对比体验
│
├── 4. 定价 ▾（营销内容）
│     ├── 套餐购买 (/pricing)
│     └── API 充值 (/pricing/topup)
│
├── 5. 行业解决方案 ▾（营销内容）
│     ├── 汽车 (/solutions/auto)
│     ├── 电力 (/solutions/power)
│     ├── 能源 (/solutions/energy)
│     └── 通用 (/solutions/general) —— AI 工牌、AI 对练
│
├── 6. 文档 (/docs)
│
└── 右侧：登录（弱按钮）+ 立即体验（主按钮）
```

**首页内嵌的三个供给侧/政企营销入口**（无独立导航位，从首页区块与页脚进入）：

- AI 算力运营服务 `/services/compute` —— 面向算力租赁提供商
- 大模型服务网关 `/services/gateway` —— 面向 Token 提供商
- 私有化部署服务平台 `/services/private-deployment` —— 面向企业集团、地市级政府；含运营分成模式与伙伴费用说明

## 2. 路由表与交付状态

| 路由 | 页面 | V0.1 状态 |
|---|---|---|
| `/` | 首页（完整照抄硅基流动结构） | ✅ 已实现 |
| `/agent-platform` | 智能体开发平台介绍 | 🚧 占位页 |
| `/agent-platform/digital-employee` | 数字员工平台 | 🚧 占位页 |
| `/agent-platform/workbench` | 智能体工作台 | 🚧 占位页 |
| `/agent-platform/suite` | 智能体开发套件 | 🚧 占位页 |
| `/models` | 大模型广场清单 | 🚧 占位页 |
| `/models/playground` | 大模型体验 / 对比 | 🚧 占位页 |
| `/pricing` | 套餐购买 | 🚧 占位页 |
| `/pricing/topup` | API 充值 | 🚧 占位页 |
| `/solutions/auto` `/power` `/energy` `/general` | 行业解决方案 ×4 | 🚧 占位页 |
| `/services/compute` | AI 算力运营服务 | 🚧 占位页 |
| `/services/gateway` | 大模型服务网关 | 🚧 占位页 |
| `/services/private-deployment` | 私有化部署服务平台 | 🚧 占位页 |
| `/docs` | 文档中心 | 🚧 占位页 |
| `*` | 404 → 引导回首页 | ✅ 已实现 |

**占位页规范**：统一使用 `PlaceholderPage` 组件（Semi `Empty` + 插画 + 「该页面将在后续版本交付」+ 返回首页按钮），保证导航永不 404、演示可点击。

## 3. 页面骨架

所有页面共用 `SiteLayout`：

```
SiteLayout
├── SiteHeader   —— 吸顶（sticky），白底 + 底部描边，滚动不加阴影（简化）
├── <Outlet />   —— 页面内容
└── SiteFooter   —— 大页脚（所有页面一致）
```

- 路由切换自动回到页面顶部（`ScrollToTop`）。
- `main.tsx` 挂载 Semi `LocaleProvider zh_CN` + `BrowserRouter`，与 ops-proto 约定一致。
- 页面组件一律 `lazy()` + `Suspense`（`routes.tsx` 的 `withSuspense` 包装），与 ops-proto 一致。
