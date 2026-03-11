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
result: pending

### 2. Production Build Excludes Drafts
expected: 运行 `npm run build` 后，构建输出不包含草稿文章的 HTML 页面
result: pending

### 3. Development Shows Drafts
expected: 运行 `npm run dev` 时，草稿文章仍然可见（便于预览）
result: pending

### 4. Sitemap Excludes Drafts
expected: 生成的 sitemap.xml 不包含草稿文章的 URL
result: pending

## Summary

total: 4
passed: 0
issues: 0
pending: 4
skipped: 0

## Gaps

[none yet]
