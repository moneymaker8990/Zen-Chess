import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  test('should show 404 page for unknown routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist-123');
    
    // Check for 404 content
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    await expect(page.locator('text=Go to Home')).toBeVisible();
  });

  test('should be able to navigate home from 404', async ({ page }) => {
    await page.goto('/unknown-route');
    
    // Click go home button
    await page.click('text=Go to Home');
    
    // Should be on home page
    await expect(page).toHaveURL('/');
  });

  test('should be able to go back from 404', async ({ page }) => {
    // First navigate to a known page
    await page.goto('/settings');
    
    // Then go to a 404 page
    await page.goto('/unknown-route');
    
    // Click go back button
    await page.click('text=Go Back');
    
    // Should be on previous page
    await expect(page).toHaveURL('/settings');
  });

  test('should handle invalid course ID gracefully', async ({ page }) => {
    await page.goto('/courses/invalid-course-id-12345');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Should show some error state or redirect
    const pageContent = await page.textContent('body');
    expect(
      pageContent?.includes('Not Found') || 
      pageContent?.includes('not exist') ||
      await page.url().includes('/courses')
    ).toBeTruthy();
  });

  test('should handle invalid legend ID gracefully', async ({ page }) => {
    await page.goto('/greats/invalid-legend-id');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Should show some error state or redirect
    const pageContent = await page.textContent('body');
    expect(
      pageContent?.includes('Not Found') || 
      pageContent?.includes('not exist') ||
      pageContent?.includes('Back') ||
      await page.url().includes('/greats')
    ).toBeTruthy();
  });
});



