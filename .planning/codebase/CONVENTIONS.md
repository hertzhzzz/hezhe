# Coding Conventions

**Analysis Date:** 2026-03-11

## Project Type

This is an **Astro static site** - a blog website using Astro framework with TypeScript. The codebase primarily consists of `.astro` components, Markdown content, and CSS.

## Naming Patterns

**Files:**
- Astro components: `PascalCase.astro` (e.g., `MainLayout.astro`, `ViewCounter.astro`)
- Pages: `kebab-case.astro` or `[slug].astro` for dynamic routes (e.g., `index.astro`, `posts/[slug].astro`)
- TypeScript files: `camelCase.ts` (e.g., `config.ts`, `sitemap.xml.ts`)
- CSS: `kebab-case.css` (e.g., `global.css`)

**Functions (in frontmatter):**
- camelCase for functions (e.g., `formatDate` in `src/pages/index.astro`)

**Variables:**
- camelCase (e.g., `allPosts`, `featuredPosts`, `currentYear`)
- Destructured props use camelCase (e.g., `const { title, description } = Astro.props`)

**CSS Classes:**
- BEM-like naming with kebab-case (e.g., `.hero-header`, `.featured-card`, `.post-content`)
- Semantic class names (e.g., `.sidebar`, `.main`, `.nav`)

## Code Style

**Formatting:**
- No explicit Prettier or ESLint config in project
- Astro handles formatting via its built-in tooling
- 2-space indentation in frontmatter
- Chinese comments are used throughout codebase

**TypeScript:**
- `tsconfig.json` extends `astro/tsconfigs/strict`
- Strict null checks enabled: `"strictNullChecks": true`
- Zod for schema validation in content collections

**Astro Frontmatter:**
- TypeScript in frontmatter fenced code block (`---`)
- Props interface defined using `interface Props`
- Destructuring with defaults: `const { title, description = defaultValue } = Astro.props`

**CSS:**
- CSS Variables in `:root` for theming
- BEM-inspired class naming
- Mobile-first responsive design with media queries
- Accessibility: focus-visible styles, reduced motion support

## Import Organization

**Astro Components:**
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import { getCollection } from 'astro:content';
import profile from '../data/profile.json';
---
```

**Content Collections:**
```typescript
import { defineCollection, z } from 'astro:content';
```

**Order:**
1. Astro built-in imports (`astro:content`)
2. Relative path imports (layouts, components)
3. Data imports (JSON)

**Path Aliases:**
- None configured - uses relative paths

## Error Handling

**Content Collections:**
- Zod schema validation in `src/content/config.ts`
- Optional fields use `.optional()` or `.default()`
- Date coercion with `z.coerce.date()`

**Static Paths:**
- `getStaticPaths()` returns array of params + props
- No explicit error handling in current code

**Runtime:**
- No try/catch blocks in current codebase
- ViewCounter component is commented out (optional feature)

## Logging

**Current Practice:**
- No logging framework configured
- Console.log appears in test files for debugging
- Static site generation - minimal runtime logging needed

## Comments

**Chinese Comments:**
- Used throughout for section headers:
  ```astro
  // 获取所有文章
  // Featured: 获取 featured: true 的文章，最多 4 篇
  // Latest: 按日期降序排列，最多 3 篇
  // 格式化日期
  ```

**HTML Comments:**
- Used for inline documentation:
  ```astro
  <!-- Hero -->
  <!-- Featured Posts -->
  <!-- Latest Posts -->
  ```

**CSS Comments:**
- Section-based comments:
  ```css
  /* Layout */
  /* Sidebar */
  /* Main Content */
  /* Hero */
  ```

## Component Design

**Astro Components:**
- Single-file components with frontmatter + template + styles
- Scoped `<style>` blocks per component
- Props via `Astro.props` destructuring

**Layouts:**
- `MainLayout.astro` - base layout with HTML shell, sidebar, SEO meta tags

**Pages:**
- `index.astro` - homepage
- `posts/[slug].astro` - dynamic post pages
- `articles.astro`, `about.astro` - static pages
- `categories/[category].astro`, `tags/[tag].astro` - dynamic list pages

**Data Flow:**
1. `getStaticPaths()` fetches content via `getCollection('posts')`
2. Props passed to component
3. Content rendered via `<Content />` component from `post.render()`

## Module Design

**Content Collections:**
- Defined in `src/content/config.ts`
- Single collection: `posts`
- Schema uses Zod with validation

**Data Files:**
- JSON for configuration: `src/data/profile.json`
- No API calls - fully static

**No Barrel Exports:**
- No `index.ts` barrel files
- Direct imports from specific files

---

*Convention analysis: 2026-03-11*
