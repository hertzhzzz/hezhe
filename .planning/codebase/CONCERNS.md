# Codebase Concerns

**Analysis Date:** 2026-03-11

## Tech Debt

### Disabled ViewCounter Feature
- Issue: ViewCounter component exists but is commented out in `src/pages/posts/[slug].astro` (lines 4, 29)
- Files: `src/components/ViewCounter.astro`, `src/pages/posts/[slug].astro`
- Impact: Dead code that may cause confusion; feature cannot be enabled without Supabase setup
- Fix approach: Either remove the component entirely or create a proper setup guide with Supabase initialization script

### Outdated Astro Version
- Issue: Package.json specifies `astro: ^4.0.0` which is outdated
- Files: `package.json`
- Impact: Missing security patches, performance improvements, and new features
- Fix approach: Update to latest stable Astro version and verify compatibility

### Unused Testing Dependencies
- Issue: `@playwright/test` is in devDependencies but no test files exist
- Files: `package.json`
- Impact: Wasted dependency footprint; no automated testing coverage
- Fix approach: Either implement tests or remove the dependency

### Empty Newsletter Form
- Issue: Newsletter form HTML exists in CSS but no backend handler exists
- Files: `src/styles/global.css` (lines 535-580)
- Impact: Form submission does nothing; user confusion
- Fix approach: Remove form markup or implement newsletter integration (e.g., ConvertKit, Mailchimp)

### Missing RSS Feed Implementation
- Issue: RSS link exists in layout (`href="/rss.xml"`) but no endpoint generates the feed
- Files: `src/layouts/MainLayout.astro` (line 65)
- Impact: Users cannot subscribe to blog updates
- Fix approach: Create `src/pages/rss.xml.ts` endpoint

## Known Issues

### Site URL Mismatch
- Issue: `astro.config.mjs` has `site: 'https://hezhe.wang'` but `profile.json` has `url: 'https://markhzz.com'`
- Files: `astro.config.mjs`, `src/data/profile.json`
- Impact: Sitemap and canonical URLs do not match actual deployment domain
- Fix approach: Align both to the actual production domain

### Empty Social Links
- Issue: `profile.json` has empty `email` field (`mailto:`) and incomplete `linkedin` URL (`linkedin.com/in/`)
- Files: `src/data/profile.json` (lines 41-42)
- Impact: Broken or non-functional social links
- Fix approach: Fill in actual email address and LinkedIn profile URL

### Hardcoded Sitemap URL
- Issue: Sitemap generation hardcodes `const site = 'https://markhzz.com'` instead of using Astro config
- Files: `src/pages/sitemap.xml.ts` (line 5)
- Impact: Sitemap shows incorrect URL if domain changes in config
- Fix approach: Use `Astro.site` from Astro config

## Security Considerations

### Exposed Supabase Anon Key (If Enabled)
- Issue: ViewCounter would expose Supabase anon key in client-side JavaScript
- Files: `src/components/ViewCounter.astro` (lines 42-43)
- Current mitigation: Using anon key which is designed for this pattern with RLS
- Recommendations: Ensure row-level security is properly configured in Supabase if enabled; add rate limiting

### Missing Security Headers
- Issue: No explicit security headers (CSP, X-Frame-Options, etc.) in MainLayout
- Files: `src/layouts/MainLayout.astro`
- Recommendations: Add security headers via Astro middleware or Vercel config

## Performance Bottlenecks

### Blocking Font Loading
- Issue: Google Fonts loaded via `<link>` in head blocks rendering
- Files: `src/layouts/MainLayout.astro` (lines 67-70)
- Impact: Slight delay in first contentful paint
- Fix approach: Use `font-display: swap` (already present) or self-host fonts

### No Image Optimization Pipeline
- Issue: Images rely on explicit width/height attributes but no automated optimization
- Files: `public/logos/z-logo.png`, `public/og-image.png`
- Impact: Larger than necessary image payloads
- Fix approach: Use Astro's built-in image optimization or Sharp integration

## Fragile Areas

### Profile JSON Coupling
- Why fragile: Multiple components import profile.json directly; schema changes require updates across files
- Files: `src/pages/index.astro`, `src/pages/posts/[slug].astro`, `src/layouts/MainLayout.astro`
- Safe modification: Use a shared data accessor function with type safety
- Test coverage: No tests for profile data structure

### Manual Date Formatting
- Why fragile: Date formatting logic duplicated in multiple files
- Files: `src/pages/index.astro` (lines 20-22), `src/pages/posts/[slug].astro` (line 26)
- Safe modification: Extract to shared utility function

## Scaling Limits

### Static Site Generation
- Current capacity: Suitable for current blog scale (4 posts)
- Limit: Build time increases with content volume; no pagination implemented
- Scaling path: Implement pagination if posts exceed ~50; consider incremental static regeneration

### No Pagination
- Current capacity: All posts loaded on articles page
- Limit: Degrades performance as content grows
- Scaling path: Add pagination or infinite scroll

## Dependencies at Risk

### Astro
- Risk: Using outdated major version (`^4.0.0`)
- Impact: Security vulnerabilities, compatibility issues with plugins
- Migration plan: Follow Astro upgrade guide; test thoroughly before production deploy

## Missing Critical Features

### No Search Functionality
- Problem: No search or filtering beyond tags/categories
- Blocks: Users cannot find specific content easily

### No Pagination
- Problem: No pagination for articles listing
- Blocks: Cannot scale beyond a few dozen posts gracefully

## Test Coverage Gaps

### No Test Files
- What's not tested: All components and pages
- Files: Entire `src/` directory
- Risk: Breaking changes go unnoticed; refactoring is risky
- Priority: Low for personal blog, High if this becomes a shared project

### No Type Checking in CI
- What's not tested: TypeScript type correctness (project uses JavaScript in Astro files)
- Files: No tsconfig enforcement in CI
- Risk: Type errors could slip into production

---

*Concerns audit: 2026-03-11*
