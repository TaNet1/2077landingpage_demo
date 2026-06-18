# 2077.AI 官网项目交接文档

更新时间：2026-06-18  
当前本地预览：`http://localhost:4178/`（Codex 的 Python 服务）/ `http://localhost:4181/`（Claude 的 `npx serve`）

> ⚠️ **本文档为交接日志，谁动了项目谁就在「## 交接记录」最上方补一条**，写清：本次改了什么、为什么、还有什么没做、有什么坑。这样下一个接手的人（Claude 或 Codex）能无缝继续。

## 交接记录（倒序，最新在上）

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

#### 仍待做（按优先级）

- **子页面 i18n**：products/solutions/cases/about/news 的正文还没接 i18n，切英文/繁体时子页仍是简体。需要把子页文案 key 也补进 `i18n.js`，并确保子页 `<head>` 引了 `i18n.js` 且 body 末尾有跑 i18n 的脚本（子页目前可能没有那段 text-node 翻译脚本——要确认）。
- **mega menu 右侧预览文案** 也未 i18n。
- **首屏占位图**：`StartRoom_Post.0180.png` 裁切难看（人物没头）。等视频前可先调 `object-position`/加暗化遮罩改善，或换张构图更好的图。
- `news.html` 还是占位，需要真实新闻条目。
- 子页面整体内容与响应式还要再精修。
- `site.css` / `site.js`（我之前抽离的半成品，未被引用）——确认不用就删，别一直挂着。

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
