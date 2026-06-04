# AKURA (2077.AI) — AvatarX 落地页

3D AI 虚拟员工 / 软硬件一体解决方案的单页营销落地页。融合了 Variant 设计稿的视觉风格与「幻影未来」原型的业务内容与交互。

## 技术栈

- 纯静态 HTML，无构建步骤
- [Tailwind CSS](https://tailwindcss.com)（CDN）
- [Lucide](https://lucide.dev) 图标（CDN）
- Google Fonts：Inter / Sora / Noto Sans SC

## 运行

直接用浏览器打开 `index.html` 即可（依赖走 CDN，需联网）。或起一个本地静态服务器：

```bash
npx serve .
# 或
python -m http.server 8000
```

## 页面结构

导航栏 · Hero（光标跟随 3D 虚拟人 + 数字滚动）· 客户 logo 墙 ·
**行业痛点** · **产品逻辑（感知 → 决策 → 表现）** · 核心能力矩阵 ·
产品线（PRO / MAX / ROBO）· **核心优势（全自研·一家交付）** ·
**应用场景（可切换 Tab：综合体 / 银行 / 酒店机场 / 展厅）** ·
**量化收益（数字滚动）** · 客户反馈 · **落地案例 + logo 跑马灯** ·
**资质荣誉** · 联系表单 · 常见问题 · 页脚 · **悬浮联系按钮**

## 交互效果

- 鼠标跟随的渐变光晕
- 磁性按钮（hover 跟随鼠标位移）
- **Hero 3D 虚拟人**：眼睛与头部随光标转动
- 滚动渐入（IntersectionObserver）
- **数字滚动计数**（Hero 指标 + 量化收益墙）
- **应用场景 Tab 切换**
- **落地案例 logo 无限跑马灯**
- 导航栏滚动变样式
- **右下角悬浮联系按钮**（电话 / 预约 / 邮件）

## 内容来源

- 视觉系统：复刻自 Variant 分享的 AKURA AvatarX 设计稿（紫色渐变 + Tailwind）
- 业务内容与部分交互：整合自「幻影未来」AI 虚拟员工原型（痛点、产品逻辑、自研优势、场景、案例、资质等）
