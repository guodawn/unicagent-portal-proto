# 07 - 《众调AI生态服务平台》静态原型设计规范（100% 还原唯一事实源）

> **原型文件**：`docs/proto-ref/众调AI生态服务平台.html`（微信收到的静态 HTML，2128 行，内联 CSS + JS）
> **地位**：本规范自该原型逐项抽取，是该原型在 React 工程中 **100% 还原的唯一事实源**。
> **还原铁律**：
> 1. CSS 一律从原型 `<style>` 块**逐字复制**（`src/styles/proto.css`），禁止改写数值、四舍五入、换算单位；
> 2. DOM 结构、class 命名与原型**一一对应**（`data-page-node-id` 为原型工具痕迹，不还原）；
> 3. 文案（含**半角/全角标点、空格、`&nbsp;`**）逐字符一致，禁止润色；
> 4. 动效参数（时长/缓动/延迟/关键帧）逐字保留；
> 5. JS 行为（Tab 切换、滚动揭示、星空画布、跑马灯填充、页面路由）用 React 等价实现，逻辑分支与原型一致。
>
> 最后更新：2026-09-28（V0.2 · 依据微信原型 100% 还原）

---

## 1. 页面地图与路由映射

原型是「单 HTML + JS 路由（showPage）」的 4 页面结构，React 工程用 react-router 等价映射：

| 原型 page id | 页面 | React 路由 | 进入入口 |
| :--- | :--- | :--- | :--- |
| `page-home` | 门户首页 | `/` | 导航「首页」 |
| `page-compute` | AI 算力运营服务 | `/services/compute` | 「首页」下拉 dd-item（icon: 芯片） |
| `page-llm` | 大模型服务网关 | `/services/gateway` | 「首页」下拉 dd-item（icon: 分享网络） |
| `page-private` | 私有化部署服务平台 | `/services/private-deployment` | 「首页」下拉 dd-item（icon: 盾牌） |

其余导航项按工程既有占位路由接驳（视觉不变）：智能体开发平台 `/agent-platform`、大模型广场 `/models`、定价 `/pricing`、文档 `/docs`；「行业解决方案」保持原型锚点行为 `#solutions`（不在首页时先回首页再平滑滚动）。

**页面切换行为**：原型 `showPage` 切页后 `window.scrollTo(0,0)`；React 由 `SiteLayout` 的 ScrollToTop 等价实现。

---

## 2. 设计令牌（Design Tokens）

### 2.1 CSS 变量（`:root`，逐字复制）

```css
:root{
  --purple:#7C3AED;      /* 品牌主紫（Hero 渐变、Tab 激活、链接悬停） */
  --purple-2:#6D28D9;    /* 深紫（eyebrow、强调文字、ghost 按钮文字） */
  --indigo:#6366F1;      /* 靛蓝（渐变第二色） */
  --ink:#1A1A2E;         /* 主文本墨色 */
  --gray:#6B7280;        /* 次文本 */
  --gray-2:#9CA3AF;      /* 弱文本（滚动提示等） */
  --line:#E9EAF0;        /* 分割线/默认边框 */
  --bg:#FFFFFF;          /* 页面底色 */
  --bg-soft:#F7F8FC;     /* 交替区块浅底 */
  --shadow:0 12px 40px rgba(31,38,89,.10);
  --shadow-hover:0 20px 50px rgba(124,58,237,.18);
}
```

### 2.2 辅助色板（CSS 中出现的完整色值）

| 用途 | 色值 |
| :--- | :--- |
| 品牌渐变（按钮/Tab 激活/Logo mark） | `linear-gradient(135deg,#7C3AED,#6366F1)` |
| 流动渐变（grad-flow/CTA 按钮） | `90deg: #7C3AED 0%,#6366F1 22%,#06B6D4 44%,#8B5CF6 66%,#EC4899 88%,#7C3AED 100%`（size 300% 100%） |
| Hero 背景 | `radial-gradient(120% 80% at 50% -10%,#EDE9FE 0%,#F7F8FC 45%,#FFFFFF 100%)` |
| 子页 Hero 背景（lg/cp/pd 共用） | `radial-gradient(120% 70% at 50% 0%,#F0EBFF 0%,#F8F7FC 50%,#FFFFFF 100%)`（pd 中段为 `#F5F1FE 45%`） |
| CTA 大卡背景 | `linear-gradient(135deg,#1E1B4B,#4338CA)` + 双 blur 光斑 `#7C3AED`/`#6366F1` |
| Footer 背景 | `linear-gradient(180deg,#F8F7FF 0%,#F0EBFF 100%)`，上边框 `#E6E1F5` |
| 导航吸顶 | `rgba(255,255,255,.82)` + `backdrop-filter:saturate(180%) blur(14px)` |
| 下拉面板边框/阴影 | 边框 `#EAEAF2`；阴影 `0 20px 50px rgba(73,55,138,.16),0 4px 12px rgba(73,55,138,.06)` |
| solution-hero 底 | `#F8F7FF` + 波点 `radial-gradient(circle,rgba(124,58,237,.24) 1px,transparent 1.2px)` 13×13 |
| 网关三栏语义色 | 供给=橙系（`#FFF7EC→#FFE5CC`，边 `#FCD9B3`，icon 底 `#FFE6CF`，icon 色 `#FF8A4C`）；网关=紫系（`#FBFAFF→#F2EDFE`，头 `#7C3AED→#5B45E0`）；消费=青系（`#F1FBFD→#D7F1F6`，边 `#BFE6EE`，icon 色 `#06B6D4`） |
| 评价卡三底色 | ① `#E9FCFC` ② `#F5F7FA` ③ `#F7F1FF` |
| mark-word（青色高亮词） | 色 `#0E7C9A`，底 `linear-gradient(180deg,transparent 60%,rgba(6,182,212,.18) 60%)` |
| mark-purple（紫色高亮词） | 色 `var(--purple-2)`，底 `linear-gradient(180deg,transparent 60%,rgba(124,58,237,.18) 60%)` |
| pd 架构层 | 紫 `#F5F1FE→#EDE5FE`；青 `#F0FAFC→#E2F4F8`；chip 边 `rgba(124,58,237,.20)` / `rgba(6,182,212,.30)` |

### 2.3 字体

```css
font-family:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
```

`body{line-height:1.6;-webkit-font-smoothing:antialiased}`。

### 2.4 排版阶梯（原型实测值）

| 层级 | 字号/字重/行高 | 出现位置 |
| :--- | :--- | :--- |
| 首页 H1 | 52px / 800 / 1.2 / letter-spacing -.5px | Hero 主标题 |
| 子页 H1（lg/cp） | 42px / 800 / 1.3 / -.5px | 子页 Hero |
| 子页 H1（pd） | 46px / 800 / 1.28 / -.6px | pd Hero |
| 章节 H2 | 36px / 800 / -.4px | sec-head、lg-arch、cp-flow(38px) |
| 中 H2 | 34px / 800 / -.8px（色 #5630ED） | reviews 标题、cp-coop、pd-tagline |
| 小 H2/H3 | 32px / 800（cp-h2、lg-provide）、28px（cp-why） | 各子页章节 |
| solution-hero H3 | 25px / 800 / 1.42 / -.55px / 色 #151B31 | 行业方案叙事标题 |
| 卡片 H3/H4 | 22px（pd-adv）、20px（cp-coop）、19px（pd-product）、17~18px（provide/review-title） | 各类卡片 |
| 正文 | 19px（hero sub）、16~17px（sec-head p / 子页 sub）、14~15.5px（卡片正文）、12~13px（卡片小字） | — |
| eyebrow | 14px / 700 / letter-spacing 2px / uppercase / var(--purple) | sec-head |
| 导航 | 15px（链接）、18px/700（logo）、14.5px/600（dd-title）、12px（dd-desc） | header |

### 2.5 布局系统

- **内容容器** `.wrap`：`max-width:1200px; margin:0 auto; padding:0 24px`（子页部分内容收敛为 960/1080/780px，按组件 CSS 为准）。
- **区块纵向节奏** `.section`：`padding:88px 0`；`.section.soft` 底色 `var(--bg-soft)`；子页区块 50~120px 不等（逐字以 CSS 为准）。
- **导航高度**：66px；reviews 区块 `padding:78px 0 88px`。
- **栅格**：feature-grid `repeat(4,1fr)` gap16；review-grid `repeat(3,1fr)` gap14（max 1080）；provide-grid `1fr 1fr` gap20（max 960）；cp/pd 双栏卡 `1fr 1fr` gap 22~24（max 1080）；网关五栏 `1fr 76px 1.45fr 76px 1fr`（max 1080）；cp-flow 双栏 `1fr 1.35fr` gap60；footer `1.4fr 1fr 1fr 1fr` gap40。

### 2.6 圆角与阴影速查

| 组件 | 圆角 |
| :--- | :--- |
| 按钮 btn | 10px（cta-fx 12px） |
| 卡片 | 12~18px（feature 14、solution-hero 18、coop 18、pd 18、provide 14、review **6px**） |
| 下拉面板 | 16px（小箭头 3px） |
| 图标容器 | 9~16px（fic 9、dd-icon 10、provide-icon 16） |
| pill/标签 | 999px（tag、cs-tag、cp-flow-tag、arch-chip） |

---

## 3. 全局组件规范

### 3.1 导航（header.nav）
- `position:sticky;top:0;z-index:100`，高 66px，毛玻璃底。
- Logo：34×34 mark（渐变 + 白色「太阳」SVG，阴影 `0 6px 16px rgba(124,58,237,.35)`）+ 18px/700 文字「众调AI生态服务平台」。
- 「首页」为唯一下拉项：hover/focus-within 展开 308px 宽面板（上箭头 24px 处、Y 位移 -8→0 渐入），含 3 个 dd-item（36×36 渐变 icon + 标题 14.5/600 + 描述 12px）。hover 时 dd-item 底 `#F4F1FE`、左 padding 14→18、icon 放大 1.06。
- nav-active 紫色始终挂在「首页」trigger 上（原型静态写死）。
- 右侧 `注册/登录` 为 ghost 按钮（透明底 + 1px `var(--line)` 边，hover 紫边 + `#F5F3FF` 底）。
- `≤980px` 隐藏 `.nav-links`（原型未做移动端菜单）。

### 3.2 Hero（首页）
- 画布 `#stars`（z0）→ 3 个 aurora 光斑（520/460/380px，紫/青/粉，blur90 opacity .55，drift 14s/18s/18s-reverse）→ 2 个 deco-ring（340px spin 40s / 240px pulse 6s）→ 内容层（z2，居中 max 880）。
- 内容自上而下（fadeUp .8s，delay 0/.1/.2/.3/.45s）：
  1. tag 胶囊（13px 紫、底 `#F1ECFF`、边 `#E3D9FF`、内含 7px 呼吸 dot 1.8s）：`企业级 AI 生态服务平台`
  2. H1：`懂业务的` + grad-flow（流动渐变 7s）`AI␣生态服务`（AI 与生态服务间为 `&nbsp;`）
  3. sub（19px，max640，两行 `<br>`）：`从[mark-word]算力、模型到智能体[/]应用,企业 AI 一站构建 / 让每一个业务场景都拥有[mark-purple]专属的智能体[/]`（注意「应用,企业」为半角逗号）
  4. 按钮：`预约方案演示`（btn-primary，13px/28px 内边距版）
  5. scroll-hint：22×34 鼠标轮廓（滚轮 3×7px 紫色下落 1.6s）+ 文案 `向下滚动，探索行业实践`
- Hero 底部 140px 白色渐隐罩（::after）。

### 3.3 章节头（sec-head）
居中 max760，`margin:0 auto 52px`：eyebrow（见 2.4）→ H2（12px 上 14px 下边距）→ p（16px 灰）。
**reviews 例外**：`margin-bottom:22px`，隐藏 eyebrow 与 p，H2 34px 色 `#5630ED`。

### 3.4 行业解决方案（tabs + panels）
- tabs：居中 gap10 wrap，tab 为白底 1px 边胶囊（12×26px、15px/600、色 #4B5563），含 18px icon（opacity .7）；hover 紫边紫字；active 渐变底白字 + 阴影 `0 10px 24px rgba(124,58,237,.32)`，icon opacity 1。
- tab 数据：`car 汽车`（车 icon）、`finance 金融`（银行 icon）、`power 电力`（闪电 icon）、`tobacco 烟草`（叶 icon）；默认 active=car。
- panel 切换：`.panel{display:none}` → `.active{display:block}` + `panelIn .5s`。
- panel 结构 = solution-hero + feature-grid：
  - **solution-hero**：360px 高双栏（1.06fr/.94fr），左文案（h3 + 立即咨询按钮），右图（Unsplash 图，object-fit:cover，左缘白雾渐变罩，`filter:saturate(.9) contrast(1.03)`；加载失败回退 96px emoji 渐变底：🚗/🏦/⚡/📦）。
  - **feature-grid**：4 张 176px+ 卡。卡 1-3：36×36 fic 图标（底 #F3EEFF、stroke 紫 2.2）+ 15px/750 标题 + 12px 描述 + `查看案例 →`（hover gap 4→7px）。卡 4：`✨ AI 生成专属方案` 白底描边 gen-btn。
  - **卡悬停（核心视觉）**：卡片抬升 -4px，内嵌 `::before` 渐变层（`135deg,#6D35F2→#5C75F1`，inset 10px 圆角 10）+ `::after` 白色波点层浮现，标题/描述/链接/图标全部转白。
- 四行业文案（h3 与 3 张能力卡）逐字符见 `src/proto/data.ts`，禁止改动。

### 3.5 合作伙伴（3 行跑马灯）
- sec-head：eyebrow `Trusted By` / H2 `已服务多家头部企业与高校科研院所` / p `共建可信赖的产业 AI 生态,覆盖汽车、金融、电力、烟草与高校科研等核心场景`（半角逗号）。
- 3 行 `.marquee`（两侧 6%→94% 渐隐 mask），track 内卡片**双份填充**实现无缝循环：行1 `scrollX 35s`、行2 reverse `42s`、行3 slow `48s`；hover 全部暂停；`prefers-reduced-motion` 时改为 wrap 静态居中。
- partner-card：224×86 白卡（1px #EEF0F6 边），46×46 品牌色 logo（内联 SVG）+ 中文名 14.5/700 + 英文名 10.5px 字距 .4px。
- 伙伴数据 3 行：汽车 5 家（比亚迪/长安/吉利/上汽/上汽大众）、烟草电力 5 家（重庆烟草/广西烟草/国家电网/南方电网/山东电力）、高校科研医疗 6 家（同济/复旦/上交/中科院声学所/罗氏/宁德时代）——含每家品牌底色与占位 SVG，见 `src/proto/data.ts`。

### 3.6 客户评价（极简三栏）
- 标题：`客户[mark-purple]真实[/]反馈`。
- 3 张 258px+ 卡（底色见 2.2），结构：rc-top（18px/800 标题 + 46px Georgia 引号 `”`）→ quote（左 2px #D9E1EB 竖线、17px 上 20px 左内边距、min-height 122、12px/1.75）→ rc-foot（16px 渐变 avatar `✦` + 姓名 12px/600）。
- 渲染即入场：`panelIn .45s ${i*0.08}s both` 交错。
- 评价文案（某大型企业集团/某地市级政府单位/某能源行业企业）逐字符保真。

### 3.7 底部 CTA（首页）
- 26px 圆角深卡（`135deg,#1E1B4B→#4338CA`，内边距 64×40），双 blur 光斑（300/260px，opacity .5）。
- H2 34px：`您可能想了解:[mark-word]我们有什么具体内容[/]与能力?`（半角冒号问号）
- p（#C7C9F2）：`预约[mark-purple]一对一方案沟通[/],获取贴合您业务场景的 AI 落地路径`
- 按钮 `联系我们`：btn-primary 加白描边扩散环 `ring 2s infinite`。

### 3.8 Footer
- 结构：4 栏（品牌 + 3 链接栏）+ foot-bottom。
- 品牌：32×32 mark + 19px/700 名称；f-desc 13.5px/1.7 max300。
- 三栏：`核心平台服务`（智能体开发平台/大模型广场/算力调度/知识库引擎）、`模型与解决方案`（汽车/金融/电力/烟草行业方案）、`联系与服务`（预约演示/帮助文档/合作生态/加入我们）。链接 13.5px，hover 紫字 + 右移 3px。
- bottom：`© 2026 众调AI生态服务平台 · 沪ICP备xxxxxxxx号` + 认证徽章（30px 渐变圆 `✓` + `信息系统安全等保三级认证`，白底紫字胶囊）。

---

## 4. 子页专属规范

### 4.1 大模型服务网关（page-llm）
1. **Hero**：H1 `让您的模型能力[grad-flow]高效触达[/]更多客户`；sub `统一接入 · 客户分发 · 调用计量 · 账单管理 — 让模型能力真正成为可运营的服务`。
2. **lg-tabs 吸顶条**：4 个静态胶囊（无点击交互，cursor:default），`调用计量` 为 active。
3. **架构图**（五栏 grid）：
   - 供给橙栏：标题 `模型与 Token 服务供给` + 2 卡（第三方模型服务/通用、行业与多模态模型；专属模型服务/私有模型、行业微调模型）+ foot `接入 · 配置 · 分发 · 结算`；
   - 左箭头 pill `▶ 模型服务接入`（紫 10% 底，arrowL 2.4s 呼吸）；
   - 网关紫栏：渐变头（`统一模型服务网关` + sub）+ 2×4 feat-grid（7 张卡：统一 API 与协议适配/智能路由与模型编排/Token 计量与额度管理/套餐、账单与收益结算/流量治理与服务保障/权限管理与多组织隔离/审计追踪与安全管理，每卡标题+一句 12.5px 描述）；
   - 右箭头 pill `▶ 统一服务分发`（青 10% 底，arrowR）；
   - 消费青栏：`AI 服务消费侧` + 3 卡（企业 AI 应用/行业智能体/开发者或合作伙伴）+ foot `调用 · 消费 · 计量 · 反馈`；
   - 底部 lg-strip：`模型能力统一供给 | Token 服务统一运营 | 客户消费统一计量 | 合作收益统一结算`。
   - `≤960px` 折叠为单列，箭头转横向、动画停。
4. **我们能提供什么**（bg-soft，max960 2×2）：4 张 provide-card（模型服务统一接入/Token 服务统一分发/Token 调用计量/账单与收益分成），右上 54×16 圆角**毛玻璃图标**（入场 provideIconIn .6s .15s；hover 扫光 translateX 170px + icon 放大旋转 -8°），左缘 4px 渐变竖条 hover 显现。**注意**：lg-tab 的 data-target 与卡片 id（card-access/distribute/metering/billing）对应，但原型无滚动联动。
5. **您可以获得什么**（白底，max780 列表）：5 条 benefit-item（36×36 渐变 icon + 文案），hover 右移 10px 紫边。
6. **CTA**：cta-fx 彩虹流光按钮 `我要合作`。

### 4.2 AI 算力运营服务（page-compute）
1. **Hero**：H1 `让算力资源成为持续增长的 AI 服务收入`；两行 sub。
2. **运营模式（cp-flow）**：左叙事（tag `运营模式` + H2 `从算力供给<br>到[hl]服务收益[/]` + 正文（含 3 处 `<b>` 紫色加粗）+ `合作伙伴角色/算力租赁伙伴` 卡）+ 右 5 张层叠卡（自上而下：featured `AI 服务与客户场景`（紫渐变卡）→ `↑ 服务分发` → `AI 服务交付与收益结算` → `↑ Token 运营` → `Token 服务运营` → `↑ 模型服务化` → `模型部署与推理服务` → `↑ 资源整合` → `算力资源接入`；箭头行为虚线 + 白底紫字标签）；底部 cp-strip 四段口号。
3. **平台为算力伙伴提供什么**（bg-soft 2×2）：4 卡（算力资源统一接入/算力转模型服务/算力转应用服务/统一运营与收益结算），每卡 3 条 li（5px 紫点）。
4. **灵活的合作方式**（2 栏大卡）：
   - 联合运营：icon 双人、desc、`典型合作方`（IDC 运营商、区域智算中心、GPU 云服务商、国产芯片厂商等）、`价值收益` 4 条 cc-check、cta-fx `咨询联合运营合作 →`；
   - 算力消纳 / 算力服务化：icon 齿轮、`典型合作方`（有自建算力的政企客户、大型互联网企业、金融机构、运营商等）、4 条收益、**暗色** cta-fx-dark `咨询算力消纳合作 →`。
5. **为什么选择我们**：5 条 checklist（22px 渐变对勾圆 + 15.5px 文案），虚线分隔。
6. **CTA**：H2 `快速激活算力价值` + cta-fx `我要合作`。

### 4.3 私有化部署服务平台（page-private）
1. **Hero**（120px 顶边距）：H1 `建设属于[grad-flow]组织自己的 AI 服务平台[/]` + sub；2 个 pd-deco-ring（340/220px，ringPulse 5s，delay -1s/-2.5s）。
2. **我们的产品**（2×2，max1080）：4 张 pd-product-card（右上 50×50 毛玻璃 icon，hover 旋转 -6°；标题前 6px 渐变点 + 右侧留白 74px）：异构算力统一接入与运营 / 多模型统一部署与服务化 / AI 服务统一计量 / 智能体应用与生态持续运营。
3. **私有化 AI 服务平台架构**：6 层 pd-arch-layer（紫青交替，左 210px 层名 + 右 chip 流式布局；中轴 2px 渐变贯穿线）：
   - L1 服务对象与行业场景（6 chips）→ L2 统一 AI 服务门户与业务应用（5）→ L3 智能体与应用构建（8）→ L4 组织知识与模型服务（8）→ L5 安全治理与运营管理（6）→ L6 私有算力与部署环境（8）；
   - chip：白 78% 毛玻璃胶囊，hover 紫字抬升（青层 hover 青字）；
   - 底部 pd-arch-support：`支持本地化、专属云与混合云部署 | 数据不出域 | 能力可扩展 | 服务可持续运营`（8×8 渐变前缀点）。
4. **产品优势**（2×2 共 6 卡）：统一建设 / 自主可控 / 服务可运营 / 生态可连接 / 场景可扩展 / 持续可演进（每卡 22px 居中标题 + 15px 居中副题 + 虚线分隔 li 列表，li 前 6px 渐变点带 3px 光环）。
5. **标语**：`让[grad-flow]每一份算力[/]产生价值，让[grad-flow]每一次 AI 服务[/]可持续运营`（34px/800）。
6. **CTA**：`开始构建您的专属 AI 服务平台` + cta-fx `我要合作`。

---

## 5. 动效规范（keyframes 全量清单）

| 名称 | 定义 | 应用 |
| :--- | :--- | :--- |
| `fadeUp` | opacity 0→1，translateY 24→0，.8s | Hero 内容逐项（delay 0/.1/.2/.3/.45s） |
| `pulse` | scale 1→1.6，opacity 1→.5，1.8s infinite | tag 内呼吸 dot |
| `wheel` | 鼠标滚轮点 top 6→16 淡出，1.6s | scroll-hint |
| `panelIn` | opacity 0→1，translateY 16→0，.5s | panel 切换、评价卡交错（.45s × i×.08s） |
| `gradFlow` | background-position 0%→300%，7s linear infinite | grad-flow 文字（pd Hero 6s、tagline 8s） |
| `scrollX` / `scrollX-reverse` | translateX 0→-50% / -50%→0 | 跑马灯三行（35s/42s/48s） |
| `ctaFlow` | 同 gradFlow 6s | cta-fx 彩虹按钮底 |
| `ctaSweep` | 高光带 translateX -130%→130%，3.4s ease-in-out | cta-fx 白色扫光 |
| `ctaPulse` / `ctaPulseDark` | box-shadow 0→18px 紫圈扩散，2.6s | cta-fx 外圈脉冲（dark 为靛蓝） |
| `ring` | scale 1→1.25，opacity .8→0，2s | 首页 CTA 按钮白描边环 |
| `auroraDrift` | 三点位移+缩放漂移，14s / 18s(reverse) | Hero 极光斑 |
| `ringSpin` / `ringPulse` | 旋转 360° 40s / 缩放呼吸 6s | deco-ring（pd 页 5s） |
| `arrowL` / `arrowR` | X 位移 ±3px 呼吸，2.4s | 网关架构图左右箭头 |
| `provideIconIn` | opacity 0→1 + Y8/scale.9→1，.6s .15s cubic-bezier(.22,1,.36,1) | provide-card 毛玻璃图标入场 |

悬停过渡统一 .2s~.35s（各组件 CSS 内逐字保留）；`.reveal` 滚动揭示 = `opacity 0 + translateY 28px` → `.in` 复原，`transition .7s`，IO threshold **0.12**，一次性 unobserve。

---

## 6. 交互行为（React 等价实现约定）

| 原型 JS | 行为 | React 实现 |
| :--- | :--- | :--- |
| 行业 tab click | 切换 `.tab.active` 与 `.panel.active` | useState + 条件 class |
| IntersectionObserver | `.reveal` 进视口加 `.in` | `useProtoReveal()` hook（threshold .12，一次性） |
| 星空 initStars/draw | 粒子数 `min(90, floor(W/14))`，半径 .4~2，速度 ±.125，透明度 .3~.8，连线阈值 `d²<14000`（透明度 `0.12×(1-d/14000)`，线宽 .6），色 `rgba(124,58,237,α)`，resize 重建 | `<Starfield />`（canvas#stars，rAF 循环，cleanup 取消） |
| partnerRows 填充 | 每行 `[...row, ...row]` 双份 | 数据数组渲染两遍 |
| renderReviews | stagger 入场 | 渲染时带 inline animation |
| showPage 路由 | 切页 + 回顶 | react-router + ScrollToTop |
| 导航锚点 | 非首页先切首页，140ms 后平滑滚动到锚点 | ProtoHeader 内等价 handler |
| lg-tabs | 无交互（纯展示） | 静态按钮 |
| solution-hero img onerror | 隐藏 img、显示 emoji fallback | onError DOM 操作等价实现 |

---

## 7. 响应式断点

| 断点 | 变化 |
| :--- | :--- |
| `≤980px` | 隐藏 nav-links；solution-hero 单栏；feature-grid 2 列；review 单列；foot-grid 2 列；H1 38px |
| `≤960px` | 网关架构图单列（箭头横排停动画）；cp/pd 双栏单列；cp-flow 单栏（H2 30px）；pd Hero 30px、tagline 24px；arch 层单列、中轴隐藏 |
| `≤560px` | sh-visual 200px；feature/partner 单列 |

---

## 8. 工程落地清单（本次还原交付）

| 产物 | 说明 |
| :--- | :--- |
| `src/styles/proto.css` | 原型 `<style>` 块逐字复制（唯一视觉事实源，禁止手工修改） |
| `src/proto/Starfield.tsx` | Hero 星空画布 |
| `src/proto/useProtoReveal.ts` | 滚动揭示 hook |
| `src/proto/data.ts` | 伙伴 / 评价 / 行业方案等内容（含品牌 SVG） |
| `src/layout/SiteHeader.tsx` / `SiteFooter.tsx` | 原型版导航与页脚 |
| `src/pages/home/HomePage.tsx` | 首页五区块 |
| `src/pages/services/{LlmGatewayPage,ComputePage,PrivateDeployPage}.tsx` | 三个子页 |
| `docs/proto-ref/众调AI生态服务平台.html` | 原始原型存档（视觉比对基准） |

**验收口径**：与 `docs/proto-ref/众调AI生态服务平台.html` 在 1440×900 / 960 / 560 三档宽度下逐区块截图比对，像素级一致（允许字体渲染级差异）；所有动效参数、文案（含标点）逐字符一致。
