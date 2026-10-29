# Design.md — 陆机阳个人网站设计规范

> **版本**：v3.0 · Neo-Brutalism（新粗野主义）+ 3D 层
> **取代**：v2.0（纯 2D，明令禁止 3D）；v1.0 深色玻璃拟态风（`#0e1114` + 蓝色 `#4db6ff` + 手写体 + 柔和阴影）
> **实现入口**：`src/neo-brutalism.css`（唯一主题层）+ `src/index.css`（基础层）+ `src/three/`（3D 层）
>
> v3.0 的改动只有一件事：**引入受约束的 3D**。3D 不是换风格，而是把「粗黑描边 + 平涂色块 + 硬边投影」这套语言延伸到第三个维度 —— 详见 [13 · 3D 层规范](#13-3d-层规范)。

---

## 01 概述

### 1.1 设计定位

通过**粗黑描边、硬边投影、高对比色块和大字号排版**，让界面呈现出直接、强烈、有态度的视觉感受。

它不是单纯"做丑"或"做粗糙"，而是刻意弱化精致修饰，用**更鲜明的结构和更强的个性**建立页面识别度。对一个求职用的个人作品站来说，这套风格的作用是：**三秒内让人记住你**，而不是让人觉得"又是一个模板站"。

### 1.2 一句话描述

> 用鲜明的对比，表达不加修饰的个性。

### 1.3 三个支柱

| 支柱 | 含义 | 在本站的落地 |
| --- | --- | --- |
| **大胆撞色 BOLD COLORS** | 黑白基底 + 高饱和点缀色 | 米白纸底 + 纯黑描边，荧光绿作主强调，黄/粉/蓝作辅助标签色 |
| **粗黑描边 THICK OUTLINES** | 卡片、按钮、输入框边界清晰明确 | 全站统一 `3px solid #0A0A0A`，不用 1px 细线 |
| **硬边投影 HARD SHADOWS** | 偏移的实色阴影，而非柔和模糊阴影 | 统一 `6px 6px 0 #0A0A0A`，零 blur、零透明度渐层 |

### 1.4 七个视觉特点

| 编号 | 特点 | 说明 |
| --- | --- | --- |
| 01 | **粗黑描边** | 卡片、按钮、输入框边界清晰明确，统一 3px 纯黑 |
| 02 | **硬阴影** | 多用偏移的实色阴影，而不是柔和模糊阴影 |
| 03 | **高对比配色** | 黑白基础上搭配黄、绿、粉、蓝等高饱和强调色 |
| 04 | **字体主导** | 常用大字号、粗字重，标题本身就是视觉焦点 |
| 05 | **组件块状感强** | 按钮、卡片像"实体块"一样，有重量感，不用幽灵按钮 |
| 06 | **装饰直接** | 少渐变、少玻璃、少柔光，更多依赖色块和线条 |
| 07 | **个性鲜明** | 整体气质年轻、张扬、有趣，强调品牌态度 |

### 1.5 AI 提示词（可直接复用）

```
设计一个【新粗野主义 Neo-Brutalism】风格的个人作品网站页面 UI：
米白纸感浅色背景，所有卡片与按钮使用 3px 纯黑粗描边，黑色硬边投影（零模糊、偏移 6-10px），
高对比纯色色块（荧光绿为主，黄/粉/蓝为辅），大字号粗体无衬线字体做标题，
块状卡片与按钮，界面结构直接清晰，少渐变、少玻璃拟态，强视觉冲击，
年轻化、潮流化、个性化，真实产品界面感，高识别度。

避免：低对比灰色、过多柔和渐变、玻璃拟态、毛玻璃、复杂纹理、精致柔光、
与主题无关的装饰性 3D 元素（3D 必须遵循第 13 章的规范）、过弱边框、过于平淡的信息层级。
```

---

## 02 色彩系统

### 2.1 色板

| 令牌 | 色值 | 名称 | 用途与配比 |
| --- | --- | --- | --- |
| `--nb-ink` | `#0A0A0A` | 墨黑 | 全部文字、全部描边、黑底区块、硬阴影。**占比 ~45%** |
| `--nb-paper` | `#F3F2EC` | 纸白 | 页面主背景（带一点暖灰，避免纯白刺眼）。**占比 ~35%** |
| `--nb-paper-2` | `#FFFFFF` | 纯白 | 卡片正面、输入框底。**占比 ~10%** |
| `--nb-paper-3` | `#E6E4DB` | 灰米 | 次级底、禁用态、条纹底。**占比 ~5%** |
| `--nb-lime` | `#C6F53C` | 荧光绿 | **主强调色**：高亮标题块、激活态、主按钮、悬停硬阴影。**占比 ~3%** |
| `--nb-yellow` | `#FFD23F` | 柠檬黄 | 辅助标签：奖项、荣誉、数据高亮 |
| `--nb-pink` | `#FF5C8A` | 荧光粉 | 辅助标签：新媒体、内容类 |
| `--nb-blue` | `#4DA3FF` | 电光蓝 | 辅助标签：数据、分析类 |
| `--nb-orange` | `#FF8A3D` | 亮橙 | 极少量点缀：提示、编号角标 |
| `--nb-muted` | `#6B6B63` | 灰字 | 正文次级文字、说明文案 |

### 2.2 配色纪律（重要）

1. **一个屏内最多出现 3 种强调色**。荧光绿是主角，其余颜色只在标签/徽章级别使用。
2. **禁止用强调色做正文或大面积底色**（黑底/白底区块除外）。强调色是"印章"，不是"墙面"。
3. **禁止低对比灰**。当前站内所有 `#999`、`#ccc` 一类的浅灰细字，全部提升到 `--nb-muted` 以上。
4. **黑底区块的硬阴影改用浅色**。在 `#0A0A0A` 背景上，阴影取 `--nb-lime` 或 `--nb-paper`，保持"实色偏移"的语言一致。
5. **语义化用色**：荧光绿 = 主行动/可交互/亮点；黄 = 成果与荣誉；粉 = 内容与创作；蓝 = 数据与分析。

---

## 03 字体与排版

### 3.1 字体栈

| 用途 | 字体栈 | 字重 | 备注 |
| --- | --- | --- | --- |
| 标题 `--nb-font-display` | `Inter, "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif` | 800 / 900 | 粗重无衬线，是"字体主导"原则的核心 |
| 正文 `--nb-font-body` | 同上 | 400 / 500 | 与标题同一家族，靠字重和字号拉开层级 |
| 数据/标签 `--nb-font-mono` | `ui-monospace, "SFMono-Regular", Consolas, monospace` | 600 / 700 | 编号、英文小标签、日期、KPI 数字 |
| 手写点缀 `--nb-font-hand` | `"WenYue XinQingNian Local"`（`/fonts/wenyue-xinqingnian-w8.otf`） | 400 | **仅用于贴纸、批注、箭头旁的小字**，不要用于标题或正文 |

> 旧版把 `--font-display-hand`（手写体）用在了全站 H1–H4 上，这在新粗野主义里是反向的：**粗野主义要的是机械的、块状的、重量感强的字**。手写体降级为"贴纸点缀"。

### 3.2 字阶

| 层级 | 尺寸 | 字重 | 字距 | 行高 | 说明 |
| --- | --- | --- | --- | --- | --- |
| H1（首屏主标） | `clamp(56px, 7.4vw, 120px)` | 900 | `-0.035em` | 0.92 | 本身就是视觉焦点，允许换行成两行块 |
| H2（区块标题） | `clamp(40px, 5.2vw, 76px)` | 900 | `-0.03em` | 1.02 | 每屏一个，独占一行 |
| H3（卡片标题） | `clamp(20px, 1.9vw, 30px)` | 800 | `-0.02em` | 1.2 | |
| H4（小标题） | `16px – 19px` | 800 | `-0.01em` | 1.35 | |
| 正文 | `14px – 15px` | 400 | `0` | 1.85 | 中文正文行高必须 ≥1.8 |
| 小字说明 | `12px – 13px` | 500 | `0.01em` | 1.7 | |
| Kicker / 标签 | `10px – 11px` | 700 | `0.16em` | 1.2 | 全大写，等宽字体，常配色块底 |

### 3.3 排版规则

- **标题必须能"站住"**：标题块允许加荧光绿色块底、允许 `-2deg ~ 2deg` 轻微倾斜，制造印刷贴纸感。
- **英文 kicker 全部大写**：`ABOUT ME` / `PORTFOLIO` / `CORE STRENGTHS`，配荧光绿或黑底反白小色块。
- **中英混排时数字用等宽**：KPI 数字（`150w+`、`10.0k`）用等宽字体 + 900 字重，视觉更"实"。
- **禁止**给正文加字距、禁止斜体、禁止文字阴影。

---

## 04 边框 · 圆角 · 硬阴影

### 4.1 三件套

```css
/* 1. 描边：唯一规格 */
border: 3px solid #0A0A0A;

/* 2. 硬阴影：纯色、零模糊、右下偏移 */
box-shadow: 6px 6px 0 #0A0A0A;

/* 3. 圆角：块状但不过分圆 */
border-radius: 18px;   /* 卡片 */
border-radius: 12px;   /* 按钮 / 小控件 */
border-radius: 999px;  /* 仅标签、胶囊、圆形图标底座 */
```

### 4.2 硬阴影梯度

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--nb-shadow-sm` | `4px 4px 0 var(--nb-ink)` | 小标签、徽章、内联代码块 |
| `--nb-shadow` | `6px 6px 0 var(--nb-ink)` | 默认：卡片、按钮、输入框 |
| `--nb-shadow-lg` | `10px 10px 0 var(--nb-ink)` | 首屏主视觉卡、弹层 |
| `--nb-shadow-lime` | `8px 8px 0 var(--nb-lime)` | 黑底区块内的卡片 |
| `--nb-shadow-paper` | `8px 8px 0 var(--nb-paper)` | 黑底区块内的浅色元素 |

### 4.3 交互语言：位移而非变色

新粗野主义的按钮反馈是**物理位移**，不是透明度变化：

```css
/* 悬停：抬起，阴影变实变远 */
.btn:hover  { transform: translate(-3px, -3px); box-shadow: 9px 9px 0 var(--nb-ink); }
/* 按下：压平，阴影归零 */
.btn:active { transform: translate(3px, 3px);  box-shadow: 0 0 0 var(--nb-ink); }
```

**禁止**：
- 任何 `blur` > 0 的 `box-shadow`
- 任何 `backdrop-filter`（玻璃拟态）
- 任何 `rgba(...,0.1)` 级别的极淡阴影
- 任何线性渐变做按钮或卡片底色

---

## 05 组件规范

### 5.1 按钮

| 类型 | 底色 | 文字 | 描边 | 阴影 | 圆角 |
| --- | --- | --- | --- | --- | --- |
| 主按钮 Primary | `--nb-lime` | `--nb-ink` | 3px 黑 | `6px 6px 0 黑` | 12px |
| 次按钮 Secondary | `--nb-paper-2` | `--nb-ink` | 3px 黑 | `6px 6px 0 黑` | 12px |
| 反白按钮（黑底上用） | `--nb-ink` | `--nb-paper` | 3px 黑 | `6px 6px 0 荧光绿` | 12px |
| 文字链接 | 透明 | `--nb-ink` | 0 | 0 | 0（配 2px 荧光绿下划线） |

规格：`min-height: 48px`、`padding: 0 22px`、`font-weight: 800`、`font-size: 14px`。
**禁止**幽灵按钮、禁止纯文字无边框主操作、禁止渐变按钮。

### 5.2 卡片

```
白底 + 3px 黑描边 + 18px 圆角 + 6px 硬阴影 + 28-32px 内边距
```

- 图片型卡片（项目海报、摄影作品）：图片置于卡片内，`border-radius` 与外框对齐，**图片本身也要 2px 黑描边**。
- 悬停：整卡 `translate(-4px,-4px)`，阴影增至 `10px 10px 0`，**不改底色**。
- 卡片标题区与内容区之间用 **2px 实线分隔**，禁止用 1px 浅灰线。

### 5.3 标签 / 徽章 / 贴纸

- **胶囊标签**：`1.5px 黑边 + 999px 圆角 + 10px 等宽大写字`，底色从强调色里取。
- **贴纸 Sticker**：`2.5px 黑边 + 硬阴影 + -3deg 倾斜 + 手写体或 800 字重`，用于装饰性批注（如首屏旁的小注释）。
- **编号角标**：黑色正方形圆角块，白色等宽数字，压在卡片左上角。
- 标签**不参与交互**就不用 hover；可点击的标签要有位移反馈。

### 5.4 区块标头（每个 section 统一）

```
[黑色小色块：ABOUT ME]        ← kicker，荧光绿或黑底反白
关于我                        ← H2 超粗黑体
──────────────────────────    ← 3px 黑线，贯穿整宽
```

右侧可放一个装饰性元素（编号 `01 / 09`、手写批注、箭头）。

### 5.5 输入框（联系弹层内）

`白底 + 3px 黑描边 + 12px 圆角 + 0 阴影`，聚焦时阴影变为 `4px 4px 0 荧光绿` + 描边加粗到 3px。**禁止**圆角过大、禁止浅灰描边。

### 5.6 图片处理

| 图片类型 | 处理 |
| --- | --- |
| 手绘人像（首屏、About、联系卡） | 放在**荧光绿色块/圆形**上，`grayscale(0.5) contrast(1.15)`，加 3px 黑描边 |
| 项目海报 | 保留彩色，但整体 `saturate(1.15)`，压 3px 黑框 |
| 摄影作品 | **不加滤镜**（这是专业作品，失真是减分项），只加黑框 |
| 企业 logo | 白底 + 2px 黑边 + 圆角容器，统一尺寸透出 |

### 5.7 跑马灯 Marquee

首屏底部和收尾页之间使用一条**黑底荧光绿字**的横向滚动条，内容是关键词串（`AI × OPERATOR ★ 产品运营 ★ 数据分析 ★ ...`）。这是新粗野主义里最省力、最出效果的"态度装饰"。

### 5.8 弹层（联系卡片）

- 遮罩：**纯黑 `rgba(10,10,10,.86)`，禁止模糊**
- 卡片：白底 + 4px 黑描边 + `10px 10px 0 黑` + 24px 圆角
- 关闭按钮：黑底白 X 的方形圆角块，悬停旋转 `-90deg`

---

## 06 页面级设计

### 06.1 全局节奏

```
Header（固定，纸白 + 3px 黑底边）
Hero        纸白底  ── 跑马灯（黑底）
About       纸白底
Experience  纸白底
Projects    墨黑底 ★ 深色节拍 1：项目 3D 转盘（见 13.8）
Portfolio   纸白底
Advantages  纸白底
FuturePlan  纸白底
Closing     墨黑底 ★ 深色节拍 2：收尾呼应
Footer      墨黑底
```

两个黑底区块把长页面切成三段，避免"一白到底"的疲劳。**不要再加第三个深色区块** —— 再多节拍感就没了，会变成"斑马纹"。

### 06.2 Header

- 高度 `74px`，纸白底，底部 `3px` 黑线（不是 1px 细线）
- 左侧 Wordmark：黑色方块内放 `JY` + 右侧 `陆机阳` 粗黑字
- 中间导航：6 个**胶囊按钮**（默认白底黑边无阴影），激活态 = 荧光绿底 + `3px 3px 0 黑` 阴影
- 右侧：主按钮「联系我」，荧光绿 + 硬阴影
- 移动端：右上角黑底方形菜单按钮，展开成全屏纸白 + 3px 黑线分隔的大字导航

### 06.3 Hero（首屏）

左文右图两栏：

- **左**：kicker 贴纸「AVAILABLE FOR WORK」→ H1 两行块（第二行 `Jackson Lu` 加荧光绿色块底）→ 一句身份说明 → 两行简介 → 双按钮
- **右**：荧光绿大圆形/圆角色块作底，手绘人像压在上面（3px 黑描边 + 10px 硬阴影），左右各挂一张**倾斜贴纸**（`CURRENTLY` / `FOCUSING ON`）
- **中部**：黑底荧光绿跑马灯（关键词串）
- **底部**：「我的方向」信息条 —— 两栏结构：左侧黑底荧光绿字的**标签栏**（`我的方向 / FOCUS`，右侧 3px 黑线分隔，`white-space: nowrap`），右侧白底正文区，含一行 15px/600 墨黑陈述句（关键词用**荧光绿马克笔 `mark`** 高亮）+ 一行 **5 等分彩色胶囊**（蓝 / 荧光绿 / 白 / 粉 / 黄）。
  - 规格与全站同档：`3px` 描边 + `6px` 硬投影 + `18px` 圆角；卡片与下方 About 的分割线之间保留 `88px` 留白，避免投影顶住分割线。
  - 胶囊用**墨黑文字**而非白字（小字号下 `#4da3ff` / `#ff5c8a` 上的白字对比度不足）。
  - 响应式：`≤ 820px` 标签栏转为顶部横向黑条（下边框替代右边框），胶囊改 `2 列` 网格。

### 06.4 About

左：`data-reveal` 身份卡（白底 + 3px 黑边 + 硬阴影 + `-1.5deg` 倾斜，卡片上沿挂一条黑色工牌挂绳）
右：kicker `ABOUT ME` → H2（后半句加荧光绿高亮）→ 小标题 → 长简介 → 两栏事实区（用 3px 黑线分隔，不用细灰线）→ 三个胶囊操作按钮

**「查看简历」不跳新标签页**：点开是站内弹层（`ResumeModal`），把 `resume.pdf` 第一页预渲染成 `resume-page-1.webp`（PyMuPDF 2 倍图，1190×1684）铺在弹层里，可滚动、可关闭；右上角才给「下载 PDF」。
- **不要用 `<iframe src="resume.pdf">`**：iOS Safari 的 iframe 只画第一页、部分安卓浏览器直接触发下载；图片在任何设备都按宽度铺满
- 换简历时：替换 `public/resume.pdf` → 重新渲染 `resume-page-1.webp`（`pymupdf` + PIL 转 WebP）
- 手机上字小，标题下给一行「手机可双指放大查看」（`≤620px` 才显示）

### 06.5 Experience（经历）

- 顶部居中：kicker + H2 + 底部 3px 黑线
- 分段切换器：白底 + 3px 黑边的**分段控件**，激活段荧光绿
- **实习卡**（Tab 1）：每张卡 = 白底 + 3px 黑边 + 硬阴影
  - 卡头：企业 logo 方块（白底 2px 黑边） + 企业名（H3） + 岗位胶囊 + 右侧日期胶囊
    - ⚠️ logo 源图配色不可控，**先在白底上校验可见性**：OPPO / 网易的图是「彩色 logo + 白底已烘焙」，直接放；千易的图是「纯白描线 + 透明底」（不透明像素平均色 253,253,253），白底上等于隐形，必须挂 `.exp-logo--mono` 用 `filter: brightness(0)` 强制转墨黑单色（形状信息在 alpha 通道，转色后细节无损）。
    - **不要**把 `brightness(0)` 套到白底已烘焙的图上（会整块变黑）。
  - 正文：`1fr 1fr` 两列小卡，每张小卡是 `纸白底 + 2px 黑边`，标题带荧光绿圆点
  - 卡尾：`2px` 黑线上方一行 `MILESTONE` 等宽标签 + 荧光绿成果胶囊
  - 网易那张卡**顶部带一张媒体横幅照片**（`netease-media-camp.png`），3px 黑框压在卡内
- **成长时间线**（Tab 2）：中间一条 `3px` 黑竖线，节点是**黑底荧光绿圆点 + 3px 黑描边**，左右交替卡片

### 06.6 Projects（项目）

黑底区块 + **项目 3D 转盘**（实现细节见 13.8）：

- 标题白色 H2 + 荧光绿 kicker；右上角「拖动旋转 ↔」
- 筛选器：透明底 + 2px 白边胶囊，激活态 = 荧光绿底黑字 + 硬阴影
- 分类现有 6 个：全部 / **Vibe Coding** / AI 智能 / 调研竞技 / 自媒体 / 创业；封面按 `category` 在 `coverFor` 里映射（Vibe Coding → `xueban/cover.webp`）
- 卡面角标位置是**固定 px**，必须错开：`.poster-number` 在 `top:18px`（44×44），`.poster-badge` 因此放到 `top:70px`；奖项胶囊在右上（`top:20px; right:18px`），三者互不重叠
- 封面尺寸固定 **888×1080（卡片 444×540 的 2 倍）**：卡片下半部会被 `.poster-shade` 压成近黑并盖住标题，**封面内容只能放上 55%**，否则等于白做
- 转盘卡片：复用 `.project-poster` 的视觉（3px 白边 + 硬阴影 + 编号角标 + 奖项胶囊 + 右下圆形按钮）
  - 正中那张完整显示、硬阴影 `16px 16px 0 荧光绿`；左右两侧各一张，转 34°、后退 300px、压暗
  - 卡片只留「分类 · 时间」「标题」「标签」——**不放正文段落**，那是阅读区的事
- 控制条：`‹` / `02 / 04` / `›`，等宽数字，荧光绿描边按钮
- 交互：横向拖动（带阻尼与吸附）、点侧卡转到它、按 `←` `→` 切换
- 两侧卡片的硬阴影降到 `6px 6px 0 荧光绿深色` —— 影子不受蒙层影响，不收一档会比卡面还亮

#### 06.6.1 项目案例页（`.case-*`）

项目转盘右下角的圆形按钮，对有 `caseStudy` 的项目改成**打开案例页**（其余项目仍是外链）。案例页是 `createPortal` 到 body 的长页弹层，内容全部来自 `data.ts`，改文案不用动组件。

- **结构固定四节**：`01 开发背景` → `02 技术栈` → `03 界面一览` → `04 工程上做了什么`；节标题前是荧光绿小方牌
- **节标题可由数据改**：`caseStudy.labels = { background, stack, features, highlights }`。
  自媒体、调研类的项目叫「技术栈」「工程上做了什么」很别扭 —— 小红书那篇改成「内容与运营方法」「做对了什么」
- **截图类主视觉限宽**：`caseStudy.heroFit = 'card'` → 最大 620px 居中，最高 470px。
  手机/主页截图整宽铺开要吃掉一整屏，限宽后才像「桌上放了一张卡片」
- **内容清单**：`caseStudy.notes = [{ kind, title, desc }]` → 2 列卡片（手机单列），
  放真实发过的笔记标题。比摆几张随机照片更有信息量
- **图片等宽**：`caseStudy.gallery = 'trio'` → 三列 4:5 竖图 `object-fit: cover`。
  两列原比例时，竖图 578 / 771 / 578 高度参差，行与行之间全是洞
- 案例页图片必须用 ≥2 倍显示宽度的源图：`photography-*.thumb.webp` 只有 330px，铺到 435px 就发虚
- **头部**：`CASE STUDY` 等宽大字 + `VIBE CODING` 墨黑胶囊 → 标题 → 一句话定位 → 角色 / 时间 / 关键词胶囊
- **主视觉**：取第一条带图的 feature 当 hero（占满整宽、3px 黑边 + 硬阴影），其余图进「界面一览」两列网格
- **图片整宽由数据决定**：`features[].wide = true` → `.case-shot.is-wide { grid-column: span 2 }`。
  **不要用 `:last-child:nth-child(odd)` 自动补位** —— 文档表格类的图（产品体系、创新点）缩到半栏后字号只剩 6px，
  必须整宽；而截图类的图半栏正好。原来那套自动规则会跟显式整宽打架
- **关键数字**：4 格白底黑边小卡，数字 `clamp(20px, 2.2vw, 28px)` 900
- **技术栈**：两列分组卡，分组名用等宽小写字距 `0.18em`，条目用荧光绿小方块当项目符号（沿用优势区语言）
- **关闭按钮**：`position: absolute`（**不要 sticky**）。sticky 会在长页面里一直压在正文上；滚动后靠 `ESC`、点遮罩或滚回顶部关闭
- **无障碍**：焦点陷阱（Tab 循环）、`ESC` 关闭、打开时锁 `body` 滚动（`.case-modal-open`）、关闭后焦点回到触发按钮
- `≤820px` 时铺满整屏、去掉圆角与阴影，网格全部单列

### 06.7 Portfolio（作品集）

**形态从「标签页 + 网格」改成一本书**：四个章节 = 四个跨页，一页一页翻过去。

- **书体**：书页纸色 `#fbfaf5`，`3px` 墨黑描边 + `14px 16px 0` 零模糊硬投影；右侧书口与底部各一条条纹页堆（`repeating-linear-gradient` 假装一叠纸）
- **左页 = 章节扉页**（衬线体）：`CH. 0X` 编号 + 章节胶囊（章节色）+ 衬线大标题 + 衬线描述 + 章节色短线 + 收录统计 + 左下角**倾斜印章**（章节色底 + 黑边 + 硬投影），右下角留超大描边数字水印
- **右页 = 章节作品**：等宽小字英文栏目 + 衬线栏目名；**剪辑**有二级药丸（口播/混剪/宣传，激活 = 墨黑底 + 章节色字）；作品卡一律 `2px` 黑边，不再用 3px 厚边（书页上要轻一档）
  - 剪辑：2 列；正好 3 支时第一支跨两列，避免半行空着
  - 摄影：3 列方形小图（像印样张）；AI 生图：2 列 16:10（横幅比例，摆大更合适）
  - 运营：单列横排卡（封面 4:3 + 类型 + 标题 + 三格 KPI）
- **书签**：右侧书口探出 4 个小舌片（`62px` 宽，编号 + 章节名），激活时被推出 `13px` 并换成章节色
- **页角**：右下角一块「狗耳朵」折角（`clip-path` 三角 + 折痕线），点它翻页，悬停时折角自己掀一下
- **控件**：底部 `← 01 / 05 →` + 一行操作提示；翻到最后一跨页是**后记 + 封底**（黑底 `JY.LU` + 回到第一页）

**为什么用衬线体**：这是全站唯一一处。书页要「文艺」，正文和标题换成 `Songti SC / SimSun / Georgia` 衬线栈，其余 UI（按钮、编号、KPI）仍走等宽/无衬线 —— 衬线只出现在「读文字」的地方。

### 06.8 Advantages（优势）

- 左 4 列：核心特质卡（白底黑边），列表项前用**荧光绿实心方块**（不是圆形勾选图标）
- 右 8 列：三张技能卡，卡头是 `2px` 黑线分隔的图标 + 标题 + 描述；技能条目用黑点 + 粗体名 + 灰说明
- 底部 4 格数据：`荧光绿底 + 3px 黑边` 的块，数字 `clamp(32px,3.4vw,52px)` 900 字重

**两栏必须同高（硬规范）**：左卡与右列是 `4 : 8` 两栏，卡框的**顶边与底边都要齐平**。

- `.adv-grid` 用 `align-items: stretch`（**禁止 `start`**），否则左卡只由内容撑高，底边会比右列短一大截（1440px 下实测差 249px）
- 谁更高谁定义行高，另一栏负责吸收余量：左卡 `.adv-traits` 是 `flex column`，清单 `.adv-trait-list { flex: 1; justify-content: space-between }`；右列 `.adv-skills` 也加 `justify-content: space-between` 兜底
- **余量必须落在「行内边距」而不是「条目间隙」上**：5 条要点如果只用 `space-between` 拉间距，间隙会涨到 60px+，看起来像没填满的占位。正确做法是把每条做成**行块**——`2px` 黑边 + 纸白底 + `11px 14px` 内边距 + `12px` 行距 的小卡片，余量被行高自然吃掉
- 验收口径：`bottomDelta`（右列最后一张卡底边 − 左卡底边）与 `heightDiff` 在**任一 >1080px 的视口**都必须是 `0`

### 06.9 FuturePlan（规划）

两张 `白底 + 3px 黑边 + 硬阴影` 卡片，顶部一行 = 图标方块 + 分类胶囊 + 右侧日期等宽字；右下角超大 `01 / 02` 编号（`rgba(10,10,10,.08)`，只作纹理不抢戏）。

> 曾试过做成「一棵树」（SVG 树干树冠 + 8 片可点叶子 + 右侧详情卡），2026-10-27 按用户要求整体回退到双卡布局。
> 那版实现归档在 `src/_legacy-css/FuturePlan.tree.tsx.disabled`，需要时可以参考，但**不要再默认启用**。


### 06.10 Closing + Footer

黑底：

- 收尾标语用**荧光绿大字**，可保留现有的手绘笔刷标题图（`closing-headline-brush.png`）
- 中央大按钮：荧光绿底 + 3px 黑边 + `8px 8px 0 纸白`，悬停位移
- 底部邮箱等宽字
- Footer：黑底，顶部 `3px` 荧光绿线，左侧 `JY.LU` 荧光绿粗体，右侧信息 + 邮箱按钮

**舞台（`.closing-stage`）必须用流式布局，禁止绝对定位。** 结构为两行 grid：

| 行 | 内容 | 规则 |
|---|---|---|
| 1 | `.closing-type`（笔刷标题图） | `1fr`，居中；标题图 `width: min(52vw, 660px)`、`height: auto` |
| 2 | `.closing-foot` | `auto`；内部 `minmax(0,1fr) auto minmax(0,1fr)` = 左注 \| 按钮 \| 右注，`align-items: center` |

- `min-height` 只作下限（桌面 520 / `≤820px` 480 / `≤520px` 400），**高度必须由内容撑开**，行距用 `gap`。
- ⚠️ 历史坑：早期版本把标题图 `position: absolute` 钉在顶部、舞台写死 `min-height: 520px`，宽屏下标题图（660px 宽 → 386px 高）+ 78px 上边距会直接压到按钮上（1440px 实测重叠 252×53px）。改为流式后各断点重叠面积均为 0。
- 标题图原本的 `margin-top: 78px` 是给绝对定位用的补偿值，已删除 —— **不要加回来**。
- 响应式：`≤620px` 右侧文案隐藏、底部行收成单列居中堆叠；`≤520px` 两侧文案全部隐藏，只剩按钮。

### 06.11 联系弹层

左：荧光绿底色块 + 手绘人像（黑描边）
右：`LET'S TALK` kicker → 荧光绿 H2 高亮 → 姓名 → 手机/邮箱两张 `2px 黑边` 卡，悬停位移

---

## 07 动效规范

| 场景 | 时长 | 缓动 | 说明 |
| --- | --- | --- | --- |
| 按钮/卡片悬停 | 180ms | `ease` | 位移 + 阴影同步变化，**不加透明度** |
| 元素入场 `[data-reveal]` | 700ms | `power3.out` | `y: 36 → 0`，`autoAlpha: 0 → 1` |
| 首屏标题逐行入场 | 800ms | `power3.out` | `yPercent: 110 → 0`，stagger 0.08 |
| Tab 内容切换 | 260ms | `ease` | `y: 14 → 0` + 淡入 |
| 跑马灯 | 22s | `linear` | 无限循环，`translateX(0 → -50%)` |

**统一原则**：动效只做"位移 + 出现"，不做"模糊 / 缩放 / 光晕"。新粗野主义的动效是**硬的**。

`prefers-reduced-motion: reduce` 时全部关闭。

---

## 08 响应式规则

| 断点 | 变化 |
| --- | --- |
| `> 1180px` | 完整布局，Header 三栏 |
| `≤ 1180px` | 导航字距收窄，Hero 主标降到 `6.4vw`，项目卡 2 列 |
| `≤ 1080px` | Hero 右侧贴纸隐藏，About 网格 `1fr .82fr` |
| `≤ 900px` | **作品集不再渲染 3D 书**，降级为纵向章节列表（`useMediaQuery` 决定，不做 DOM 双份；否则视频会翻倍加载） |
| `≤ 820px` | 导航收起为全屏菜单；Hero 单列（文上图下）；About 单列；时间线竖线靠左；规划单列 |
| `≤ 620px` | 卡片内边距降到 16px，硬阴影从 6px 降到 4px（小屏阴影过大显得拥挤） |
| `≤ 520px` | 主标 `12.5vw`，贴纸与装饰编号隐藏，收尾页侧栏隐藏 |

**小屏阴影规则**：`≤620px` 时 `--nb-shadow` 降为 `4px 4px 0`，描边降为 `2.5px`，防止"框比内容大"。

---

## 08.5 性能预算（2026-10 实测后加的硬规则）

这站是「静态画册 + 7 个 3D 舞台」，卡顿不会来自框架，只会来自**图片体积**和**布局抖动**。

### 图片

| 规则 | 说明 |
| --- | --- |
| 一律 WebP | 29.3 MB PNG/JPG → **1.5 MB WebP**（95%↓）。首屏资源从 7.6 MB 降到 ~0.5 MB |
| 最长边 = 显示尺寸 × 2 | 例：`jnu` 校徽在卡头只显示 108×64，源图 1254² / 1.2 MB → 288² / 16 KB |
| 作品集只用缩略图 | 书页里 `src` 走 `xxx.thumb.webp`（20–50 KB），`href` 仍指原图 —— 「查看原图」不受影响 |
| 上屏图给 `fetchPriority="high"`，其余 `loading="lazy" + decoding="async"` | 首屏人像必须及时到，其余延后 |

**改图流程**：`shots/optimize-images.py`（Pillow，最长边 + 质量见脚本里的 `JOBS` 表），跑完把引用切到 `.webp` / `.thumb.webp`。

### 布局抖动（比图片更隐蔽）

| 反模式 | 正确做法 |
| --- | --- |
| 在 `scroll` / `pointermove` 里调 `getBoundingClientRect()` | 缓存矩形，只在 `resize` / 切换元素时重算；事件合并到每帧一次（rAF） |
| 改了 `transform` 后再读同一元素的 rect | 会触发同步重排 —— 卡片倾斜只在「换卡」时读一次 |
| 场景离屏还在监听滚动 | `running` 为假时直接跳过，连 rAF 都不排 |

`useThreeStage` 现在：滚动/指针都 rAF 合并 + 复用缓存 rect + 离屏不测；`TiltDirector` 同理。

### WebGL

- **不要写 `powerPreference: 'high-performance'`**：7 个舞台会把独显一直叫醒，笔记本上更卡更烫，用 `default`
- `setPixelRatio` 上限 **1.75**（舞台最大 190px，2 倍 DPR 只换来填充率）
- 离屏 / 标签页隐藏一律停 rAF（`IntersectionObserver` + `visibilitychange`），这是既有约定，别删

---

## 09 禁止项（Do Not）

- ❌ 低对比灰色（`#999` 及更浅的一律不用作正文）
- ❌ 柔和渐变（按钮、卡片、文字渐变全部禁用）
- ❌ 玻璃拟态 / 毛玻璃 / `backdrop-filter`
- ❌ 复杂纹理、噪点、光斑
- ❌ 精致柔光（`blur` 阴影、光晕描边）
- ❌ 与主题无关的装饰性 3D（**v3.0 起修订**：允许 3D，但必须遵守 [13 · 3D 层规范](#13-3d-层规范)，即平涂色块 + 粗描边，禁止渐变、柔光、玻璃质感的 3D）
- ❌ 过弱边框（1px 浅灰线）
- ❌ 过于平淡的信息层级（标题和正文看不出主次）
- ❌ 超过 3 种强调色同屏
- ❌ 用强调色做正文颜色

---

## 10 设计令牌（CSS 变量）

```css
:root {
  /* ---- 色彩 ---- */
  --nb-ink: #0A0A0A;
  --nb-paper: #F3F2EC;
  --nb-paper-2: #FFFFFF;
  --nb-paper-3: #E6E4DB;
  --nb-lime: #C6F53C;
  --nb-lime-deep: #A5D620;
  --nb-yellow: #FFD23F;
  --nb-pink: #FF5C8A;
  --nb-blue: #4DA3FF;
  --nb-orange: #FF8A3D;
  --nb-muted: #6B6B63;

  /* ---- 描边 ---- */
  --nb-stroke: 3px solid var(--nb-ink);
  --nb-stroke-thin: 2px solid var(--nb-ink);
  --nb-stroke-light: 3px solid var(--nb-paper);

  /* ---- 圆角 ---- */
  --nb-radius-lg: 24px;
  --nb-radius: 18px;
  --nb-radius-sm: 12px;
  --nb-pill: 999px;

  /* ---- 硬阴影 ---- */
  --nb-shadow-sm: 4px 4px 0 var(--nb-ink);
  --nb-shadow: 6px 6px 0 var(--nb-ink);
  --nb-shadow-lg: 10px 10px 0 var(--nb-ink);
  --nb-shadow-lime: 8px 8px 0 var(--nb-lime);
  --nb-shadow-paper: 8px 8px 0 var(--nb-paper);

  /* ---- 字体 ---- */
  --nb-font-display: Inter, "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --nb-font-body: var(--nb-font-display);
  --nb-font-mono: ui-monospace, SFMono-Regular, Consolas, monospace;
  --nb-font-hand: "WenYue XinQingNian Local", "Microsoft YaHei", sans-serif;

  /* ---- 节奏 ---- */
  --nb-header: 74px;
  --nb-section-y: clamp(88px, 10vw, 152px);
  --nb-shell: 1320px;
}
```

---

## 11 从 v1.0 到 v2.0 的迁移映射

| 旧（深色玻璃拟态） | 新（新粗野主义） |
| --- | --- |
| `--page: #0e1114` | `--nb-paper: #F3F2EC`（Projects/Closing 例外用 `--nb-ink`） |
| `--surface: #171d22` | `--nb-paper-2: #FFFFFF` |
| `--line: rgba(233,242,247,.13)`（1px 半透明） | `--nb-stroke: 3px solid #0A0A0A` |
| `--ink: #f3f6f5`（浅字） | `--nb-ink: #0A0A0A`（深字） |
| `--muted: #99a5ad` | `--nb-muted: #6B6B63` |
| `--accent: #4db6ff` | `--nb-lime: #C6F53C` |
| `--radius: 18px` | 保留 `18px`，新增 `12px` / `24px` / `999px` 三档 |
| `box-shadow: 0 30px 90px rgba(0,0,0,.24)` | `--nb-shadow: 6px 6px 0 #0A0A0A` |
| `backdrop-filter: blur(22px)` | **删除**，改实色 `#F3F2EC` |
| `--font-display-hand` 用于所有 H1–H4 | 移到贴纸点缀；标题改用 900 字重无衬线 |
| `transition: transform 260ms cubic-bezier(.16,1,.3,1)` | `180ms ease`，位移 3px + 阴影 6→9px |
| `border-radius: 999px` 用于所有按钮 | 按钮改 `12px`，仅标签/胶囊保留 `999px` |
| 每段样式散落在 22 个补丁 CSS | 全部收敛到 `src/neo-brutalism.css` 单文件 |

---

## 12 文件结构与实现约定

```
src/
├── index.css              # 基础层：Tailwind 导入 + reset + 全局字体（不写主题）
├── neo-brutalism.css      # ★ 唯一主题层：令牌 + 全站组件样式（最后导入，优先级最高）
├── _legacy-css/           # v1.0 遗留样式，仅作回溯，不再被导入
├── main.tsx               # 导入顺序：index.css → neo-brutalism.css
├── data.ts                # 内容数据（文案改动优先改这里）
├── three/                 # ★ 3D 层：引擎、材质、几何体、舞台 hook（详见第 13 章）
│   ├── tokens.ts          # 色板镜像（与 CSS :root 一一对应）
│   ├── materials.ts       # 平涂材质 + 反向外壳描边 + 场景光照
│   ├── models.ts          # 程序化建模：星形 / 方块 / 环 / 纽结 / 镜头 / 像素立体字
│   └── useThreeStage.ts   # 舞台：renderer / 相机 / 尺寸 / 可见性 / 性能卫兵
└── components/
    ├── …                  # 各区块组件，使用语义化类名，不依赖 Tailwind 工具类
    ├── Hero3D.tsx         # ┐
    ├── AboutBadge.tsx     # │ 轻量外壳：只占位 + Suspense，不 import three
    ├── Section3D.tsx      # │
    ├── Folio3D.tsx        # │
    ├── ClosingStar.tsx    # ┘
    ├── Hero3DScene.tsx    # ┐
    ├── MonogramScene.tsx  # │ 重型场景：import three，走异步 chunk
    ├── ArrayScene.tsx     # │（ladder / tower / steps 三种排布）
    ├── FolioScene.tsx     # │ 作品集的书本模型（封面 + 纸芯 + 可翻内页）
    └── ClosingStarScene.tsx # ┘
```

**约定**：
1. **改主题只改 `neo-brutalism.css`**。不要再新增"补丁 CSS"文件。
2. **改文案只改 `data.ts`** 或 `*2026.ts` 注入脚本。
3. 组件加样式时，类名以 `nb-` 前缀命名新元素，历史类名（`.hero-word`、`.project-poster` 等）作为动效钩子保留，不要重命名。
4. 新增颜色必须先在 `:root` 里加令牌，不要在组件里写裸色值；3D 侧同步改 `src/three/tokens.ts`。
5. **3D 组件一律拆成「轻量外壳 + 异步场景」两个文件**（`Xxx3D.tsx` / `Xxx3DScene.tsx`），外壳不许 import three。

---

## 13 3D 层规范

### 13.1 定位：3D 是同一套语言的第三个维度

新粗野主义的视觉语言是**平涂色块 + 粗黑描边 + 硬边投影**。3D 层不引入新的视觉语汇，只是把这三点在三维空间里重做一遍：

| 2D 语言 | 3D 对应实现 | 代码位置 |
| --- | --- | --- |
| `background: 纯色` | `MeshLambertMaterial({ flatShading: true })` —— 每个三角面一个纯色，形成色块化切面 | `three/materials.ts` |
| `border: 3px solid #0A0A0A` | **反向外壳描边**：复制几何体翻成 `BackSide`、放大 3–6%，在物体外缘生成一圈实色轮廓 | `createOutlined()` |
| `box-shadow: 6px 6px 0 #0A0A0A` | `filter: drop-shadow(7px 8px 0 #0A0A0A)` 挂在画布容器上，整层物体共享一道硬阴影 | `.nb-3d--hero` |
| 黑底区块的浅色阴影 | 黑底区块上的描边改用 `--nb-paper-2` / `--nb-lime` | `.nb-3d--closing` |

**为什么不用 `LineSegments` 做描边**：WebGL 的 `linewidth` 在绝大多数平台被忽略、恒为 1px，画不出"粗"描边。反向外壳是唯一稳定可控的做法。

### 13.2 必须遵守

1. **只用平涂 + 描边**。禁用 `MeshStandardMaterial` / `MeshPhysicalMaterial`（金属度、粗糙度、环境贴图），禁用任何 `blur`、辉光、后期处理、玻璃质感。
2. **场景不写渐变**。不铺背景色、不做雾效、不加环境光贴图（`envMap`）。舞台背景交给 CSS。
3. **同屏强调色 ≤ 3**。与 2D 同一条纪律：首屏是「荧光绿 + 柠檬黄」两色；收尾是「荧光绿 + 纸白」。

4. **暗底换浅描边**。黑底区块上的物体，描边用纸白或荧光绿；浅底区块上用墨黑。
5. **几何体必须程序化生成**。不导入 glTF/OBJ 文件 —— 一是为了体积（keep it light），二是为了数学上干净的硬边切面。
6. **动效是硬的**。只做旋转、位移、呼吸式浮动，缓动接近线性或 `power`。禁止弹簧回弹、模糊、缩放爆闪。

### 13.3 布点一览

**每个导航页都有一件 3D 陈列 + 一条与之联动的交互**，这是 v3.1 的硬要求：不允许出现「页面上一块 3D 都没有」，也不允许出现「3D 和内容毫无关系的纯装饰」。

| 区块 | 组件 | 立体物 | 联动交互 |
| --- | --- | --- | --- |
| 首屏 Hero | `Hero3D` + `Hero3DScene` | 六角星（荧光绿）+ 方块（柠檬黄），挂在人像色块边缘 | 鼠标视差 + 滚动下沉 |
| 关于 About | `AboutBadge` + `MonogramScene` | 立方体拼的「JY」立体字 | 悬停身份卡 → 徽标加速自转并放大；卡片同时被"拿起来" |
| 经历 Experience | `Section3D layout="ladder"` + `ArrayScene` | 4 个方块左右交替上行（成长梯） | 悬停某段经历 → 对应方块抬起并变柠檬黄；切 Tab 归位 |
| 项目 Projects | `Projects.tsx` 的 `.nb-deck` | CSS 3D 卡片转盘（见 13.8） | 拖动旋转 / 点侧卡 / 方向键 |
| 作品集 Portfolio | `Folio3D` + `FolioScene`，主体是 CSS 3D 书页（见 13.10） | WebGL 书本模型（后封 + 纸芯 + 三张内页 + 封面）：封面以书脊为轴，章节切换时整本张开再合上 | 指针视差 + **翻页脉冲**（章节变化 → 封面与内页依次翻开，扇面错开角度）；真正翻页的是 CSS 3D 书页 |
| 优势 Advantages | `Section3D layout="tower"` + `ArrayScene` | 三层递减的层板塔 | 悬停某类技能 → 对应层抬起并变柠檬黄 |
| 规划 FuturePlan | `Section3D layout="steps"` + `ArrayScene` | 递升的阶梯方块 | 悬停某条规划 → 对应台阶抬起并变柠檬黄 |
| 收尾 Closing | `ClosingStar` + `ClosingStarScene` | 两枚五/六角星标，衬在笔刷标题后方 | 慢速自转 + 指针视差 |

**统一摆放规则**：`Experience / Advantages / FuturePlan` 的陈列位都贴区块标题行最右侧（`.nb-head-orn`，`position: absolute; right: 0`），标题行本身放开 `max-width`、改由内层 `.nb-head-core` 收窄 —— 否则陈列位会贴到窄标题框上、压住大标题。

`About` 是唯一不走"区块角落"的：徽标钉在**身份卡的右上角**（`.identity-badge`），像证件上那枚全息贴纸。它必须是 `.identity-card` 的子元素 —— 这样才会跟着卡片的 `-1.5°` 一起倾斜，也才能让"悬停卡片 → 徽标加速"的因果在视线范围内成立。代价是尺寸只能到 ~134px，所以像素字要比大尺寸时更紧（`models.ts` 里的字距与 `plate` 底板都是为这个小尺寸服务的：没有底板，十几个方块在透视下会散开）。

`Portfolio` 的标题行本来就是 flex，镜头直接作为中间子项插入（`.nb-portfolio-orn`）。

`≤1080px` 时全部陈列位隐藏（窄屏没有它们的容身之处），3D 只剩首屏、转盘和收尾。

**首屏摆放约束**（改位置前必读）：`fit=5` 时可视范围约 `x∈[-2.5, 2.5]`、`y∈[-2.7, 2.7]`，物体中心到画布边缘必须留出自身半径，否则会被裁切；右上被粉色贴纸、左下被黄色贴纸遮挡，不要往那放。

### 13.4 图层与遮挡

```
首屏：色块(0) < 3D 画布(1) < 人像(2) < 贴纸
收尾：3D 画布(0) < 笔刷标题 / 按钮(1)
```

首屏的 3D 是**夹在色块和人像中间**的，所以装置会被手绘人像自然遮挡，看起来像"嵌在构图里"而不是浮在页面上 —— 这是刻意的，别把画布提到人像之上。

### 13.5 性能与可访问性（硬要求）

| 约束 | 实现 |
| --- | --- |
| 设备像素比上限 2 | `renderer.setPixelRatio(Math.min(dpr, 2))` |
| 离屏暂停 | `IntersectionObserver`（`rootMargin: 120px`）→ 停 rAF |
| 切后台暂停 | `visibilitychange` → 停 rAF |
| 减少动态 | `prefers-reduced-motion` 下不跑循环，只渲染静态帧；**resize 后必须补一帧**（`renderer.setSize` 会清空画布） |
| 卸载清理 | 逐个 `dispose()` 几何体与材质，移除画布与监听器 |
| 降级 | WebGL 创建失败时静默跳过，写入 `data-webgl="unsupported"`，不报错、不留白块 |
| 首屏包体 | three.js 只在异步 chunk 里 —— 见下一节 |

### 13.6 代码分割约定

three.js 约 550 KB（gzip 142 KB），**绝不允许进首屏包**。做法是每个 3D 组件拆成两个文件：

```tsx
// Hero3D.tsx —— 轻量外壳：只有 div + Suspense，不 import three
const Hero3DScene = lazy(() => import('./Hero3DScene'));
export default function Hero3D() {
  return (
    <div className="nb-3d nb-3d--hero" aria-hidden="true">
      <Suspense fallback={null}><Hero3DScene /></Suspense>
    </div>
  );
}
```

要点：

- 外壳负责**占位与图层**（`.nb-3d` 绝对定位铺满父容器），所以异步加载不会引起布局跳动。
- 场景挂载点 `.nb-3d-host` 默认 `opacity: 0`，加载完成后由 hook 打上 `data-ready="true"` 再淡入。

### 13.7 新增一件 3D 物体

```ts
import { createStar } from '../three/models';
import { PALETTE } from '../three/tokens';

const star = createStar({
  tips: 6,                      // 角数
  outer: 1, inner: 0.44,        // 外/内半径，比值决定"胖瘦"
  depth: 0.36, bevel: 0.07,     // 挤出深度与倒角（倒角是高级感的来源）
  color: PALETTE.lime,          // 平涂色
  outline: 'ink',               // ink | paper | lime | none
});
star.position.set(-1.52, 1.62, 0.5);
star.scale.setScalar(0.62);
rig.add(star);
```

现成几何体：`createStar`（挤出星形）、`createBlock`（方块）、`createKnot`（环面纽结）、`createRing`（细圆环）、`createLens`（相机镜头）。要加新形状就在 `three/models.ts` 里加一个 builder，返回 `createOutlined(geometry, {...})`，不要在各个组件里散着写几何体代码。

### 13.8 项目 3D 转盘（CSS 3D，不走 WebGL）

**这一点必须说清楚：项目卡片用的是 CSS 3D，不是 three.js。** 原因有三条：

1. 卡片要放真实图片、标题、标签和可点链接 —— HTML 的排版与清晰度，WebGL 贴图给不了；
2. 卡片内容随时会改（改 `data.ts` 就行），WebGL 方案得为每张图做纹理；
3. 4 张卡片、4 个 transform，CSS 方案的开销几乎为零，也不用背 three.js 的体积。

实现要点（`Projects.tsx` + `.nb-deck`）：

| 关注点 | 做法 |
| --- | --- |
| 透视 | 外层 `.nb-deck-wrap` 给 `perspective: 1900px`，卡片自身做 `rotateY` |
| 环形取模 | `delta = ((i - pos + n/2) % n + n) % n - n/2`，所以 4 张卡能无限往任一方向转 |
| 位置 | `translateX(delta × 0.68 × 卡片宽) translateZ(-|delta| × 300) rotateY(-delta × 34°)` |
| 阻尼 | `pos += (target - pos) × 0.16`，拖拽时直接跟手，松手吸附到整数 |
| 侧卡压暗 | 每张卡里盖一层 `.nb-deck-scrim`，透明度写进 `--deck-dim`（正中为 0） |
| 层级 | `z-index = 100 - |delta| × 10`，正中那张永远在最上 |
| 硬阴影 | 正中 `16px 16px 0 荧光绿`；侧卡 `6px 6px 0 荧光绿深色`（影子不吃蒙层，不收会过亮） |
| 间距 | 按卡片**实际宽度**算，不能写死像素 —— 卡片宽度是 `clamp()` |

**禁止**：给转盘卡片再加 `[data-tilt]`。两套逻辑都会写内联 `transform`，会互相覆盖到抖动。

#### 13.8.1 点击切卡（命中与事件的三个硬约束）

转盘要求「**点哪张就转到哪张**」。这套交互踩过两个坑，改之前务必先读完：

| 约束 | 原因 | 正确做法 |
| --- | --- | --- |
| **`.nb-deck` 必须 `pointer-events: none`** | 侧卡被 `translateZ(-300px)` 推到容器平面**之后**，在同一个 `preserve-3d` 上下文里容器会抢先命中 —— 实测侧卡投影区域 **49 个采样点里 0 个命中卡片** | 容器不参与命中，`.nb-deck-card` 自己 `pointer-events: auto`（`touch-action` 不可继承，卡片上要重设 `pan-y`）；空白区域的拖动交给外层 `.nb-deck-wrap` 接 |
| **按下时禁止 `setPointerCapture`** | 指针一被捕获，`pointerup` / `click` 的 target 全部改写成容器 → 卡片自己的 `onClick` 永远不触发（实测 target 从 `poster-shade` 变成 `nb-deck`） | **先判断再捕获**：位移超过 `4px` 才 `setPointerCapture`，纯点击全程不捕获，click 正常落在卡片上 |
| **切卡逻辑放在容器的捕获阶段** | 指针捕获、拖动后残留的 click 都会让「点在哪张卡」失真 | 在 `.nb-deck` 的 `onClickCapture` 里用 `event.target.closest('.nb-deck-card')` 取卡序号，兜底用 pointerdown 时记下的 `downIndex`；`moved` 为真时直接吞掉那次 click |

行为约定：点侧卡 → 该卡转到正中；点正中卡 → 不拦截，卡内箭头链接照常可点；拖动结束 → 不额外切卡。

### 13.9 内容联动：focusRef 约定

3D 陈列**不许自嗨**。每件立体物都要能回应页面上的一条内容，做法统一成一个约定：

```tsx
// 区块组件里：一个 ref 存「当前聚焦的第几条内容」
const focusRef = useRef<number | null>(null);

<article onPointerEnter={() => { focusRef.current = idx; }}
         onPointerLeave={() => { focusRef.current = null; }} />

<Section3D layout="ladder" count={experiences.length} focusRef={focusRef} />
```

```ts
// 场景里：每帧读 ref，朝目标值阻尼靠拢
const wanted = focusRef.current === index ? 1 : 0;
item.active += (wanted - item.active) * (1 - Math.exp(-delta * 9));
item.group.position.y = item.base.y + item.active * lift;   // 抬起
item.fill.color.copy(LIME).lerp(YELLOW, item.active);       // 变柠檬黄
```

为什么用 ref 而不是 state：

- 场景在 `requestAnimationFrame` 里跑，本来就不走 React 渲染；用 ref 传值不会触发任何重渲染；
- 鼠标在几十张卡之间划过去也不会产生 React 更新；
- 场景是异步 chunk，把 ref 当 prop 传进去，外壳组件依然不需要 import three。

**对应关系必须是一一对应的**：`count` 要等于内容条数，`index` 要等于内容顺序。改内容数量时同步改 `count`，否则会多出或少掉一格。

### 13.10 作品集书页（CSS 3D 翻书）

书页同样是 CSS 3D，**只有书本模型走 WebGL**（`FolioScene`）。分工的判断标准见 13.11：书页里是文字和视频，必须清晰、可选中、可点。

结构（`Portfolio.tsx` 的 `.folio-*`）：

| 位置 | 是什么 | 变形 |
| --- | --- | --- |
| `.folio-leaf--base.is-left` | 静止左页 = 第一章扉页 | 不动 |
| `.folio-leaf--base.is-right` | 静止右页 = 封底（被所有叶片盖住） | 不动 |
| `.folio-leaf--turn` × 4 | 可翻叶片：正面 = 本章作品页，背面 = 下一章扉页 | `transform-origin: left center`（书脊），`rotateY(-180deg)` 即翻过来 |

- 叶片正反两面都是 `.folio-face` 且 `backface-visibility: hidden`；背面再 `rotateY(180deg)` 校正镜像
- **z-index 必须两套**：未翻 `total - i`（0 号在最上，盖住右页）；翻过 `total + i + 1`（3 号在最上，压在左页最上）
- 跨页跳转（点书签）要给每片叶子写 `transition-delay`，`120ms` 递增 —— 才会「一页一页翻过去」而不是整叠一起转
- 书脊阴影写在 `.folio-face::before`：右页压左边、左页压右边；**背面已绕 180°，所以阴影要放 right**

**四个必须记住的坑**

1. **正面必须给自己一个 3D 变换**：叶片只靠父级 `preserve-3d` 躺着时，Chrome **不会**对 `.folio-face--front` 应用 `backface-visibility: hidden`，翻过去的正面会透出来，和背面叠在一起 —— 现象是左页出现**倒置的照片 / 视频框压住章节标题**。给正面加 `transform: translateZ(0)`（视觉无位移）即可；背面本来就有 `rotateY(180deg)`，天然参与 3D，所以只有正面出问题。
2. **翻页手势不能起手在 `<video>` 上**：原生控件会吞掉 pointerdown/up，拖动进度条会被误判成翻页。守卫只排除 `video, input, button`，**不能排除 `<a>`** —— 作品页几乎全是链接，排掉就等于滑动不可用。
3. **必须拦原生拖拽**：`.folio-stage` 上加 `onDragStart={preventDefault}` + `user-select: none` + `img { -webkit-user-drag: none }`。否则在链接/图片上拖一下会触发 HTML5 drag，浏览器随即打断指针事件抛一串 `pointerleave`，滑动直接失效（这个坑排查了一轮）。
4. **滑动之后的那次 click 要吞掉**：`onClickCapture` 里检查 `gestureRef.swiped`，命中就 `preventDefault + stopPropagation`，否则拖完手一松会顺手打开某个作品链接。

**验证方法（别靠肉眼）**：翻到每一跨页，用 `document.elementFromPoint(左页中心点)` 看命中的是哪个 `.folio-face` —— 左页必须是 `--back`、右页必须是 `--front`；命中 `--front` 就是又漏了第 1 条。

### 13.11 为什么不是每页都上 WebGL

`Projects` 用 CSS 3D、`Portfolio` 的书页用 CSS 3D，而不是全站三.js —— 判断标准是**「这一页的主角是物体还是内容」**：

- 主角是物体（首屏装置、区块陈列、收尾星标、作品集那本模型书）→ WebGL，因为要真的建模、要硬边光照；
- 主角是内容（项目卡、书页里的作品照片与视频）→ CSS 3D，因为文字和图片必须保持清晰、可选中、可被读屏软件读到。

两种情况视觉语言一致（平涂 + 粗描边 + 硬阴影），所以放在同一个站里不会割裂。
