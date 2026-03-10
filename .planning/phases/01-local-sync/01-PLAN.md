# Plan: Phase 1 - 本地同步机制

**Wave:** 1
**Created:** 2026-03-11
**Requirements:** SYNC-01, SYNC-02, SYNC-03, SYNC-04, CONTENT-01, CONTENT-02, CONTENT-03, CONTENT-04

## Plan Summary

由于决定使用"同一仓库"方案（Obsidian 直接打开博客仓库的 `src/content/posts/`），大部分同步逻辑已经内置。核心任务是配置 Obsidian Git 插件。

## Tasks

### 01-配置-Obsidian-Git-插件

**Objective:** 在 Obsidian 中配置 Git 插件实现自动提交和推送

**Steps:**

1. 打开 Obsidian，打开 `~/Projects/hezhe/src/content/posts/` 作为库
2. 在设置中搜索并安装 "Obsidian Git" 插件
3. 配置插件设置：
   - 启用 "Auto commit"（自动提交）
   - 启用 "Auto push"（自动推送）
   - 设置提交间隔（如 1 分钟）
   - 设置自动推送间隔（如 2 分钟）
4. 首次手动推送一次以验证连接

**Verification:**
- [ ] Obsidian Git 插件已安装
- [ ] 插件设置中 Auto commit 和 Auto push 已启用
- [ ] 手动修改文件后能自动推送到 GitHub

**Files Modified:** N/A（仅配置）

---

### 02-验证-Vercel-自动部署

**Objective:** 确认 Vercel 已正确配置，能在 GitHub 推送后自动部署

**Steps:**

1. 访问 Vercel Dashboard (vercel.com)
2. 确认 hezhe 项目已连接 GitHub 仓库
3. 确认部署设置正确：
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 手动触发一次部署验证流程正常

**Verification:**
- [ ] Vercel 项目存在并关联 GitHub
- [ ] Framework 正确识别为 Astro
- [ ] 部署成功

**Files Modified:** N/A

---

### 03-测试-完整流程

**Objective:** 端到端测试发布流程

**Steps:**

1. 在 Obsidian 中创建一篇新测试文章
2. 添加必要的 frontmatter：
   ```yaml
   ---
   title: "测试文章"
   titleEn: "Test Article"
   description: "测试描述"
   descriptionEn: "Test description"
   pubDate: 2026-03-11
   tags: ["Test"]
   categories: ["测试"]
   featured: false
   ---
   ```
3. 等待自动提交和推送（约 2-3 分钟）
4. 在 Vercel 查看部署状态
5. 部署完成后访问网站确认文章显示

**Verification:**
- [ ] 新文章在 Obsidian 中创建成功
- [ ] GitHub 仓库中看到新文件
- [ ] Vercel 自动触发部署
- [ ] 网站上显示新文章

**Files Added:**
- `src/content/posts/test-article.md` (测试文件，之后删除)

---

## Must-Haves

- [x] Obsidian Git 插件配置完成
- [x] Vercel 自动部署验证
- [x] 端到端流程测试成功
