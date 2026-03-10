# Project Research Summary

**Project:** HEZHE Blog - Draft Status Implementation
**Domain:** Astro Static Site / Content Collection
**Researched:** 2026-03-11
**Confidence:** HIGH

## Executive Summary

This research addresses adding draft status support to an existing Astro static blog. The implementation requires no new technologies — Astro's built-in content collections API with Zod schema validation provides everything needed. The core approach involves adding a `draft` boolean field to the content schema and filtering drafts at build time using `getCollection()` filter callbacks.

The critical risk is **incomplete filter coverage**: the project has 6 different `getCollection('posts')` call sites (index, articles, posts/[slug], sitemap, categories, tags). Missing any one of these results in drafts leaking to production. This is the primary pitfall to avoid.

The recommended approach uses query-time filtering with environment-aware logic (`import.meta.env.PROD` check), allowing developers to preview drafts locally (`npm run dev`) while excluding them from production builds. This maintains the existing Obsidian-to-GitHub sync workflow without modification.

## Key Findings

### Recommended Stack

No new packages required. All changes use existing Astro APIs.

**Core technologies:**
- **Astro** (existing) — Static site framework with built-in content collections
- **Zod** (from `astro:content`) — Schema validation for frontmatter
- **Filter callbacks** in `getCollection()` — Core mechanism for draft exclusion

**Required changes:**
1. Add `draft: z.boolean().default(false)` to `src/content/config.ts` schema
2. Update all 6 `getCollection('posts')` calls with filter callbacks
3. Create optional helper function `src/utils/posts.ts` for DRY principle

### Expected Features

**Must have (table stakes):**
- `draft` frontmatter field — Standard YAML frontmatter for boolean flags
- Build-time filtering — Prevents drafts appearing in production
- Development preview — See drafts locally before publishing

**Should have (competitive):**
- Obsidian-native workflow — User adds `draft: true` in Obsidian, no extra config
- Consistent filtering across all pages

**Defer (v2+):**
- Visual draft indicator badges
- Password-protected preview URLs

### Architecture Approach

The recommended architecture uses a centralized helper function (`src/utils/posts.ts`) that wraps `getCollection()` with filtering logic. This ensures consistent behavior across all 6 query points.

**Major components:**
1. **Schema Layer** (`src/content/config.ts`) — Defines `draft` boolean field
2. **Helper Layer** (`src/utils/posts.ts`) — Centralized filtering function
3. **Page Layer** (6 Astro pages) — Consume filtered collections

**Build order:**
1. Schema update first (other changes depend on `draft` field)
2. Helper function (pages import from it)
3. `[slug].astro` first (generates routes - most critical)
4. Sitemap (SEO integrity)
5. Remaining pages (index, articles, categories, tags)

### Critical Pitfalls

1. **Incomplete Filter Coverage** — Drafts leaking to production because filtering not applied to all 6 getCollection calls
   - **How to avoid:** Use centralized helper function, verify all 6 query points

2. **Missing Schema Definition** — `draft` field not defined in schema, losing TypeScript type safety
   - **How to avoid:** Add `draft: z.boolean().default(false)` to schema

3. **Development vs Production Logic Inconsistency** — Filter condition written backwards
   - **How to avoid:** Use `import.meta.env.PROD ? data.draft !== true : true`

4. **Sitemap Including Drafts** — SEO index includes draft URLs
   - **How to avoid:** Apply same filter in sitemap.xml.ts

5. **Slug Conflicts** — Draft and published posts using same slug
   - **How to avoid:** Ensure slug uniqueness in schema or during generation

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation (Schema + Helper)
**Rationale:** Core infrastructure must exist before any page updates — schema defines the field, helper provides the filtering logic.
**Delivers:**
- `draft` field added to `src/content/config.ts` schema
- `src/utils/posts.ts` helper function with `getPublishedPosts()` export
- TypeScript type safety for draft field

**Addresses:** PITFALLS #2 (Missing Schema), ARCHITECTURE (Schema + Helper)
**Avoids:** Type safety loss, inconsistent filtering

### Phase 2: Page Integration (Core Pages)
**Rationale:** These pages generate actual routes and affect SEO — must be updated before index/archives.
**Delivers:**
- `src/pages/posts/[slug].astro` — Excludes drafts from getStaticPaths
- `src/pages/sitemap.xml.ts` — Excludes drafts from sitemap

**Addresses:** FEATURES (build-time filtering), PITFALLS #1, #4
**Avoids:** Draft URLs in production, SEO index of drafts

### Phase 3: Page Integration (List Pages)
**Rationale:** Remaining pages consume filtered data, simpler changes after core is solid.
**Delivers:**
- `src/pages/index.astro` — Filtered featured/latest posts
- `src/pages/articles.astro` — Filtered archive
- `src/pages/categories/[category].astro` — Filtered categories
- `src/pages/tags/[tag].astro` — Filtered tags

**Addresses:** PITFALLS #1 (complete coverage)
**Avoids:** Drafts appearing in any list view

### Phase 4: Verification & Documentation
**Rationale:** Ensure build output matches expectations, document workflow for users.
**Delivers:**
- Verification checklist (filter applied to all 6 points)
- Production build test (`npm run build` output review)
- User documentation for Obsidian workflow

**Addresses:** PITFALLS recovery strategies
**Avoids:** Production leakage

### Phase Ordering Rationale

- **Dependency order:** Schema must exist before filtering can work — helper must exist before pages can import it
- **Risk order:** Pages generating routes ([slug], sitemap) updated first to prevent critical SEO leaks
- **Completeness:** All 6 query points must be covered — no partial implementations acceptable
- **Verification last:** Build output must be validated before considering complete

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Standard patterns (Astro documentation covers schema additions) — skip research-phase
- **Phase 2-3:** Standard patterns (filter callbacks well-documented) — skip research-phase
- **Phase 4:** Standard patterns (build verification documented) — skip research-phase

This implementation uses only stable, well-documented Astro APIs. No additional research phases needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Uses only built-in Astro APIs, no external packages needed |
| Features | HIGH | Standard pattern from official Astro documentation |
| Architecture | HIGH | Verified against 6 existing getCollection call sites in project |
| Pitfalls | HIGH | Based on project code analysis and common Astro mistakes |

**Overall confidence:** HIGH

### Gaps to Address

No significant gaps identified. Research covered:
- All 6 getCollection call sites identified and documented
- Schema pattern verified against Astro official docs
- Filter callback pattern verified in official API reference
- Project's existing sync workflow (scripts/publish.sh) considered

## Sources

### Primary (HIGH confidence)
- Astro Content Collections Documentation — Filter callback pattern verified
- Astro getCollection API Reference — Filter parameter signature confirmed
- Project code analysis — 6 getCollection sites identified in existing codebase

### Secondary (HIGH confidence)
- Project existing frontmatter structure — Verified current fields
- Project sync script — `scripts/publish.sh` workflow understood

---

*Research completed: 2026-03-11*
*Ready for roadmap: yes*