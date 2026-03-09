# HEZHE Blog Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 建立一个基于 Astro 的中英双语个人博客网站，采用 Linear 风格深色设计

**Architecture:** 使用 Astro 静态网站生成器，从 Obsidian 读取 Markdown 文件，输出静态 HTML

**Tech Stack:** Astro, CSS, Vercel, Obsidian (写作)

---

## 任务总览

| 任务 | 描述 |
|------|------|
| 1 | 初始化 Astro 项目 |
| 2 | 配置项目结构 |
| 3 | 实现布局组件 |
| 4 | 实现首页 |
| 5 | 实现文章详情页 |
| 6 | 添加分类/标签功能 |
| 7 | 添加阅读量统计 |
| 8 | SEO 优化 |
| 9 | 配置部署 |

---

## Task 1: Initialize Astro Project

**Files:**
- Create: `/Users/mark/Projects/hezhe/package.json`
- Create: `/Users/mark/Projects/hezhe/astro.config.mjs`
- Create: `/Users/mark/Projects/hezhe/tsconfig.json`

**Step 1: Create package.json**

```json
{
  "name": "hezhe-blog",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.0.0"
  }
}
```

**Step 2: Install dependencies**

```bash
cd /Users/mark/Projects/hezhe
npm install
```

**Step 3: Commit**

```bash
git init
git add package.json astro.config.mjs tsconfig.json
git commit -m "chore: initialize astro project"
```

---

## Task 2: Configure Project Structure

**Files:**
- Create: `/Users/mark/Projects/hezhe/src/pages/index.astro`
- Create: `/Users/mark/Projects/hezhe/src/layouts/Layout.astro`
- Create: `/Users/mark/Projects/hezhe/src/styles/global.css`
- Create: `/Users/mark/Projects/hezhe/src/content/config.ts`
- Create: `/Users/mark/Projects/hezhe/src/content/posts/hello-world.md`

**Step 1: Create directory structure**

```bash
mkdir -p src/pages src/layouts src/styles src/content/posts src/components
```

**Step 2: Create base layout**

```astro
---
const { title } = Astro.props;
---
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>{title}</title>
</head>
<body>
  <slot />
</body>
</html>
```

**Step 3: Create index page**

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="HEZHE / 和者">
  <h1>Hello World</h1>
</Layout>
```

**Step 4: Commit**

```bash
git add src/
git commit -m "feat: add project structure"
```

---

## Task 3: Implement Layout Components

**Files:**
- Create: `/Users/mark/Projects/hezhe/src/layouts/MainLayout.astro`
- Modify: `/Users/mark/Projects/hezhe/src/styles/global.css`

**Reference:** See [layouts/10-split-balance.html](layouts/10-split-balance.html) for CSS

**Step 1: Extract CSS from reference**

Copy CSS variables and styles to global.css:
- Colors: --color-bg, --color-accent, --color-border
- Fonts: Geist, JetBrains Mono
- Layout: Sidebar + Main structure

**Step 2: Create MainLayout.astro**

```astro
---
const { title, lang = 'zh-CN' } = Astro.props;
---
<MainLayout title={title} lang={lang}>
  <slot />
</MainLayout>
```

**Step 3: Test locally**

```bash
npm run dev
```

**Step 4: Commit**

```bash
git add src/
git commit -f "feat: implement layout components"
```

---

## Task 4: Implement Homepage

**Files:**
- Modify: `/Users/mark/Projects/hezhe/src/pages/index.astro`

**Step 1: Query posts**

```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('posts');
const featured = posts.slice(0, 4);
const latest = posts.slice(4, 10);
---
```

**Step 2: Implement sections**

- Sidebar with navigation
- Hero section with code decoration
- Featured posts grid
- Latest posts list
- About section
- CTA section
- Footer

**Step 3: Commit**

```bash
git commit -m "feat: implement homepage"
```

---

## Task 5: Implement Article Detail Page

**Files:**
- Create: `/Users/mark/Projects/hezhe/src/pages/posts/[slug].astro`

**Step 1: Create dynamic route**

```astro
---
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
const { post } = Astro.props;
const { Content } = await post.render();
---
```

**Step 2: Render content**

```astro
<article>
  <h1>{post.data.title}</h1>
  <Content />
</article>
```

**Step 3: Commit**

```bash
git commit -m "feat: implement article detail page"
```

---

## Task 6: Add Categories and Tags

**Files:**
- Create: `/Users/mark/Projects/hezhe/src/pages/tags/[tag].astro`
- Create: `/Users/mark/Projects/hezhe/src/pages/categories/[category].astro`

**Step 1: Create tag pages**

```astro
---
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];
  return tags.map(tag => ({
    params: { tag },
    props: { posts: posts.filter(p => p.data.tags.includes(tag)) },
  }));
}
---
```

**Step 2: Commit**

```bash
git commit -m "feat: add categories and tags pages"
```

---

## Task 7: Add View Count

**Step 1: Choose solution**

Option A: Cloudflare Workers + KV (free)
Option B: Supabase (free tier)
Option C: Vercel Analytics

**Step 2: Implement**

Example: Using simple JSON file for static (not real-time)

For production: Recommend Cloudflare Workers

**Step 3: Commit**

```bash
git commit -m "feat: add view count"
```

---

## Task 8: SEO Optimization

**Files:**
- Modify: `/Users/mark/Projects/hezhe/src/layouts/MainLayout.astro`

**Step 1: Add SEO meta tags**

```html
<meta name="description" content="HEZHE - 个人博客">
<meta name="keywords" content="blog, tech, design">
<meta property="og:title" content={title}>
<meta property="og:description" content="Description">
```

**Step 2: Add sitemap**

```bash
npm install @astrojs/sitemap
```

**Step 3: Add robots.txt**

```bash
echo "User-agent: *\nAllow: /" > public/robots.txt
```

**Step 4: Commit**

```bash
git commit -m "feat: add SEO optimization"
```

---

## Task 9: Configure Deployment

**Files:**
- Create: `/Users/mark/Projects/hezhe/vercel.json` (optional)

**Step 1: Create GitHub repo**

```bash
gh repo create hezhe --public
```

**Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/username/hezhe.git
git push -u origin main
```

**Step 3: Deploy to Vercel**

1. Go to vercel.com
2. Import GitHub repo
3. Deploy

**Step 4: Commit**

```bash
git commit -m "chore: configure deployment"
```

---

## 完成标准

- [ ] Astro 项目正常运行
- [ ] 首页显示文章列表
- [ ] 文章详情页可访问
- [ ] 分类/标签页面工作
- [ ] 部署到 Vercel 成功
- [ ] 自定义域名解析成功 (可选)

---

## 备选方案

如果 Obsidian 同步需要自动化，考虑使用 Quartz 或其他方案。

---

**Plan complete. Two execution options:**

1. **Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

2. **Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
