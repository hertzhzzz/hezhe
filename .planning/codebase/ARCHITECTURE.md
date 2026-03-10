# Architecture

**Analysis Date:** 2026-03-11

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Astro

**Key Characteristics:**
- Pure static HTML generation at build time - no server-side rendering
- Content Collections for type-safe markdown content management
- File-based routing through Astro's convention
- Component-based UI with Astro components (.astro files)
- Optional client-side JavaScript for interactivity (ViewCounter)

## Layers

**Content Layer:**
- Purpose: Blog post content storage and schema validation
- Location: `src/content/`
- Contains: Markdown files with frontmatter, content collection configuration
- Depends on: Astro Content Collections API
- Used by: Page components via `getCollection('posts')`

**Layout Layer:**
- Purpose: Shared page structure and HTML shell
- Location: `src/layouts/MainLayout.astro`
- Contains: HTML skeleton, sidebar navigation, SEO meta tags, JSON-LD
- Depends on: `src/styles/global.css`, `src/data/profile.json`
- Used by: All page components

**Page Layer:**
- Purpose: Route handlers and page-specific logic
- Location: `src/pages/`
- Contains: Static routes (index, articles, about) and dynamic routes (posts/[slug], tags/[tag], categories/[category])
- Depends on: Layout, Content Collections, profile data
- Used by: Build output

**Style Layer:**
- Purpose: Global CSS design system
- Location: `src/styles/global.css`
- Contains: CSS custom properties, layout styles, component styles
- Depends on: None (pure CSS)
- Used by: Layout and all pages

**Data Layer:**
- Purpose: Site configuration and profile data
- Location: `src/data/profile.json`
- Contains: Author info, site metadata, social links, hero section config
- Depends on: None (static JSON)
- Used by: Layout, pages

**Component Layer:**
- Purpose: Reusable UI fragments
- Location: `src/components/ViewCounter.astro`
- Contains: View counting UI (currently disabled)
- Depends on: Optional Supabase integration
- Used by: Post detail page

## Data Flow

**Content Loading Flow:**

1. Build time: Astro loads markdown files from `src/content/posts/`
2. Content Collections API validates frontmatter against schema in `src/content/config.ts`
3. Pages call `getCollection('posts')` to retrieve validated posts
4. Static paths generated for dynamic routes

**Page Rendering Flow:**

1. User requests `/posts/my-post`
2. Astro matches route to `src/pages/posts/[slug].astro`
3. `getStaticPaths` generates all post paths at build time
4. Page component renders post content with Layout
5. Output: Pure HTML

**Navigation Flow:**

```
/ (index.astro)                    → Featured + Latest posts
├── /posts/[slug]                  → Individual post (dynamic)
/articles                           → All posts list
├── /posts/[slug]                  → Individual post
/about                              → About page
├── /tags/[tag]                    → Posts by tag (dynamic)
/categories/[category]             → Posts by category (dynamic)
/sitemap.xml                       → XML sitemap (endpoint)
```

## Key Abstractions

**Content Collection:**
- Purpose: Type-safe content management
- Examples: `src/content/config.ts`
- Pattern: Zod schema validation with `defineCollection`

**Static Path Generation:**
- Purpose: Generate routes for dynamic content
- Examples: `src/pages/posts/[slug].astro`, `src/pages/tags/[tag].astro`
- Pattern: `getStaticPaths()` returning array of params/props

**Layout Component:**
- Purpose: Consistent page structure
- Examples: `src/layouts/MainLayout.astro`
- Pattern: Props for title, description, image, lang; slot for content

**Data Profile:**
- Purpose: Centralized site configuration
- Examples: `src/data/profile.json`
- Pattern: JSON data imported by components

## Entry Points

**Build Entry:**
- Location: `astro.config.mjs`
- Triggers: `npm run build`
- Responsibilities: Astro configuration (site URL)

**Dev Entry:**
- Location: `npm run dev` → `astro dev`
- Triggers: Development server startup
- Responsibilities: Hot module replacement, live reload

**Content Entry:**
- Location: `src/content/posts/*.md`
- Triggers: Content changes, build
- Responsibilities: Blog post source

## Error Handling

**Strategy:** Build-time validation

**Patterns:**
- Content Collections validate frontmatter at build time - invalid content fails build
- Dynamic routes return 404 for unmatched slugs (handled by Astro automatically)
- ViewCounter gracefully degrades when Supabase unavailable (client-side try/catch)

## Cross-Cutting Concerns

**Logging:** None (static site - no server-side logging)

**Validation:** Zod schemas in content config (`src/content/config.ts`)

**Authentication:** Not applicable (public blog)

**SEO:** Implemented in MainLayout via meta tags, Open Graph, Twitter cards, JSON-LD

**Internationalization:** Bilingual UI patterns (Chinese primary, English secondary via `.cn` class)

---

*Architecture analysis: 2026-03-11*
