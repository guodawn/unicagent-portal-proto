# 众调 AI 生态平台 UnicAgent - 门户产品高保真原型 (unicagent-portal-proto)

本项目是**众调 AI 生态平台（UnicAgent）门户网站**的产品高保真前端原型工程，产品经理唯一事实源（Single Source of Truth）。

> **核心定位**：
> 1. **需求澄清与原型演示**：产品经理基于本项目结合需求文档澄清需求、演示原型交互；
> 2. **研发 100% 还原交付物**：采用与生产一致的 React + Semi Design 规范与 `@semi-bot/semi-theme-figma` 主题，研发直接基于本项目对接真实后端，保证 UI/UX 100% 还原；
> 3. **纯 Mock 数据**：不对接真实接口，全站文案内容集中于 `src/mock/content.ts`；
> 4. **视觉基线**：首页结构与排版节奏完整参照硅基流动（siliconflow.cn）首页，内容替换为 UnicAgent 六大板块（V0.1 已确认共识，见 `docs/01`）。

---

## 📚 设计规范（改代码前必读）

全部规范沉淀在 `docs/`，是本项目的唯一设计事实源：

| 文档 | 内容 |
|---|---|
| `docs/01-positioning.md` | 门户定位、受众画像、品牌命名、mock 内容红线 |
| `docs/02-design-guidelines.md` | 主题接入、色彩令牌、字体字号、栅格、圆角阴影、图标、动效、响应式 |
| `docs/03-information-architecture.md` | 导航信息结构、路由表与交付状态、页面骨架 |
| `docs/04-section-patterns.md` | 区块模式库（公告轮播/Hero/横幅/矩阵/优势/行业/LOGO 墙/评价/CTA/口号/页脚） |
| `docs/05-mock-content-guide.md` | mock 内容规范（虚构脱敏策略、文案基调） |
| `docs/06-ai-coding-guide.md` | 工程结构、新增页面 SOP、硬性约束、验收 Checklist |

---

## 🛠️ 技术栈

- **框架**：React 19 + TypeScript 5（strict）
- **构建**：Vite 6，包管理 pnpm
- **UI**：`@douyinfe/semi-ui` ~2.100 + `@semi-icons` + `@semi-illustrations`
- **主题**：`@semi-bot/semi-theme-figma`（入口以主题包 CSS 替代 Semi 默认 CSS）
- **路由**：`react-router` v8（lazy + Suspense）

---

## 🚀 快速启动

```bash
cd /Users/guochenguang/project/unicagent-portal-proto
pnpm install        # 安装依赖
pnpm dev            # 启动开发服务器 http://127.0.0.1:5174/
```

```bash
pnpm typecheck      # TypeScript 类型检查
pnpm build          # 类型检查 + 生产构建
```

> 端口 5174 为本项目专用（5173 留给 `unicagent-ops-proto` 运营后台原型）。

---

## 📂 项目结构

```text
unicagent-portal-proto/
├── docs/                        # 设计规范（见上表）
├── index.html
├── public/favicon.svg
└── src/
    ├── main.tsx                 # 入口：react19-adapter → 主题CSS → tokens → global → LocaleProvider/BrowserRouter
    ├── App.tsx                  # useRoutes
    ├── routes.tsx               # 路由表（首页完整实现，其余路由为占位页，见 docs/03）
    ├── styles/
    │   ├── tokens.css           # 门户设计令牌（--portal-*）
    │   └── global.css           # 全局样式与通用工具类
    ├── layout/
    │   ├── SiteLayout.tsx       # Header + Outlet + Footer + ScrollToTop
    │   ├── SiteHeader.tsx       # 顶部导航（桌面下拉 + 移动端 SideSheet）
    │   └── SiteFooter.tsx       # 大页脚
    ├── mock/
    │   └── content.ts           # 全站文案内容层（唯一入口）
    ├── components/
    │   ├── icons/               # 图标映射（组件化）
    │   ├── sections/            # 区块组件（docs/04 区块模式库）
    │   ├── PlaceholderPage.tsx  # 统一占位页
    │   └── NotFoundPage.tsx     # 404
    └── pages/
        └── home/
            ├── HomePage.tsx     # 区块序列拼装
            └── HomePage.css     # 首页区块样式
```

首页区块序列（docs/04 附录基线）：
`公告轮播 → Hero → 私有化部署横幅 → 四大能力矩阵 → 六大优势 → 行业解决方案轮播 → LOGO 墙 → 客户评价 → 底部双 CTA → 品牌口号`

---

## 💡 产品经理使用指南

- 修改文案：只改 `src/mock/content.ts`（带 TypeScript 类型提示），不动组件；
- 导航六个一级入口均可点击：智能体开发平台 / 大模型广场 / 定价 / 行业解决方案 / 文档目前为统一占位页（`页面待建设`），首页为 V0.1 完整交付物；
- 页脚「登录 / 控制台、用户协议、隐私政策」为原型占位（点击有提示），备案号与联系方式均为占位内容。

## 🔧 研发对接指南

1. 内容层：`src/mock/content.ts` 的类型即接口 DTO 蓝本，替换为 CMS/API 数据源即可；
2. 样式：全部颜色走 `--semi-color-*`（主题令牌）、版式走 `--portal-*`，换品牌色只需替换主题包；
3. 组件：区块组件与页面 JSX 可直接复用于生产工程，无需重写样式。
