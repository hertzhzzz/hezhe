# HEZHE Blog - 个人博客网站

## 项目概述

一个中英双语的个人博客网站，基于浅色极简设计。

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

- **网站**: https://hezhe.vercel.app
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
