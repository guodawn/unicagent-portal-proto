# 04 - 区块模式库（Section Patterns）

> 营销页由可复用的「区块（Section）」拼装而成。本文档定义区块模式、结构规范与 Semi 组件映射。
> 首页 = 下列区块的固定序列；后续子页面（营销页）优先复用同一套模式，禁止发明新模式。
> 最后更新：2026-09-22（V0.1）

---

## 0. 区块通用结构

```tsx
<section className="section {section名}">
  <div className="container">            {/* max-width: var(--portal-container) */}
    <div className="section-head">       {/* 可选：标题 + 副标题，居中 */}
      <h2>…</h2>
      <p className="lead">…</p>
    </div>
    …区块主体（卡片网格 / 轮播 / 横幅…）
  </div>
</section>
```

- 区块背景交替：白（bg-0）↔ 浅灰（fill-0）或主题色渐变氛围；每个区块类名前缀独立（如 `.hero-`、`.matrix-`），样式集中在 `src/pages/home/HomePage.css` 或区块同名 CSS 文件。

---

## 1. 公告轮播（AnnouncementBar）

- 用途：Hero 顶部滚动播报平台动态/上新（对应硅基流动的模型上新公告）。
- 结构：细横条（高 40px），左侧「最新动态」胶囊标签（主色浅底），中间轮播文本，右侧「查看」箭头链接。
- 实现：Semi `Carousel`（autoPlay，间隔 4s，无箭头，仅 fade），数据来自 `mock/content.ts` 的 `announcements`。

## 2. Hero 区（HeroBanner）

- 用途：一句话定位 + 行动号召，首屏定调。
- 结构：居中排版——H1 主标题（52px，**高亮词每 3.2s 轮换**：AI 生产力/模型服务/数字员工/算力）→ Lead 副标题（18px）→ CTA 按钮组 → 下方氛围视觉。
- **浮动卡层（V0.1.1）**：三张程序生成的产品小卡（数字员工对话 / 模型报价+折线 / 算力利用率仪表）绝对定位漂浮，`portal-float` 上下浮动 + 鼠标视差（`translate` 属性承接 `--mx/--my`），≤992px 隐藏。
- 氛围：主题色径向光斑 `portal-drift` 漂移 + 细网格纹理；标题/副标题/CTA 交错 `data-reveal` 入场。
- 组件映射：Semi `Button`（size large, theme solid / light）。

## 3. 横幅（PromoBanner）

- 用途：单个重点业务的强推横幅（V0.1 用于**私有化部署服务平台**，对应硅基流动「锁定算力」横幅）。
- 结构：整宽圆角大卡（radius-lg，主题主色深色渐变底、白字），左侧标题+卖点清单（check 图标），右侧 CTA 白色按钮。
- 动效：`portal-shine` 流光每 6s 扫过一次 + 右上氛围光斑。
- 卖点数量：3–4 个短语。

## 4. 卡片矩阵（CardMatrix）

- 用途：并列能力/产品入口（首页用于**四大能力**：智能体开发平台、大模型广场、AI 算力运营服务、大模型服务网关）。
- 结构：4 卡网格；每卡 = 图标（SVG，40px）→ H3 标题 → 描述（2–3 行）→ 底部文字按钮「立即体验 / 了解详情 →」（主色，hover 箭头右移 2px）。
- 交互：整卡可点击；hover 上浮 + 阴影 + 主色描边（见设计规范 §5）。
- 组件映射：Semi `Card`（bodyStyle 去内边距自定义）或纯 div 卡片；按钮用 `Button` theme borderless。

## 5. 优势网格（AdvantageGrid）

- 用途：「为什么选择我们」六大优势。
- 结构：`3 × 2` 网格（桌面）；每卡 = 图标 → 标题 → 描述，**浅底无描边**（与卡片矩阵区分，视觉更轻）；关键数字指标用主色加粗。
- 背景交替：本区块用 fill-0 浅灰底。

## 6. 行业轮播（IndustryCarousel）

- 用途：行业解决方案速览（汽车 / 电力 / 能源 / 通用）。
- 结构：轮播大卡（一次 1 张，页码指示 `01/04`），卡内 = 左侧行业名 + 场景描述列表，右侧渐变装饰图形 + 行业图标（emoji 浮动动画）。
- 实现：Semi `Carousel`，**自动播放 5s + hoverToPause**（hover 暂停）、hover 显示箭头、自定义页码计数。
- 点击整卡 → 对应 `/solutions/*` 页面。

## 7. LOGO 墙（LogoWall）

- 用途：典型客户与合作伙伴，建立信任。
- 结构（V0.1.1 起）：**双行反向跑马灯**——12 个虚构客户分两行，各自无缝循环滚动（`portal-marquee` / 反向 42s），hover 暂停，两端遮罩渐隐；项 = 文字 Logo 占位（14px 灰度，hover 主色）。
- 约束：一律虚构脱敏名称（见 01-positioning §5），不使用图片。

## 8. 客户评价（Testimonials）

- 用途：客户证言（硅基流动首页无此区块，为门户 IA 明确要求新增）。
- 结构：3 列卡片；每卡 = 大引号装饰 → 评价正文（15px，2–4 行）→ 底部署名（姓名/职务 + 虚构企业，caption 灰色）。
- 数据：3–4 条，来自 `testimonials`；评价内容必须对应四类受众中的真实关切（私有化交付 / 低代码 / 供给侧分成 / 模型选型）。

## 9. 底部 CTA（BottomCta）

- 用途：收口转化。
- 结构：两列双卡：主卡「快速获取您的智能体服务」（蓝→紫流动渐变底 `portal-gradient-pan` + solid 按钮）、副卡「获取私有化与行业方案」（灰底 + light 按钮）。

## 10. 品牌口号区（BrandSlogan）

- 用途：页脚前的品牌收束（对应硅基流动「加速 AGI 普惠人类」）。
- 结构：居中口号（H2，**渐变流光文字** `portal-gradient-pan`）+ 社媒图标行（GitHub / 微信 / 合作洽谈占位，hover 主色上浮）。

> **交错入场（V0.1.1 全局）**：各区块标题与卡片挂 `data-reveal`，滚动进入视口时上浮淡入，卡片按 `index * 90ms` 交错；矩阵/优势/评价卡 hover 效果不受入场延迟影响（入场完成后 JS 清除 `transitionDelay`）。

## 11. 大页脚（SiteFooter）

- 结构（4 列 + 底条）：
  - 第 1 列：Logo + 一句话定位 + 联系方式（业务咨询邮箱、地址占位）；
  - 第 2 列「产品」：智能体开发平台、数字员工平台、智能体工作台、智能体开发套件、大模型广场、大模型体验；
  - 第 3 列「服务与方案」：AI 算力运营服务、大模型服务网关、私有化部署服务平台、行业解决方案、套餐购买、API 充值；
  - 第 4 列「支持」：文档、登录/控制台、用户协议、隐私政策；
  - 底条：版权 + 「原型演示版本，数据均为模拟」标注。
- 链接分组标题 14px text-0；链接 13px text-2，hover 主色。

## 12. 占位页（PlaceholderPage）

- 所有未实现路由的统一兜底：Semi `Empty`（IllustrationConstruction）+ 页面名 + 「该页面将在后续版本交付，当前原型聚焦首页」+ 「返回首页」按钮。

---

## 附：首页区块序列（V0.1 基线）

```
SiteHeader
└── HomePage
    ├── AnnouncementBar      # 公告轮播
    ├── HeroBanner           # 一句话定位 + CTA
    ├── PromoBanner          # 私有化部署服务平台横幅
    ├── CardMatrix           # 四大能力（产品矩阵）
    ├── AdvantageGrid        # 六大优势（为什么选择众调）
    ├── IndustryCarousel     # 行业解决方案
    ├── LogoWall             # 典型客户与合作伙伴
    ├── Testimonials         # 客户评价
    ├── BottomCta            # 底部双 CTA
    └── BrandSlogan          # 品牌口号 + 社媒
SiteFooter
```
