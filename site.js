(function () {
    const path = location.pathname.split('/').pop() || 'index.html';
    const isIndex = path === 'index.html' || path === '';
    const contactHref = 'contact.html';
    const navShellMode = isIndex ? '' : ' nav-light';

    const NAV = `
    <nav class="fixed top-0 w-full z-50 transition-all duration-300" id="navbar">
        <div class="site-nav-shell${navShellMode} w-full max-w-none mx-0 flex justify-between items-center gap-5">
            <a href="index.html" class="flex items-center shrink-0">
                <span class="nav-logo-mark" aria-label="2077.AI">
                    <img src="assets/logo.svg" alt="" class="nav-logo-img nav-logo-light">
                    <img src="assets/logo-dark.svg" alt="" class="nav-logo-img nav-logo-dark">
                </span>
            </a>

            <div class="hidden lg:flex nav-menu">
                <a href="index.html" class="nav-top">首页</a>
                <div class="nav-group">
                    <a href="products.html" class="nav-top">产品矩阵 <i data-lucide="chevron-down" class="w-3.5 h-3.5 nav-caret"></i></a>
                    <div class="mega-menu">
                        <div class="mega-split">
                            <div class="mega-list">
                                <div class="mega-section-label">软件</div>
                                <a href="product-huanzhen.html" class="mega-link mega-option" data-preview="huanzhen"><span class="mega-icon"><i data-lucide="sparkles" class="w-5 h-5"></i></span><span><h5>幻真</h5><p>AI 虚拟员工软件，承接问答、导览、讲解和营销转化。</p></span></a>
                                <a href="product-cms.html" class="mega-link mega-option" data-preview="cms"><span class="mega-icon"><i data-lucide="layout-dashboard" class="w-5 h-5"></i></span><span><h5>幻真CMS</h5><p>统一管理知识库、话术、内容发布、设备和运营数据。</p></span></a>
                                <div class="mega-section-label">硬件</div>
                                <a href="product-nano.html" class="mega-link mega-option" data-preview="nano"><span class="mega-icon"><i data-lucide="tablet-smartphone" class="w-5 h-5"></i></span><span><h5>幻真 Nano</h5><p>24 寸一体机，小空间快速部署的 AI 接待入口。</p></span></a>
                                <a href="product-pro.html" class="mega-link mega-option" data-preview="pro"><span class="mega-icon"><i data-lucide="monitor" class="w-5 h-5"></i></span><span><h5>幻真 Pro</h5><p>75 寸 4K 大屏，面向大堂、展厅和旗舰点位。</p></span></a>
                                <a href="product-robo.html" class="mega-link mega-option" data-preview="robo"><span class="mega-icon"><i data-lucide="bot" class="w-5 h-5"></i></span><span><h5>幻真 Robo</h5><p>透明 OLED 移动机器人，主动巡游讲解与迎宾。</p></span></a>
                            </div>
                            <div class="mega-preview">
                                <div class="mega-preview-card preview-nano"><div class="mega-preview-visual" style="background-image:url('StartRoom_Post.0180.png')"></div><div class="mega-preview-copy"><h4>轻量试点入口</h4><p>适合服务台、楼层入口和咨询点位，快速上线 AI 接待、问答和导览。</p></div></div>
                                <div class="mega-preview-card preview-pro"><div class="mega-preview-visual" style="background-image:url('TakePhotos.0772.png')"></div><div class="mega-preview-copy"><h4>旗舰视觉中心</h4><p>75 寸 4K 大屏承接大堂迎宾、展厅讲解和品牌内容展示。</p></div></div>
                                <div class="mega-preview-card preview-robo"><div class="mega-preview-visual" style="background-image:url('TakePhotos_panda.0080.png')"></div><div class="mega-preview-copy"><h4>移动讲解员</h4><p>透明 OLED + 自主巡航，适合展馆、景区和大型活动的主动服务。</p></div></div>
                                <div class="mega-preview-card active preview-huanzhen"><div class="mega-preview-visual" style="background-image:url('TakePhotos_Boy.0770.png')"></div><div class="mega-preview-copy"><h4>虚拟员工软件</h4><p>把 Agent、数字人、语音交互和业务流程封装成可复用的软件能力，可部署到硬件和线上渠道。</p></div></div>
                                <div class="mega-preview-card preview-cms"><div class="mega-preview-visual" style="background-image:url('20240923-181914.png')"></div><div class="mega-preview-copy"><h4>运营管理后台</h4><p>统一维护知识库、导览路线、营销内容、设备状态和服务数据，让虚拟员工可持续运营。</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-group">
                    <a href="solutions.html" class="nav-top">解决方案 <i data-lucide="chevron-down" class="w-3.5 h-3.5 nav-caret"></i></a>
                    <div class="mega-menu" style="min-width: 720px;">
                        <div class="mega-split">
                            <div class="mega-list">
                                <a href="solution-mall.html" class="mega-link mega-option" data-preview="mall"><span class="mega-icon"><i data-lucide="building-2" class="w-5 h-5"></i></span><span><h5>商业综合体</h5><p>迎宾、导购、找店、活动推荐与会员转化。</p></span></a>
                                <a href="solution-gov.html" class="mega-link mega-option" data-preview="gov"><span class="mega-icon"><i data-lucide="landmark" class="w-5 h-5"></i></span><span><h5>政务公共服务</h5><p>办事咨询、材料核验、窗口分流与数据合规。</p></span></a>
                                <a href="solution-tourism.html" class="mega-link mega-option" data-preview="tourism"><span class="mega-icon"><i data-lucide="map" class="w-5 h-5"></i></span><span><h5>文旅景区</h5><p>金牌导游、路线规划、文化讲解与游客互动。</p></span></a>
                                <a href="solution-exhibit.html" class="mega-link mega-option" data-preview="exhibit"><span class="mega-icon"><i data-lucide="presentation" class="w-5 h-5"></i></span><span><h5>展厅导览</h5><p>移动讲解员、多媒体联动和高频问题承接。</p></span></a>
                                <a href="solution-hotel.html" class="mega-link mega-option" data-preview="hotel"><span class="mega-icon"><i data-lucide="plane" class="w-5 h-5"></i></span><span><h5>酒店机场</h5><p>多语接待、航班/入住咨询与夜间服务补位。</p></span></a>
                                <a href="solution-finance.html" class="mega-link mega-option" data-preview="finance"><span class="mega-icon"><i data-lucide="badge-dollar-sign" class="w-5 h-5"></i></span><span><h5>银行金融</h5><p>VIP 接待、业务预审、知识库问答与合规部署。</p></span></a>
                            </div>
                            <div class="mega-preview">
                                <div class="mega-preview-card active preview-mall"><div class="mega-preview-visual" style="background-image:url('TakePhotos.0036.png')"></div><div class="mega-preview-copy"><h4>商业综合体优先场景</h4><p>从“找店问路”到活动推荐和会员转化，把商场前台变成可运营触点。</p></div></div>
                                <div class="mega-preview-card preview-gov"><div class="mega-preview-visual" style="background-image:url('20240923-181914.png')"></div><div class="mega-preview-copy"><h4>政务高频咨询分流</h4><p>私有化知识库、窗口分流、材料指引，降低人工重复答疑压力。</p></div></div>
                                <div class="mega-preview-card preview-tourism"><div class="mega-preview-visual" style="background-image:url('TakePhotos_panda.0080.png')"></div><div class="mega-preview-copy"><h4>主题化金牌导游</h4><p>景区 IP 形象承接路线、讲解、票务和周边推荐。</p></div></div>
                                <div class="mega-preview-card preview-exhibit"><div class="mega-preview-visual" style="background-image:url('TakePhotos_Boy.0770.png')"></div><div class="mega-preview-copy"><h4>展厅移动讲解</h4><p>多媒体联动、定点讲解和高频问答，让展厅服务标准化。</p></div></div>
                                <div class="mega-preview-card preview-hotel"><div class="mega-preview-visual" style="background-image:url('StartRoom_Post.0210.png')"></div><div class="mega-preview-copy"><h4>多语接待补位</h4><p>机场、酒店和会展空间的国际客群咨询与夜间服务。</p></div></div>
                                <div class="mega-preview-card preview-finance"><div class="mega-preview-visual" style="background-image:url('StartRoom_Post.0180.png')"></div><div class="mega-preview-copy"><h4>金融合规接待</h4><p>VIP 接待、业务预审、知识问答和本地化安全部署。</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-group">
                    <a href="cases.html" class="nav-top">落地案例 <i data-lucide="chevron-down" class="w-3.5 h-3.5 nav-caret"></i></a>
                    <div class="mega-menu">
                        <div class="mega-split">
                            <div class="mega-list">
                                <a href="case-sino.html" class="mega-link mega-option" data-preview="sino"><span class="mega-icon"><i data-lucide="sparkles" class="w-5 h-5"></i></span><span><h5>信和集团 · 中港城</h5><p>服务空间数字内容与 AI 接待统一入口。</p></span></a>
                                <a href="case-fire-education.html" class="mega-link mega-option" data-preview="case-tourism"><span class="mega-icon"><i data-lucide="landmark" class="w-5 h-5"></i></span><span><h5>文旅与公共服务</h5><p>景区、消防教育基地、博物馆等多场景复制。</p></span></a>
                            </div>
                            <div class="mega-preview">
                                <div class="mega-preview-card active preview-sino"><div class="mega-preview-visual" style="background-image:url('TakePhotos.0036.png')"></div><div class="mega-preview-copy"><h4>旗舰商业案例</h4><p>用 AI 虚拟员工统一商场服务、活动和导览入口。</p></div></div>
                                <div class="mega-preview-card preview-case-tourism"><div class="mega-preview-visual" style="background-image:url('TakePhotos_panda.0080.png')"></div><div class="mega-preview-copy"><h4>多场景复制</h4><p>文旅、教育基地、展厅和公共服务的标准化落地。</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-group">
                    <a href="about.html" class="nav-top">关于 <i data-lucide="chevron-down" class="w-3.5 h-3.5 nav-caret"></i></a>
                    <div class="mega-menu">
                        <div class="mega-split">
                            <div class="mega-list">
                                <a href="about-background.html" class="mega-link mega-option" data-preview="about"><span class="mega-icon"><i data-lucide="info" class="w-5 h-5"></i></span><span><h5>团队</h5><p>新浪爱问前身背景，全栈自研 AI 虚拟员工团队。</p></span></a>
                                <a href="news.html" class="mega-link mega-option" data-preview="news"><span class="mega-icon"><i data-lucide="newspaper" class="w-5 h-5"></i></span><span><h5>新闻动态</h5><p>品牌报道、产品更新、行业活动与公司里程碑。</p></span></a>
                                <a href="${contactHref}" class="mega-link mega-option" data-preview="contact"><span class="mega-icon"><i data-lucide="phone" class="w-5 h-5"></i></span><span><h5>联系我们</h5><p>预约演示、商务合作和试点场景沟通。</p></span></a>
                            </div>
                            <div class="mega-preview">
                                <div class="mega-preview-card active preview-about"><div class="mega-preview-visual" style="background-image:url('StartRoom_Post.0180.png')"></div><div class="mega-preview-copy"><h4>新浪爱问背景</h4><p>从知识问答到 AI Agent，把内容理解能力带入线下服务场景。</p></div></div>
                                <div class="mega-preview-card preview-news"><div class="mega-preview-visual" style="background-image:url('TakePhotos_Boy.0100.png')"></div><div class="mega-preview-copy"><h4>产品与公司动态</h4><p>媒体报道、产品发布、展会活动和客户上线新闻。</p></div></div>
                                <div class="mega-preview-card preview-contact"><div class="mega-preview-visual" style="background-image:url('TakePhotos.0772.png')"></div><div class="mega-preview-copy"><h4>预约一次场景沟通</h4><p>告诉我们你的空间、客流和业务目标，评估适合的终端组合。</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="relative" id="langSwitch">
                    <button class="nav-icon-btn w-11 h-11 flex items-center justify-center rounded-full transition-all" id="langBtn" aria-haspopup="true" aria-label="切换语言 / Language"><i data-lucide="globe" class="w-[18px] h-[18px]"></i></button>
                    <div class="lang-menu absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 p-1.5 hidden" id="langMenu">
                        <button class="lang-opt" data-lang="zh-CN">简体中文</button>
                        <button class="lang-opt" data-lang="zh-HK">繁體中文</button>
                        <button class="lang-opt" data-lang="en">English</button>
                    </div>
                </div>
                <a href="${contactHref}" data-i18n-btn class="nav-contact-btn magnetic-btn gradient-bg text-white px-7 py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap hidden lg:inline-flex items-center">联系商务</a>
                <button class="nav-icon-btn w-11 h-11 lg:hidden flex items-center justify-center rounded-full transition-all" id="navHamburger" aria-label="菜单 / Menu"><i data-lucide="menu" class="w-5 h-5"></i></button>
            </div>
        </div>
    </nav>
    <div class="nav-mobile lg:hidden" id="navMobile">
        <a href="index.html">首页</a>
        <a href="products.html">产品矩阵</a>
        <a href="solutions.html">解决方案</a>
        <a href="cases.html">落地案例</a>
        <a href="about.html">关于</a>
        <a href="news.html">新闻动态</a>
        <a href="${contactHref}" class="nav-mobile-cta">联系商务</a>
    </div>`;

    const FOOTER = `
    <footer class="site-footer">
        <div class="site-footer-inner">
            <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                <div class="site-footer-brand">
                    <div class="font-sora font-extrabold text-2xl tracking-tight text-white mb-6">2077<span class="text-white/30">.</span><span class="gradient-text">AI</span></div>
                    <p class="text-sm leading-relaxed mb-6">2077.AI 致力于为世界"智"造一亿劳动力，专注高度拟人化 AI 虚拟人的研发与应用。</p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400 transition-all"><i data-lucide="globe" class="w-5 h-5"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400 transition-all"><i data-lucide="share-2" class="w-5 h-5"></i></a>
                        <a href="#" class="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400 transition-all"><i data-lucide="send" class="w-5 h-5"></i></a>
                    </div>
                </div>
                <div class="site-footer-grid">
                    <div><h6>产品</h6><ul class="space-y-4 text-sm"><li><a href="product-nano.html">硬件：幻真 Nano / Pro / Robo</a></li><li><a href="product-huanzhen.html">软件：幻真</a></li><li><a href="product-cms.html">软件：幻真CMS</a></li><li><a href="products.html">产品矩阵</a></li></ul></div>
                    <div><h6>场景</h6><ul class="space-y-4 text-sm"><li><a href="solution-mall.html">商业综合体</a></li><li><a href="solution-gov.html">公共服务</a></li><li><a href="solution-tourism.html">文旅景区</a></li><li><a href="solution-exhibit.html">展厅导览</a></li></ul></div>
                    <div><h6>联系我们</h6><ul class="space-y-4 text-sm"><li><a href="tel:18676387250">186 7638 7250</a></li><li><a href="mailto:Molly@2077.ai">Molly@2077.ai</a></li><li><a href="#">深圳前海深港青年梦工场北区 C 栋 202</a></li></ul></div>
                </div>
            </div>
            <div class="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-xs">
                <p>© 2025 2077.AI · 幻影未来 版权所有</p>
                <div class="flex gap-8 mt-4 md:mt-0"><a href="#">隐私政策</a><a href="#">服务协议</a><a href="#">粤ICP备20065272号-1</a></div>
            </div>
        </div>
    </footer>`;

    const FAB = `
    <div class="fab" id="fab">
        <div class="fab-menu">
            <a href="tel:18676387250" class="fab-item"><i data-lucide="phone" class="w-4 h-4 text-purple-600"></i><div>电话咨询<br><b>186 7638 7250</b></div></a>
            <a href="${contactHref}" class="fab-item"><i data-lucide="calendar-check" class="w-4 h-4 text-purple-600"></i><div>联系商务</div></a>
            <a href="mailto:Molly@2077.ai" class="fab-item"><i data-lucide="mail" class="w-4 h-4 text-purple-600"></i><div>邮件联系</div></a>
        </div>
        <div class="fab-main" id="fabMain"><i data-lucide="message-circle" class="w-6 h-6"></i></div>
    </div>`;

    const navMount = document.getElementById('site-nav');
    if (navMount) navMount.innerHTML = NAV;
    const footerMount = document.getElementById('site-footer');
    if (footerMount) footerMount.innerHTML = FOOTER;
    const fabMount = document.getElementById('site-fab');
    if (fabMount) fabMount.innerHTML = FAB;

    function initSharedUi() {
        if (window.lucide) window.lucide.createIcons();

        const inner = document.querySelector('.site-nav-shell');
        if (inner) {
            // Sierra-style theme switch: transparent (white text) over dark zones,
            // solid white (dark text) over light zones. We detect which zone sits
            // under the nav bar rather than using a fixed scroll threshold, because
            // sections now alternate dark/light down the page.
            const darkZones = [];
            const heroEl = document.getElementById('hero');
            if (heroEl) darkZones.push(heroEl);                          // homepage dark hero
            document.querySelectorAll('.has-grainient').forEach((s) => {
                const bg = s.querySelector(':scope > .grainient-bg');
                if (bg && bg.getAttribute('data-grainient') === 'dark') darkZones.push(s);
            });
            if (darkZones.length) {
                const refY = 36; // a point inside the bar
                let ticking = false;
                const apply = () => {
                    ticking = false;
                    const overDark = darkZones.some((z) => {
                        const r = z.getBoundingClientRect();
                        return r.top <= refY && r.bottom > refY;
                    });
                    inner.classList.toggle('nav-light', !overDark);
                };
                const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
                apply();
                window.addEventListener('scroll', onScroll, { passive: true });
                window.addEventListener('resize', onScroll);
            } else {
                // No dark zones on this page → keep the solid (light) nav.
                inner.classList.add('nav-light');
            }
        }

        const fab = document.getElementById('fab');
        const fabMain = document.getElementById('fabMain');
        if (fab && fabMain) fabMain.addEventListener('click', () => fab.classList.toggle('open'));

        const ham = document.getElementById('navHamburger');
        const mob = document.getElementById('navMobile');
        if (ham && mob) {
            ham.addEventListener('click', (e) => { e.stopPropagation(); mob.classList.toggle('open'); });
            mob.addEventListener('click', (e) => e.stopPropagation());
            document.addEventListener('click', () => mob.classList.remove('open'));
            mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
        }
    }

    function initClickSpark() {
        if (window.__CLICK_SPARK_READY) return;
        window.__CLICK_SPARK_READY = true;

        const defaults = {
            sparkSize: 12,
            sparkRadius: 20,
            sparkCount: 7,
            duration: 450,
            easing: 'ease-out',
            extraScale: 1.1
        };

        if (!document.getElementById('clickSparkStyle')) {
            const style = document.createElement('style');
            style.id = 'clickSparkStyle';
            style.textContent = `
                .click-spark-layer{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;contain:strict}
                .click-spark{position:absolute;left:0;top:0;width:var(--spark-size,12px);height:2px;border-radius:999px;background:var(--spark-color,#fff);opacity:0;transform-origin:0 50%;will-change:transform,opacity;animation:clickSpark var(--spark-duration,450ms) var(--spark-easing,ease-out) forwards}
                @keyframes clickSpark{0%{opacity:1;transform:translate3d(var(--spark-x),var(--spark-y),0) rotate(var(--spark-angle)) translateX(0) scaleX(.2)}64%{opacity:1}100%{opacity:0;transform:translate3d(var(--spark-x),var(--spark-y),0) rotate(var(--spark-angle)) translateX(var(--spark-distance)) scaleX(var(--spark-scale,1.1))}}
            `;
            document.head.appendChild(style);
        }

        const layer = document.createElement('div');
        layer.className = 'click-spark-layer';
        layer.setAttribute('aria-hidden', 'true');
        document.body.appendChild(layer);

        const parseRgb = (value) => {
            if (!value || value === 'transparent') return null;
            const match = value.match(/rgba?\(([^)]+)\)/);
            if (!match) return null;
            const parts = match[1].split(',').map((part) => part.trim());
            const r = Number(parts[0]);
            const g = Number(parts[1]);
            const b = Number(parts[2]);
            const a = parts[3] == null ? 1 : Number(parts[3]);
            if ([r, g, b, a].some((n) => Number.isNaN(n))) return null;
            return { r, g, b, a };
        };

        const luminance = ({ r, g, b }) => {
            const channels = [r, g, b].map((channel) => {
                const value = channel / 255;
                return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        };

        const isDarkClickContext = (target, x, y) => {
            let el = target instanceof Element ? target : document.elementFromPoint(x, y);
            if (!el) return false;

            const nav = el.closest('.site-nav-shell');
            if (nav) return !nav.classList.contains('nav-light') && !nav.classList.contains('nav-scrolled');

            const explicit = el.closest('[data-clickspark-theme]');
            if (explicit) return explicit.getAttribute('data-clickspark-theme') === 'dark';

            const zone = el.closest('#hero, .site-footer, .has-grainient, .section.dark');
            if (zone) {
                if (zone.id === 'hero' || zone.classList.contains('site-footer') || zone.classList.contains('dark')) return true;
                const bg = zone.querySelector(':scope > .grainient-bg');
                if (bg) return bg.getAttribute('data-grainient') === 'dark';
            }

            while (el && el !== document.documentElement) {
                const color = parseRgb(getComputedStyle(el).backgroundColor);
                if (color && color.a > 0.35) return luminance(color) < 0.45;
                el = el.parentElement;
            }
            return false;
        };

        const emitSpark = (x, y, color) => {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < defaults.sparkCount; i += 1) {
                const spark = document.createElement('span');
                const angle = (360 / defaults.sparkCount) * i + (Math.random() * 8 - 4);
                spark.className = 'click-spark';
                spark.style.setProperty('--spark-color', color);
                spark.style.setProperty('--spark-size', `${defaults.sparkSize}px`);
                spark.style.setProperty('--spark-x', `${x}px`);
                spark.style.setProperty('--spark-y', `${y - 1}px`);
                spark.style.setProperty('--spark-angle', `${angle}deg`);
                spark.style.setProperty('--spark-distance', `${defaults.sparkRadius}px`);
                spark.style.setProperty('--spark-duration', `${defaults.duration}ms`);
                spark.style.setProperty('--spark-easing', defaults.easing);
                spark.style.setProperty('--spark-scale', defaults.extraScale);
                spark.addEventListener('animationend', () => spark.remove(), { once: true });
                fragment.appendChild(spark);
            }
            layer.appendChild(fragment);
        };

        document.addEventListener('pointerdown', (event) => {
            if (event.button != null && event.button !== 0) return;
            const target = event.target instanceof Element ? event.target : document.elementFromPoint(event.clientX, event.clientY);
            const color = isDarkClickContext(target, event.clientX, event.clientY) ? '#ffffff' : '#000000';
            emitSpark(event.clientX, event.clientY, color);
        }, { passive: true });
    }

    function initI18n() {
        if (window.__SITE_I18N_READY) return;
        window.__SITE_I18N_READY = true;

        const I18N = window.__I18N_DICT || { 'zh-HK': {}, 'en': {} };
        let CUR = 'zh-CN';
        const snap = [];
        const attrSnap = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(n) {
                const p = n.parentElement;
                if (!p) return NodeFilter.FILTER_REJECT;
                if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(p.nodeName)) return NodeFilter.FILTER_REJECT;
                if (p.closest('#langSwitch') || p.closest('.float-chip')) return NodeFilter.FILTER_REJECT;
                if (p.classList && p.classList.contains('counter-val')) return NodeFilter.FILTER_REJECT;
                if (!n.nodeValue || !/[一-鿿]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        let node;
        while ((node = walker.nextNode())) snap.push({ node, zh: node.nodeValue });
        document.querySelectorAll('[placeholder], [aria-label]').forEach(el => {
            ['placeholder', 'aria-label'].forEach(attr => {
                const v = el.getAttribute(attr);
                if (v && /[一-鿿]/.test(v)) attrSnap.push({ el, attr, zh: v });
            });
        });

        function tr(zh, lang) {
            if (lang === 'zh-CN') return zh;
            const key = zh.trim();
            const t = (I18N[lang] || {})[key];
            return t == null ? zh : zh.replace(key, t);
        }
        window.__i18nTr = (s) => CUR === 'zh-CN' ? s : ((I18N[CUR] || {})[s] || s);
        window.__dumpI18n = () => [...new Set([...snap.map(s => s.zh.trim()), ...attrSnap.map(s => s.zh.trim())])].filter(Boolean);

        const VALID = ['zh-CN', 'zh-HK', 'en'];
        function setLang(lang, persist) {
            if (!VALID.includes(lang)) lang = 'zh-CN';
            CUR = lang;
            snap.forEach(({ node, zh }) => { node.nodeValue = tr(zh, lang); });
            attrSnap.forEach(({ el, attr, zh }) => { el.setAttribute(attr, tr(zh, lang)); });
            const el = document.documentElement;
            el.lang = lang === 'en' ? 'en' : (lang === 'zh-HK' ? 'zh-Hant-HK' : 'zh-Hans');
            el.setAttribute('data-lang', lang);
            document.querySelectorAll('.lang-opt').forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
            if (window.__renderChips) window.__renderChips();
            if (persist) { try { localStorage.setItem('site-lang', lang); } catch (e) {} }
        }
        window.setSiteLang = (l) => setLang(l, true);

        const btn = document.getElementById('langBtn');
        const menu = document.getElementById('langMenu');
        if (btn && menu) {
            btn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
            menu.addEventListener('click', (e) => e.stopPropagation());
            document.addEventListener('click', () => menu.classList.add('hidden'));
            document.querySelectorAll('.lang-opt').forEach(o => o.addEventListener('click', () => { setLang(o.dataset.lang, true); menu.classList.add('hidden'); }));
        }

        let saved = null;
        try { saved = localStorage.getItem('site-lang'); } catch (e) {}
        if (saved === 'zh-TW') saved = 'zh-HK'; // migrate old Taiwan locale preference to Hong Kong
        if (saved && VALID.includes(saved)) {
            setLang(saved, false);
        } else {
            setLang('zh-CN', false);
            fetch('https://ipapi.co/json/')
                .then(r => r.json())
                .then(d => {
                    const cc = (d && d.country_code || '').toUpperCase();
                    let lang = 'en';
                    if (cc === 'CN') lang = 'zh-CN';
                    else if (['HK', 'MO', 'TW'].includes(cc)) lang = 'zh-HK';
                    setLang(lang, false);
                })
                .catch(() => {});
        }
    }

    function initPageMotion() {
        if (isIndex || window.__SITE_PAGE_MOTION_READY) return;
        window.__SITE_PAGE_MOTION_READY = true;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const useGSAP = !!(window.gsap && window.ScrollTrigger);
        if (!useGSAP) return;

        const ST = window.ScrollTrigger;
        gsap.registerPlugin(ST);

        if (window.Lenis && !window.__siteLenis) {
            const lenis = new Lenis({
                lerp: 0.065,
                wheelMultiplier: 0.82,
                touchMultiplier: 1,
                anchors: { offset: -96, duration: 1.05 },
                autoResize: true
            });
            window.__siteLenis = lenis;
            lenis.on('scroll', ST.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        document.querySelectorAll('.page-hero, .section').forEach((section, idx) => {
            if (!section.querySelector(':scope > .page-parallax-layer')) {
                const layer = document.createElement('span');
                layer.className = `page-parallax-layer ${idx % 2 ? 'layer-b' : 'layer-a'}`;
                layer.setAttribute('aria-hidden', 'true');
                section.prepend(layer);
            }
        });

        const para = (target, y, trigger, start = 'top bottom', end = 'bottom top', scrub = 1.15) => {
            if (!target) return;
            gsap.to(target, {
                yPercent: y,
                ease: 'none',
                scrollTrigger: { trigger, start, end, scrub, invalidateOnRefresh: true }
            });
        };

        const hero = document.querySelector('.page-hero');
        if (hero) {
            para(hero.querySelector('.container'), 26, hero, 'top top', 'bottom top', 1.1);
            para(hero.querySelector('.page-parallax-layer'), -58, hero, 'top top', 'bottom top', 1);
        }

        document.querySelectorAll('.section').forEach((section, idx) => {
            const container = section.querySelector(':scope > .container');
            const layer = section.querySelector(':scope > .page-parallax-layer');
            para(container, idx % 2 ? -16 : 16, section);
            para(layer, idx % 2 ? 68 : -68, section, 'top bottom', 'bottom top', 1);
        });

        if (!prefersReducedMotion) {
            gsap.utils.toArray('.overview-card, .feature-card, .info-card, .related-card').forEach((card, idx) => {
                gsap.fromTo(card,
                    { opacity: 0.62, filter: 'blur(8px)' },
                    {
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.85,
                        ease: 'power3.out',
                        delay: (idx % 3) * 0.05,
                        scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: 'play none none reverse' }
                    }
                );
            });
        }

        gsap.utils.toArray('.product-card img, .overview-media img').forEach((img) => {
            const trigger = img.closest('.section') || img;
            para(img, -30, trigger, 'top bottom', 'bottom top', 1);
        });

        window.addEventListener('load', () => ST.refresh());
    }

    function initOverviewDetailLinks() {
        const addButton = (host, href, label) => {
            if (!host || host.querySelector(`[href="${href}"]`)) return;
            const wrap = document.createElement('div');
            wrap.className = 'hero-actions';
            wrap.innerHTML = `<a href="${href}" class="btn btn-ghost">${label}</a>`;
            host.appendChild(wrap);
        };

        if (path === 'solutions.html') {
            [
                ['#mall .container', 'solution-mall.html', '查看商业综合体方案'],
                ['#gov .container > div:first-child', 'solution-gov.html', '查看政务公共服务方案'],
                ['#tourism .info-card:first-child', 'solution-tourism.html', '查看文旅景区方案'],
                ['#exhibit .info-card:first-child', 'solution-exhibit.html', '查看展厅导览方案'],
                ['#hotel .info-card:first-child', 'solution-hotel.html', '查看酒店机场方案'],
                ['#finance .info-card:first-child', 'solution-finance.html', '查看银行金融方案']
            ].forEach(([selector, href, label]) => addButton(document.querySelector(selector), href, label));
        }

        if (path === 'cases.html') {
            addButton(document.querySelector('#sino .container > div:first-child'), 'case-sino.html', '查看信和集团案例');
            const cards = document.querySelectorAll('#tourism .info-card');
            [
                ['case-fire-education.html', '查看消防教育基地案例'],
                ['case-museum-exhibit.html', '查看博物馆 / 展馆案例'],
                ['case-scenic-center.html', '查看景区游客中心案例']
            ].forEach(([href, label], idx) => addButton(cards[idx], href, label));
        }

        if (path === 'about.html') {
            addButton(document.querySelector('.section .grid-2 > div:first-child'), 'about-background.html', '查看公司背景');
            const capabilityCards = document.querySelectorAll('.section.soft .info-card');
            [
                ['about-agent.html', '查看 Agent 能力'],
                ['about-avatar.html', '查看数字人系统'],
                ['about-cms.html', '查看 CMS 平台'],
                ['about-hardware.html', '查看终端硬件']
            ].forEach(([href, label], idx) => addButton(capabilityCards[idx], href, label));
            addButton(document.querySelector('.section.dark .container'), 'about-mission.html', '查看我们要解决的问题');
        }
    }

    initSharedUi();
    initClickSpark();
    initI18n();
    initOverviewDetailLinks();
    initPageMotion();
})();
