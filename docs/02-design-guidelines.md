# 02 - 统一设计规范（Design Guidelines）

> 本文档是门户原型的唯一视觉规范来源。所有页面、区块、组件的实现都必须遵守本文档。
> 基调：**参照硅基流动（siliconflow.cn）首页的排版节奏与视觉语言，配色体系以 Semi `@semi-bot/semi-theme-figma` 主题为唯一事实源。**
> 最后更新：2026-09-22（V0.1）

---

## 1. 主题与色彩

### 1.1 主题接入（唯一方式）

- 组件库：`@douyinfe/semi-ui`，主题包：`@semi-bot/semi-theme-figma`。
- 入口 `src/main.tsx` 中**用主题包 CSS 替换 Semi 默认 CSS**：

```ts
import '@douyinfe/semi-ui/react19-adapter';
import '@semi-bot/semi-theme-figma/css/semi.min.css'; // ← 替代 @douyinfe/semi-ui/dist/css/semi.min.css
import './styles/tokens.css';
import './styles/global.css';
```

- **禁止**再引入 Semi 默认 css，避免主题被覆盖。
- 所有颜色引用一律走 Semi CSS 变量（主题令牌），**不允许硬编码色值**，保证未来换主题/品牌色一处生效：

| 用途 | 变量 |
|---|---|
| 品牌主色 / 主按钮 / 强调 | `var(--semi-color-primary)` 及 `--semi-color-primary-hover / -active / -light` |
| 页面底色 | `var(--semi-color-bg-0)`；交替区块底色 `var(--semi-color-fill-0)` |
| 卡片底色 | `var(--semi-color-bg-1)` |
| 主文本 / 次文本 / 弱文本 | `var(--semi-color-text-0/1/2)` |
| 边框/分割线 | `var(--semi-color-border)` |
| 成功/警告/危险 | `var(--semi-color-success/warning/danger)` |

- 营销区块需要**渐变/氛围色**时，只允许基于主题主色派生（如 `color-mix` 或 `rgba` 透明度叠加主色变量），禁止引入主题色系之外的新色相。

### 1.2 门户自有设计令牌（`src/styles/tokens.css`）

营销版式所需的尺寸类令牌统一定义为 CSS 变量，组件只消费变量：

```css
:root {
  --portal-container: 1200px;        /* 内容区最大宽度 */
  --portal-section-y: 80px;          /* 区块纵向内边距（桌面端） */
  --portal-radius-card: 12px;        /* 营销卡片圆角 */
  --portal-radius-lg: 16px;          /* 大卡/横幅圆角 */
  --portal-shadow-card: 0 2px 12px rgba(15, 18, 34, .06);
  --portal-shadow-hover: 0 8px 24px rgba(15, 18, 34, .12);
  --portal-transition: all .2s ease;
  --portal-header-h: 64px;
}
```

## 2. 明暗模式

门户首版**仅浅色模式**（与硅基流动一致）。全局 `body` 背景 `--semi-color-bg-0`。暗色模式留待后续版本，实现时必须整体切换、禁止区块级自定深色（Hero 区的深色氛围用渐变叠加实现，而非切主题）。

## 3. 字体与字号

系统字体栈（不引入外部字体文件）：

```
-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif
```

| 层级 | 用途 | 桌面端 | 移动端 | 字重 |
|---|---|---|---|---|
| H1 | Hero 主标题 | 52px / 行高 1.25 | 32px | 700 |
| H2 | 区块标题 | 36px / 行高 1.3 | 26px | 700 |
| H3 | 卡片标题 | 20px | 18px | 600 |
| Lead | 区块副标题 | 18px，`--semi-color-text-1` | 15px | 400 |
| Body | 正文 | 15px，`--semi-color-text-1` | 14px | 400 |
| Caption | 辅助说明/标签 | 13px，`--semi-color-text-2` | 12px | 400 |

- 区块标题 + 副标题**居中**排列（营销站惯例），卡片内文本左对齐。
- 数字指标（优势里的"70%"、"3-5 倍"等）可用主色强调。

## 4. 布局与栅格

- 内容容器：`max-width: var(--portal-container)` 居中，两侧 padding 24px（移动端 16px）。
- 区块（section）节奏：`padding: var(--portal-section-y) 0`；相邻区块用背景色交替（bg-0 / fill-0）或渐变氛围区分。
- 卡片栅格：4 卡网格 `repeat(4, 1fr)`（≥1200px）→ 2 列（≥768px）→ 1 列；间距 24px。
- Logo 墙：6 列网格（桌面）→ 3 列（移动），项高 72px，灰度呈现、hover 恢复主色。

## 5. 圆角 / 阴影 / 描边

| 元素 | 圆角 | 阴影 |
|---|---|---|
| 卡片 | `--portal-radius-card` (12px) | 静默 `--portal-shadow-card`，hover `--portal-shadow-hover` |
| 横幅/大卡 | `--portal-radius-lg` (16px) | 同上 |
| 按钮/输入框/弹层 | Semi 默认，不自定义 | Semi 默认 |

- 卡片 hover 统一：`translateY(-4px)` + `--portal-shadow-hover` + 主色描边（`box-shadow` 或 `border-color: var(--semi-color-primary)` 二选一），过渡 `var(--portal-transition)`。
- 卡片默认带 1px 描边 `1px solid var(--semi-color-border)`（营销卡片需要清晰边界）。

## 6. 图标与插画

- 功能图标：`@douyinfe/semi-icons`（尺寸 20/24，颜色 `--semi-color-primary` 或 `--semi-color-text-1`）。
- 区块装饰图形：内联 SVG（渐变取自主题主色），放在 `src/components/icons/`，**统一组件化**（如 `<MatrixIcon />`），不允许散落的 `<img>` 装饰图。
- **程序生成视觉（V0.1.1 起）**：营销区块的"插画/图片"一律用 CSS/SVG 程序生成（如 Hero 浮动产品小卡、跑马灯文字 Logo、渐变光斑），保证零版权与脱敏风险；未来需要真实图片/视频时，统一放 `public/` 或 `src/assets/` 并在 `docs/04` 对应模式里登记素材位。
- 空态插画：`@douyinfe/semi-illustrations`。

## 7. 动效

- 通用过渡：`0.2s ease`（hover、颜色、位移）。
- **动效清单（V0.1.1）**：
  - `data-reveal` 滚动入场（IntersectionObserver + `.is-revealed`，支持 `transitionDelay` 交错；入场后 JS 自动清除延迟避免拖慢 hover）；
  - Hero：标题高亮词轮换（3.2s）、浮动小卡 `portal-float` + 鼠标视差（`--mx/--my` 写入 section，子卡用独立 `translate` 属性承接，避免被 float 关键帧覆盖）；
  - 私有化横幅：`portal-shine` 流光扫过；
  - 行业轮播：自动播放 5s + `hoverToPause`；
  - LOGO 墙：双行反向跑马灯（`portal-marquee(-reverse)`，hover 暂停，边缘遮罩渐隐）；
  - 底部 CTA 主卡 / 品牌口号：`portal-gradient-pan` 渐变流动；
  - 装饰光斑：`portal-drift` 缓慢漂移。
- 首屏允许轻量入场动画，全部循环动效与入场必须尊重 `prefers-reduced-motion`（`global.css` 统一关闭）。
- 禁止大规模视差滚动/粒子等重型动效（原型以交付还原与演示稳定性优先）。

## 8. 响应式断点

| 断点 | 布局行为 |
|---|---|
| ≥1200px | 完整桌面布局 |
| 992–1199px | 容器收窄，4 卡 → 2 卡 |
| 768–991px | 导航折叠为抽屉（Semi `Nav` + `Drawer`），2 卡网格 |
| <768px | 单列，Hero 字号降至移动档，页脚分组折叠为手风琴（可简化为纵向堆叠） |

Header 在 <768px 时：左侧 Logo + 右侧汉堡按钮，菜单进 `Drawer`。

## 9. 可用性底线

- 所有可点击卡片/横幅必须可键盘聚焦（语义化 `<a>`/`<button>`）；
- 文本对比度遵循 Semi 令牌默认搭配，不允许 text-2 以下弱色承担主要信息；
- 图片类占位必须有 `alt` 或 `aria-hidden`（纯装饰）。
