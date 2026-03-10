# Phase 1: 本地同步机制 - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

建立完整的 Obsidian → 博客自动发布流程。用户只需在 Obsidian 写文章，无需任何手动操作即可发布到网站。

</domain>

<decisions>
## Implementation Decisions

### 仓库结构
- Obsidian 和博客使用**同一仓库**（hezhe）
- Obsidian 直接打开博客仓库的 `src/content/posts/` 目录作为库
- 无需符号链接，无需复制脚本

### 文件变化检测
- 使用 **Obsidian Git 插件** 自动检测文件变化
- 插件配置 auto-commit 和 auto-push

### 提交策略
- Obsidian Git 插件配置**自动提交**
- 提交消息使用默认或模板格式

### 部署方式
- **Vercel 自动部署**
- Vercel 关联 GitHub 仓库，push 后自动触发部署

### Claude's Discretion
- Obsidian Git 插件的具体配置（提交间隔、忽略文件等）
- .gitignore 配置
- Vercel 项目配置细节

</decisions>

<specifics>
## Specific Ideas

- "我想要完全自动化，不想操作任何 Git"
- "在 Obsidian 写完就能发布"

</specifics>

<code_context>
## Existing Code Insights

### Blog Structure
- 博客内容目录: `src/content/posts/`
- 已有的 4 篇文章作为示例
- Frontmatter 格式已定义（title, titleEn, description, descriptionEn, pubDate, tags, categories, featured）

### Existing Patterns
- Astro 项目结构已知
- Markdown frontmatter 格式已建立

</code_context>

<deferred>
## Deferred Ideas

- 草稿状态支持 (Phase 2+)
- 图片自动上传到图床 (Phase 2+)

</deferred>

---

*Phase: 01-local-sync*
*Context gathered: 2026-03-11*
