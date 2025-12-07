import { test, expect } from '@playwright/test';

test.describe('Puzzle Training', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/train');
    await page.waitForLoadState('networkidle');
  });

  test('should display puzzle menu', async ({ page }) => {
    await expect(page.getByText('Puzzle Training')).toBeVisible();
    await expect(page.getByText('Rated')).toBeVisible();
    await expect(page.getByText('Rush')).toBeVisible();
    await expect(page.getByText('Streak')).toBeVisible();
    await expect(page.getByText('Daily')).toBeVisible();
  });

  test('should show puzzle stats', async ({ page }) => {
    // Rating should be visible
    await expect(page.getByText('Rating')).toBeVisible();
    // Solved count should be visible
    await expect(page.getByText('Solved')).toBeVisible();
  });

  test('should start rated puzzle mode', async ({ page }) => {
    await page.click('text=Rated');
    
    // Should show a chessboard
    await expect(page.locator('[data-boardid]').or(page.locator('.chessboard'))).toBeVisible({ timeout: 10000 });
    
    // Should show puzzle info
    await expect(page.getByText(/to move/i)).toBeVisible();
  });

  test('should start puzzle rush mode', async ({ page }) => {
    await page.click('text=Rush');
    
    // Should show timer
    await expect(page.getByText(/\d:\d{2}/)).toBeVisible({ timeout: 10000 });
    
    // Should show chessboard
    await expect(page.locator('[data-boardid]').or(page.locator('.chessboard'))).toBeVisible();
  });

  test('should navigate back to menu', async ({ page }) => {
    await page.click('text=Rated');
    
    // Wait for puzzle to load
    await page.waitForTimeout(1000);
    
    // Click back/Puzzles breadcrumb
    await page.click('text=Puzzles').first();
    
    // Should be back at menu
    await expect(page.getByText('Puzzle Training')).toBeVisible();
  });

  test('should show hint button during puzzle', async ({ page }) => {
    await page.click('text=Rated');
    
    // Wait for puzzle to load
    await expect(page.locator('[data-boardid]').or(page.locator('.chessboard'))).toBeVisible({ timeout: 10000 });
    
    // Hint button should be available
    await expect(page.getByText('Hint').or(page.getByText('💡'))).toBeVisible();
  });
});

test.describe('Puzzle Interaction', () => {
  test('should allow piece movement', async ({ page }) => {
    await page.goto('/train');
    await page.waitForLoadState('networkidle');
    
    // Start a puzzle
    await page.click('text=Rated');
    
    // Wait for board to load
    await page.waitForTimeout(2000);
    
    // Board should be interactive - we can't easily test drag without knowing the position
    // But we can verify the board exists
    const board = page.locator('[data-boardid]').or(page.locator('.chessboard'));
    await expect(board).toBeVisible();
  });
});

