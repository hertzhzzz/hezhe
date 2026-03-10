# Architecture Research: Draft Status Integration

**Domain:** Astro Static Site / Content Collection
**Researched:** 2026-03-11
**Confidence:** HIGH

## Current Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Build Time (Astro)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                           │
│   │ Content Layer  │  src/content/posts/*.md                   │
│   │   (Markdown)    │  - Frontmatter fields                     │
│   └────────┬────────┘  - Content body                          │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────┐                                           │
│   │ Content Config  │  src/content/config.ts                   │
│   │   (Schema)       │  - Zod validation                        │
│   └────────┬────────┘  - Field definitions                      │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │              getCollection('posts')                     │  │
│   │  → Returns all posts (currently no filtering)           │  │
│   └────────┬────────────────────────────────────────────────┘  │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    Pages (Static)                        │  │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │
│   │  │ index    │ │ articles │ │ posts/   │ │ sitemap  │   │  │
│   │  │ .astro   │ │ .astro   │ │ [slug]   │ │ .xml.ts  │   │  │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Current Integration Points

### 1. Content Collection Schema (`src/content/config.ts`)

**Current State:**
- Defines Zod schema for posts
- Fields: title, titleEn, description, descriptionEn, pubDate, updatedDate, heroImage, tags, categories, featured

**Required Change:**
- Add `draft: z.boolean().default(false)` to schema

### 2. Pages Querying Posts

| Page | Query Method | Filtering Needed |
|------|--------------|------------------|
| `src/pages/index.astro` | `getCollection('posts')` | Yes - featured + latest |
| `src/pages/articles.astro` | `getCollection('posts')` | Yes - all published |
| `src/pages/posts/[slug].astro` | `getStaticPaths()` + `getCollection('posts')` | Yes - exclude from paths |
| `src/pages/sitemap.xml.ts` | `getCollection('posts')` | Yes - exclude from sitemap |
| `src/pages/categories/[category].astro` | `getCollection('posts')` | Yes - extract categories from published only |
| `src/pages/tags/[tag].astro` | `getCollection('posts')` | Yes - extract tags from published only |

## Draft Integration Architecture

### Recommended Approach: Query-Time Filtering

```
┌─────────────────────────────────────────────────────────────────┐
│                   Modified Architecture                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                           │
│   │ Content Layer  │  src/content/posts/*.md                   │
│   │   (Markdown)    │  - Frontmatter: draft: true/false        │
│   └────────┬────────┘                                           │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────┐                                           │
│   │ Content Config  │  src/content/config.ts                   │
│   │   (Schema)       │  + draft: z.boolean().default(false)    │
│   └────────┬────────┘                                           │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │     Helper: getPublishedPosts() [RECOMMENDED]           │  │
│   │  → Filters: post.data.draft !== true                    │  │
│   └────────┬────────────────────────────────────────────────┘  │
│            │                                                    │
│            ↓                                                    │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    Pages (Static)                        │  │
│   │  All pages now use filtered collection                   │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Changes Summary

#### NEW Files (1)
| File | Purpose | Rationale |
|------|---------|------------|
| `src/utils/posts.ts` | Centralized filtering function | DRY principle, single source of truth |

#### MODIFIED Files (6)
| File | Change Type | Description |
|------|-------------|-------------|
| `src/content/config.ts` | Schema update | Add `draft` boolean field |
| `src/pages/index.astro` | Query modification | Filter drafts from featured/latest |
| `src/pages/articles.astro` | Query modification | Filter drafts from all posts |
| `src/pages/posts/[slug].astro` | Query modification | Exclude drafts from getStaticPaths |
| `src/pages/sitemap.xml.ts` | Query modification | Exclude drafts from sitemap |
| `src/pages/categories/[category].astro` | Query modification | Filter drafts + extract categories correctly |
| `src/pages/tags/[tag].astro` | Query modification | Filter drafts + extract tags correctly |

## Data Flow Changes

### Current Flow
```
getCollection('posts')
    ↓
[All posts including drafts]
    ↓
Page renders all posts
```

### New Flow
```
getCollection('posts')
    ↓
[All posts including drafts]
    ↓
filter(post => post.data.draft !== true)
    ↓
[Published posts only]
    ↓
Page renders published posts
```

## Build Order & Dependencies

```
1. Schema Update (src/content/config.ts)
   ↓
2. Helper Function (src/utils/posts.ts) [NEW]
   ↓
3. Update all pages in dependency order:

   a) Posts/[slug].astro     ← Most critical (generates routes)
   b) Sitemap.xml.ts         ← SEO integrity
   c) Index.astro            ← Homepage
   d) Articles.astro        ← Archive
   e) Categories/[category]  ← Dynamic routes
   f) Tags/[tag]             ← Dynamic routes
```

**Build Order Rationale:**
1. Schema must update first (other changes depend on `draft` field existing)
2. Helper function before pages (pages will import from it)
3. `[slug].astro` first because it generates actual routes - if drafts appear here, they get published
4. Sitemap next to prevent SEO leakage of draft URLs
5. Remaining pages in any order

## Implementation Pattern

### Helper Function Pattern (Recommended)

```typescript
// src/utils/posts.ts
import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  const allPosts = await getCollection('posts');
  return allPosts.filter(post => post.data.draft !== true);
}

export async function getPublishedPostsByCategory() {
  const published = await getPublishedPosts();
  // Extract categories from published posts only
  const categories = [...new Set(published.flatMap(post => post.data.categories))];
  return categories;
}
```

### Page Update Pattern

```typescript
// Before
const allPosts = await getCollection('posts');

// After
const allPosts = (await getCollection('posts'))
  .filter(post => post.data.draft !== true);
```

Or with helper:
```typescript
import { getPublishedPosts } from '../../utils/posts';

const allPosts = await getPublishedPosts();
```

## Anti-Patterns to Avoid

### 1. Hardcoding Filter in Multiple Places
**What:** Copy-pasting `.filter(p => p.data.draft !== true)` everywhere
**Why:** DRY violation, easy to miss one place, inconsistent behavior
**Do instead:** Use centralized helper function

### 2. Filtering in getStaticPaths Only
**What:** Only filtering in `[slug].astro` but not in index/articles
**Why:** Inconsistency - some pages show drafts, some don't
**Do instead:** Apply consistent filtering across all pages

### 3. Forgetting Dynamic Route Pages
**What:** Updating main pages but forgetting categories/tags
**Why:** Draft posts would still appear in category/tag pages
**Do instead:** Update all pages that query posts

### 4. Using undefined Check Instead of Explicit Boolean
**What:** `post.data.draft` (truthy check)
**Why:** `draft: false` and missing `draft` field behave differently
**Do instead:** `post.data.draft !== true` (explicit check)

## Scaling Considerations

| Scale | Impact | Recommendation |
|-------|--------|----------------|
| 0-100 posts | Minimal | Simple filter is fine |
| 100-1000 posts | Slight build time increase | Still fine, consider caching |
| 1000+ posts | Noticeable | Consider separate content collections for drafts |

**Current project state:** 4 posts → No optimization needed

## Sources

- Astro Content Collections Documentation: https://docs.astro.build/en/guides/content-collections/
- Astro getCollection API: https://docs.astro.build/en/reference/api-reference/#getcollection
- Zod Boolean Schema: https://zod.dev/?id=booleans

---

*Architecture research for: Draft Status Feature Integration*
*Researched: 2026-03-11*
