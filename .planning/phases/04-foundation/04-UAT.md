---
status: testing
phase: 04-foundation
source: 04-01-SUMMARY.md
started: 2026-03-11T13:15:00Z
updated: 2026-03-11T13:15:00Z
---

## Current Test

number: 1
name: Draft Field in Frontmatter
expected: |
  在 Obsidian 文章的 frontmatter 中添加 `draft: true`，文章在生产环境隐藏。
awaiting: user response

## Tests

### 1. Draft Field in Frontmatter
expected: 在 Obsidian 文章的 frontmatter 中添加 `draft: true`，文章在生产环境隐藏。
result: pass
note: "Found bug - fixed: string 'true' not handled, added coerce.boolean()"

### 2. Production Build Excludes Drafts
expected: 运行 `npm run build` 后，构建输出不包含草稿文章的 HTML 页面
result: pass
note: "dist/ 中无草稿文章页面"

### 3. Development Shows Drafts
expected: 运行 `npm run dev` 时，草稿文章仍然可见（便于预览）
result: pass
note: "开发环境返回所有文章"

### 4. Sitemap Excludes Drafts
expected: 生成的 sitemap.xml 不包含草稿文章的 URL
result: pass
note: "Phase 4 已实现"

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0

## Gaps

[none yet]
