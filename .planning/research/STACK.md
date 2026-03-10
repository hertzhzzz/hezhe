# Stack Research

**Domain:** Astro Content Collections - Draft Status Filtering
**Researched:** 2026-03-11
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

No additional packages required. Astro's built-in content collections API fully supports draft filtering.

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro (existing) | latest | Static site framework | Already in use, no changes needed |
| Zod (existing) | from `astro:content` | Schema validation | Already in use for frontmatter validation |

### Changes to Existing Configuration

| Change | Location | Description |
|--------|----------|-------------|
| Add `draft` field | `src/content/config.ts` | Add `draft: z.boolean().default(false)` to schema |
| Update queries | All `getCollection('posts')` calls | Add filter callback to exclude `draft: true` |

## Implementation Pattern

### 1. Schema Addition (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // Add this line
    draft: z.boolean().default(false),
  }),
});
```

### 2. Query Filtering Pattern

**Production-only filtering** (recommended - excludes drafts in prod, includes in dev):

```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => {
  // In production build: exclude drafts
  // In development: include all posts
  return import.meta.env.PROD ? data.draft !== true : true;
});
```

**Always exclude drafts** (simpler, if you never want to preview drafts):

```typescript
const posts = await getCollection('posts', ({ data }) => {
  return data.draft !== true;
});
```

### 3. Frontmatter Usage

In Obsidian, add to frontmatter:

```yaml
---
title: My Draft Post
titleEn: My Draft Post (English)
description: A draft article
descriptionEn: A draft article (English)
pubDate: 2026-03-11
draft: true
---
```

## Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| `astro dev` | Local development | All posts (including drafts) visible |
| `astro build` | Production build | Only non-draft posts included |

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Schema + filter callback | Separate `drafts/` folder | When you want physical separation of draft files |
| Query filtering | Build-time filtering via `astro.config.mjs` | Not recommended - less flexible |

### Why Not Separate Folder?

Some guides suggest keeping drafts in a separate directory (`src/content/drafts/`). This approach:
- **Pros:** Physical separation, no need for filter
- **Cons:** Loses bilingual frontmatter structure, complicates migration, requires directory change workflow

The current approach keeps drafts in the same location with a frontmatter flag, which:
- Maintains existing workflow
- Allows gradual "publishing" by just changing `draft: true` to `draft: false`
- Requires minimal code changes

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Third-party draft packages | Unnecessary - native API is sufficient | Built-in `getCollection()` filter |
| Build-time environment variables | Overcomplicated | `import.meta.env.PROD` check in query |

## Version Compatibility

This feature uses stable Astro APIs available in all recent versions:

| Feature | Minimum Astro Version |
|---------|----------------------|
| Content collections | 2.0+ |
| `getCollection()` filter | 2.0+ |
| `import.meta.env.PROD` | 2.0+ |

No version upgrades required.

## Sources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) — Filter callback pattern verified
- [Astro getCollection API](https://docs.astro.build/en/reference/api-reference/#getcollection) — Filter parameter signature confirmed
- Current project config analyzed

---

*Stack research for: Draft Status Support in Astro*
*Researched: 2026-03-11*