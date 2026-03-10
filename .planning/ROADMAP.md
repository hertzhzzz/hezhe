# Roadmap: Obsidian 自动化博客发布工作流

**Created:** 2026-03-11
**Milestone:** v1.1 Draft Support
**Phases:** 2
**Requirements:** 5

---

## Phases

- [ ] **Phase 4: Foundation** - Schema, helper function, core pages
- [ ] **Phase 5: List Pages** - All list pages with draft filtering

---

## Phase Details

### Phase 4: Foundation
**Goal**: Users can define draft status in frontmatter, with filtering working in core pages

**Depends on**: Nothing (first phase of v1.1)

**Requirements**: DRAFT-01, DRAFT-02, DRAFT-03, DRAFT-04

**Success Criteria** (what must be TRUE):
1. User can add `draft: true` or `draft: false` to Obsidian frontmatter, and it persists through sync
2. Production build (`npm run build`) excludes all draft articles from generated HTML
3. Development server (`npm run dev`) includes draft articles for preview
4. Sitemap.xml does not contain draft article URLs

**Plans**: TBD

---

### Phase 5: List Pages
**Goal**: All list/collection pages exclude draft articles

**Depends on**: Phase 4

**Requirements**: DRAFT-05

**Success Criteria** (what must be TRUE):
1. Homepage (index.astro) does not display draft articles in featured/latest sections
2. Articles archive page excludes draft articles
3. Category pages (categories/[category].astro) exclude draft articles
4. Tag pages (tags/[tag].astro) exclude draft articles

**Plans**: TBD

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 4. Foundation | 0/1 | Not started | - |
| 5. List Pages | 0/1 | Not started | - |

---

## Coverage Map

| Requirement | Phase | Status |
|-------------|-------|--------|
| DRAFT-01 (draft field in schema) | Phase 4 | Pending |
| DRAFT-02 (prod filter) | Phase 4 | Pending |
| DRAFT-03 (dev visible) | Phase 4 | Pending |
| DRAFT-04 (sitemap exclude) | Phase 4 | Pending |
| DRAFT-05 (lists exclude) | Phase 5 | Pending |

**Coverage:** 5/5 requirements mapped ✓

---

## v1.0 Summary (Completed)

| # | Phase | Goal | Requirements | Status |
|---|-------|------|--------------|--------|
| 1 | 本地同步机制 | Obsidian → 博客仓库 | 8 | ✅ Complete |
| 2 | GitHub/Vercel 集成 | 自动部署 | 3 | ✅ Complete |
| 3 | 用户体验优化 | 完善体验 | 3 | ✅ Complete |

---

*Roadmap created: 2026-03-11*
*For milestone: v1.1*
