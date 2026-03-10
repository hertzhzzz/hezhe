# Feature Research

**Domain:** Astro Static Blog - Draft Status Support
**Researched:** 2026-03-11
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| `draft` frontmatter field | Standard YAML frontmatter for boolean flags | LOW | Add `draft: z.boolean().optional()` to schema |
| Build-time filtering | Prevents drafts appearing in production | LOW | Use `import.meta.env.PROD` check |
| Development preview | See drafts locally before publishing | LOW | Available by default in `astro dev` |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Obsidian-native workflow | No extra config files, just frontmatter | LOW | User adds `draft: true` in Obsidian |
| Automatic sync exclusion | Drafts sync to Git but don't deploy | MEDIUM | Requires filtering in publish script or build |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Separate draft folder | "Keep drafts separate from published" | Creates migration friction, complicates workflow | Use frontmatter flag, single folder |
| Draft preview server | "Need public URL for drafts" | Requires auth, adds complexity | Use local dev server or Vercel preview deploys |

## Feature Implementation

### How Draft Status Works in Astro

Based on official Astro documentation:

**1. Schema Definition** (`src/content/config.ts`):
```typescript
schema: z.object({
  title: z.string(),
  // ... existing fields
  draft: z.boolean().optional(),  // NEW
}),
```

**2. Build-Time Filtering**:
```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('posts', ({ data }) => {
  return import.meta.env.PROD ? data.draft !== true : true;
});
```

This ensures:
- `astro dev`: All posts visible (including drafts)
- `astro build` / `astro preview`: Drafts excluded

**3. Frontmatter Usage**:
```yaml
---
title: "My Draft Post"
draft: true
---
```

### Expected Behavior by Environment

| Environment | Draft Posts Visible? | Notes |
|-------------|---------------------|-------|
| Local dev (`npm run dev`) | YES | All posts including drafts shown |
| Production build | NO | Only non-drafts included |
| Vercel preview deploy | DEPENDS | Uses `import.meta.env.PROD` which is true in builds |

### Sync Behavior

The project uses `scripts/publish.sh` to sync from Obsidian:

| Approach | Behavior | Complexity |
|----------|----------|------------|
| Option A: Sync all, filter at build | Drafts in Git, not on site | LOW |
| Option B: Filter during sync | Drafts never leave Obsidian | MEDIUM |

**Recommendation**: Option A (sync all, filter at build)
- Simpler implementation
- Drafts still backed up in Git
- Easy to publish by changing frontmatter

## Feature Dependencies

```
[draft frontmatter field]
       └──requires──> [schema update in config.ts]

[build-time filtering]
       └──requires──> [update all getCollection calls]

[Obsidian workflow]
       └──requires──> [documentation for users]
```

### Dependency Notes

- **[draft frontmatter field] requires [schema update]:** Must add `draft` to Zod schema before filtering works
- **[build-time filtering] requires [update all getCollection calls]:** All pages using posts need filtering (index, articles, categories, tags, sitemap)
- **[Obsidian workflow] requires [documentation]:** Users need to know to add `draft: true` frontmatter

## MVP Definition

### Launch With (v1.1)

Minimum viable product — what's needed to validate the concept.

- [x] `draft` frontmatter field in schema — Core mechanism
- [x] Build-time filtering — Prevents drafts in production
- [x] Development preview works — See drafts locally

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Visual draft indicator in post list — Show "Draft" badge
- [ ] Draft-specific RSS feed — Share drafts internally

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Password-protected preview — Share drafts via URL
- [ ] Draft collaboration — Multiple authors working on drafts

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| `draft` frontmatter field | HIGH | LOW | P1 |
| Build-time filtering | HIGH | LOW | P1 |
| Development preview | HIGH | LOW | P1 |
| Visual draft indicator | MEDIUM | LOW | P2 |
| Documentation | MEDIUM | LOW | P1 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Current Code Analysis

### Files Using getCollection (need filtering updates)

| File | Current Query | Needs Update |
|------|---------------|--------------|
| `src/pages/index.astro` | `getCollection('posts')` | YES |
| `src/pages/articles.astro` | `getCollection('posts')` | YES |
| `src/pages/posts/[slug].astro` | `getCollection('posts')` | YES |
| `src/pages/categories/[category].astro` | `getCollection('posts')` | YES |
| `src/pages/tags/[tag].astro` | `getCollection('posts')` | YES |
| `src/pages/sitemap.xml.ts` | `getCollection('posts')` | YES |

### Schema Location

- File: `src/content/config.ts`
- Current fields: title, titleEn, description, descriptionEn, pubDate, updatedDate, heroImage, tags, categories, featured
- Add: `draft: z.boolean().optional()`

## Sources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) — Official docs on filtering drafts
- [John Dalesandro: Managing Draft and Published Posts](https://johndalesandro.com/blog/astro-manage-draft-and-published-post-statuses-by-adding-a-content-collection-schema-property/) — Implementation pattern
- Project context: Existing workflow uses `scripts/publish.sh` for Obsidian→GitHub sync

---

*Feature research for: Astro Static Blog Draft Support*
*Researched: 2026-03-11*
