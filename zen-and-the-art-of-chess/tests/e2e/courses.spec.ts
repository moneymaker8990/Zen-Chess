import { test, expect } from '@playwright/test';

test.describe('Courses Page', () => {
  test('should navigate to courses page', async ({ page }) => {
    await page.goto('/');
    
    // Click courses link
    await page.click('a[href="/courses"]');
    
    // Verify we're on courses page
    await expect(page).toHaveURL('/courses');
  });

  test('should display course list', async ({ page }) => {
    await page.goto('/courses');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for course content
    const pageContent = await page.textContent('body');
    expect(
      pageContent?.includes('Course') || 
      pageContent?.includes('Tactics') || 
      pageContent?.includes('Strategy') ||
      pageContent?.includes('Endgame')
    ).toBeTruthy();
  });

  test('should be able to click on a course', async ({ page }) => {
    await page.goto('/courses');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Try to find and click a course card
    const courseCard = page.locator('[href*="/courses/"]').first();
    
    if (await courseCard.isVisible()) {
      await courseCard.click();
      
      // Should navigate to course detail
      await expect(page).toHaveURL(/\/courses\/.+/);
    }
  });
});


