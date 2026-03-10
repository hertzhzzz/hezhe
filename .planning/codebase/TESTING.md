# Testing Patterns

**Analysis Date:** 2026-03-11

## Test Framework

**Runner:**
- **Playwright** v1.58.2 - E2E testing framework
- No unit testing framework (Jest/Vitest) configured

**Config Location:** `playwright.config.ts`

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

**Run Commands:**
```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific file
npx playwright test tests/blog.spec.ts
```

## Test File Organization

**Location:**
- Tests in `tests/` directory (root level, not co-located)
- Only one test file: `tests/blog.spec.ts`

**Naming:**
- Playwright spec pattern: `*.spec.ts`

**Structure:**
```
/Users/mark/Projects/hezhe/
├── tests/
│   └── blog.spec.ts       # E2E tests for blog pages
├── playwright.config.ts  # Playwright config
└── src/                   # Source code (no co-located tests)
```

## Test Structure

**Suite Organization:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('HEZHE Blog Tests', () => {
  test('test name', async ({ page }) => {
    // Test code
  });
});
```

**Test Categories in blog.spec.ts:**
1. **Homepage Tests**
   - Homepage loads correctly
   - Navigation works
   - No console errors on homepage
   - Responsive layout works

2. **Article Tests**
   - Article page loads

3. **Category/Tag Tests**
   - Category page loads
   - Tag page loads

4. **Page Tests**
   - Articles page loads
   - About page loads

## Test Patterns

**Page Navigation:**
```typescript
await page.goto('http://localhost:4321/');
await page.goto('http://localhost:4321/posts/deep-learning-creativity/');
```

**Element Assertions:**
```typescript
await expect(page.locator('.sidebar')).toBeVisible();
await expect(page.locator('.hero')).toBeVisible();
await expect(page.locator('.featured-grid')).toBeVisible();
await expect(page).toHaveTitle(/HEZHE/);
```

**Count Assertions:**
```typescript
await expect(page.locator('.latest-list li')).toHaveCount(4);
```

**Interaction:**
```typescript
await firstCard.click();
await expect(page.locator('article.post-detail')).toBeVisible();
```

**Console Error Monitoring:**
```typescript
const errors: string[] = [];
page.on('console', msg => {
  if (msg.type() === 'error') {
    errors.push(msg.text());
  }
});
await page.goto('http://localhost:4321/');
await page.waitForLoadState('networkidle');
expect(errors.length).toBe(0);
```

**Viewport Testing:**
```typescript
await page.setViewportSize({ width: 375, height: 667 });
```

## Mocking

**Current Practice:**
- No mocking in tests
- Tests run against full application
- Static site - no external API calls to mock

**What Could Be Mocked (if needed):**
- External API responses (not applicable - static site)
- ViewCounter component (commented out in code)

## Test Data

**Hardcoded URLs:**
```typescript
await page.goto('http://localhost:4321/posts/deep-learning-creativity/');
await page.goto('http://localhost:4321/categories/技术/');
await page.goto('http://localhost:4321/tags/Tech/');
```

**Selectors:**
- Class-based selectors (e.g., `.sidebar`, `.hero`, `.featured-grid`)
- CSS class naming follows BEM-like pattern

## Coverage

**Current State:**
- No coverage enforcement
- Tests are smoke tests for page rendering
- No unit test coverage

**Test Scope:**
- E2E only - page load and basic interaction
- No component-level testing
- No API testing (static site)

## Test Types

**E2E Tests (Primary):**
- Homepage renders correctly
- All pages load (articles, about, categories, tags)
- Navigation works
- Responsive layout
- Console error detection

**What's NOT Tested:**
- Individual component logic (Astro components are static)
- Content collection schemas (validated at build time)
- Markdown rendering (Astro handles this)
- CSS visual regression

## Development Workflow

**Prerequisites:**
- Dev server must be running at `http://localhost:4321`
- Tests do NOT start the server automatically

**Running Tests:**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run tests
npx playwright test
```

## Known Testing Gaps

**No Unit Tests:**
- Components are Astro static components
- No JavaScript logic to test in isolation
- Content collection schemas validated at build time

**No Integration Tests:**
- Static site - no backend API
- Tests verify rendered HTML only

**Limited Error Testing:**
- No build failure tests
- No validation error tests
- No 404 page tests

---

*Testing analysis: 2026-03-11*
