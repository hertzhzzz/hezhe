---
phase: 04-foundation
plan: "01"
subsystem: content-management
tags: [draft, astro, content-collection]
dependency_graph:
  requires:
    - "04-CONTEXT.md"
  provides:
    - "src/utils/posts.ts (getPublishedPosts)"
  affects:
    - "src/pages/posts/[slug].astro"
    - "src/pages/sitemap.xml.ts"
tech_stack:
  added:
    - "src/content/config.ts (draft field)"
    - "src/utils/posts.ts (getPublishedPosts function)"
  patterns:
    - "import.meta.env.PROD for environment detection"
    - "Zod schema with default values"
key_files:
  created:
    - src/utils/posts.ts
  modified:
    - src/content/config.ts
    - src/pages/posts/[slug].astro
    - src/pages/sitemap.xml.ts
decisions:
  - "使用 import.meta.env.PROD 区分生产/开发环境，而非额外的环境变量"
  - "draft 默认值为 false，确保现有文章不受影响"
  - "getPublishedPosts 作为集中式过滤函数，便于后续扩展"
metrics:
  duration: "60 seconds"
  completed: "2026-03-11"
  tasks_completed: 4
  files_created: 1
  files_modified: 3
---

# Phase 4 Plan 1: 草稿支持功能 Summary

## 一句话概述

实现 Obsidian 文章草稿发布控制功能，添加 draft 字段到内容集合 Schema，创建集中式过滤函数，在核心页面实现草稿过滤。

## 核心实现

### 1. Schema 添加 draft 字段

在 `src/content/config.ts` 中添加:

```typescript
draft: z.boolean().default(false)
```

- 默认 `false` 确保现有文章自动为发布状态
- 新文章需显式设置 `draft: true` 才会隐藏

### 2. 创建 getPublishedPosts 辅助函数

新建 `src/utils/posts.ts`:

```typescript
export async function getPublishedPosts() {
  const posts = await getCollection('posts');

  if (import.meta.env.PROD) {
    return posts.filter((post) => post.data.draft !== true);
  }

  return posts;
}
```

- 使用 `import.meta.env.PROD` 区分构建环境
- 生产环境 (Vercel): 过滤掉草稿
- 开发环境 (`npm run dev`): 返回所有文章

### 3. posts/[slug].astro 集成

- 导入 `getPublishedPosts`
- `getStaticPaths` 使用过滤后的文章列表
- 生产构建不会为草稿生成独立页面

### 4. sitemap.xml.ts 集成

- 导入 `getPublishedPosts`
- Sitemap 不包含草稿文章的 URL

## 验证结果

- 构建成功: `npm run build` 通过
- 生成的页面: 5 篇文章 + 静态页面
- Sitemap 生成成功

## 使用方式

在 Obsidian 文章 frontmatter 中添加:

```yaml
---
title: 我的文章
draft: true
---
```

- `draft: true` → 文章隐藏 (生产环境)
- 不设置或 `draft: false` → 文章正常发布

## Deviations from Plan

None - plan executed exactly as written.

## 提交记录

| Commit | Message |
|--------|---------|
| ec1976a | feat(04-foundation-01): add draft field to content collection schema |
| 8fb82b1 | feat(04-foundation-01): create getPublishedPosts helper function |
| 10e2557 | feat(04-foundation-01): filter drafts in posts/[slug].astro |
| f2349ae | feat(04-foundation-01): filter drafts in sitemap.xml.ts |

## Self-Check

- [x] All 4 tasks executed
- [x] Each task committed individually
- [x] src/content/config.ts contains draft field
- [x] src/utils/posts.ts exists and exports getPublishedPosts
- [x] src/pages/posts/[slug].astro imports and uses getPublishedPosts
- [x] src/pages/sitemap.xml.ts imports and uses getPublishedPosts
- [x] Build passes

**Self-Check: PASSED**
