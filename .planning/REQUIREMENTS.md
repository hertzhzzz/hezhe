# Requirements: Obsidian 自动化博客发布工作流

**Defined:** 2026-03-11
**Core Value:** 让用户专注于写作本身，除在 Obsidian 写博客外无需任何手动操作

## v1 Requirements

### 同步机制

- [ ] **SYNC-01**: 配置 Obsidian Git 插件，实现文件变更自动提交和推送
- [ ] **SYNC-02**: 创建同步脚本，检测 Obsidian 文件变化并复制到博客仓库
- [ ] **SYNC-03**: 配置 macOS LaunchAgent，实现后台自动运行同步脚本
- [ ] **SYNC-04**: 同步脚本支持增量同步（只同步新增/修改的文件）

### GitHub 集成

- [ ] **GITHUB-01**: 博客仓库配置 Vercel Git 部署
- [ ] **GITHUB-02**: 同步脚本自动提交到博客仓库并推送
- [ ] **GITHUB-03**: Vercel 检测到推送后自动部署

### 文章处理

- [ ] **CONTENT-01**: 支持 Obsidian 文章 frontmatter 转换
- [ ] **CONTENT-02**: 支持双语 frontmatter（title, titleEn, description, descriptionEn）
- [ ] **CONTENT-03**: 支持 tags 和 categories
- [ ] **CONTENT-04**: 自动处理文章日期（pubDate）

### 用户体验

- [ ] **UX-01**: 用户只需在 Obsidian 写作，无需其他操作
- [ ] **UX-02**: 同步过程静默运行，不打扰用户
- [ ] **UX-03**: 部署失败时有通知机制

## v2 Requirements

### 高级功能

- **ADV-01**: 支持草稿状态（draft），只在标记为发布时才部署
- **ADV-02**: 支持图片自动上传到图床
- **ADV-03**: 支持文章定时发布

## Out of Scope

| Feature | Reason |
|---------|--------|
| 多博客平台支持 | 当前只需支持 Vercel 部署的博客 |
| 复杂 Markdown 转换 | 保持 Obsidian 原生格式即可 |
| 离线同步 | 主要在线使用场景 |

## Traceability

| Requirement | Phase | Status |
|------------|-------|--------|
| SYNC-01 | Phase 1 | Pending |
| SYNC-02 | Phase 1 | Pending |
| SYNC-03 | Phase 1 | Pending |
| SYNC-04 | Phase 1 | Pending |
| GITHUB-01 | Phase 2 | Pending |
| GITHUB-02 | Phase 2 | Pending |
| GITHUB-03 | Phase 2 | Pending |
| CONTENT-01 | Phase 1 | Pending |
| CONTENT-02 | Phase 1 | Pending |
| CONTENT-03 | Phase 1 | Pending |
| CONTENT-04 | Phase 1 | Pending |
| UX-01 | Phase 3 | Pending |
| UX-02 | Phase 3 | Pending |
| UX-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 after initial definition*
