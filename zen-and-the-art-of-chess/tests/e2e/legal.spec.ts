import { test, expect } from '@playwright/test';

test.describe('Legal Pages', () => {
  test('should display privacy policy page', async ({ page }) => {
    await page.goto('/privacy');
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Check for key sections
    await expect(page.locator('text=Information We Collect')).toBeVisible();
    await expect(page.locator('text=How We Use Your Information')).toBeVisible();
    await expect(page.locator('text=Third-Party Services')).toBeVisible();
  });

  test('should display terms of service page', async ({ page }) => {
    await page.goto('/terms');
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Terms of Service');
    
    // Check for key sections
    await expect(page.locator('text=Agreement to Terms')).toBeVisible();
    await expect(page.locator('text=Acceptable Use')).toBeVisible();
    await expect(page.locator('text=Intellectual Property')).toBeVisible();
  });

  test('should navigate between legal pages', async ({ page }) => {
    await page.goto('/privacy');
    
    // Click Terms of Service link
    await page.click('text=Terms of Service');
    await expect(page).toHaveURL('/terms');
    
    // Click Privacy Policy link
    await page.click('text=Privacy Policy');
    await expect(page).toHaveURL('/privacy');
  });

  test('should have back button functionality', async ({ page }) => {
    await page.goto('/');
    await page.goto('/privacy');
    
    // Click back button
    await page.click('text=← Back');
    
    // Should go back to previous page
    await expect(page).toHaveURL('/');
  });
});





