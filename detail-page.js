(function () {
    const DATA = {
        'solution-mall': {
            type: 'Solution',
            title: '商业综合体',
            headline: '迎宾、导购、找店、营销转化一体化',
            lead: '把商场前台、楼层导视和活动运营统一到 AI 虚拟员工入口，让服务空间拥有可持续运营的数字触点。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: 'TakePhotos.0036.png',
            tags: ['主动迎宾', '找店导航', '活动推荐', '会员转化', '客流数据沉淀'],
            sections: [
                ['场景痛点', '商业综合体的高频咨询集中在找店、活动、停车、会员权益和楼层路线。传统服务台覆盖半径有限，导视屏只展示静态信息，无法把咨询自然转化为消费动作。'],
                ['方案设计', '通过 Pro 大屏或 Nano 点位承接主入口咨询，结合幻真 CMS 配置店铺、活动、路线和会员规则，让用户用自然语言获得可执行的下一步。'],
                ['推荐部署', '主入口使用 Pro 建立视觉中心，楼层服务台使用 Nano 分散承接咨询，活动区可按主题替换数字人形象。']
            ],
            metrics: [['7×24', '全天候在岗'], ['30%+', '满意度提升目标'], ['多点位', '服务触点统一']]
        },
        'solution-gov': {
            type: 'Solution',
            title: '政务公共服务',
            headline: '让群众进门就能问清楚、办明白',
            lead: '基于私有化知识库与 RAG，承接医保、政务、交通、便民服务等高频咨询，降低窗口重复答疑压力。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: '20240923-181914.png',
            tags: ['材料清单', '流程问答', '窗口分流', '本地化部署', '权限隔离'],
            sections: [
                ['场景痛点', '大厅咨询高峰时，群众常常不知道该去哪个窗口、需要带哪些材料、是否可以线上办理。人工窗口会被大量重复问题占用。'],
                ['方案设计', '将办事指南、材料清单、窗口规则和常见问题接入幻真 CMS，使用 Nano 或 Pro 做大厅入口问答和分流。'],
                ['安全要求', '支持本地化部署、知识库权限隔离和数据不出域，适配政务与公共服务的合规要求。']
            ],
            metrics: [['60-70%', '重复咨询节省目标'], ['本地化', '数据安全可控'], ['多入口', '大厅与线上协同']]
        },
        'solution-tourism': {
            type: 'Solution',
            title: '文旅景区',
            headline: '千人千面的主题化金牌导游',
            lead: '以景区 IP 或主题形象承接路线规划、文化讲解、票务咨询、周边推荐和多语种接待。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: 'TakePhotos_panda.0080.png',
            tags: ['主题 IP', '路线规划', '文化讲解', '票务咨询', '多语种接待'],
            sections: [
                ['场景痛点', '景区咨询内容分散，导游讲解依赖人工排班，游客在不同点位获得的信息不一致，文化内容难以沉淀为可复用资产。'],
                ['方案设计', '用主题数字人承接游客中心和重点点位咨询，把票务、路线、演出、餐饮和文化内容统一配置。'],
                ['价值结果', '降低重复讲解压力，提升游客互动时长，并把高频问题反馈到内容运营。']
            ],
            metrics: [['+30%', '满意度提升目标'], ['24种', '多语种扩展'], ['可运营', '内容持续迭代']]
        },
        'solution-exhibit': {
            type: 'Solution',
            title: '展厅导览',
            headline: '让展项会讲解、路线会引导、数据会沉淀',
            lead: '适合企业展厅、城市展馆、科技馆与教育基地，支持移动讲解、大屏迎宾和多媒体联动。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: 'TakePhotos_Boy.0770.png',
            tags: ['移动讲解', '展项问答', '路线规划', '多媒体触发', '参观数据'],
            sections: [
                ['场景痛点', '展厅讲解标准难统一，讲解员排班成本高，参观者临时追问很难被完整承接。'],
                ['方案设计', '使用 Robo 做移动讲解，或用 Pro 做入口迎宾与重点展项问答，统一接入展项知识库和路线配置。'],
                ['运营方式', '通过 CMS 维护展项内容、讲解顺序和高频问答，定期复盘访问热点。']
            ],
            metrics: [['标准化', '讲解口径统一'], ['多媒体', '可联动展项'], ['可复盘', '参观数据沉淀']]
        },
        'solution-hotel': {
            type: 'Solution',
            title: '酒店机场',
            headline: '多语种接待与夜间服务补位',
            lead: '面向酒店、机场、会展中心等国际客流空间，承接入住、航班、路线、周边推荐和夜间咨询。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: 'StartRoom_Post.0210.png',
            tags: ['多语种接待', '航班查询', '入住咨询', '周边推荐', '夜间服务'],
            sections: [
                ['场景痛点', '国际客流的语言、时段和咨询内容不稳定，夜间与高峰时段人工服务容易不足。'],
                ['方案设计', '在大堂、问询台和会展入口部署 Nano 或 Pro，统一承接多语种问答和路线推荐。'],
                ['终端建议', 'Nano 适合服务台补位，Pro 适合大堂主入口，Robo 适合会展与大型活动巡游。']
            ],
            metrics: [['7×24', '夜间服务补位'], ['多语种', '国际客群接待'], ['多点位', '按空间组合部署']]
        },
        'solution-finance': {
            type: 'Solution',
            title: '银行金融',
            headline: '合规可控的网点 AI 接待与业务预审',
            lead: '面向网点 VIP 接待、业务预审、排队分流和合规知识问答，支持私有化知识库与本地化部署。',
            back: { href: 'solutions.html', label: '返回解决方案' },
            image: 'StartRoom_Post.0180.png',
            tags: ['VIP 接待', '业务预审', '排队分流', '合规问答', '数据隔离'],
            sections: [
                ['场景痛点', '金融网点业务专业度高，客户咨询涉及流程、材料和合规边界，普通导览设备无法承接。'],
                ['方案设计', '通过私有化知识库配置网点业务、材料说明和分流规则，让 AI 员工先完成咨询和预审。'],
                ['部署要求', '支持本地化部署、数据隔离、权限审计和知识库版本管理。']
            ],
            metrics: [['私有化', '安全可控'], ['预审', '减少无效排队'], ['合规', '统一回答边界']]
        },
        'case-sino': {
            type: 'Case',
            title: '信和集团 · 中港城',
            headline: '服务空间数字内容与 AI 接待入口',
            lead: '以服务空间数字内容统一入口为目标，承接顾客咨询、商户信息、活动推荐与空间导览。',
            back: { href: 'cases.html', label: '返回落地案例' },
            image: 'TakePhotos.0036.png',
            tags: ['商业综合体', '主动接待', '空间导览', '内容统一入口'],
            sections: [
                ['项目目标', '把商场前台与导视能力升级为可问答、可推荐、可运营的 AI 虚拟员工入口。'],
                ['落地方式', '围绕主入口、服务台和活动区域配置数字人内容、商户信息和活动推荐逻辑。'],
                ['可复制点', '适用于一楼主入口、会员中心、核心中庭、热门活动展区和停车场连接口。']
            ],
            metrics: [['旗舰', '商业综合体样板'], ['统一', '内容与导览入口'], ['可复制', '多点位扩展']]
        },
        'case-fire-education': {
            type: 'Case',
            title: '天津 · 消防教育基地',
            headline: '移动 AI 讲解员承接科普问答与路线引导',
            lead: '面向教育基地的标准讲解与安全知识科普，把重复讲解交给可持续运营的数字员工。',
            back: { href: 'cases.html', label: '返回落地案例' },
            image: 'TakePhotos_panda.0080.png',
            tags: ['教育基地', '科普问答', '移动讲解', '路线引导'],
            sections: [
                ['项目目标', '提升消防知识讲解的标准化程度，让参观者可以随时追问安全常识和展项内容。'],
                ['落地方式', '用 Robo 或 Pro 承接展项讲解、动线引导和高频问答，CMS 维护讲解内容。'],
                ['运营价值', '减少重复讲解压力，统一科普口径，并沉淀参观者高频关注问题。']
            ],
            metrics: [['标准化', '讲解内容统一'], ['互动', '随时追问'], ['沉淀', '高频问题复盘']]
        },
        'case-museum-exhibit': {
            type: 'Case',
            title: '博物馆 / 展馆',
            headline: '主题 IP 串联展品知识、参观路线与游客追问',
            lead: '用贴合场馆主题的数字形象，把展品知识、路线规划和参观问答串成完整体验。',
            back: { href: 'cases.html', label: '返回落地案例' },
            image: 'TakePhotos_Boy.0770.png',
            tags: ['主题 IP', '展品问答', '路线规划', '多媒体讲解'],
            sections: [
                ['项目目标', '让展品内容不止停留在图文说明牌，而是变成可以对话、可以追问的知识服务。'],
                ['落地方式', '通过数字人形象接入展品知识库、参观路线和展项多媒体触发逻辑。'],
                ['可复制点', '适合博物馆、城市展馆、企业展厅、科技馆和教育基地。']
            ],
            metrics: [['主题化', '场馆 IP 表达'], ['问答', '展品知识承接'], ['路线', '参观动线引导']]
        },
        'case-scenic-center': {
            type: 'Case',
            title: '景区游客中心',
            headline: '票务、路线、演出、餐饮与周边推荐统一入口',
            lead: '把游客中心的高频咨询集中到 AI 虚拟员工，让游客获得更快、更一致的服务。',
            back: { href: 'cases.html', label: '返回落地案例' },
            image: 'StartRoom_Post.0180.png',
            tags: ['游客中心', '票务咨询', '路线推荐', '周边推荐'],
            sections: [
                ['项目目标', '解决游客中心排队咨询、信息分散和人工重复答疑问题。'],
                ['落地方式', '配置票务、路线、演出、餐饮、交通和周边商品内容，部署到入口终端。'],
                ['运营价值', '通过高频问题数据优化游客服务内容，并把咨询转化为推荐和消费入口。']
            ],
            metrics: [['统一', '游客咨询入口'], ['推荐', '路线与周边联动'], ['运营', '问题数据沉淀']]
        },
        'about-background': {
            type: 'About',
            title: '从新浪爱问到 2077.AI',
            headline: '把知识问答能力延展到真实服务空间',
            lead: '2077.AI 的前身是新浪爱问。我们把长期积累的知识连接、内容理解和互联网产品化经验，升级为可落地的 AI Agent 虚拟员工。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: 'StartRoom_Post.0180.png',
            tags: ['新浪爱问背景', '知识问答', '内容理解', 'AI Agent'],
            sections: [
                ['背景来源', '新浪爱问的核心基因是知识连接与问题解答。2077.AI 延续这一背景，把问答能力升级为能听、能想、能说、能执行的 AI Agent。'],
                ['能力迁移', '从线上知识服务迁移到线下商业、政务、文旅和展厅空间，关键是让 AI 具备稳定交付、内容运营和终端部署能力。'],
                ['当前方向', '我们聚焦 AI 虚拟员工，让每个空间都拥有 7×24 在岗的服务入口。']
            ],
            metrics: [['新浪', '爱问背景'], ['Agent', '能力升级'], ['线下', '服务空间落地']]
        },
        'about-agent': {
            type: 'About',
            title: 'AI Agent 决策大脑',
            headline: '理解需求、调用知识、执行流程',
            lead: 'Agent 是虚拟员工的大脑，负责理解用户口语化需求，调用知识库与业务流程，并完成多轮对话。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: '20240923-181914.png',
            tags: ['意图理解', 'RAG', '多轮对话', '流程编排'],
            sections: [
                ['核心能力', '识别用户真实意图，结合知识库和业务规则生成可执行回答。'],
                ['业务边界', '支持配置回答边界、敏感问题策略和人工兜底逻辑。'],
                ['适用场景', '适用于问答、导览、讲解、业务预审、营销推荐和服务分流。']
            ],
            metrics: [['理解', '自然语言需求'], ['调用', '知识与流程'], ['执行', '服务动作']]
        },
        'about-avatar': {
            type: 'About',
            title: '数字人表现系统',
            headline: '让品牌形象能说话、能服务、能运营',
            lead: '数字人负责把 Agent 能力以更自然的视觉和语音方式呈现出来，适配品牌 IP、真人克隆和多语种表达。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: 'TakePhotos_Boy.0770.png',
            tags: ['超写实建模', '品牌 IP', '唇形同步', '多语种表达'],
            sections: [
                ['表现目标', '让用户面对的不再是冰冷屏幕，而是有形象、有语气、有上下文理解能力的虚拟员工。'],
                ['形象类型', '支持真人形象、品牌 IP、主题角色和场景化服务大使。'],
                ['交互方式', '结合语音识别、语音合成、表情动作和多语种能力，完成自然对话。']
            ],
            metrics: [['形象', '品牌可定制'], ['语音', '自然交互'], ['多语', '跨客群服务']]
        },
        'about-cms': {
            type: 'About',
            title: '运营 CMS 平台',
            headline: '让虚拟员工可配置、可发布、可复盘',
            lead: 'CMS 用来配置话术、知识库、导览路线、营销内容和设备状态，让 AI 虚拟员工不是一次性交付，而是持续运营。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: 'TakePhotos.0772.png',
            tags: ['知识库', '话术策略', '路线配置', '数据复盘'],
            sections: [
                ['配置能力', '运营人员可以维护知识库、常见问题、活动内容、导览路线和业务流程。'],
                ['发布能力', '同一套内容可以同步到 Nano、Pro、Robo 以及线上渠道。'],
                ['复盘能力', '根据高频问题、服务数据和设备状态持续优化服务策略。']
            ],
            metrics: [['配置', '内容与流程'], ['发布', '多端同步'], ['复盘', '数据驱动']]
        },
        'about-hardware': {
            type: 'About',
            title: '终端硬件与部署',
            headline: '软硬协同，把 AI 员工带到真实空间',
            lead: '从 Nano 一体机、Pro 大屏到 Robo 移动机器人，终端硬件负责让虚拟员工真正进入线下服务现场。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: 'TakePhotos_panda.0080.png',
            tags: ['Nano', 'Pro', 'Robo', '私有化部署', '软硬协同'],
            sections: [
                ['终端组合', 'Nano 适合小点位，Pro 适合主入口和大堂，Robo 适合移动讲解和主动巡游。'],
                ['部署方式', '支持标准化交付、本地化部署和多点位统一管理。'],
                ['运维目标', '降低多供应商拼装带来的调试、版本和责任边界问题。']
            ],
            metrics: [['3类', '终端形态'], ['统一', '后台管理'], ['稳定', '线下运行']]
        },
        'about-mission': {
            type: 'About',
            title: '我们要解决的问题',
            headline: '让每个空间都有一位稳定、专业、可运营的 AI 员工',
            lead: '我们的目标不是一次演示，而是把高频咨询、导览、讲解和转化任务，变成可以持续交付和复盘的服务系统。',
            back: { href: 'about.html', label: '返回关于我们' },
            image: 'StartRoom_Post.0210.png',
            tags: ['稳定交付', '专业服务', '可运营', '可复制'],
            sections: [
                ['核心问题', '真实空间里的服务需求高频、重复、分散，但人工服务半径有限，传统导视又无法理解复杂问题。'],
                ['我们的解法', '用 Agent、数字人、CMS 和终端硬件组成完整闭环，把服务能力标准化、产品化、可运营化。'],
                ['长期方向', '让服务空间和公共服务场所拥有可持续进化的 AI 劳动力。']
            ],
            metrics: [['1套', '统一交付'], ['4项', '全栈能力'], ['多场景', '可复制落地']]
        }
    };

    const key = document.body.dataset.detail;
    const item = DATA[key];
    const root = document.getElementById('detail-root');
    if (!item || !root) return;

    const tags = item.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const sections = item.sections.map(([title, copy]) => `
        <div class="feature-card">
            <div class="feature-ico"><i data-lucide="sparkles" class="w-6 h-6"></i></div>
            <h3>${title}</h3>
            <p>${copy}</p>
        </div>`).join('');
    const metrics = item.metrics.map(([value, label]) => `
        <div class="metric"><strong class="gradient-text">${value}</strong><span>${label}</span></div>`).join('');

    root.innerHTML = `
        <header class="page-hero">
            <div class="container">
                <div class="eyebrow">${item.type}</div>
                <h1 class="font-sora">${item.title}<br><span class="gradient-text">${item.headline}</span></h1>
                <p class="lead">${item.lead}</p>
                <div class="hero-actions">
                    <a href="contact.html" class="btn btn-primary">联系商务</a>
                    <a href="${item.back.href}" class="btn btn-ghost">${item.back.label}</a>
                </div>
            </div>
        </header>
        <section class="section">
            <div class="container info-card product-card">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <div class="eyebrow">Overview</div>
                    <h2 class="section-title">${item.headline}</h2>
                    <p class="section-copy">${item.lead}</p>
                    <div class="tag-list">${tags}</div>
                </div>
            </div>
        </section>
        <section class="section soft">
            <div class="container">
                <div class="eyebrow">Detail</div>
                <h2 class="section-title">关键设计</h2>
                <div class="feature-grid">${sections}</div>
            </div>
        </section>
        <section class="section dark">
            <div class="container">
                <h2 class="section-title">交付指标</h2>
                <p class="section-copy">以下指标用于描述该页面的落地重点，后续可替换为真实项目数据、现场照片和客户授权信息。</p>
                <div class="metric-row">${metrics}</div>
            </div>
        </section>`;
})();
