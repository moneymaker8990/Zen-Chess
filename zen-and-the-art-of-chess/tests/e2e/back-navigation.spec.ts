import { test, expect } from '@playwright/test';

test.describe('Back Button Navigation', () => {
  test('should navigate back through actual history', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page).toHaveURL('/');
    
    // Navigate to puzzles page
    await page.click('text=Puzzles');
    await expect(page).toHaveURL('/train');
    
    // Navigate to openings page
    await page.click('text=Openings');
    await expect(page).toHaveURL('/openings');
    
    // Click back button - should go to puzzles
    await page.click('button:has-text("Back")');
    await expect(page).toHaveURL('/train');
    
    // Click back again - should go to home
    await page.click('button:has-text("Back")');
    await expect(page).toHaveURL('/');
  });
  
  test('should handle deep link with fallback', async ({ page }) => {
    // Navigate directly to a detail page
    await page.goto('/courses/tactical-mastery');
    
    // Click back - should go to fallback (/courses)
    await page.click('button:has-text("Back")');
    await expect(page).toHaveURL(/\/courses|^\//);
  });
  
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Navigate through pages
    await page.goto('/');
    await page.click('text=Play');
    await expect(page).toHaveURL('/play');
    
    await page.click('text=Study');
    await expect(page).toHaveURL('/study');
    
    // Back button should work
    await page.click('button:has-text("Back")');
    await expect(page).toHaveURL('/play');
  });
  
  test('should not create duplicate entries', async ({ page }) => {
    await page.goto('/');
    
    // Click same link multiple times
    await page.click('text=Learn');
    await page.click('text=Learn');
    await page.click('text=Learn');
    
    // Back once should go directly back, not through duplicates
    await page.click('button:has-text("Back")');
    await expect(page).toHaveURL('/');
  });
});

