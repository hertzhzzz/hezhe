# Codebase Structure

**Analysis Date:** 2026-03-11

## Directory Layout

```
/Users/mark/Projects/hezhe/
├── .astro/                  # Astro build cache
├── .git/                   # Git repository
├── .vercel/                # Vercel deployment config
├── dist/                   # Build output (generated)
├── docs/                   # Documentation
├── layouts/                # Deprecated - use src/layouts
├── public/                 # Static assets
├── scripts/                # Build/deployment scripts
├── src/                    # Source code
│   ├── components/         # Astro components
│   ├── content/            # Content collections
│   │   └── posts/          # Blog posts (markdown)
│   ├── data/               # Static data (JSON)
│   ├── layouts/            # Layout components
│   ├── pages/              # Route pages
│   ├── styles/             # Global styles
│   └── env.d.ts            # TypeScript declarations
├── tests/                  # Playwright E2E tests
├── astro.config.mjs       # Astro configuration
├── package.json            # Dependencies
├── playwright.config.ts   # E2E test config
└── tsconfig.json          # TypeScript config
```

## Directory Purposes

**`src/content/posts/`:**
- Purpose: Blog post Markdown files
- Contains: `.md` files with frontmatter
- Key files: Sample posts like `deep-learning-creativity.md`

**`src/pages/`:**
- Purpose: Route handlers and page components
- Contains: `.astro` files mapping to routes
- Key files: `index.astro`, `articles.astro`, `about.astro`, `posts/[slug].astro`, `tags/[tag].astro`, `categories/[category].astro`, `sitemap.xml.ts`

**`src/layouts/`:**
- Purpose: Page layout wrappers
- Contains: `MainLayout.astro` - main HTML shell
- Key files: `MainLayout.astro`

**`src/styles/`:**
- Purpose: Global CSS
- Contains: `global.css` - design system, CSS variables, component styles

**`src/data/`:**
- Purpose: Static configuration data
- Contains: `profile.json` - author info, site metadata

**`src/components/`:**
- Purpose: Reusable UI components
- Contains: `ViewCounter.astro` - view counting (disabled)

**`public/`:**
- Purpose: Static assets served as-is
- Contains: Images, logos, fonts

## Key File Locations

**Entry Points:**
- `src/pages/index.astro`: Home page (/)
- `src/pages/articles.astro`: All posts (/articles)
- `src/pages/about.astro`: About page (/about)
- `src/pages/posts/[slug].astro`: Post detail (/posts/:slug)
- `src/pages/tags/[tag.astro]`: Tag archive (/tags/:tag)
- `src/pages/categories/[category].astro`: Category archive (/categories/:category)
- `src/pages/sitemap.xml.ts`: Sitemap endpoint (/sitemap.xml)

**Configuration:**
- `astro.config.mjs`: Site URL configuration
- `src/content/config.ts`: Content collection schema
- `src/data/profile.json`: Site/author data
- `tsconfig.json`: TypeScript configuration

**Styles:**
- `src/styles/global.css`: All CSS (variables, layout, components)

## Naming Conventions

**Files:**
- Astro pages: `kebab-case.astro` (e.g., `about.astro`, `sitemap.xml.ts`)
- Dynamic routes: `[param].astro` (e.g., `[slug].astro`, `[tag].astro`)
- Components: `PascalCase.astro` (e.g., `ViewCounter.astro`, `MainLayout.astro`)
- Content: `kebab-case.md` (e.g., `deep-learning-creativity.md`)
- Data: `camelCase.json` (e.g., `profile.json`)

**Directories:**
- All lowercase: `src/pages`, `src/components`, `src/content`

**CSS Classes:**
- BEM-like: `.block`, `.block-element`, `.block--modifier`
- Example: `.featured-card`, `.featured-card:hover`, `.section-title`

## Where to Add New Code

**New Blog Post:**
- Primary: `src/content/posts/`
- Format: Markdown with frontmatter
- Naming: `kebab-case.md`

**New Static Page:**
- Primary: `src/pages/`
- Format: `PageName.astro`
- Example: `src/pages/contact.astro` → `/contact`

**New Dynamic Route:**
- Primary: `src/pages/`
- Format: `[param].astro`
- Example: `src/pages/series/[series].astro` → `/series/:series`

**New Component:**
- Primary: `src/components/`
- Format: `ComponentName.astro`
- Example: `src/components/PostCard.astro`

**New Style:**
- Location: `src/styles/global.css`
- Add to appropriate section (variables, layout, components)

**New Configuration:**
- Location: `src/data/profile.json` (for site data) or create new JSON in `src/data/`

## Special Directories

**`public/`:**
- Purpose: Static assets served at root
- Generated: No
- Committed: Yes
- Examples: `/logos/z-logo.png`, `/og-image.png`

**`dist/`:**
- Purpose: Build output
- Generated: Yes (by `npm run build`)
- Committed: No (in `.gitignore`)

**`.astro/`:**
- Purpose: Build cache
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-03-11*
