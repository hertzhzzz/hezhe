---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: draft-support
current_phase: Phase 4 (Foundation)
current_plan: "01"
total_plans_in_phase: 1
status: in_progress
last_updated: "2026-03-11T02:38:00.000Z"
progress:
  total_phases: 2
  completed_phases: 0
  total_plans: 2
  completed_plans: 1
---

# State: Obsidian 自动化博客发布工作流

**Updated:** 2026-03-11

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-11)

**Core value:** 让用户专注于写作本身，除在 Obsidian 写博客外无需任何手动操作

**Current milestone:** v1.1 - Draft Support

## v1.0 已完成

- Obsidian → GitHub → Vercel 自动部署
- 完全自动化的发布流程
- 双语 frontmatter 支持

## v1.1 进行中

**Phase 4: Foundation**
- [x] Schema 添加 draft 字段
- [x] 创建辅助函数过滤草稿
- [x] posts/[slug].astro 和 sitemap.xml.ts 过滤草稿

**Phase 5: List Pages**
- index.astro, articles.astro 过滤草稿
- categories/[category].astro 过滤草稿
- tags/[tag].astro 过滤草稿

## 性能指标

- 草稿功能：规划中
- 预计 2 个 phase 完成 v1.1
