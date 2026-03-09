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

1. Vercel: 推送 GitHub 自动部署
2. 域名: 解析到 Vercel

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
