# AKURA (2077.AI) — AvatarX 落地页

复刻自 Variant 分享的设计稿的单页营销落地页。展示 AKURA「AI 虚拟员工 / 数字孪生员工」产品。

## 技术栈

- 纯静态 HTML，无构建步骤
- [Tailwind CSS](https://tailwindcss.com)（CDN）
- [Lucide](https://lucide.dev) 图标（CDN）
- Google Fonts：Inter / Sora / Noto Sans SC

## 运行

直接用浏览器打开 `index.html` 即可，或起一个本地静态服务器：

```bash
# Python
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 页面结构

导航栏 · Hero · 客户 logo 墙 · 核心能力矩阵 · 三步部署 · 产品线（PRO/MAX/PLUS）·
跨行业应用场景（翻转卡片）· 客户反馈 · 暗色愿景区 · 核心技术 · 新闻洞察 ·
全球服务网络 · 联系表单 · 常见问题 · 页脚

## 交互效果

- 鼠标跟随的渐变光晕
- 磁性按钮（hover 跟随鼠标位移）
- 滚动渐入（IntersectionObserver）
- Hero 数字滚动计数动画
- 导航栏滚动变样式
- 场景卡片 3D 翻转
