import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for initial load
    await page.waitForLoadState('networkidle');
  });

  test('should load home page', async ({ page }) => {
    await expect(page).toHaveTitle(/Zen Chess/);
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('should navigate to puzzles page', async ({ page }) => {
    await page.click('text=Puzzles');
    await expect(page).toHaveURL(/\/train/);
    await expect(page.getByText('Puzzle Training')).toBeVisible();
  });

  test('should navigate to play page', async ({ page }) => {
    await page.click('text=Play Chess');
    await expect(page).toHaveURL(/\/play/);
    await expect(page.getByRole('heading', { name: 'Play' })).toBeVisible();
  });

  test('should navigate to daily challenges', async ({ page }) => {
    await page.click("text=Today's Challenge");
    await expect(page).toHaveURL(/\/daily-challenges/);
  });

  test('should navigate to courses page', async ({ page }) => {
    await page.click('text=Courses');
    await expect(page).toHaveURL(/\/courses/);
  });

  test('should navigate to settings page', async ({ page }) => {
    // Click settings icon in sidebar/nav
    await page.click('[aria-label="Settings"]').catch(() => {
      // Try alternative selector
      return page.click('text=Settings');
    });
    await expect(page).toHaveURL(/\/settings/);
  });

  test('should handle back navigation', async ({ page }) => {
    // Navigate to puzzles
    await page.click('text=Puzzles');
    await expect(page).toHaveURL(/\/train/);
    
    // Go back
    await page.goBack();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('should display mobile-friendly layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Home page should be visible
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('should navigate on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click puzzles - may need to handle mobile nav menu
    const puzzlesLink = page.getByText('Puzzles').first();
    if (await puzzlesLink.isVisible()) {
      await puzzlesLink.click();
      await expect(page).toHaveURL(/\/train/);
    }
  });
});



