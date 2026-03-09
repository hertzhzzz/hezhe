import { test, expect } from '@playwright/test';

test.describe('HEZHE Blog Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Check title
    await expect(page).toHaveTitle(/HEZHE/);

    // Check main elements exist
    await expect(page.locator('.sidebar')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.featured-grid')).toBeVisible();
    await expect(page.locator('.latest-list')).toBeVisible();
    await expect(page.locator('.about')).toBeVisible();
    await expect(page.locator('.cta-section')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Check featured card is clickable and has link
    const firstCard = page.locator('.featured-card').first();
    await expect(firstCard).toBeVisible();

    // Click the card should navigate to article page
    await firstCard.click();
    await expect(page.locator('article.post-detail')).toBeVisible();
  });

  test('article page loads', async ({ page }) => {
    await page.goto('http://localhost:4321/posts/deep-learning-creativity/');

    // Check article elements
    await expect(page.locator('.post-title')).toBeVisible();
    await expect(page.locator('.post-content')).toBeVisible();
    await expect(page.locator('.back-link')).toBeVisible();
  });

  test('category page loads', async ({ page }) => {
    await page.goto('http://localhost:4321/categories/技术/');

    // Check category page
    await expect(page.locator('.category-page')).toBeVisible();
    await expect(page.locator('.page-title')).toBeVisible();
  });

  test('tag page loads', async ({ page }) => {
    await page.goto('http://localhost:4321/tags/Tech/');

    // Check tag page
    await expect(page.locator('.tag-page')).toBeVisible();
    await expect(page.locator('.page-title')).toBeVisible();
  });

  test('articles page loads', async ({ page }) => {
    await page.goto('http://localhost:4321/articles/');

    await expect(page.locator('.section-title')).toBeVisible();
    await expect(page.locator('.posts-count')).toBeVisible();
    await expect(page.locator('.latest-list li')).toHaveCount(4);
  });

  test('about page loads', async ({ page }) => {
    await page.goto('http://localhost:4321/about/');

    await expect(page.locator('.about')).toBeVisible();
    await expect(page.locator('.about-avatar')).toBeVisible();
    await expect(page.locator('.skills')).toBeVisible();
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    console.log('Console errors:', errors);
    expect(errors.length).toBe(0);
  });

  test('responsive layout works', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321/');

    // Sidebar should still be visible in mobile
    await expect(page.locator('.sidebar')).toBeVisible();
  });
});
