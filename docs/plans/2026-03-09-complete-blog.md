# HEZHE Blog 完整实现设计文档

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create implementation plan.

**Goal:** 将 HEZHE 博客从静态占位内容完善为功能完整的动态博客系统

**Architecture:**
- 使用 Astro Content Collections 存储和管理文章
- 客户端 JavaScript + Supabase 实现阅读量统计
- 静态生成 (SSG) 模式，部署到 Vercel

**Tech Stack:**
- Astro 4.x (静态网站生成)
- Supabase (阅读量统计)
- Playwright (测试)
- CSS Variables (样式)

---

## 1. 首页动态渲染

### 当前问题
- Featured/Latest 文章是静态 HTML，未从 content collection 读取
- 文章卡片没有链接到实际页面

### 解决方案
- 从 `src/content/posts` 读取所有文章
- Featured: 获取 `featured: true` 的文章，最多 4 篇
- Latest: 按 `pubDate` 降序排列，显示最新 3 篇
- 为每个卡片添加 `<a>` 链接到 `/posts/{slug}`

### 文件变更
- `src/pages/index.astro` - 动态获取并渲染文章

---

## 2. 文章链接功能

### 当前问题
- `featured-card` 没有包裹 `<a>` 标签
- 用户无法点击跳转到文章详情页

### 解决方案
- 将 `<article class="featured-card">` 包裹在 `<a href="...">` 中
- 或在 card 内部添加链接到标题

---

## 3. /articles 列表页

### 当前问题
- Sidebar 导航有 `/articles` 链接
- 但页面不存在 (404)

### 解决方案
- 创建 `src/pages/articles.astro`
- 显示所有文章列表
- 支持分页 (每页 10 篇)

### 页面结构
- 页面标题: "所有文章 / All Posts"
- 文章列表: 日期 + 标题 (中英) + 分类标签

---

## 4. /about 关于页

### 当前问题
- Sidebar 导航有 `/about` 链接
- 但页面不存在 (404)

### 解决方案
- 创建 `src/pages/about.astro`
- 显示作者信息

### 页面结构
- 大头像
- 名称 + 角色
- 个人简介 (中英双语)
- 技能/技术栈列表

---

## 5. 阅读量统计 (Supabase)

### 架构
```
用户访问文章
    ↓
浏览器加载页面 + ViewCounter 组件
    ↓
JavaScript 调用 Supabase REST API
    ↓
Supabase 执行 increment_views() 函数
    ↓
返回新计数，浏览器显示
```

### 实现步骤

1. **Supabase 项目设置**
   - 创建 Supabase 项目 (supabase.com)
   - 获取 URL 和 anon key

2. **数据库**
   - 创建 `page_views` 表 (slug, views, created_at, updated_at)
   - 创建 `increment_views()` 原子递增函数
   - 配置 Row-Level Security (RLS)

3. **环境变量**
   - `.env` 文件: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`
   - Vercel: 添加到环境变量

4. **组件开发**
   - 创建 `src/components/ViewCounter.astro`
   - 客户端 JavaScript 调用 API
   - sessionStorage 防止刷新作弊

5. **集成**
   - 在 `posts/[slug].astro` 中使用 ViewCounter 组件

---

## 6. 站点地图 (Sitemap)

### 实现内容
- `src/pages/sitemap-index.xml.ts` - sitemap index
- `src/pages/sitemap.xml.ts` - 文章页面 sitemap
- `public/robots.txt` - robots.txt

---

## 7. 完整 SEO 优化

### 当前已有
- 基础 meta tags
- Open Graph
- Twitter Card
- RSS feed link
- Favicon

### 需要添加
- Canonical URLs
- JSON-LD 结构化数据 (Article, Person)
- sitemap.xml
- robots.txt

---

## 8. 项目结构整理

### 操作
- 删除 `layouts/reference-design.html` (已不使用)
- 更新 `CLAUDE.md` 文档，标记已完成的功能

---

## 优先级排序

| 优先级 | 功能 | 预计工作量 |
|--------|------|------------|
| P0 | 首页动态渲染 | 1h |
| P0 | 文章链接功能 | 0.5h |
| P0 | /articles 列表页 | 1h |
| P0 | /about 关于页 | 1h |
| P1 | Supabase 阅读量统计 | 2h |
| P1 | 站点地图 | 1h |
| P1 | SEO 优化 | 1h |
| P2 | layouts 整理 + CLAUDE.md | 0.5h |

---

## 测试计划

### Playwright 测试用例
1. 首页文章动态加载 ✓ (需更新测试)
2. 点击文章卡片跳转
3. /articles 页面存在
4. /about 页面存在
5. 阅读量组件显示
6. sitemap.xml 可访问
7. 无控制台错误
