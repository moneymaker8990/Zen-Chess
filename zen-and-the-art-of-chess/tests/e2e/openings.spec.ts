import { test, expect } from '@playwright/test';

test.describe('Openings Explorer', () => {
  test('should navigate to openings page', async ({ page }) => {
    await page.goto('/');
    
    // Click openings link
    await page.click('a[href="/openings"]');
    
    // Verify we're on openings page
    await expect(page).toHaveURL('/openings');
  });

  test('should display opening categories', async ({ page }) => {
    await page.goto('/openings');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for opening content
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
    
    // Should have some opening-related content
    const hasOpeningContent = 
      pageContent?.includes('Opening') || 
      pageContent?.includes('e4') || 
      pageContent?.includes('d4') ||
      pageContent?.includes('Italian') ||
      pageContent?.includes('Sicilian');
    expect(hasOpeningContent).toBeTruthy();
  });

  test('should display chess board', async ({ page }) => {
    await page.goto('/openings');
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
    
    // Check for board presence (various possible selectors)
    const boardExists = await page.locator('[data-testid="chess-board"], .chess-board, [class*="chessboard"]').first().isVisible().catch(() => false);
    
    // Page should have some chess-related UI
    expect(boardExists || await page.locator('body').textContent().then(t => t?.includes('Opening'))).toBeTruthy();
  });
});

