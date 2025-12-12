import { test, expect } from '@playwright/test';

test.describe('Settings Page', () => {
  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/');
    
    // Click settings link
    await page.click('a[href="/settings"]');
    
    // Verify we're on settings page
    await expect(page.locator('h1')).toContainText('Settings');
  });

  test('should display all settings sections', async ({ page }) => {
    await page.goto('/settings');
    
    // Check for main sections
    await expect(page.locator('text=Game Settings')).toBeVisible();
    await expect(page.locator('text=Board Appearance')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('should toggle sound setting', async ({ page }) => {
    await page.goto('/settings');
    
    // Find sound toggle button
    const soundToggle = page.locator('text=Sound Effects').locator('..').locator('button');
    
    // Get initial state
    const initialState = await soundToggle.getAttribute('class');
    
    // Click toggle
    await soundToggle.click();
    
    // Verify state changed
    const newState = await soundToggle.getAttribute('class');
    expect(newState).not.toBe(initialState);
  });

  test('should navigate to legal pages from settings', async ({ page }) => {
    await page.goto('/settings');
    
    // Click Privacy Policy link
    await page.click('text=Privacy Policy');
    await expect(page).toHaveURL('/privacy');
    
    // Go back to settings
    await page.goBack();
    
    // Click Terms of Service link
    await page.click('text=Terms of Service');
    await expect(page).toHaveURL('/terms');
  });
});







