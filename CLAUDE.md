# HEZHE Blog - 个人博客网站

## 项目概述

一个中英双语的个人博客网站，基于浅色极简设计。

## Design Context

### 用户
- **目标读者**: AI/教育从业者
- **使用场景**: 学习AI应用、Prompt工程、探索教育与AI的融合
- **期望**: 获取有深度的内容，同时有舒适的阅读体验

### 品牌个性
- **关键词**: 极简、精致、专业
- **语气**: 专业但亲和，理性但有温度
- **情感目标**: 让读者感受到这是一个值得信赖的学习资源

### 美学方向
- **参考**: Medium 风格 — 字体醒目、强调标题、阅读体验优先
- **主色调**: 浅色背景 (#FAFAFA) + 黑色强调 (#1A1A1A)
- **字体**: 像素字体 Logo (Press Start 2P) 增添独特性，正文使用衬线/无衬线混排
- **布局**: 左侧固定导航 + 右侧内容区，简洁清晰

### 设计原则
1. **内容优先**: 文字是最重要的元素，排版服务于阅读
2. **克制装饰**: 除非必要，不添加装饰性元素
3. **双语自然**: 中英文并存但不突兀，各有层次
4. **加载即用**: 静态生成保证速度，无需客户端渲染等待
5. **一致体验**: 所有页面保持统一的视觉语言

## 技术栈

- **框架**: Astro (静态网站生成器)
- **部署**: Vercel / Netlify
- **写作**: Obsidian (Markdown)
- **样式**: 纯 CSS (CSS Variables)

## 设计特点

- 浅色背景 (#FAFAFA)
- 黑色强调 (#1A1A1A)
- 像素字体 Logo (Press Start 2P)
- 左侧固定 Sidebar
- 中英双语展示

### 页面结构

1. **Sidebar** - 固定左侧导航
2. **Hero** - 标题 + 代码块装饰
3. **Featured Posts** - 精选文章网格
4. **Latest Posts** - 最新文章列表
5. **About** - 关于作者
6. **CTA** - 社交链接
7. **Footer** - 页脚

## 功能需求

- [x] 文章列表 / Latest Posts
- [x] 文章详情页 / Article Detail
- [x] 分类/标签 / Categories & Tags
- [ ] 阅读量统计 (已禁用)
- [x] 站点地图 / Sitemap
- [x] SEO 优化

## 部署

### 线上地址

- **网站**: https://markhzz.com
- **GitHub**: https://github.com/hertzhzzz/hezhe

### 部署流程

1. 确保已登录 GitHub CLI (`gh auth login`)
2. 初始化 Git（如未初始化）:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   ```
3. 创建 GitHub 仓库并推送:
   ```bash
   gh repo create hezhe --public --source=. --description "HEZHE - Personal Blog" --push
   ```
4. 使用 Vercel CLI 部署:
   ```bash
   vercel --prod --yes
   ```
5. 后续更新只需推送代码到 GitHub，Vercel 会自动部署:
   ```bash
   git add .
   git commit -m "feat: update"
   git push
   ```

### 域名绑定

如需绑定自定义域名，在 Vercel Dashboard 中 Settings → Domains 添加即可。

## 写作流程

1. Obsidian 写 Markdown
2. 推送到 GitHub
3. 自动部署到网站

## 待实现功能

### 阅读量统计 (可选)

如需启用，需：
1. 创建 Supabase 项目
2. 在项目根目录创建 `.env` 文件：
   ```
   PUBLIC_SUPABASE_URL=your_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
3. 取消 `src/pages/posts/[slug].astro` 中 ViewCounter 的注释
4. 在 Supabase 中创建 `page_views` 表和 RPC 函数

## 配置文件

- `src/data/profile.json` - 网站配置（作者信息、社交链接等）
- `src/styles/global.css` - 全局样式
