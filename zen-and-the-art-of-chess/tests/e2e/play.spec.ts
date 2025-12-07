import { test, expect } from '@playwright/test';

test.describe('Play Page', () => {
  test('should navigate to play page', async ({ page }) => {
    await page.goto('/');
    
    // Click play link
    await page.click('a[href="/play"]');
    
    // Verify we're on play page
    await expect(page).toHaveURL('/play');
  });

  test('should display chess board', async ({ page }) => {
    await page.goto('/play');
    
    // Wait for the chess board to load
    await page.waitForSelector('[data-testid="chess-board"], .chess-board, [class*="chessboard"]', { timeout: 10000 });
    
    // Verify board is visible
    const board = page.locator('[data-testid="chess-board"], .chess-board, [class*="chessboard"]').first();
    await expect(board).toBeVisible();
  });

  test('should show game mode options', async ({ page }) => {
    await page.goto('/play');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for play mode elements (vs engine, analysis, etc.)
    const pageContent = await page.textContent('body');
    expect(
      pageContent?.includes('Engine') || 
      pageContent?.includes('Analysis') || 
      pageContent?.includes('Play')
    ).toBeTruthy();
  });
});

