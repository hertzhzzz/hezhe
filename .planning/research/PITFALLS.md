# Pitfalls Research

**Domain:** Astro Blog Draft Status Implementation
**Researched:** 2026-03-11
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Incomplete Filter Coverage — Drafts Leaking to Production

**What goes wrong:**
草稿文章（draft: true）意外发布到生产环境，用户可以在网站上看到未完成的内容。

**Why it happens:**
Astro 的 `getCollection()` 过滤是可选的，需要在每个查询点手动添加。项目中存在 6 个不同的 `getCollection` 调用位置：
- `src/pages/index.astro` — 首页文章列表
- `src/pages/articles.astro` — 文章归档页
- `src/pages/posts/[slug].astro` — 文章详情页
- `src/pages/sitemap.xml.ts` — 站点地图
- `src/pages/tags/[tag].astro` — 标签页
- `src/pages/categories/[category].astro` — 分类页

只要遗漏任何一处，草稿就会泄露。

**How to avoid:**
创建统一的过滤函数，在所有 `getCollection` 调用中使用：

```typescript
// src/utils/collection.ts
import { getCollection } from 'astro:content';

export async function getPublishedCollection(collection: string) {
  return await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
}
```

**Warning signs:**
- 本地开发时能看到草稿，但不确定生产环境是否正确过滤
- 添加新页面时忘记应用过滤逻辑

**Phase to address:**
DRAFT-02 草稿过滤逻辑实现

---

### Pitfall 2: Missing Schema Definition — No Type Safety

**What goes wrong:**
`draft` 字段未在 content collection schema 中定义，导致：
- TypeScript 不提示类型错误
- 拼写错误（如 `draft: true` 写成 `drfat: true`）无法被检测
- 值的类型无法验证（字符串 "true" vs 布尔 true）

**Why it happens:**
官方文档中的示例没有强制要求在 schema 中定义 `draft` 字段，开发者在实现时容易忽略这一步。

**How to avoid:**
在 `src/content/config.ts` 中添加 `draft` 字段定义：

```typescript
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // ...existing fields
    draft: z.boolean().default(false),  // 添加这行
  }),
});
```

**Warning signs:**
- 使用 `data.draft` 时 TypeScript 不报错
- 现有文章没有 `draft` 字段但系统不报错

**Phase to address:**
DRAFT-01 frontmatter schema 更新

---

### Pitfall 3: Development vs Production Logic Inconsistency

**What goes wrong:**
- 开发环境看不到草稿（过滤条件写反了）
- 生产环境反而能看到草稿
- 预览功能失效

**Why it happens:**
条件判断写反是常见错误：

```typescript
// 错误示例
return import.meta.env.PROD ? data.draft === true : false;
// 应该是
return import.meta.env.PROD ? data.draft !== true : true;
```

**How to avoid:**
使用上面统一的过滤函数，避免在多处重复编写逻辑。

**Warning signs:**
- `npm run build` 后草稿仍然存在
- 本地 `npm run dev` 看不到新写的草稿

**Phase to address:**
DRAFT-02 草稿过滤逻辑实现

---

### Pitfall 4: Sitemap and RSS Still Include Drafts

**What goes wrong:**
站点地图和 RSS feed 中包含草稿文章，导致：
- SEO 索引未完成内容
- 搜索引擎惩罚
- 用户通过 RSS 订阅看到草稿

**Why it happens:**
`src/pages/sitemap.xml.ts` 独立于主站逻辑，常常被遗忘。

**How to avoid:**
确保 sitemap 生成也应用相同的过滤逻辑。

**Warning signs:**
- 在 Google Search Console 发现未完成内容的 URL
- 用户反馈通过 RSS 看到了草稿

**Phase to address:**
DRAFT-02 草稿过滤逻辑实现（包含 sitemap）

---

### Pitfall 5: Obsidian 同步脚本不理解 draft 字段

**What goes wrong:**
Obsidian 到博客的同步脚本（publish script）将所有文章（包括草稿）都同步到博客仓库的 `src/content/posts/`，导致：
- 草稿文件仍然存在于构建目录
- 需要依赖 Astro 过滤，存在泄露风险

**Why it happens:**
同步脚本只负责复制文件，不理解也不关心 frontmatter 中的 `draft` 字段。

**How to avoid:**
两种方案：
1. **方案 A（推荐）**：同步所有文件，让 Astro 构建时过滤 — 简单，CI/CD 处理
2. **方案 B**：同步时跳过 `draft: true` 的文件 — 需要修改同步逻辑

**Warning signs:**
- 博客仓库中能看到草稿文件
- 本地构建输出包含草稿内容

**Phase to address:**
需要与现有同步流程集成时评估

---

### Pitfall 6: slug 冲突导致 404

**What goes wrong:**
草稿文章的 slug 与已发布文章相同，构建时后者覆盖前者或产生意外行为。

**Why it happens:**
草稿和正式文章使用相同的 slug，但草稿被过滤后，URL 路由可能产生冲突。

**How to avoid:**
在 slug 生成逻辑中检查唯一性，或在 schema 验证时检查 slug 唯一性。

**Warning signs:**
- 两篇文章有相同的 slug
- 访问 URL 时出现意外文章

**Phase to address:**
DRAFT-01 或 DRAFT-02

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| 只在首页过滤，其他页面不过滤 | 快速实现首页功能 | 草稿在其他页面泄露 | 永远不可接受 |
| 不添加 schema 定义 | 减少代码改动 | 失去类型安全，后续维护困难 | 永远不可接受 |
| 跳过 sitemap 过滤 | 减少工作量 | SEO 问题，用户体验差 | 永远不可接受 |
| 只在生产环境过滤 | 开发时方便预览 | 可能引入逻辑错误 | 可接受（使用推荐的过滤函数） |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Obsidian 同步 | 假设同步脚本理解 draft 字段 | 明确同步范围，让 Astro 处理过滤 |
| Vercel 部署 | 以为构建自动过滤 | 验证构建输出，确认草稿未包含 |
| Sitemap | 独立于文章列表实现 | 确保使用相同的过滤函数 |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 每页独立过滤 | 构建时间线性增长 | 使用统一的获取函数 | 超过 500 篇文章 |
| 运行时过滤 | 首屏渲染延迟 | 使用构建时过滤（getCollection） | 大流量场景 |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| 草稿包含敏感信息被发布 | 信息泄露 | 验证草稿内容不会包含生产敏感数据 |
| 草稿暴露未发布产品 | 竞品情报泄露 | 草稿审查流程 |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| 开发时完全看不到草稿 | 无法预览写作内容 | 使用环境判断，开发时可见 |
| 草稿没有视觉区分 | 编辑不知道哪些是草稿 | 在管理界面或列表中高亮草稿状态 |

---

## "Looks Done But Isn't" Checklist

- [ ] **过滤逻辑**: 所有 6 个 getCollection 调用都应用了过滤 — 逐一检查每个文件
- [ ] **Schema 定义**: draft 字段已添加到 content/config.ts — 检查 z.boolean()
- [ ] **Sitemap**: sitemap.xml.ts 也应用了过滤 — 访问 /sitemap.xml 验证
- [ ] **生产构建**: `npm run build` 输出不包含草稿 — 检查构建产物
- [ ] **类型检查**: TypeScript 能检测 draft 相关错误 — 运行 tsc
- [ ] **环境逻辑**: 开发时可见草稿，生产时隐藏 — 本地测试两种环境

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| 草稿泄露到生产 | HIGH | 1. 立即下架草稿文章<br>2. 修复过滤逻辑<br>3. 重新构建部署<br>4. 联系搜索引擎重新索引 |
| 缺少 schema 定义 | LOW | 添加 draft 到 schema，运行类型检查修复 |
| sitemap 包含草稿 | MEDIUM | 修复 sitemap 过滤，重新部署 |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 过滤覆盖不全 | DRAFT-02: 草稿过滤逻辑实现 | 检查所有 6 个文件 |
| Schema 缺失 | DRAFT-01: frontmatter 更新 | TypeScript 类型检查 |
| 开发/生产逻辑错误 | DRAFT-02: 草稿过滤逻辑实现 | 测试两种环境 |
| Sitemap 泄露 | DRAFT-02: 草稿过滤逻辑实现 | 访问 /sitemap.xml |
| 同步脚本问题 | DRAFT-02 或单独同步优化 | 验证博客仓库内容 |
| slug 冲突 | DRAFT-01 或 schema 验证 | 检查所有文章 slug 唯一性 |

---

## Sources

- [Astro Content Collections Documentation](https://docs.astro.build/en/guides/content-collections/) — 官方过滤示例
- 项目代码审查 — 6 个 getCollection 调用点确认
- 现有 frontmatter 结构 — `src/content/posts/*.md` 文件分析
- Schema 定义 — `src/content/config.ts` 当前字段

---

*Pitfalls research for: Astro Blog Draft Status Implementation*
*Researched: 2026-03-11*
