# Obsidian 自动化博客发布工作流

## What This Is

一套完整的 Obsidian 写作 → 自动发布到博客网站的自动化流程。用户只需在 Obsidian 中写文章，剩余所有操作（同步、转换、部署）都自动完成。

## Core Value

让用户专注于写作本身，除在 Obsidian 写博客外无需任何手动操作。

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **OBS-01**: 用户在 Obsidian 写完文章后，自动同步到博客仓库
- [ ] **OBS-02**: 支持双语文章（中英文 frontmatter）
- [ ] **OBS-03**: Vercel 自动检测到更新并部署
- [ ] **OBS-04**: 用户无需任何手动 Git 操作
- [ ] **OBS-05**: 支持文章分类和标签
- [ ] **OBS-06**: 发布流程可靠，有错误反馈

### Out of Scope

- 复杂的 Markdown 转换器（保持 Obsidian 原生格式）
- 多博客平台支持（只支持当前 Vercel 部署的博客）

## Context

- **Obsidian 库位置**: `~/Projects/Obsidian/notes/`
- **博客项目位置**: `~/Projects/hezhe/`
- **博客内容目录**: `src/content/posts/`
- **部署平台**: Vercel
- **现有文章**: 4 篇示例文章

## Constraints

- **技术限制**: macOS 环境
- **同步机制**: 需要后台运行的同步服务
- **GitHub**: 需要 GitHub 仓库支持

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 使用 Git 工作流同步 | Obsidian 内置 Git 插件，可实现完全自动化 | — Pending |
| 同步方式：文件系统 + GitHub Actions | 简洁可靠，无需复杂配置 | — Pending |
