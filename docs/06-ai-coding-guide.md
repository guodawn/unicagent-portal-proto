# 06 - 工程结构与 AI Coding 指南

> 本文档写给后续参与本项目的 AI / 研发：如何在新需求下扩展本原型，保证与既有规范一致。
> 最后更新：2026-09-22（V0.1）

---

## 1. 项目定位（必读）

1. **唯一事实源**：本项目是「众调 AI 生态平台」门户的产品原型，PM 用它澄清需求与演示，最终作为交付物交研发 100% 还原 UI/UX；
2. **纯前端 Mock**：不对接真实接口，一切内容来自 `src/mock/`；
3. **持续演进**：跟随产品迭代持续更新，任何 UI 变更先改原型再谈开发。

## 2. 技术栈（与 ops-proto 对齐）

| 项 | 选型 |
|---|---|
| 框架 | React 19 + TypeScript 5（strict） |
| 构建 | Vite 6，包管理 pnpm |
| UI | `@douyinfe/semi-ui` ~2.100 + `@semi-icons` + `@semi-illustrations` |
| 主题 | `@semi-bot/semi-theme-figma`（替换 Semi 默认 css 引入，见 02 规范 §1.1） |
| 路由 | `react-router` v8（`useRoutes` + lazy） |

## 3. 目录结构

```
unicagent-portal-proto/
├── docs/                     # 设计规范（改 UI 前先读 01–04）
├── index.html
├── package.json
├── tsconfig.json             # paths: @/* → src/*
├── vite.config.ts            # alias @ → src
└── src/
    ├── main.tsx              # 入口：react19-adapter → 主题css → tokens → global → LocaleProvider/BrowserRouter
    ├── App.tsx               # useRoutes(ROUTES)
    ├── routes.tsx            # 路由表（新页面先登记这里）
    ├── styles/
    │   ├── tokens.css        # 门户设计令牌（--portal-*）
    │   └── global.css        # 全局样式 + 通用工具类（.container/.section 等）
    ├── layout/
    │   ├── SiteLayout.tsx    # Header + Outlet + Footer + ScrollToTop
    │   ├── SiteHeader.tsx    # 顶部导航（Semi Nav/下拉 + 响应式 Drawer）
    │   └── SiteFooter.tsx    # 大页脚
    ├── mock/
    │   └── content.ts        # 全站文案内容层（唯一入口，见 05 规范）
    ├── components/
    │   ├── icons/            # 内联 SVG 装饰/功能图标（组件化）
    │   ├── sections/         # 区块组件（见 04 区块模式库，命名如 HeroBanner.tsx）
    │   └── PlaceholderPage.tsx
    └── pages/
        └── home/
            ├── HomePage.tsx  # 区块序列拼装
            └── HomePage.css  # 首页各区块样式（.hero- / .matrix- / .adv- … 前缀）
```

## 4. 新增页面 SOP

1. **读规范**：`docs/01`–`04`；
2. **登记路由**：在 `docs/03` 路由表加行 → `src/routes.tsx` 加 lazy 路由；
3. **写内容**：`src/mock/content.ts` 新增该页内容对象（带类型）；
4. **拼区块**：优先复用 `components/sections/` 既有区块模式；确需新模式时，先在 `docs/04` 登记模式定义再实现；
5. **样式**：页面级 CSS 放 `pages/<page>/<Page>.css`，类名带区块前缀；颜色只用 Semi 变量，尺寸用 `--portal-*` 令牌；
6. **验收**：`pnpm typecheck && pnpm build` 通过；浏览器逐断点（1200/768）自查。

## 5. 硬性约束（AI Coding 红线）

- 禁止硬编码颜色/字号/间距——颜色走 `--semi-color-*`，版式走 `--portal-*`；
- 禁止引入 Semi 默认 css 或第二套 UI 库；禁止引入图片素材（一律 SVG/文字占位）；
- 禁止在组件内写死长文案（文案进 `content.ts`）；
- 禁止使用真实客户名、真实备案号、真实联系方式（见 05 §2）；
- TypeScript strict 全通过；组件导出命名导出（与 ops-proto 一致）；
- 每次改动保持 `pnpm build` 绿灯后再交付。

## 6. 常用命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 本地开发 http://127.0.0.1:5174
pnpm typecheck      # tsc --noEmit
pnpm build          # 类型检查 + 产物构建
```

## 7. 验收 Checklist（每次交付前自查）

- [ ] 首页区块顺序与 `docs/04` 附录一致；
- [ ] 导航六个一级入口 + 下拉项与 `docs/03` IA 一致；
- [ ] 所有跳转路由可到达（无死链），未实现页面显示占位页；
- [ ] 1200px / 768px 两档断点无横向滚动、无布局塌陷；
- [ ] 无硬编码色值；客户/评价/联系方式均为虚构脱敏；
- [ ] `pnpm typecheck`、`pnpm build` 通过。
