# Phase 4: Foundation - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

添加 `draft` 字段到内容集合 Schema，创建辅助过滤函数，在核心页面（posts/[slug].astro, sitemap.xml.ts）实现草稿过滤。

</domain>

<decisions>
## Implementation Decisions

### Draft 字段
- 使用 `draft: z.boolean().default(false)` - 新文章默认发布

### 过滤逻辑
- 使用 `import.meta.env.PROD` 区分开发/生产环境
- 开发环境草稿可见，生产环境隐藏

### 代码组织
- 创建集中 helper 函数 `getPublishedPosts()` 避免重复

### Claude's Discretion
- 辅助函数的具体实现方式
- 过滤回调的具体写法

</decisions>

<specifics>
## Specific Ideas

无特定需求 - 采用标准 Astro 最佳实践

</specifics>

<code_context>
## Existing Code Insights

### 代码位置
- Schema: `src/content/config.ts` - 需添加 draft 字段
- 6 个 getCollection 调用点需添加过滤

### 已有关心模式
- Astro content collections
- Zod schema validation

</code_context>

<deferred>
## Deferred Ideas

无 - 讨论停留在 phase 范围内

</deferred>

---

*Phase: 04-foundation*
*Context gathered: 2026-03-11*
