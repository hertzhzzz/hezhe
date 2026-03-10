# Technology Stack

**Analysis Date:** 2026-03-11

## Languages

**Primary:**
- TypeScript - Astro components, TypeScript configuration
- JavaScript - Runtime and Astro templates

## Runtime

**Environment:**
- Node.js (via Astro)
- Browser (client-side scripts)

**Package Manager:**
- npm (detected via package-lock.json presence)
- Lockfile: present

## Frameworks

**Core:**
- Astro 4.0.0 - Static site generator (SSG)

**Testing:**
- Playwright 1.58.2 - E2E testing framework

## Key Dependencies

**Critical:**
- astro (^4.0.0) - Core framework for static site generation

**Dev Dependencies:**
- @playwright/test (^1.58.2) - Browser automation for E2E tests

## Configuration

**Environment:**
- No .env file present (static site)
- Optional: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY for view counter (disabled by default)

**Build:**
- astro.config.mjs - Astro configuration
  - Site URL: https://hezhe.wang
- tsconfig.json - TypeScript configuration
  - Extends: astro/tsconfigs/strict
  - strictNullChecks: enabled

**Testing:**
- playwright.config.ts - Test configuration
  - Test directory: ./tests
  - Base URL: http://localhost:4321
  - Browser: Chromium only

## Platform Requirements

**Development:**
- Node.js environment
- npm for package management

**Production:**
- Static deployment (HTML/CSS/JS)
- No server-side runtime required

---

*Stack analysis: 2026-03-11*
