# Phase 5: List Pages - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

在所有列表页面添加草稿过滤：index.astro、articles.astro、categories/[category].astro、tags/[tag].astro。

</domain>

<decisions>
## Implementation Decisions

### 代码组织
- 使用 Phase 4 创建的 `getPublishedPosts()` 辅助函数
- 只需在各个页面替换 `getCollection('posts')` 为 `getPublishedPosts()`

### 修改文件
- `src/pages/index.astro` - 首页文章列表
- `src/pages/articles.astro` - 文章归档页
- `src/pages/categories/[category].astro` - 分类页
- `src/pages/tags/[tag].astro` - 标签页

### Claude's Discretion
- 具体导入路径

</decisions>

<specifics>
## Specific Ideas

无特定需求 - 直接复用 getPublishedPosts 辅助函数

</specifics>

<deferred>
## Deferred Ideas

无 - 讨论停留在 phase 范围内

</deferred>

---

*Phase: 05-list-pages*
*Context gathered: 2026-03-11*
