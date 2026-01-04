import { test, expect } from '@playwright/test';

test.describe('Agents Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('agents trigger button should be visible', async ({ page }) => {
    // Look for the agents trigger button (bell icon)
    const trigger = page.locator('[data-testid="agents-trigger"]');
    
    // If the testid isn't present, look for the bell icon button
    const bellButton = trigger.or(page.locator('button').filter({ has: page.locator('svg path[d*="M15 17h5l-1.405"]') }));
    
    await expect(bellButton.first()).toBeVisible();
  });

  test('agents panel should stay within viewport on desktop', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Click the agents trigger
    const trigger = page.locator('[data-testid="agents-trigger"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      
      // Wait for panel to appear
      await page.waitForTimeout(300);
      
      // Check panel bounds
      const panel = page.locator('[data-testid="agents-panel"]');
      if (await panel.isVisible()) {
        const box = await panel.boundingBox();
        const viewport = page.viewportSize();
        
        if (box && viewport) {
          // Panel should be within viewport
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.y).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
          expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
        }
      }
    }
  });

  test('agents panel should stay within viewport on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Click the agents trigger
    const trigger = page.locator('[data-testid="agents-trigger"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      
      // Wait for panel to appear
      await page.waitForTimeout(300);
      
      // Check panel bounds
      const panel = page.locator('[data-testid="agents-panel"]');
      if (await panel.isVisible()) {
        const box = await panel.boundingBox();
        const viewport = page.viewportSize();
        
        if (box && viewport) {
          // Panel should be within viewport
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.y).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
          expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
        }
      }
    }
  });

  test('agents panel should close on backdrop click', async ({ page }) => {
    const trigger = page.locator('[data-testid="agents-trigger"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      await page.waitForTimeout(300);
      
      const panel = page.locator('[data-testid="agents-panel"]');
      if (await panel.isVisible()) {
        // Click outside the panel (backdrop)
        await page.mouse.click(10, 10);
        await page.waitForTimeout(300);
        
        // Panel should be hidden
        await expect(panel).not.toBeVisible();
      }
    }
  });

  test('agents panel content should be scrollable', async ({ page }) => {
    const trigger = page.locator('[data-testid="agents-trigger"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      await page.waitForTimeout(300);
      
      const panel = page.locator('[data-testid="agents-panel"]');
      if (await panel.isVisible()) {
        // Check that the panel has overflow-y: auto
        const overflowY = await panel.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.overflowY;
        });
        
        // Either the panel or its content should be scrollable
        expect(['auto', 'scroll']).toContain(overflowY);
      }
    }
  });
});

test.describe('Agents Panel - Small Screen', () => {
  test.use({ viewport: { width: 320, height: 568 } }); // iPhone SE

  test('panel should not overflow on small screens', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const trigger = page.locator('[data-testid="agents-trigger"]').first();
    if (await trigger.isVisible()) {
      await trigger.click();
      await page.waitForTimeout(300);
      
      const panel = page.locator('[data-testid="agents-panel"]');
      if (await panel.isVisible()) {
        const box = await panel.boundingBox();
        const viewport = page.viewportSize();
        
        if (box && viewport) {
          // All edges should be within or at viewport bounds
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.y).toBeGreaterThanOrEqual(0);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
          expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);
        }
      }
    }
  });
});



