# Profile JSON 配置化实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将博客中硬编码的个人信息抽取到独立的 JSON 配置文件，实现一处修改全局生效。

**Architecture:** 创建 src/data/profile.json 存储所有个人信息，Astro 组件通过 import 读取 JSON 数据。

**Tech Stack:** Astro, JSON

---

## Task 1: 创建 Profile JSON 文件

**Files:**
- Create: `src/data/profile.json`

**Step 1: 创建目录和 JSON 文件**

首先创建 src/data 目录（如果不存在），然后创建 profile.json：

```json
{
  "site": {
    "name": "HEZHE",
    "nameCn": "和者",
    "url": "https://hezhe.wang",
    "description": "探索代码与设计的交汇处",
    "descriptionEn": "Exploring the intersection of code and design"
  },
  "author": {
    "name": "Mark",
    "nameCn": "马克",
    "role": "Full-stack Developer",
    "roleCn": "全栈开发者",
    "avatar": "M",
    "bio": [
      "热爱技术，热爱设计，热爱生活。在这个快速变化的时代，我致力于用代码创造价值，用设计传递温度。",
      "专注于前端开发、用户体验设计以及新兴技术的探索与实践。"
    ],
    "bioEn": [
      "Passionate about technology, design, and life.",
      "Focusing on front-end development and emerging technologies."
    ],
    "skills": ["React", "TypeScript", "Node.js", "Astro", "Design"]
  },
  "hero": {
    "title": "探索",
    "titleEn": "Explore",
    "subtitle": "记录思考，探索未知，在代码与设计的交汇处寻找灵感",
    "subtitleEn": "Recording thoughts, exploring the unknown, finding inspiration at the intersection of code and design",
    "code": {
      "line1": { "prefix": "const ", "property": "developer", "value": "\"Mark\"" },
      "line2": { "prefix": "const ", "property": "focus", "value": "[\"React\", \"Design\"]" },
      "line3": { "prefix": "", "property": "", "value": "build(future)" },
      "line4": { "prefix": "", "property": "", "value": "// 持续学习中...", "isComment": true }
    }
  },
  "social": {
    "twitter": "https://x.com/",
    "github": "https://github.com/",
    "linkedin": "https://linkedin.com/in/",
    "email": "mailto:"
  },
  "footer": {
    "links": [
      { "label": "Privacy", "url": "#" },
      { "label": "Terms", "url": "#" },
      { "label": "Contact", "url": "#" }
    ]
  }
}
```

**Step 2: 验证文件创建**

Run: `ls -la src/data/`
Expected: profile.json 文件存在

**Step 3: Commit**

```bash
git add src/data/profile.json
git commit -m "feat: add profile.json for centralized configuration"
```

---

## Task 2: 修改 MainLayout 读取 JSON

**Files:**
- Modify: `src/layouts/MainLayout.astro:1-20`
- Modify: `src/layouts/MainLayout.astro:70-108` (sidebar 部分)
- Modify: `src/layouts/MainLayout.astro:48-56` (JSON-LD)

**Step 1: 添加 JSON import**

在 MainLayout.astro 的 frontmatter (--- 之间) 顶部添加：

```astro
---
import '../styles/global.css';
import profile from '../data/profile.json';

interface Props {
  title: string;
  description?: string;
  image?: string;
  lang?: string;
}

const {
  title,
  description = profile.site.description,
  image = '/og-image.png',
  lang = 'zh-CN',
} = Astro.props;
---
```

**Step 2: 修改 Sidebar 中的硬编码**

找到 sidebar 部分（第70-108行），修改：

```astro
<aside class="sidebar">
    <div class="logo">
        {profile.site.name}
        <span class="cn">{profile.site.nameCn}</span>
    </div>
    <!-- nav 部分保持不变 -->

    <div class="sidebar-footer">
        <div class="social-links">
            <a href={profile.social.twitter}>TW</a>
            <a href={profile.social.github}>GH</a>
            <a href={profile.social.email}>EM</a>
        </div>
        <div class="sidebar-avatar">{profile.author.avatar}</div>
    </div>
</aside>
```

**Step 3: 修改 JSON-LD**

找到 JSON-LD 部分，修改 url：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "{profile.author.name}",
  "url": "{profile.site.url}",
  "sameAs": [
    "{profile.social.twitter}",
    "{profile.social.github}",
    "{profile.social.linkedin}"
  ]
}
</script>
```

**Step 4: 验证构建**

Run: `npm run build 2>&1 | tail -10`
Expected: 构建成功，无错误

**Step 5: Commit**

```bash
git add src/layouts/MainLayout.astro
git commit - "feat: integrate profile.json into MainLayout"
```

---

## Task 3: 修改 index.astro 读取 JSON

**Files:**
- Modify: `src/pages/index.astro:1-22`
- Modify: `src/pages/index.astro:24-62` (hero)
- Modify: `src/pages/index.astro:112-140` (about)
- Modify: `src/pages/index.astro:142-176` (cta)
- Modify: `src/pages/index.astro:178-188` (footer)

**Step 1: 添加 JSON import**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { getCollection } from 'astro:content';
import profile from '../data/profile.json';

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

// 使用 profile 数据
const { site, author, hero, social, footer } = profile;
const currentYear = new Date().getFullYear();
---
```

**Step 2: 修改 Hero 部分**

```astro
<section class="hero">
    <div class="hero-header">
        <div class="hero-content">
            <h1>
                <span class="cn">{hero.title}</span>
                {hero.titleEn}
            </h1>
            <p class="subtitle">
                {hero.subtitle}
                <span class="cn">{hero.subtitleEn}</span>
            </p>
        </div>
        <div class="hero-code">
            <div class="code-line">
                <span class="num">1</span>
                <span class="code-keyword">{hero.code.line1.prefix}</span>
                <span class="code-property">{hero.code.line1.property}</span>
                <span>=</span>
                <span class="code-string">{hero.code.line1.value}</span>
            </div>
            <div class="code-line">
                <span class="num">2</span>
                <span class="code-keyword">{hero.code.line2.prefix}</span>
                <span class="code-property">{hero.code.line2.property}</span>
                <span>=</span>
                <span class="code-string">{hero.code.line2.value}</span>
            </div>
            <div class="code-line">
                <span class="num">3</span>
                <span class="code-function">{hero.code.line3.value}</span>
            </div>
            <div class="code-line">
                <span class="num">4</span>
                <span class="code-comment">{hero.code.line4.value}</span>
            </div>
        </div>
    </div>
</section>
```

**Step 3: 修改 About 部分**

```astro
<section class="section">
    <h2 class="section-title">
        关于我
        <span class="cn">About Me</span>
    </h2>

    <div class="about">
        <div class="about-avatar">{author.avatar}</div>
        <div class="about-content">
            <h3>
                {author.name}
                <span class="cn">{author.nameCn}</span>
            </h3>
            <div class="role">
                {author.role}
                <span class="cn">{author.roleCn}</span>
            </div>
            {author.bio.map((paragraph, index) => (
                <p>
                    {paragraph}
                    <span class="cn">{author.bioEn[index]}</span>
                </p>
            ))}
        </div>
    </div>
</section>
```

**Step 4: 修改 CTA 社交链接部分**

```astro
<div class="cta-social-links">
    <a href={social.twitter}>Twitter</a>
    <a href={social.github}>GitHub</a>
    <a href={social.linkedin}>LinkedIn</a>
</div>
```

**Step 5: 修改 Footer 部分**

```astro
<footer class="footer">
    <div class="footer-text">
        &copy; {currentYear} {site.name} / {site.nameCn} — All rights reserved.
    </div>
    <div class="footer-links">
        {footer.links.map(link => (
            <a href={link.url}>{link.label}</a>
        ))}
    </div>
</footer>
```

**Step 6: 验证构建**

Run: `npm run build 2>&1 | tail -10`
Expected: 构建成功

**Step 7: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: integrate profile.json into index page"
```

---

## Task 4: 修改 about.astro 读取 JSON

**Files:**
- Modify: `src/pages/about.astro:1-10`
- Modify: `src/pages/about.astro:12-46`

**Step 1: 添加 JSON import 并修改内容**

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import profile from '../data/profile.json';

const { author } = profile;
---

<MainLayout title="关于 / About">
    <section class="section">
        <h2 class="section-title">
            关于我
            <span class="cn">About Me</span>
        </h2>

        <div class="about">
            <div class="about-avatar">{author.avatar}</div>
            <div class="about-content">
                <h3>
                    {author.name}
                    <span class="cn">{author.nameCn}</span>
                </h3>
                <div class="role">
                    {author.role}
                    <span class="cn">{author.roleCn}</span>
                </div>
                {author.bio.map((paragraph, index) => (
                    <p>
                        {paragraph}
                        <span class="cn">{author.bioEn[index]}</span>
                    </p>
                ))}

                <h4 class="skills-title">
                    技术栈
                    <span class="cn">Tech Stack</span>
                </h4>
                <div class="skills">
                    {author.skills.map(skill => (
                        <span class="skill">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    </section>
</MainLayout>
```

**Step 2: 验证构建**

Run: `npm run build 2>&1 | tail -10`
Expected: 构建成功

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: integrate profile.json into about page"
```

---

## Task 5: 最终验证

**Step 1: 运行所有测试**

Run: `npx playwright test --reporter=list`
Expected: 9 passed

**Step 2: 验证构建**

Run: `npm run build`
Expected: 16 pages built

**Step 3: 更新 CLAUDE.md**

将 CLAUDE.md 中的功能需求更新为反映当前状态（可选）

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete profile.json configuration"
```
