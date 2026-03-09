# HEZHE Blog 完整实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

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

## 第一阶段: 核心功能 (P0)

### Task 1: 首页文章动态渲染

**Files:**
- Modify: `src/pages/index.astro:1-3` (添加 frontmatter)
- Modify: `src/pages/index.astro:54-100` (Featured Grid)
- Modify: `src/pages/index.astro:111-136` (Latest List)

**Step 1: 添加 frontmatter 读取 posts**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { getCollection } from 'astro:content';

// 获取所有文章
const allPosts = await getCollection('posts');

// Featured: 获取 featured: true 的文章，最多 4 篇
const featuredPosts = allPosts
  .filter(post => post.data.featured)
  .slice(0, 4);

// Latest: 按日期降序排列，最多 3 篇
const latestPosts = allPosts
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);

// 格式化日期
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0].replace(/-/g, '.');
};
---
```

**Step 2: 更新 Featured Grid 模板**

替换第 54-100 行为:

```astro
<div class="featured-grid">
    {featuredPosts.map((post) => (
        <a href={`/posts/${post.slug}`} class="featured-card">
            <div class="category">
                {post.data.categories[0] || 'Article'}
                <span class="cn">{post.data.categories[0] || '文章'}</span>
            </div>
            <h3>
                {post.data.title}
                {post.data.titleEn && <span class="cn">{post.data.titleEn}</span>}
            </h3>
            <div class="date">{formatDate(post.data.pubDate)}</div>
        </a>
    ))}
</div>
```

**Step 3: 更新 Latest List 模板**

替换第 111-136 行为:

```astro
<ul class="latest-list">
    {latestPosts.map((post, index) => (
        <li>
            <a href={`/posts/${post.slug}`} style="display: contents;">
                <span class="number">[{String(index + 1).padStart(2, '0')}]</span>
                <span class="title">
                    {post.data.title}
                    {post.data.titleEn && <span class="cn">{post.data.titleEn}</span>}
                </span>
                <span class="date">{formatDate(post.data.pubDate)}</span>
            </a>
        </li>
    ))}
</ul>
```

**Step 4: 验证构建**

Run: `npm run build`
Expected: 成功构建，14 pages

**Step 5: 更新测试**

Modify: `tests/blog.spec.ts`

```typescript
test('homepage loads featured posts dynamically', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // 检查是否有动态加载的文章链接
  const firstCard = page.locator('.featured-card a').first();
  await expect(firstCard).toBeVisible();

  // 点击应该能跳转到文章页
  await firstCard.click();
  await expect(page.locator('article.post-detail')).toBeVisible();
});
```

Run: `npx playwright test --reporter=line`
Expected: All tests pass

---

### Task 2: /articles 列表页

**Files:**
- Create: `src/pages/articles.astro`

**Step 1: 创建 articles.astro**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { getCollection } from 'astro:content';

const allPosts = await getCollection('posts');
const sortedPosts = allPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0].replace(/-/g, '.');
};
---

<MainLayout title="文章 / Articles">
    <section class="section">
        <h2 class="section-title">
            所有文章
            <span class="cn">All Posts</span>
        </h2>

        <p class="posts-count">
            共 {sortedPosts.length} 篇文章 / {sortedPosts.length} posts
        </p>

        <ul class="latest-list">
            {sortedPosts.map((post, index) => (
                <li>
                    <a href={`/posts/${post.slug}`} style="display: contents;">
                        <span class="number">[{String(index + 1).padStart(2, '0')}]</span>
                        <span class="title">
                            {post.data.title}
                            {post.data.titleEn && <span class="cn">{post.data.titleEn}</span>}
                        </span>
                        <span class="date">{formatDate(post.data.pubDate)}</span>
                    </a>
                </li>
            ))}
        </ul>
    </section>
</MainLayout>

<style>
    .posts-count {
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--color-text-muted);
        margin-bottom: 24px;
    }
</style>
```

**Step 2: 添加 CSS 样式**

在 `src/styles/global.css` 中添加:

```css
/* Articles Page */
.posts-count {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--color-text-muted);
    margin-bottom: 24px;
}
```

**Step 3: 验证构建**

Run: `npm run build`
Expected: 包含 /articles/index.html

**Step 4: 更新测试**

Modify: `tests/blog.spec.ts`

```typescript
test('articles page loads', async ({ page }) => {
  await page.goto('http://localhost:4321/articles/');

  await expect(page.locator('.section-title')).toBeVisible();
  await expect(page.locator('.posts-count')).toBeVisible();
  await expect(page.locator('.latest-list li')).toHaveCount(4);
});
```

---

### Task 3: /about 关于页

**Files:**
- Create: `src/pages/about.astro`

**Step 1: 创建 about.astro**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---

<MainLayout title="关于 / About">
    <section class="section">
        <h2 class="section-title">
            关于我
            <span class="cn">About Me</span>
        </h2>

        <div class="about">
            <div class="about-avatar">M</div>
            <div class="about-content">
                <h3>
                    Mark
                    <span class="cn">马克</span>
                </h3>
                <div class="role">
                    Full-stack Developer
                    <span class="cn">全栈开发者</span>
                </div>
                <p>
                    热爱技术，热爱设计，热爱生活。在这个快速变化的时代，我致力于用代码创造价值，用设计传递温度。
                    <span class="cn">Passionate about technology, design, and life.</span>
                </p>
                <p>
                    专注于前端开发、用户体验设计以及新兴技术的探索与实践。
                    <span class="cn">Focusing on front-end development and emerging technologies.</span>
                </p>

                <h4 class="skills-title">
                    技术栈
                    <span class="cn">Tech Stack</span>
                </h4>
                <div class="skills">
                    <span class="skill">React</span>
                    <span class="skill">TypeScript</span>
                    <span class="skill">Node.js</span>
                    <span class="skill">Astro</span>
                    <span class="skill">Design</span>
                </div>
            </div>
        </div>
    </section>
</MainLayout>

<style>
    .skills-title {
        font-size: 14px;
        font-weight: 600;
        margin: 20px 0 12px;
        color: var(--color-text);
    }

    .skills-title .cn {
        font-size: 12px;
        color: var(--color-text-muted);
        font-weight: 400;
        margin-left: 8px;
    }

    .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .skill {
        padding: 4px 12px;
        background: var(--color-bg-secondary);
        border: 1px solid var(--color-border);
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--color-text-secondary);
    }
</style>
```

**Step 2: 验证构建**

Run: `npm run build`
Expected: 包含 /about/index.html

**Step 3: 更新测试**

Modify: `tests/blog.spec.ts`

```typescript
test('about page loads', async ({ page }) => {
  await page.goto('http://localhost:4321/about/');

  await expect(page.locator('.about')).toBeVisible();
  await expect(page.locator('.about-avatar')).toBeVisible();
  await expect(page.locator('.skills')).toBeVisible();
});
```

---

## 第二阶段: 阅读量统计 (P1)

### Task 4: Supabase 项目设置

**Step 1: 创建 Supabase 项目**

1. 访问 https://supabase.com
2. 创建新项目
3. 获取以下信息:
   - Project URL: `https://xxxxx.supabase.co`
   - anon key: (在 Settings > API)

**Step 2: 创建数据库表**

在 Supabase SQL Editor 中执行:

```sql
-- 创建 page_views 表
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建原子递增函数
CREATE OR REPLACE FUNCTION increment_views(page_slug TEXT)
RETURNS INTEGER AS $$
DECLARE
  current_views INTEGER;
BEGIN
  INSERT INTO page_views (slug, views)
  VALUES (page_slug, 1)
  ON CONFLICT (slug)
  DO UPDATE SET views = page_views.views + 1, updated_at = NOW()
  RETURNING views INTO current_views;

  RETURN current_views;
END;
$$ LANGUAGE plpgsql;

-- 启用 RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Allow public read access"
  ON page_views
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert"
  ON page_views
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON page_views
  FOR UPDATE
  USING (true);
```

---

### Task 5: ViewCounter 组件

**Files:**
- Create: `src/components/ViewCounter.astro`
- Modify: `src/pages/posts/[slug].astro`

**Step 1: 创建 ViewCounter.astro**

```astro
---
interface Props {
  slug: string;
}

const { slug } = Astro.props;
---

<span class="view-counter" data-slug={slug}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
  <span class="view-count">—</span>
  <span class="view-label">views</span>
</span>

<style>
  .view-counter {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-text-muted);
  }

  .view-counter svg {
    opacity: 0.6;
  }
</style>

<script define:vars={{ slug }}>
  const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (SUPABASE_URL && SUPABASE_KEY) {
    const counter = document.querySelector(`[data-slug="${slug}"]`);
    const countElement = counter.querySelector('.view-count');

    const sessionKey = `viewed_${slug}`;

    async function updateViewCount() {
      try {
        if (!sessionStorage.getItem(sessionKey)) {
          // 首次访问 - 增加计数
          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/rpc/increment_views`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
              },
              body: JSON.stringify({ page_slug: slug }),
            }
          );
          const views = await response.json();
          sessionStorage.setItem(sessionKey, 'true');
          if (views > 0) {
            countElement.textContent = views.toLocaleString();
          }
        } else {
          // 已访问过 - 仅获取计数
          const response = await fetch(
            `${SUPABASE_URL}/rest/v1/page_views?slug=eq.${slug}&select=views`,
            {
              headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
              },
            }
          );
          const data = await response.json();
          const views = data[0]?.views || 0;
          if (views > 0) {
            countElement.textContent = views.toLocaleString();
          }
        }
      } catch (e) {
        console.log('View counter error:', e);
      }
    }

    updateViewCount();
  }
</script>
```

**Step 2: 在文章页集成 ViewCounter**

Modify: `src/pages/posts/[slug].astro`

在 `<div class="post-meta">` 中添加:

```astro
<span class="post-views">
  <ViewCounter slug={post.slug} />
</span>
```

添加 import:

```astro
---
import { getCollection } from 'astro:content';
import MainLayout from '../../layouts/MainLayout.astro';
import ViewCounter from '../../components/ViewCounter.astro';
// ... rest of the code
---
```

**Step 3: 添加环境变量**

Create: `.env` (添加到 .gitignore)

```
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 第三阶段: SEO 优化 (P1)

### Task 6: 站点地图

**Files:**
- Create: `src/pages/sitemap.xml.ts`
- Create: `src/pages/sitemap-index.xml.ts` (可选)
- Create: `public/robots.txt`

**Step 1: 安装 @astrojs/sitemap**

Run: `npm install @astrojs/sitemap`

**Step 2: 更新 astro.config.mjs**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hezhe.wang',
  integrations: [sitemap()],
});
```

**Step 3: 创建 robots.txt**

Create: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://hezhe.wang/sitemap-index.xml
```

---

### Task 7: SEO 增强

**Files:**
- Modify: `src/layouts/MainLayout.astro`

**Step 1: 添加 Canonical URL**

在 `<head>` 中添加:

```html
<link rel="canonical" href={Astro.url.href} />
```

**Step 2: 添加 JSON-LD**

在 `<head>` 中添加:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mark",
  "url": "https://hezhe.wang",
  "sameAs": [
    "https://twitter.com/yourusername",
    "https://github.com/yourusername"
  ]
}
</script>
```

---

## 第四阶段: 整理 (P2)

### Task 8: 项目整理

**Files:**
- Delete: `layouts/reference-design.html`

**Step 1: 删除参考设计文件**

Run: `rm layouts/reference-design.html`

**Step 2: 更新 CLAUDE.md**

Modify: `CLAUDE.md`

更新功能需求状态:

```markdown
## 功能需求

- [x] 文章列表 / Latest Posts
- [x] 文章详情页 / Article Detail
- [x] 分类/标签 / Categories & Tags
- [x] 阅读量统计 (Supabase)
- [x] 站点地图 / Sitemap
- [x] SEO 优化
- [x] /articles 列表页
- [x] /about 关于页
```

---

## 测试验证

**最终测试:**

Run: `npm run build`
Expected: 17 pages (新增 /articles, /about, sitemap.xml)

Run: `npx playwright test --reporter=line`
Expected: All tests pass

---

## 部署

1. 添加环境变量到 Vercel:
   - `PUBLIC_SUPABASE_URL`
   - `PUBLIC_SUPABASE_ANON_KEY`

2. 推送 GitHub:
   ```bash
   git add .
   git commit -m "feat: complete blog implementation"
   git push
   ```

3. Vercel 自动部署

---

## 执行顺序

1. Task 1: 首页文章动态渲染
2. Task 2: /articles 列表页
3. Task 3: /about 关于页
4. Task 4: Supabase 项目设置
5. Task 5: ViewCounter 组件
6. Task 6: 站点地图
7. Task 7: SEO 增强
8. Task 8: 项目整理
