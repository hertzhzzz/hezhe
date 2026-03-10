# Requirements: Obsidian 自动化博客发布工作流

**Defined:** 2026-03-11
**Core Value:** 让用户专注于写作本身，除在 Obsidian 写博客外无需任何手动操作

## v1.1 Requirements

### 草稿功能

- [ ] **DRAFT-01**: 添加 `draft` 字段到内容集合 Schema，支持 `draft: true/false`
- [ ] **DRAFT-02**: 生产环境构建时过滤草稿文章（draft: true 不显示）
- [ ] **DRAFT-03**: 开发环境（npm run dev）可见草稿文章，方便预览
- [ ] **DRAFT-04**: sitemap.xml 不包含草稿文章
- [ ] **DRAFT-05**: 文章列表、分类、标签页均不显示草稿

## v1.0 已完成

### 同步机制

- [x] **SYNC-01**: 配置 Obsidian Git 插件，实现文件变更自动提交和推送
- [x] **SYNC-02**: 创建同步脚本，检测 Obsidian 文件变化并复制到博客仓库
- [x] **SYNC-04**: 同步脚本支持增量同步

### GitHub 集成

- [x] **GITHUB-01**: 博客仓库配置 Vercel Git 部署
- [x] **GITHUB-02**: 同步脚本自动提交到博客仓库并推送
- [x] **GITHUB-03**: Vercel 检测到推送后自动部署

### 文章处理

- [x] **CONTENT-01**: 支持 Obsidian 文章 frontmatter 转换
- [x] **CONTENT-02**: 支持双语 frontmatter
- [x] **CONTENT-03**: 支持 tags 和 categories
- [x] **CONTENT-04**: 自动处理文章日期

### 用户体验

- [x] **UX-01**: 无操作体验
- [x] **UX-02**: 静默同步

## v2 Requirements

### 高级功能

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
|-------------|-------|--------|
| DRAFT-01 | Phase 4 | Pending |
| DRAFT-02 | Phase 4 | Pending |
| DRAFT-03 | Phase 4 | Pending |
| DRAFT-04 | Phase 4 | Pending |
| DRAFT-05 | Phase 5 | Pending |

**Coverage:**
- v1.1 requirements: 5 total
- Mapped to phases: 5
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-11*
*Last updated: 2026-03-11 for v1.1*
