# 2077.AI 官网项目交接文档

更新时间：2026-06-18  
当前本地预览：`http://localhost:4178/`（Codex 的 Python 服务）/ `http://localhost:4181/`（Claude 的 `npx serve`）

> ⚠️ **本文档为交接日志，谁动了项目谁就在「## 交接记录」最上方补一条**，写清：本次改了什么、为什么、还有什么没做、有什么坑。这样下一个接手的人（Claude 或 Codex）能无缝继续。

## 🎯 当前两个待办（状态见下方 2026-06-19 交接记录）

> 📌 **2026-06-19 进度速览**：任务 B（产品矩阵拆独立子页）已由 Codex 静态验收并提交；任务 A（Lenis 平滑滚动 + 全站景深视差）已由 Codex 接入首页+全部子页。**2026-06-19 Claude 已用浏览器做真实滚动验收：首页 #products pin 段在 Lenis 下不抖动、景深层随滚动正常位移、文字未被光晕遮挡、卡片入场正常、无 console 报错 —— 视差实现可用且手感克制。** 详见最下方「Claude：浏览器验收视差」一条。

### 任务 A：给网页加滚动视差（parallax），效果要对齐这两个参考站

- 参考站 1：`https://custo.io/`
- 参考站 2：`https://cayenneblackedition.com/porsche-co/?ref=onepagelove`
- 用户原话强调：「请你多确认几遍，确保实现出来的效果是和这两个网站一致的。」→ 必须先**真实观察**这两个站的滚动行为，再实现，别凭空猜。

**⚠️ 当前最大障碍（务必先解决）**：
- Claude 的内置浏览器（Claude-in-Chrome 扩展）虽然能连上，但 `navigate` 到这两个域名都被策略拦截：报 `Navigation to this domain is not allowed`（custo.io 和 cayenneblackedition.com 都被挡）。
- WebFetch 拿不到 JS 驱动的滚动行为（它只转 markdown，给的结论是「没用 parallax 库」，不可信）。
- **所以下一棒要先想办法看到参考站的真实效果**，可选：① 让用户手动滚动这两个站并截几张不同滚动位置的图发过来；② 用户录一段滚动的屏幕录像；③ 用户用文字描述具体效果（哪层动得慢、是否 pin、是否平滑滚动 Lenis 之类）；④ 换一个不被拦截的方式打开（比如用户自己 Chrome 打开后用扩展读取，或换 onepagelove 的介绍页）。
- 这两个站大体都是「**滚动景深视差**」类：背景图/产品层比前景文字滚得慢，营造层次感，外加偏顺滑的滚动体感。但**具体节奏和是否 pin 必须实测确认**，不要直接拍脑袋实现。

**实现建议（确认效果后再动手）**：项目已引入 GSAP + ScrollTrigger（首页 `index.html` 内联脚本里），优先用它做 `scrub` 视差（多层 `data-depth`/不同 `yPercent` 速度）；如需更顺滑可考虑 Lenis 平滑滚动；务必保留 `prefers-reduced-motion` 降级。

### 任务 B：产品矩阵「每一项」拆成独立子页面（先搭框架）✅

用户原话：「产品矩阵里的内容，我需要每一项都有一个单独的子页面，而不是所有的产品都在同一页里介绍。你先把框架弄好，如果内容不够，需要的素材我后面会给你。」

- 现在 `products.html`（103 行）把**所有产品挤在一页**：软件段 `#huanzhen`（幻真）+ `#cms`（幻真CMS），硬件段 `#nano` / `#pro` / `#robo`。
- 目标：**每个产品一个独立页面**，例如 `product-nano.html` / `product-pro.html` / `product-robo.html` / `product-huanzhen.html` / `product-cms.html`（命名随意但要统一）。`products.html` 改成「产品总览」，每张卡片点进去到对应子页。
- 还要同步改 mega menu 和页脚里的产品链接（在 `site.js` 的注入模板里，把 `products.html#nano` 等锚点改成各自独立页 `product-nano.html`）。
- **每个新产品子页都要复用统一框架**（见下方「## 子页面统一框架模板」），即 `#site-nav` / `#site-footer` / `#site-fab` 占位 + `<head>` 引 fonts/tailwind/lucide/i18n.js/page.css/site.css + body 末 `site.js`。
- 新页文案 key 记得补进 `i18n.js`（中/繁/英），否则切语言残留简体。
- 用户说素材不够会后补，所以**先搭好框架和信息架构**，图先用现有 `assets/avatar-*.png` 占位。

### 其余较低优先（沿用之前）

- 浏览器视觉验收 6 个页面；清理 `index.html`/`page.css` 里旧的 `.navbar`/`.footer`/FAB 死 CSS；`news.html` 补真实新闻；首屏 `StartRoom_Post.0180.png` 等用户给视频再换（规格见文末）。

当前本地未提交项：`.claude/launch.json`（Claude 把 preview 端口改成 4181，因 4178 被 Codex 的 python 占着）、`.claude/settings.local.json`。这些是本地配置，按惯例不提交。

交接规则不变：谁继续改项目，谁就在「## 交接记录」最上方补一条，并 commit & push。

---

## 子页面统一框架模板（建新子页/产品页直接照抄）

所有子页面都用这套骨架（已由 Codex 统一）。`site.js` 会把导航/页脚/FAB 注入到三个占位 div，i18n 会自动翻译页内中文文本节点：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题 - 2077.AI</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="i18n.js"></script>
    <link rel="stylesheet" href="page.css">
    <link rel="stylesheet" href="site.css">
    <!-- 如果该页要做 parallax，再加： gsap + ScrollTrigger 两个 CDN -->
</head>
<body>
    <div id="site-nav"></div>
    <!-- 页面正文：用 page.css 里的类 .page-hero / .container / .eyebrow / .section(.dark/.soft)
         / .section-title / .section-copy / .info-card / .product-card / .grid-2 / .tag-list>.tag
         / .metric-row>.metric / .gradient-text 等 -->
    <div id="site-footer"></div>
    <div id="site-fab"></div>
    <script src="site.js"></script>
</body>
</html>
```

- 导航/页脚/产品链接的 HTML 模板**都在 `site.js` 里**（注入字符串）。要改导航项、mega menu 预览、页脚链接，改 `site.js`。
- 产品 mega menu 当前锚点是 `products.html#nano` / `#pro` / `#robo` / `#huanzhen` / `#cms`（任务 B 拆页后要改成各自独立页）。

## 交接记录（倒序，最新在上）

### 2026-06-22 · Codex：修正首页状态 icon 实际 SVG 尺寸与间距

用户截图反馈「路线规划完成」左侧 icon 高度和右侧文字间距仍不对。本轮继续只调整首页首屏对话状态行：
- `index.html`：发现 lucide 会把原 `<i>` 替换为 `<svg>`，上一轮 `.chat-status i` 规则没有完全约束最终渲染出的 SVG，导致 icon 仍偏大并挤到文字。
- `index.html`：新增 `.chat-status svg` 尺寸约束，`--status-icon-size` 调为 `.96em`，让图标视觉高度贴近右侧文字。
- `index.html`：状态 grid 的 `column-gap` 调到 `8px`，并让 `.st-load-ic/.st-done-ic` 在图标列中居中显示，避免图标溢出压到文案。

验证：
- `index.html` 内联脚本解析通过。
- `node --check site.js` 通过。
- `index.html` 内联 CSS 大括号平衡检查通过。

### 2026-06-22 · Codex：缩小首页路线规划状态 icon

用户反馈「路线规划中」左侧状态 icon 太大，应该和右侧文字高度一致。本轮只调整首页首屏对话状态行：
- `index.html`：`.chat-status` 增加 `--status-icon-size: 1em`，grid 第一列和 lucide icon 宽高都跟随当前文字字号。
- `index.html`：状态行 `line-height` 收紧到 `1.12`，icon `stroke-width` 单独控制，保证视觉重量仍清晰但不压过文字。
- `index.html`：降低 loading 呼吸动画和 done 弹入动画的放大幅度，保留动态感但避免 icon 动起来时显得过大。

验证：
- `index.html` 内联脚本解析通过。
- `node --check site.js` 通过。
- `index.html` 内联 CSS 大括号平衡检查通过。

### 2026-06-22 · Codex：让首页路线规划状态 icon 保持动态

用户反馈「路线规划中」左侧 icon 应该是动态的，不应该只是静态变成「路线规划完成」左侧 icon。本轮只调整首页首屏对话状态 icon：
- `index.html`：移除 `prefers-reduced-motion` 下禁用 `.st-load-ic` 旋转的规则，避免用户系统开了减少动态时 loading icon 变静态。
- `index.html`：`.st-load-ic` 增加持续旋转 + 轻微呼吸动画；`.st-done-ic` 在完成态弹入，并做短暂绿色光晕 pulse。
- 状态文字的交叉淡入淡出逻辑保持上一轮方案不变。

验证：
- `index.html` 内联脚本解析通过。
- `node --check site.js` 通过。
- `index.html` 内联 CSS 大括号平衡检查通过。
- `http://127.0.0.1:4178/` 返回 `200 OK`。

### 2026-06-22 · Codex：增强视差幅度、启用丝滑滚动、放慢首页气泡节奏

根据用户反馈「视差太保守，鼠标滚动不丝滑」以及「首页首屏右侧对话气泡出现太急」，本轮做了参数级增强：
- `index.html`：Lenis 不再因为 `prefers-reduced-motion` 被关闭，首页鼠标滚轮现在始终由 Lenis 接管；参数改为 `lerp: 0.065`、`wheelMultiplier: 0.82`、`touchMultiplier: 1`，滚动惯性更明显。
- `site.js`：子页面 Lenis 同步启用同样参数，解决非首页滚动不丝滑的问题。
- `index.html`：首页视差幅度整体加大，首屏背景 `-34`、文案 `30`，moat 背景 `±58`，主要区块从约 `±11/13` 提升到 `±18/22`。
- `site.js`：子页面视差幅度整体加大，hero 内容 `26`、背景层 `-58`，section 内容 `±16`、背景层 `±68`，产品/概览图片 `-30`。
- `about-background.html`：关于页独立视差同步增强，hero 背景 `34`、hero 文案 `26`，内容区和图片层也提高位移幅度。
- `index.html`：首屏聊天轮播节奏放慢，单条气泡出现间隔从 `1400ms` 调到 `1850ms`，整轮从 `10000ms` 调到 `13500ms`；状态完成延迟从 `1100ms` 调到 `1450ms`，避免气泡和完成态抢节奏。

验证：
- `index.html` 内联脚本解析通过：`inline scripts ok: 2`。
- `node --check site.js`、`node --check detail-page.js` 均通过。
- `page.css` / `site.css` 大括号平衡检查通过。
- 本地 HTTP 检查通过：`/`、`/about-background.html`、`/products.html`、`/solutions.html`、`/cases.html`、`/site.js`、`/page.css` 均返回 `200 OK`。

未完成 / 注意：
- 本轮未做真实浏览器截图级验收；如后续能用 Chrome/Claude 预览，请重点确认滚轮惯性是否过强、hero 文案位移是否不会和首屏内容冲突、聊天气泡节奏是否仍需进一步慢一点。

### 2026-06-22 · Codex：修复 reduced-motion 下看不到视差 + 优化首页对话过渡

接手 Claude 留下的两个待办后完成收口：
- **全站视差可见性**：`index.html` 首页视差位移不再被 `prefers-reduced-motion: reduce` 整体关闭；`site.js` 子页 `initPageMotion()` 也移除了 reduced-motion 早退。现在 reduced-motion 下仍保留克制的景深位移。
- **保留降级边界**：Lenis 平滑滚动仍然在 reduced-motion 下关闭；首页产品矩阵 pinned scroll、案例横向 scrub、子页卡片大幅入场动画仍保留 no-preference / reduced 守卫，避免强动态过载。
- **CSS 修复**：`page.css` 不再在 reduced-motion 下隐藏 `.page-parallax-layer`，否则子页即使 JS 创建景深层也看不到。
- **首页聊天丝滑化**：`index.html` 首屏对话气泡入场改为更长、更柔的 easing；状态条从 `display:none` 硬切换改为 loading / done 图标与文案在同一 grid 位置交叉淡入淡出；`.route-reveal` 增加位移和 blur 补间，让「路线规划中 → 路线规划完成」更连贯。
- **接纳 Claude 未提交改动**：`about-background.html` 中 Claude 已做的关于页视差增强和 reduced-motion 处理一并保留。

验证：
- `index.html` 内联脚本解析通过：`inline scripts ok: 2`。
- `node --check site.js`、`node --check detail-page.js` 均通过。
- `page.css` / `site.css` 大括号平衡检查通过。
- 本地 HTTP 检查通过：`/`、`/about-background.html`、`/products.html`、`/solutions.html`、`/cases.html`、`/site.js`、`/page.css` 均返回 `200 OK`。

未完成 / 注意：
- 仍未做真实浏览器截图级视觉验收；如果后续能用 Chrome/Claude 预览，请重点看 reduced-motion 环境下首页和子页是否能看到背景/内容层的轻微位移，以及首屏聊天状态切换是否足够柔和。

### 2026-06-19 · Claude 交接给 Codex（两个待解决问题，额度不足）

用户额度快用尽，让 Codex 接力。**有两个用户明确提出、尚未解决的问题，请优先处理：**

#### 待办 1（高优）：全站「看不到视差」——根因大概率是用户系统开了「减少动态效果」

- 用户反馈：首页、关于页、其它子页**都看不到视差效果**。
- **根因判断（高置信）**：用户环境开启了 `prefers-reduced-motion: reduce`（系统级「减少动态/Reduce Motion」），站点各处都有 reduced-motion 守卫，于是全站视差 + Lenis 平滑滚动被关掉。本地 Claude_Preview 预览环境**也是 reduced-motion**，所以截图里同样永远看不到视差 —— 这点很关键，别再靠预览截图判断视差。
- **证据**：preview 里所有 `para()` / Lenis 在 reduced-motion 下不动；但用 eval **手动绕过守卫**时 `.about-hero-bg` 能随滚动位移 73px → 说明 GSAP/ScrollTrigger 机制本身没坏，纯粹是被 reduced-motion 关掉了。
- **已做**：`about-background.html` 末尾的视差脚本已**去掉 reduced-motion 早退**（深度位移始终运行，只有「卡片入场动画」在 reduced 时跳过）。但**首页 `index.html` 和 `site.js` 的 `initPageMotion()` 仍在 reduced-motion 下整体关闭视差**，所以首页/其它子页依旧没视差。
- **给 Codex 的选择**：
  1. **首选**：先确认用户系统是否真的开了「减少动态」（让用户在 Windows 设置→辅助功能→视觉效果→动画效果 关掉；或在 Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion: no-preference 验证）。如果是系统设置，关掉后视差就回来了，可能根本不用改代码。
  2. 若希望「即使开了减少动态也保留克制视差」：把全站的**视差位移**改成不受 reduced-motion 限制（只把 Lenis 平滑滚动、大幅入场动画留给 reduced 守卫），就像我刚给关于页做的那样。关键位置：`index.html` 主内联脚本里 `prefersReducedMotion` 的用法（hero/moat/各 section 的 `para()` 目前的 gating）、`site.js` `initPageMotion()` 里的 `if (prefersReducedMotion) return;`。
- **验证方法**：必须在 no-preference 环境看（DevTools emulate 或真机关掉减少动态），preview 默认 reduced 看不出来。

#### 待办 2：首屏对话气泡过渡「太僵硬」，要更丝滑（参考 https://sierra.ai/）

- 用户原话：首屏对话气泡的过渡还是太生硬、不够丝滑；**「路线规划中 → 路线规划完成」这个状态切换也很僵硬**。要多参考 sierra.ai 首屏对话的丝滑感。
- 现状（都在 `index.html`）：
  - 气泡逐条出现：`.chat-msg` 用 `max-height / opacity / transform / filter` 的 transition，由主脚本 chat `play()` 里的 setTimeout 逐条加 `.show`（间隔 `STEP=1400`，每套 `CYCLE=10000`）。
  - 状态切换：`.chat-status` 用 `.done` class 切换两组元素（`.st-load-ic/.st-load-txt` ↔ `.st-done-ic/.st-done-txt`）和 `.route-reveal`（路线在 done 后展开）。目前是 **display 硬切换 + max-height**，所以「规划中→完成」是硬切、不连贯。
- **给 Codex 的建议**：
  - 气泡入场：换更柔的缓动（如 `cubic-bezier(.16,1,.3,1)`、或带轻微 overshoot 的 spring 感），时长略长；避免 `max-height` 从 0 突变造成的生硬（可考虑固定/估算高度做淡入+轻微上移，或用 FLIP）。
  - **状态过渡做交叉淡入淡出**：loading 的 spinner + 「路线规划中」文案 **淡出**，done 的对勾 + 「路线规划完成」文案 **淡入**（用 opacity/transform 补间而不是 `display:none` 硬切），并让颜色从中性→绿色平滑过渡；路线 `path`（`.route-reveal`）出现也用高度+透明度补间。
  - 相关 CSS：`index.html <style>` 里 `.chat-msg`、`.chat-status`、`.st-load-*/.st-done-*`、`.route-reveal`、`@keyframes chatIn/stspin`；相关 JS：主脚本里 chat 的 `play()`（reveal 时序）和状态 `.done` 的 setTimeout。

#### 本会话已完成（都已 push 到 main，最新附近 commit）

- **关于页 `about-background.html`** 重做为 **meetjamie 浅色编辑风**（浅底 #fafafa、中等字重标题、超大轻字重数字、信条行、深色 CTA 面板）+ **合作伙伴 logo 墙**（30 个，自动读 `logo_cloud/`）+ **媒体报道板块** + **首屏 100vh 深色静态图（无对话）** + **内容区全宽对齐导航栏** + 视差脚本（已去 reduced 守卫）。中繁英三语齐（i18n.js 末尾多个 Object.assign）。
- 首页：大气版式、宽度对齐导航栏、痛点→bento、案例→3×2 网格、首屏视差数值加大、产品矩阵 3 个 **9:16** 图位、**首屏 Sierra 式对话气泡**（商超/政务/展厅三套，10s 轮播，固定高度滚动流、loading→done 状态、逐条 reveal）。
- 导航：「关于我们」→「关于」，下拉「公司介绍」→「团队」。
- ⚠️ 提醒：`about-background.html` 末尾有未提交的视差脚本改动（去 reduced 守卫），随本次交接一起 commit。


### 2026-06-19 · Claude：关于页改成 meetjamie 式「浅色编辑风」

用户反馈上一版「没参考给的网站设计」。我用 Claude-in-Chrome 实测了 meetjamie.ai/about 的真实设计 token（截图会冻结，改用 JS 读 computed style）：**浅色底 `#fafafa`、近黑文字 `#191919`、干净系统无衬线、标题中等字重(500-600 而非 800)、超大轻字重数字(60px/-1.5px tracking)、圆角图卡、紫色强调 `#946bf5`、大量留白**。之前那版是深色+重渐变卡片，正好相反。

本轮把 `about-background.html` 正文整体改成这套浅色编辑风（首屏仍是用户要的"首页式深色静态图 hero、无对话"）：
- body 浅底 `#fafafa`；自定义 `.ed` 编辑式区块、`.ed-h2`(Sora 600)、`.stat .num`(超大轻字重数字)、`.belief`(带分隔线的编号信条行)、`.vision-statement`(大字使命)、`.pillar/.tcard/.award`(浅色圆角卡)、结尾 `.cta-panel`(深色圆角面板，桥接到深色页脚)。紫色强调统一 `#8b5cf6`。
- 文案全部沿用上一版（i18n 直接复用，scan missing 仅 `<title>`，无需新增翻译）。
- 验收：浅色编辑风逐段截图正常、无 console error、无横向溢出；preview 环境 `prefers-reduced-motion:reduce` 故该页 Lenis 不启用（设计内降级，真机正常）。

### 2026-06-19 · Claude：重做「关于 / 团队」页（about-background.html）

用户要求把「团队」页（导航 关于 → `about-background.html`）重做成完整的关于页：首屏像首页那种（但背景是静态图片、无对话气泡组件），并参考 meetjamie.ai/about 的结构，纳入公司现有官网 withufuture.com/about 的内容。

- **`about-background.html` 从 detail-page.js 模板页改成独立完整页**：不再用 `data-detail`/`#detail-root`/`detail-page.js`（detail-page.js 里的 `about-background` 数据项已成死数据，无害，留着）。页内自带 `<style>`。
- **首屏**：自定义 `.about-hero`，静态背景图 `StartRoom_Post.0210.png` + 深色渐变遮罩，左下大标语「为世界『智』造 / 一亿服务劳动力」+ 双 CTA，**无对话气泡**，风格对齐首页 hero。
- **内容结构**（参考 meetjamie + 公司官网）：使命/愿景 → 我们的来历(新浪爱问→2077) → 全栈自研四能力(Agent/数字人/CMS/硬件，卡片链到 about-agent/avatar/cms/hardware) → 价值观(客户至上/协作共赢/科技引领) → 团队构成(5 个角色卡，用 avatar 占位，无真实姓名) → 实力与认可(华为VR大赛/NVIDIA/洲明灯云奖/多项知识产权 + 数据条) → 联系我们(电话/邮箱/地址)。
- 真实信息取自 withufuture.com/about：使命「为世界提供一亿服务劳动力」、愿景「硬件+软件+服务+内容生态圈」、价值观、团队构成、获奖、地址电话邮箱。
- i18n：`i18n.js` 末尾追加该页全部文案的 zh-TW/en（扫描 missing 仅剩 `<title>`，head 内不翻译，符合预期）。
- 验收：1440 屏逐段截图正常，内容区对齐导航栏(36/41)、无横向溢出、无 console error，中/英切换正常。
- 备注：首屏用的 `StartRoom_Post.0210.png` 是 8.7MB 大图（与首页同量级），首次截图偶发超时，刷新后正常；后续若要提速可压缩首屏图。


### 2026-06-19 · Claude：导航文案微调 + 首图加 Sierra 式对话气泡（三场景轮播）

- **导航文案**：`site.js` 把导航主项「关于我们」→「关于」（nav-top + 移动端两处），mega menu 里「公司介绍」→「团队」。`i18n.js` 补了 `关于`(關於/About)、`团队`(團隊/Team)。
- **首图对话气泡**（参考 sierra.ai 首图右下的对话演示）：`index.html` 首屏 `#hero` 右下新增 `#heroChat` 玻璃气泡叠层，做了 3 套场景（`data-scene` = mall 商超 / gov 政务 / exhibit 展厅），每套 2 轮(4 条)对话(用户↔幻真)，CSS `chatIn` 逐条入场动画。**每 10s 自动切到下一套**（主内联脚本顶部一个 setInterval IIFE，切 `.chat-set.active`）。用户会自行让首图视频时长与之对齐。
  - CSS 在 `.hero-scroll-cue` 规则后那段 `/* hero chat overlay */`；`@media(max-width:1024px)` 下隐藏；`prefers-reduced-motion` 关动画。
  - 对话文案已补 `i18n.js`(zh-TW/en)，切语言不残留简体。
  - 改文案/轮数：直接编辑 `#heroChat` 里的 `.chat-set`；切换节奏改那个 `setInterval` 的 10000。
- 验收：1440 屏首图右下气泡正常轮播、无 console error、无横向溢出；导航三语 Home/Product Line/Solutions/Cases/About 一致，下拉「团队/Team/團隊」。

### 2026-06-19 · Claude：首页大气版式 pass + 痛点/案例区块重做 + 视差加大

用户反馈「首图以外的内容偏窄、小气，区块表现形式重复」，要求版式更大气、内容区宽度对齐导航栏、并参考 pio.com / custo.io / on.energy。本轮**只改 `index.html`（首页内联 style + 痛点/案例两段 DOM）和 `site.js`（子页视差力度）**，已浏览器验收、无 console error、无横向溢出。

- **内容区对齐导航栏**：首页内联 style 末尾新增「大气版式 pass」块。去掉各 section `.max-w-7xl` 的 1280 居中限制（`max-width:none`），区块左右内边距改成与导航栏一致（`body>section:not(#hero)` padding 36/26）。实测 1440 屏内容区 left36/right41，与 `.site-nav-shell` 完全一致。
- **大气尺度**：区块主标题 `h3.text-4xl.font-sora` 放大到 `clamp(2.75rem,4.6vw,5.25rem)`、字距收紧；区块上下 padding `clamp(8rem,10.5vw,13.5rem)`；导语放大加宽。移动端有降级。
- **产品矩阵预留 3 个 16:9 图位**：3 张 `.product-story-card` 顶部各加 `.product-shot`（`aspect-ratio:16/9` 占位，标注「幻真 XXX · 16:9」）。**用户会给 16:9 图**；替换时取消卡内 `<!-- <img src="assets/product-nano.jpg"...> -->` 注释并删占位 `<span>` 即可。
- **「行业痛点」重做**：横向跑马灯(`.pain-marquee`/`.pain-track`) → 静态 bento 网格(`.pain-bento`，4 列、首张 `.pain-cardx` 跨 2 列，7 张铺满 2 行)。复用原 `.pain-cardx` 样式。注意：marquee 复制脚本里仍列了 `painTrack`，但该 id 已移除→ `if(track)` 守卫跳过，无副作用。
- **「落地案例」重做**：横向漂移(`#caseTrack`) → 大气 3×2 卡片网格(`.cases-grid`/`.case-tile`)，每卡顶部 16:9 视觉位(现 emoji+渐变占位)，整卡链接到案例页(信和→case-sino、消防→case-fire-education，其余→cases.html)。`#caseTrack` id 已移除→ 首页 GSAP 里的 caseTrack scrub 守卫跳过。
- **视差力度按用户要求加大**（上一条记录的数值再上调）：`index.html` 首页 `para()`（heroVisual -22、hero 文字 22、moatBg ±40、内容区 ±11~13）；`site.js` `initPageMotion()`（hero 容器 18 / 光晕 -38、section 容器 ±10 / 光晕 ±42、产品图 -18）。

大气版式已推到全部子页（2026-06-19 续）：
- 在 `page.css` 末尾追加「大气版式 pass」块，覆盖所有子页（products、5 个产品页、solutions/cases/news/about 及 detail-page.js 渲染的 16 个详情页）。`.container` 去掉宽度限制对齐导航栏(36/26)、`.section`/`.page-hero` 上下留白加大、`.section-title`/`.lead`/`.section-copy`/`h1` 字号放大。
- **坑（已解决，务必知道）**：子页加载了 Tailwind CDN，它的 `.container` 工具类(`max-width:1280px`)会盖过 page.css 里普通的 `.container` 规则。所以宽度对齐必须用更高优先级选择器 `.page-hero > .container, .section > .container { max-width:none }` 才生效。
- 实测 1440 屏：products / 产品页 / solution-mall(detail-page.js) 的 hero 与 section 容器都是 left36/right41，与导航栏完全一致，无横向溢出、无 console error。

未完成 / 待办：
- **客户评价**段仍是横向跑马灯（用户选择保留）。
- bug #4（moat 底部间距）用户已说「没了，不用管」。
- 用户会提供：产品矩阵 3 张 16:9 产品图、案例真实图。

### 2026-06-19 · Claude：浏览器验收视差（任务 A），未改代码

用户让我检查 Codex 做的视差是否合适。用本地预览（`localhost:4181` 静态服务）做了真实浏览器滚动验收，**仅验收、未改任何代码**。

验收结论（视差实现可用、手感克制）：
- **首页 index.html**：Lenis 平滑滚动生效；13 个 ScrollTrigger，`#products` 仍是 pinned；滚到产品矩阵段时 section `rect.top` 在 +300/+700px 两个位置都稳定为 0，**pin 在 Lenis 下不抖动、不脱节**；无 console error（只有 Tailwind CDN 生产提示，预期内）。
- **子页面 products.html**：Lenis 生效（anchors offset -96 处理了导航高度）；每个 `.page-hero/.section` 注入 1 个 `.page-parallax-layer` 紫色光晕，滚动时景深层 `translateY` 随滚动变化（如 dark 段 -64→-79px），首屏层与文字反向位移；**`.container` 是 `position:relative;z-index:1`，光晕层是 `z-index:0`，文字不会被光晕盖住**；`.overview-card/.feature-card` 入场 opacity/blur 正常恢复到 1 / blur(0)，未覆盖原 hover 上浮。
- ~~整体景深位移幅度偏小而克制~~ → **用户反馈"克制了一点"，已按要求调大力度并重新浏览器验收（见下）。**

**2026-06-19 后续：按用户要求调大视差力度（仅改数值，未动结构）：**
- `index.html` 首页 `para()`：`#heroVisual` -12→**-22**、`#hero .hero-pio-wrap` 14→**22**、`#moatBg1/2` ±20→**±40**、各内容区 `.max-w-7xl` ±5/6→**±11~13**。
- `site.js` `initPageMotion()`：hero 容器 10→**18**、hero 光晕层 -18→**-38**、section 容器 ±5→**±10**、section 光晕层 ±22→**±42**、产品图 -10→**-18**。
- 重新验收：首页 `#heroVisual` 在滚动 400px 内位移约 50px（背景明显慢于前景文字），`#products` pin 仍稳定在 top:0 不抖；子页 dark 段光晕层相对位移翻倍（~21px）；hero 背景上移后底部无露黑缝、与下一段衔接干净；无 console error。`node --check site.js` + 首页内联脚本解析通过。
- 若以后还要再加强/减弱，直接调这些 `para()` 的 yPercent 即可。

未做：移动端真机滚动手感、reduced-motion 真机验证（代码路径已正确 guard，CSS 也隐藏了光晕层）。

### 2026-06-19 · Codex：解决方案 / 落地案例 / 关于我们条目拆独立子页面

用户要求「解决方案、落地案例和关于我们里的每一条都要有单独的子页面」。本次按当前页面实际展示的条目补齐独立 URL，并尽量避免重复复制大量 HTML：
- 新增共享详情渲染脚本：`detail-page.js`。每个详情页通过 `body data-detail="..."` 指定内容 key，正文由该脚本渲染；页面仍复用 `site.js` 的导航、页脚、FAB、语言切换和子页视差。
- 新增 6 个解决方案详情页：`solution-mall.html`、`solution-gov.html`、`solution-tourism.html`、`solution-exhibit.html`、`solution-hotel.html`、`solution-finance.html`。
- 新增 4 个落地案例详情页：`case-sino.html`、`case-fire-education.html`、`case-museum-exhibit.html`、`case-scenic-center.html`。
- 新增 6 个关于我们详情页：`about-background.html`、`about-agent.html`、`about-avatar.html`、`about-cms.html`、`about-hardware.html`、`about-mission.html`。
- `site.js` 中 mega menu / footer 的旧锚点链接已改成独立页面链接，例如 `solutions.html#mall` -> `solution-mall.html`，`cases.html#sino` -> `case-sino.html`，关于我们里的公司介绍入口 -> `about-background.html`。
- `site.js` 新增 `initOverviewDetailLinks()`：在 `solutions.html`、`cases.html`、`about.html` 的对应条目下自动追加「查看独立页面」按钮，避免大改原页面结构。

验证：
- `node --check site.js`、`node --check detail-page.js`、`node --check i18n.js` 均通过。
- 16 个新增详情页在 `http://127.0.0.1:4178/` 下均返回 `200 OK`。
- `detail-page.js` 引用的 16 个图片资源均存在。
- 本地 href 扫描通过：排除 JS 模板占位符后，未发现缺失的本地页面链接。
- 编码烟测通过：未发现 Unicode 替换字符。

未完成 / 注意：
- 新增详情页目前用现有图片占位，后续用户提供真实项目图、现场图、产品图后应替换。
- `detail-page.js` 里的新增中文文案尚未补完整 `zh-TW/en` 字典；当前页面可运行，但切换语言时这些新详情正文仍会保持简体中文。后续如要完善多语言，优先补 `detail-page.js` 中新增文案的 i18n key。
- 仍未做真实浏览器截图级视觉验收；Codex 内置浏览器在当前 Windows 沙箱里仍无法启动。

### 2026-06-19 · Codex：把视差效果铺到所有实际页面

用户要求“每个页面都要做视差效果”。本次在不改页面信息结构的前提下，把任务 A 从首页扩展到全部实际页面：
- 页面范围：`products.html`、`solutions.html`、`cases.html`、`news.html`、`about.html`、`product-huanzhen.html`、`product-cms.html`、`product-nano.html`、`product-pro.html`、`product-robo.html`。首页 `index.html` 已在上一轮单独接入，未重复初始化。
- 以上子页面 `<head>` 统一补入 Lenis / GSAP / ScrollTrigger CDN，供共享 `site.js` 使用。
- `site.js` 新增 `initPageMotion()`：仅在非首页运行；初始化 Lenis 并与 ScrollTrigger 同步；按 `prefers-reduced-motion` 做降级；为 `.page-hero` 和 `.section` 动态注入非交互式景深层；给页面主体、section 容器、产品图做轻量滚动位移；给卡片做透明度/模糊入场，不写卡片 transform，避免覆盖原有 hover 上浮。
- `page.css` 新增 Lenis 基础样式、通用 `.page-parallax-layer` 景深层、section/hero 的定位与 reduced-motion 降级样式。

验证：
- `node --check site.js`、`node --check i18n.js` 均通过。
- `page.css` 大括号平衡检查通过。
- 子页面依赖检查通过：10 个实际子页面都包含 `lenis@1.3.23` 与 `ScrollTrigger.min.js`。
- 编码烟测通过：检查未发现 `�?` 替换字符。注意：第一次批量写入时 PowerShell 默认编码曾导致页面中文异常，已从 `HEAD` 恢复页面原文后用显式 UTF-8 重新插入依赖。
- 本地 HTTP 检查：`/`、`/products.html`、`/solutions.html`、`/cases.html`、`/news.html`、`/about.html`、5 个 `product-*.html` 均返回 `200 OK`。

未完成 / 注意：
- 真实浏览器视觉验收仍未做，原因同上一条：Codex 内置浏览器在当前 Windows 沙箱中无法启动。建议后续人工重点检查子页面滚动是否过度、卡片 hover 是否仍自然、锚点跳转是否因 Lenis offset 符合导航高度。

### 2026-06-19 · Codex：接入首页 Lenis 平滑滚动与多区块景深视差

接手 Claude/Codex 交接里的任务 A 后，按用户确认的「Lenis 平滑滚动 + 全站景深视差」方向做了首页实现，未改产品矩阵结构。

本次改动：
- `index.html` 头部新增 Lenis CDN：`https://unpkg.com/lenis@1.3.23/dist/lenis.css` 和 `lenis.min.js`。
- 在首页主 GSAP 脚本中初始化 Lenis，并按 Lenis + ScrollTrigger 官方推荐方式打通：`lenis.on('scroll', ScrollTrigger.update)`、`gsap.ticker.add(time => lenis.raf(time * 1000))`、`gsap.ticker.lagSmoothing(0)`。这样现有 pinned 产品故事、案例横向 scrub、moat 视差不会和顺滑滚动脱节。
- 新增 `prefers-reduced-motion` 降级：系统开启减少动态效果时，不启用 Lenis，也不跑新增的滚动视差。
- 扩展首页多区块景深：首屏背景与文字反向轻微位移、痛点/产品逻辑/moat/应用场景/案例/联系表单等主要区块增加低幅度 `scrub` 位移；`moat` 背景层位移幅度略增强。
- 保留原有产品矩阵三张硬件卡片和 pinned scroll timeline，只做滚动手感接入，没有再次重构内容。

验证：
- `node` 解析 `index.html` 内联脚本通过：`inline scripts ok: 2`。
- `node --check site.js`、`node --check i18n.js` 均通过。
- `http://127.0.0.1:4178/` 返回 `200 OK`。

未完成 / 注意：
- 真实浏览器截图级视觉验收仍未完成。Codex 内置浏览器在当前 Windows 沙箱中仍报 `CreateProcessAsUserW failed: 5`，无法启动；建议 Claude 或用户在浏览器里重点检查：滚动是否足够顺滑、产品矩阵 pin 是否抖动、顶部导航回到首屏是否仍保持胶囊位置、移动端是否没有过度视差。
- 如果用户觉得“视差感还不够像 custo.io”，下一步优先调 `para(...)` 的 yPercent / scrub 数值，不要先改产品矩阵结构。

### 2026-06-19 · Codex：验收并收口产品独立子页任务 B

接手 Claude 未提交的任务 B 改动后完成静态验收和小修：

- 保留并验收 5 个新增产品页：`product-huanzhen.html`、`product-cms.html`、`product-nano.html`、`product-pro.html`、`product-robo.html`。
- `products.html` 已作为产品总览页，软件 / 硬件卡片都跳到对应独立页。
- `site.js` 中产品 mega menu 和页脚产品链接已指向 `product-*.html`，未发现旧 `products.html#nano/#pro/#robo/#huanzhen/#cms` 残留。
- 修复 `page.css` 末尾一段重复响应式规则和多余 `}`，并确认 CSS 大括号平衡。
- 静态验收：`node --check site.js`、`node --check i18n.js` 通过；6 个产品相关页面 + `site.js/page.css/i18n.js` 在 `http://127.0.0.1:4178/` 下均返回 `200 OK`；产品页正文 i18n 扫描 `missingCount=0`；内部本地 href 和图片资源均存在。

未完成：

- 真实浏览器视觉验收仍未做。本地没有 Playwright 包，Codex 内置浏览器此前在 Windows 沙箱下不可用；下一棒如有浏览器能力，建议再人工检查 products 总览、5 个子页、mega menu hover 和语言切换。

### 2026-06-19 · Claude 交接（任务 B 框架已做完代码，未验收未提交；任务 A 已定方案未动手）

用户额度用尽，让 Codex 接力。**本轮所有改动都还在工作区，未 commit、未 push，也未做浏览器视觉验收。** 下一棒请先验收再提交。

#### 任务 A（视差）——已定方案，未写任何代码

- 用户本轮明确说「截图不用发了，你来做视差」，并通过选项确认方案：**Lenis 平滑滚动 + 全站多层景深视差**（不是只首屏、也不是只加 scrub 不加平滑滚动）。
- 即：引入 Lenis 接管滚轮做丝滑惯性滚动，并在首屏 / moat / 产品矩阵等多区块加 `data-depth` 多层景深（背景慢、前景快），对齐 custo.io + cayenne 两个参考站的共同手感。
- **关键坑（务必处理）**：首页 `index.html` 已有一套 GSAP ScrollTrigger（首屏/moat 的 `scrub` 视差、`#products` 的 **pinned** 产品故事 timeline、`#cases` 横向 scrub）。接 Lenis 必须用 `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)` 打通，否则 pin 和 scrub 会错位/抖动。务必保留 `prefers-reduced-motion` 降级（reduced 时不启用 Lenis）。现有 GSAP CDN 在 `index.html:13-14`，GSAP 主脚本块在 `index.html` 约 1645-1750 行。
- 子页面（products / product-* 等）目前没有 GSAP，如要给子页也加视差需另引 CDN；建议先把首页做好确认手感，再决定是否铺到子页。

#### 任务 B（产品矩阵拆独立子页）——框架已做完，待验收

已完成（**未验收/未提交**）：

- **新增 5 个独立产品子页**（套用统一框架模板，含 `#site-nav`/`#site-footer`/`#site-fab` + 引 fonts/tailwind/lucide/i18n.js/page.css/site.css + 末尾 site.js）：
  - `product-huanzhen.html`（软件·幻真）、`product-cms.html`（软件·幻真CMS）
  - `product-nano.html`、`product-pro.html`、`product-robo.html`（硬件）
  - 每页结构：page-hero（含「联系商务」+「返回产品矩阵」按钮）→ 产品总览(product-card)→ 核心能力(feature-grid)→ 适用场景/点位(grid-3) 或 多端部署 → 规格/模块(dark + spec-list)→ 关联产品(related-grid)。图先用 `assets/avatar-*.png` 占位（用户说素材后补）。
- **`products.html` 改为产品总览页**：软件段(dark, 2 张 overview-card)+ 硬件段(soft, 3 张 overview-card)，每张卡片点进对应 `product-*.html`，底部保留 metric-row。
- **`page.css` 末尾新增一组组件样式**：`.btn/.btn-primary/.btn-ghost`、`.hero-actions`、`.feature-grid/.feature-card/.feature-ico`、`.spec-list/.spec-row`、`.related-grid/.related-card`、`.overview-grid/.overview-card` 及其 1020px 响应式收拢。
- **`site.js` 已改链接**：mega menu 里 5 个产品锚点 `products.html#huanzhen/#cms/#nano/#pro/#robo` → 各自独立页 `product-*.html`；页脚「产品」列的硬件/软件链接也改为 `product-nano.html / product-huanzhen.html / product-cms.html`（「产品矩阵」仍指向 `products.html` 总览）。mega menu 右侧预览卡（preview-*）和 `data-preview` 逻辑没动，仍正常。
- **`i18n.js` 已补全翻译**：末尾追加两个 `Object.assign` 块（zh-TW + en），共补 138 条新页面文案。用脚本扫描 6 个产品页（products + 5 子页），现仅剩 6 个 `<title>` 字符串「未翻译」——这是预期的，因为 site.js 的 i18n walker 只遍历 `document.body`，`<head>` 里的 `<title>` 本来就不翻译。术语已对齐现有字典：数字人→數位人、智能→智慧、营销→行銷、数据→資料、运营→營運、交互→互動、超写实克隆→超寫實複製/Hyper-Real Cloning 等。
- 已校验：`node --check i18n.js` 通过。`node --check site.js` 我还没跑完就被打断（改动只是替换了几个 href 字符串，风险极低，但下一棒最好补跑一次确认）。

下一棒（Codex）建议顺序：
1. `node --check site.js` 补确认；启动本地服务，**浏览器验收任务 B**：products.html 总览卡片能点进 5 个子页、子页排版正常、mega menu/页脚链接都跳新页、**切英文/繁体时 5 个子页正文不残留简体**（重点看 hero、spec-list、feature-card）。
2. 验收 OK 后 commit & push（任务 B 这批：products.html、product-*.html ×5、page.css、site.js、i18n.js）。
3. 再开始任务 A（按上面「任务 A」方案做 Lenis + 景深，注意 ScrollTrigger 打通那段坑）。

### 2026-06-18 · Claude 接手（仅梳理，未改功能）

本次主要是接手梳理 + 处理用户新指派的两个任务（任务 A 视差 / 任务 B 产品拆页，见顶部）。已做：

- 通读 HANDOFF，确认 Codex 已在 `024d1f7` 完成全站导航/页脚/i18n 统一（`site.js` 注入式），6 页共用。
- 读了 `products.html`（103 行）现状：软件段 `#huanzhen`/`#cms` + 硬件段 `#nano`/`#pro`/`#robo` 全在一页，这是任务 B 要拆的。
- **任务 A 卡在「看不到参考站」**：Claude-in-Chrome 能连上，但 `custo.io` 和 `cayenneblackedition.com` 两个域名都被 `navigate` 策略拦截（`Navigation to this domain is not allowed`）；WebFetch 取不到 JS 滚动行为。详见顶部任务 A 的「最大障碍」与可选解法。
- 本次**没有改任何代码**（除本 HANDOFF）。`git` 没有新功能提交。

下一棒（无论新开的 Claude 会话还是 Codex）：先解决任务 A 的「看到参考站」问题，或直接先做任务 B（产品拆页框架，不依赖参考站）。



### 2026-06-18 · Codex：Parallax.js 尝试已撤回，交给 Claude 继续

用户提出希望应用 Parallax.js 时差效果。Codex 曾短暂尝试在首屏 `#heroVisual` 上接入 `parallax.min.js`，把背景、遮罩和光晕拆成 `data-depth` 图层；随后用户要求撤回并交给 Claude 做。

当前状态：

- `index.html` 已撤回 Parallax.js CDN、`#heroParallaxScene` DOM、相关 CSS 和初始化脚本。
- 首页首屏恢复为原来的静态 `StartRoom_Post.0180.png` 背景 + CSS 遮罩。
- 产品矩阵没有再改动。

给 Claude 的建议：

- 如果继续做 Parallax.js，建议先和用户确认作用范围：首屏背景、导航浮窗、卡片/装饰层，还是全页面滚动视差。
- 不要改现有“产品矩阵”结构；用户已明确说没让改这里。
- 可优先只给首屏背景和装饰层加 Parallax.js，并保留 `prefers-reduced-motion` fallback。

### 2026-06-18 · Codex：撤回首页产品矩阵重构

根据用户反馈，“产品矩阵”区块不是本轮要改的范围，已撤回上一轮对首页 `#products` 的结构性重构：

- `index.html`：首页产品矩阵恢复为上一版三张硬件卡片布局（Nano / Pro / Robo）及对应的轻量 pinned scroll 卡片动画。
- `index.html`：保留用户明确要求的联系表单调整：姓名 / 联系电话两列，邮箱地址单独一行，底部协议提示删除。
- `i18n.js`：删除上一轮产品矩阵重构新增但现已不用的文案翻译；保留邮箱字段及 placeholder 翻译。

后续如果继续做 `https://custo.io/` 那类滚动效果，应优先另起一个新的首页区块或改全局滚动节奏，不要再擅自重构现有“产品矩阵”内容。

### 2026-06-18 · Codex：联系表单排版 + 产品矩阵滚动重构

根据用户反馈继续调整：

- `index.html` 联系商务表单：姓名 / 联系电话改为桌面端两列，邮箱地址单独一行，避免三项挤在同一行；删除“点击提交即代表您同意我们的《隐私协议》与《服务条款》”提示。
- `index.html` 产品矩阵区：上一版只是 pin 住三张卡片，滚动体感不明显；本次改为更接近 `https://custo.io/` 的 sticky scrollytelling 结构：左侧是 3 段产品叙事（幻真、幻真CMS、Nano/Pro/Robo），右侧大视觉层随滚动切换，底部进度条同步高亮。
- `i18n.js`：删除已移除协议提示的翻译，并补齐新产品矩阵区简体文案对应的繁体 / 英文翻译。

验证：

- `node --check i18n.js` 通过。
- 首页 2 段内联脚本均可解析。
- `http://127.0.0.1:4178/` 返回 `200 OK`。
- 尝试用内置浏览器视觉检查仍失败，错误仍是 Windows 沙箱 `CreateProcessAsUserW failed: 5`，建议下一棒人工在真实浏览器里滚动验收这一段。

### 2026-06-18 · Codex：产品顺序 / 联系邮箱 / 首页滚动叙事

根据用户最新反馈完成三项收口：

- `site.js`：产品矩阵 mega menu 内部顺序改为 **软件在上、硬件在下**；默认右侧预览从 Nano 改为“幻真”软件，避免用户悬停前默认内容仍偏硬件。
- `products.html`：产品页正文同步调整顺序，首屏后先展示“软件：幻真与幻真CMS”，再进入“硬件：三种终端形态”与 Nano / Pro / Robo 详情。
- `index.html`：联系商务顾问表单新增“邮箱地址”输入框，首行在桌面端变为姓名 / 电话 / 邮箱三列，移动端单列堆叠。
- `i18n.js`：补充“邮箱地址”及相关 placeholder 的繁体 / 英文翻译。
- `index.html`：参考 `https://custo.io/` 的长页面产品叙事节奏，在首页 `#products` 段新增 GSAP + ScrollTrigger 桌面端 pinned scroll progression：滚到产品矩阵时短暂固定，三张产品卡片随滚动推进进入并轻微上浮；移动端不 pin，保留普通滚动。

注意事项：

- 产品矩阵卡片不再使用旧 `.reveal` 入场动画，避免旧动画写入 `transform` 与新的滚动 CSS 变量冲突。
- 本轮只增强首页产品矩阵段的滚动观感，没有把整站做成整页滚动或强制平滑滚轮，避免影响可读性和移动端性能。
- 仍建议下一棒在真实浏览器里手动滚动验收：重点看 `#products` pin 段是否过长、是否遮挡固定导航、以及低性能机器上的顺滑度。

### 2026-06-18 · Codex：产品矩阵拆分硬件 / 软件

根据用户最新要求，产品矩阵已从单一“终端形态”改为两层结构：

- **硬件**：幻真 Nano、幻真 Pro、幻真 Robo。三者仍作为线下触点和空间呈现终端。
- **软件**：幻真、幻真CMS。幻真是 AI 虚拟员工软件本体，幻真CMS 是知识库、话术、内容发布、设备和运营数据的管理后台。

具体改动：

- `products.html`：首屏文案改为“硬件终端 + 软件平台”，新增“硬件：三种终端形态”说明段，并把原底部软件概述升级为“软件：幻真与幻真CMS”双卡片。
- `site.js`：产品矩阵 mega menu 增加“硬件 / 软件”分组，新增 `products.html#huanzhen` 和 `products.html#cms` 入口；页脚产品链接同步改为硬件与软件入口。
- `site.css`：新增 `.mega-section-label`，并补 `huanzhen/cms` 两个预览卡 hover 规则。
- `i18n.js`：补齐新增产品页和导航浮窗文案的繁体/英文翻译。

验证：

- `node --check site.js`、`node --check i18n.js` 通过。
- 新增文案 i18n 缺失扫描为 `missing=0`。
- `products.html`、`site.js`、`site.css`、`i18n.js` 在 `http://127.0.0.1:4178/` 下均返回 `200 OK`。

### 2026-06-18 · Codex 接手：统一全站导航 / 页脚 / i18n

完成 Claude 留给 Codex 的「方案 A」收口：

- 新增并接入共享 `site.css` / `site.js`：由 `site.js` 统一注入顶部导航、mega menu、移动端汉堡菜单、页脚和右下 FAB；首页与 5 个子页面都改为使用 `#site-nav` / `#site-footer` / `#site-fab` 占位。
- `index.html` 已移除重复的导航 DOM、页脚 DOM、FAB DOM，以及旧的内联导航滚动、FAB、汉堡和 i18n 脚本；首页保留自己的 GSAP、logo cloud、交互区脚本。
- `products.html` / `solutions.html` / `cases.html` / `news.html` / `about.html` 已统一引入 `i18n.js`、`page.css`、`site.css`、`site.js`，并移除旧 `.navbar` / `.footer` / 单页 `lucide.createIcons()`。
- `i18n.js` 追加了子页面正文和共享导航 hover 预览文案的 `zh-TW` / `en` 覆盖项。用脚本扫描过 5 个子页面正文和 `site.js` 注入文本，缺失项为 0。
- 已提交并推送：`024d1f7 Unify site navigation footer and i18n`（远端 `main` 已更新）。

验证：

- `node --check site.js`、`node --check i18n.js` 均通过。
- `http://127.0.0.1:4178/`、`products.html`、`solutions.html`、`cases.html`、`news.html`、`about.html`、`site.css`、`site.js`、`i18n.js` 均返回 `200 OK`。
- 搜索确认 6 个页面不再残留 `<nav class="navbar">`、`<footer class="footer">`、旧 `lucide.createIcons();`。

注意：

- `index.html` 里仍保留一批旧导航/页脚/FAB 的内联 CSS，当前已被 `site.css` 覆盖且 DOM 不再使用；后续可做一次纯清理，但本次为了降低首屏回归风险没有继续删。
- `page.css` 也仍有旧 `.navbar` / `.footer` 样式，当前无 DOM 使用；后续可清理。
- 内置浏览器自动验证在当前 Windows 沙箱里启动失败（`CreateProcessAsUserW failed: 5`），所以本次没有截图级视觉验收；建议后续人工或 Claude 再在浏览器里点一次语言切换和移动端汉堡。
- `news.html` 仍是占位型新闻页，后续需要真实新闻标题、日期、媒体链接和现场图。

### 2026-06-18 · Claude 接手复盘（暂未改功能）

额度恢复后接回项目。先通读了本文档并核对了真实状态，结论：

- **Git 状态**：Codex 这一轮的所有改动（`index.html` 改动 + 新增 `products/solutions/cases/news/about.html`、`page.css`、`assets/logo.svg`、`assets/logo-dark.svg`、`HANDOFF.md`）**全部未提交**。最后一个 commit 仍是我的 `65185a8 Remove stray pdf_text.txt`，远端 GitHub 上也还没有这些。**没有任何工作丢失，但也都没入库。**
- **`site.css` / `site.js`**：是我额度用光前没做完的「把首页内联 CSS/JS 抽到外部文件」的半成品。`index.html` 没引用它们，Codex 也没用。**当前是死文件**，后续要么接上、要么删掉，先留着不影响运行。
- **运行验证**：首页无 console error，`i18n.js`(中繁英) 与 GSAP 都正常加载。

**实测到的质量问题（待修）**：
1. **顶部导航主菜单在 ≤~1024px 宽度下整体隐藏**。实测 962px 时 5 个 `.nav-top`(首页/产品矩阵/解决方案/落地案例/关于我们) 的 `offsetWidth` 都是 0，只剩 logo + 地球 + 联系商务。等于新导航在很多笔记本宽度下看不见，需要把断点放宽或重排。
2. **首屏占位图 `StartRoom_Post.0180.png` 裁切很难看**（人物没头、构图怪）。Codex 已注明等用户给视频替换，但在此之前首屏观感差。
3. **子页面未接入 i18n**，切英文/繁体时子页仍是简体。
4. `news.html` 是纯占位。

**用户授权**：用户回复「你来定，全面过一遍」，即放手让我按判断把整站质量从头过一遍。

#### 已完成 · 导航修复与打磨（index.html）

1. **修复导航在窄屏整体隐藏**：原 `<div class="hidden lg:flex nav-menu">` 在 <1024px 下整条菜单消失。改为保留桌面菜单（lg+），并**新增汉堡菜单**覆盖 <1024px：
   - 右侧新增 `#navHamburger`（`lg:hidden`），桌面 `联系商务` 按钮改为 `hidden lg:inline-flex`（窄屏隐藏，避免挤出视口）。
   - 新增移动端面板 `#navMobile`（`.nav-mobile` / `.nav-mobile.open`，CSS 在 `.nav-caret` 规则下方），点击汉堡展开，含 5 个主项 + 新闻动态 + 联系商务 CTA；点击空白或链接自动收起。
   - JS 在「Floating action button」段落后新增 hamburger toggle IIFE。
   - 实测 962px：汉堡显示、桌面菜单隐藏、无横向溢出、面板正常展开。
2. **桌面导航压紧**：`.nav-menu` gap 10→4，`.nav-top` padding `0 16`→`0 12`、gap 7→6，避免桌面下偏挤。
3. **补 i18n**：`i18n.js` 加了 `解决方案 / 关于我们 / 新闻动态`（中/繁/英）以及首页副标题（Codex 新写的那句）。现导航三语一致：Home / Product Line / Solutions / Cases / About。

#### 已完成 · 首屏占位图裁切

`.hero-media` / `.hero-media img` 的 `object-position` 由 `center right` 改为 `72% 12%`，现在首屏人物露脸+上半身，不再「没头」。等用户给视频后按本文档底部规格替换即可。

#### 已提交并推送

以上导航 + 首屏改动 + Codex 的多页结构，已一起 commit & push：`7c5da46 Multi-page restructure (nav/subpages) + nav & hero fixes`（远端 GitHub 已更新）。`site.css`/`site.js`/`.claude/settings.local.json` 未纳入提交，仍是本地未跟踪。

#### ⭐ 下一个最该做的：统一所有页面的导航/页脚/i18n（关键质量问题）

**现状问题**：`index.html`（首页）和 5 个子页面是两套独立实现：
- 首页导航 = `.site-nav-shell`（深色/浅色切换 + 汉堡 + 语言切换 + 完整 i18n 脚本），样式在 index.html 内联。
- 子页面导航 = `.navbar`（`page.css` 里，较简版），**没有汉堡、没有语言切换、没引 `i18n.js`、没有 i18n 脚本** → 子页切语言完全无效，且与首页观感不一致。

**推荐做法（二选一）**：
- **方案 A（推荐，彻底）**：做一套共享头/尾。把首页那套「nav + footer + fab + 运行时脚本(含 i18n)」抽成 `site.js`（注入到每页的 `#site-nav` / `#site-footer` 占位）+ `site.css`（共享样式）。每个页面（含 index.html）都改成引用它们。这样所有页面 nav/footer/i18n 完全一致、只维护一处。注意：我之前已经抽了半成品 `site.css`(493行) / `site.js`(578行)，但里面的 nav 是更早的设计，需要按现在 Codex 这版（`.site-nav-shell` + mega menu + 汉堡）重写后再用，别直接套旧的。
- **方案 B（省事）**：把首页的整段 nav/footer/fab/i18n 脚本复制进每个子页面，并给子页 `<head>` 引 `i18n.js`。缺点是 6 份重复、以后改一处要改六处。

无论 A/B，都要把子页面正文文案 key 补进 `i18n.js`（中/繁/英），否则英文/繁体下子页正文还是简体。

#### 其它待办

- **mega menu 右侧预览文案** 未 i18n。
- `news.html` 还是占位，需要真实新闻条目（标题/日期/媒体/链接/图）。
- 子页面整体内容与响应式还要再精修。
- `site.css` / `site.js`：要么按方案 A 重写后接上，要么删掉，别一直挂着。

---


## 项目现状

这是一个无构建流程的静态官网项目，核心页面直接由 HTML/CSS/JS 驱动。

主要文件：

- `index.html`：首页主文件，当前仍包含大量内联 CSS 和 JS，是首页的主要实现入口。
- `i18n.js`：中繁英多语言字典。
- `page.css`：本次新增，供新增子页面共用的基础样式。
- `products.html`：本次新增，产品矩阵页。
- `solutions.html`：本次新增，解决方案页。
- `cases.html`：本次新增，落地案例页。
- `news.html`：本次新增，新闻动态页。
- `about.html`：本次新增，关于我们页。
- `assets/`：logo 和 avatar 素材。
- `logo_cloud/`：客户 logo 跑马灯素材和 `manifest.json`。

注意：接手时工作区里已有未跟踪文件 `site.css`、`site.js`，看起来像 Claude Code 尝试从 `index.html` 抽离出来的样式/脚本，但当前 `index.html` 没有引用它们。本次没有使用、覆盖或删除这两个文件。

## 本次 Codex 已完成的改动

### 1. 顶部导航改版

原首页导航是锚点式：

- 首页
- 行业痛点
- 产品逻辑
- 核心优势
- 应用场景
- 落地案例

已改为用户要求的页面级导航：

- 首页
- 产品矩阵
- 解决方案
- 落地案例
- 关于我们

导航对应跳转：

- `产品矩阵` -> `products.html`
- `解决方案` -> `solutions.html`
- `落地案例` -> `cases.html`
- `关于我们` -> `about.html`
- 关于我们下拉里包含 `新闻动态` -> `news.html`

### 2. 导航 hover 浮窗改版

参考用户给的 Twenty 导航截图，首页导航下拉已从简单列表改成“两栏 mega menu”：

- 左侧：可 hover 的条目列表。
- 右侧：对应条目的简介预览区域。
- 通过 CSS `:has()` 实现 hover 切换，无额外 JS。

目前已有右侧预览的导航组：

- 产品矩阵：幻真 Nano / 幻真 Pro / 幻真 Robo。
- 解决方案：商业综合体 / 政务公共服务 / 文旅景区 / 展厅导览 / 酒店机场 / 银行金融。
- 落地案例：信和集团·中港城 / 文旅与公共服务。
- 关于我们：公司介绍 / 新闻动态 / 联系我们。

### 3. 导航首屏视觉适配

由于首页首屏现在是深色媒体背景，导航默认状态已改为深色半透明玻璃效果：

- 默认：深色半透明、白色文字，适配首屏。
- 滚动后：切换为浅色背景和深色文字，适配下面的白色内容区。
- 后续按用户截图继续调整过宽度与对齐：桌面端 `#navbar` 左侧 padding 为 `36px`，与首屏 slogan 左侧对齐；右侧 padding 为 `26px`，与右下悬浮联系球右边界对齐。首页导航外框已移除 `max-w-[1760px] mx-auto` 居中限制，改为 `w-full max-w-none mx-0`。
- 导航 logo 已由 `assets/logo.png` 替换为用户新增的 `assets/logo.svg`。另外新增 `assets/logo-dark.svg`，只把文字部分 `2077 . i` 改为深色，A 的品牌渐变保持不变。首页导航使用双层 logo：深色首屏显示原始白色 SVG，滚动到浅色内容区后切换为 `logo-dark.svg`；子页面白底导航也直接使用 `logo-dark.svg`。
- 后续按用户要求缩小过首页导航 logo：`.nav-logo-mark` 从 `226px × 32px` 调为 `190px × 27px`。导航外框圆角已改为胶囊形：`.site-nav-shell { border-radius: 9999px; }`。
- 修复过一个导航吸顶 bug：原滚动脚本在回到顶部时会 `navbar.classList.remove('py-4')`，导致导航贴到视口顶部；现在滚动脚本只切换 `.nav-scrolled`，不再改导航 padding。

相关 CSS 在 `index.html` 的 `.site-nav-shell`、`.site-nav-shell.nav-scrolled`、`.nav-top` 附近。

### 4. 首页首屏改版

用户要求参考 PIO 首屏，不要复杂的产品舞台和信息堆叠。

当前首页首屏已改为：

- 全屏媒体背景。
- 左下方大 slogan。
- 短描述。
- 单个 CTA：`联系商务`，颜色与导航栏联系商务按钮一致，使用品牌紫粉渐变。
- 右下角向下滚动提示。

当前 slogan 已按用户要求恢复为原文：

> 给你的商业空间，配一位 7×24 在岗的 AI 虚拟员工

当前背景暂时使用已有图片：

- `StartRoom_Post.0180.png`

后续建议替换为用户提供的视频素材。

### 5. 首屏文案位置调整

用户反馈文案位置应更接近参考案例，目前已将文本从居中偏上改到左下：

- `.hero-pio` 改为 `align-items: flex-end`
- `.hero-pio-wrap` 取消 `max-width: 1280px` 居中限制
- `.hero-pio-wrap` 增加 `padding-bottom: 104px`

这样文本更接近 PIO 截图里的左下布局。

### 6. 新增子页面

新增了 5 个静态子页面和 1 个共用 CSS：

- `products.html`
- `solutions.html`
- `cases.html`
- `news.html`
- `about.html`
- `page.css`

这些页面目前是信息架构版，内容已能支撑导航跳转和基础展示，但还不是最终精修版。

#### `products.html`

包含：

- 幻真 Nano
- 幻真 Pro
- 幻真 Robo
- 线上渠道能力说明

#### `solutions.html`

商业综合体已放在首位。包含：

- 商业综合体
- 政务公共服务
- 文旅景区
- 展厅导览
- 酒店机场
- 银行金融

#### `about.html`

已加入用户要求的信息：

- 2077.AI 前身是新浪爱问。
- 从新浪爱问的知识问答背景延展到 AI Agent 虚拟员工。
- 强调 Agent、数字人、CMS、终端硬件全栈自研。

#### `cases.html`

包含：

- 信和集团·中港城
- 文旅与公共服务
- 客户与生态合作说明

#### `news.html`

目前是占位型新闻动态页，建议后续补真实新闻标题、日期、媒体链接和现场照片。

## 本地服务

当前本地服务通过 Python 静态服务器启动：

```powershell
Start-Process -FilePath 'C:\Users\iKun\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -ArgumentList '-m','http.server','4178','--bind','127.0.0.1' -WorkingDirectory 'E:\Claude_Projects\2077landingpage_demo' -WindowStyle Hidden -PassThru
```

已验证以下地址返回 `200 OK`：

- `http://localhost:4178/`
- `http://localhost:4178/products.html`
- `http://localhost:4178/solutions.html`
- `http://localhost:4178/cases.html`
- `http://localhost:4178/news.html`
- `http://localhost:4178/about.html`
- `http://localhost:4178/page.css`

## 首屏视频素材需求

后续如果用户提供首屏动图/视频，建议规格：

- 格式：优先 `MP4`，H.264 编码，静音，循环自然。
- 备选：`WebM`。
- 尺寸：最低 `1920x1080`，推荐 `2560x1440` 或 `3840x2160`。
- 时长：`8-15 秒`。
- 文件大小：建议控制在 `15-25MB` 内。
- 构图：主体偏中间或偏右，左侧 35%-45% 留给标题文字。
- 色调：偏深、科技、空间感强，避免画面自带大段文字。
- Poster：建议额外提供同画面的 `JPG/WebP`，最低 `1920x1080`。

建议文件名：

- `assets/hero-loop.mp4`
- `assets/hero-poster.jpg`

接入方式建议：

```html
<video autoplay muted loop playsinline poster="assets/hero-poster.jpg">
    <source src="assets/hero-loop.mp4" type="video/mp4">
</video>
```

当前为了避免视频文件不存在导致 404，首页首屏暂时使用 `<img src="StartRoom_Post.0180.png">` 占位。

## 后续建议

1. 首页首屏需要换成真实视频素材。现在图片只是临时占位。
2. 新增子页面目前是内容框架，后续应补真实产品图、案例图、新闻素材和更精细的响应式检查。
3. 首页 `index.html` 仍然很大，长期建议把 CSS/JS 稳定抽离到独立文件，但不要直接使用未确认的 `site.css/site.js`，需要先 diff 和验证。
4. 多语言 `i18n.js` 目前只覆盖原首页大量文本，新增页面暂未接入 i18n。
5. 首页导航 mega menu 使用 CSS `:has()`，现代浏览器支持较好；如果要兼容更老浏览器，可以改成 JS hover 状态。
6. 当前 logo cloud 的 `manifest.json` 在终端里看到过编码异常的文件名，浏览器实际表现需要继续检查。

## 当前 Git 工作区提示

本次修改/新增的主要文件：

- 修改：`index.html`
- 新增：`page.css`
- 新增：`products.html`
- 新增：`solutions.html`
- 新增：`cases.html`
- 新增：`news.html`
- 新增：`about.html`
- 新增：`HANDOFF.md`

接手前已存在但未处理的未跟踪文件：

- `.claude/settings.local.json`
- `site.css`
- `site.js`

不要误删这些文件，除非用户明确要求清理。
