# UnicAgent 企业门户 - 产品高保真交互原型 (unicagent-portal-proto)

本项目是 **UnicAgent 企业门户（Enterprise Portal）** 的高保真前端交互原型工程。

> **核心使命与定位**：
> 1. **产品经理唯一事实源 (Single Source of Truth)**：作为产品经理需求澄清、原型交互演练的官方交付物，彻底替代难以精准还原与联动的脆弱静态 HTML 原型。
> 2. **研发 100% 像素级还原对齐**：采用与生产一致的 React + Semi Design 规范与 `@semi-bot/semi-theme-figma` 官方主题，代码结构完备，研发团队可直接基于本项目接入真实后端 API。
> 3. **硅基流动（SiliconFlow）级科技排版**：高保真复刻硅基流动科技通透的设计语言与结构排版，包含首屏焦点大轮播、全场景产品矩阵 Tabs、大模型广场体验抽屉与 Arena 对比、行业落地解决方案与客户信任背书。
> 4. **响应式 Mock Store 与本地持久化**：内置完整的状态流转与本地缓存机制，支持单模型即开即测、双模型同屏对比评测、套餐订购模拟与 PRD 需求浮层。

---

## 🛠️ 技术栈与依赖

- **前端框架**：React 19 (`react`, `react-dom`)
- **路由管理**：React Router (`react-router`)
- **UI 组件库**：Semi Design (`@douyinfe/semi-ui`, `@douyinfe/semi-icons`)
- **官方主题包**：`@semi-bot/semi-theme-figma`
- **构建工具**：Vite 6 + TypeScript 5
- **包管理器**：pnpm

---

## 🚀 快速启动

```bash
# 1. 进入项目目录
cd /Users/guochenguang/project/unicagent-portal-proto

# 2. 安装依赖 (如已安装可跳过)
pnpm install

# 3. 启动开发服务器 (默认端口 5174，避免与运营后台 5173 冲突)
pnpm dev
```

本地服务启动后访问：`http://127.0.0.1:5174/`

### 类型检查与生产构建

```bash
# TypeScript 类型检查
pnpm typecheck

# 生产环境打包验证
pnpm build
```

---

## 📂 项目结构概览

```text
unicagent-portal-proto/
├── docs/                                  # 规范沉淀中心（指导后续 AI 协同与研发）
│   ├── DESIGN_SPEC.md                     # 统一设计规范、色彩、排版与微动效
│   └── PORTAL_ARCHITECTURE.md             # 受众角色全景图、信息架构与硅基流动对照
│
├── src/
│   ├── main.tsx                           # 入口文件（挂载 Semi React19 Adapter 与 Figma 主题）
│   ├── App.tsx                            # 根组件
│   ├── routes.tsx                         # 路由表定义
│   ├── styles/
│   │   └── globals.css                    # 全局排版、科技渐变主色与微交互样式
│   │
│   ├── components/                        # 公共与布局组件
│   │   ├── layout/
│   │   │   ├── PortalHeader.tsx           # 吸顶毛玻璃导航（带结构化 MegaMenu 下拉）
│   │   │   ├── PortalFooter.tsx           # 5 列结构化暗色沉浸式页脚与合规备案
│   │   │   └── PortalShell.tsx            # 门户全页面骨架容器
│   │   ├── common/
│   │   │   ├── SectionHeader.tsx          # 统一硅基流动级大标题与副标组件
│   │   │   ├── TrustLogoWall.tsx          # 4 项大指标与生态伙伴 LOGO 墙
│   │   │   ├── ModelDetailDrawer.tsx      # 大模型详情抽屉 (SideSheet: 评测/代码/Playground)
│   │   │   └── ModelCompareModal.tsx      # 大模型双模型同屏竞技场 (Arena 对比)
│   │   └── prototype/
│   │       └── PrototypeToolbar.tsx       # 产品经理原型悬浮控制条（PRD说明/一键重置）
│   │
│   ├── mock/                              # 领域数据与 Mock Store
│   │   ├── types.ts                       # 领域实体与模型 TypeScript 接口定义
│   │   ├── fixtures.ts                    # 初始全量数据集（文案完全对齐真实业务）
│   │   └── mockStore.ts                   # 响应式状态管理（发布订阅 + localStorage 持久化）
│   │
│   └── features/                          # 核心业务页面
│       └── home/                          # 首页板块
│           ├── HomePage.tsx               # 首页总控装配
│           ├── HeroCarousel.tsx           # 首屏 3 屏大气焦点轮播与 CTA
│           ├── ProductMatrixSection.tsx   # 全场景产品矩阵 (4 大业务 Tab 切换)
│           ├── AdvantageSection.tsx       # 为什么选择 UnicAgent (6 大核心优势 3x2 网格)
│           ├── ModelPlaygroundSection.tsx # 大模型广场预览与快速体验卡片
│           ├── SolutionSection.tsx        # 垂直行业落地方案 (汽车/电力/能源/通用)
│           ├── PricingSection.tsx         # 定价套餐对比与 API Token 充值试算器
│           ├── TestimonialSection.tsx     # 标杆客户与算力伙伴真实引言评价
│           └── CtaBannerSection.tsx       # 底部行动号召 Banner 与预约咨询表单
```

---

## 🌟 核心功能与交互亮点

1. **全域导航 MegaMenu 交互**：悬停「首页」、「智能体开发平台」、「大模型广场」、「定价」、「行业解决方案」，即刻展示精美结构化子分类与快速锚点定位。
2. **大模型详情抽屉 (SideSheet)**：点击任意模型，滑出参数规格、Token 单价、延迟、多维度评测进度条、cURL / Python OpenAI SDK 快速接入代码以及在线体验 Playground。
3. **大模型 Arena 竞技对比**：支持选择任意两个模型同题比对，实时展现推理用时、生成文本风格与单价差异。
4. **定价周期切换与充值试算**：支持按月/按年支付实时换算（年付立减 20%），并内置拖动滑块实时计算大额充值赠送额度。
5. **产品经理专属原型工具栏**：右下角常驻悬浮条，可随时呼出当前需求 PRD 澄清浮层，支持一键将原型重置为出厂数据。
