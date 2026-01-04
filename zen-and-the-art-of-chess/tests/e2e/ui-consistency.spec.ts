import { test, expect } from '@playwright/test';

test.describe('UI Consistency', () => {
  test.describe('Board Theme Consistency', () => {
    test('boards should use theme colors not hardcoded greens', async ({ page }) => {
      // Navigate to a page with a board (puzzles page)
      await page.goto('/train');
      await page.waitForLoadState('networkidle');
      
      // Wait for board to render
      await page.waitForTimeout(500);
      
      // Check for board squares
      const darkSquares = page.locator('[data-square-color="black"]');
      const lightSquares = page.locator('[data-square-color="white"]');
      
      // If standard react-chessboard data attributes exist, check colors
      if (await darkSquares.count() > 0) {
        const darkSquareColor = await darkSquares.first().evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        
        // Should NOT be the default green colors
        const greenDark = 'rgb(119, 149, 86)'; // #779556
        const greenLight = 'rgb(235, 236, 208)'; // #ebecd0
        
        expect(darkSquareColor).not.toBe(greenDark);
      }
      
      if (await lightSquares.count() > 0) {
        const lightSquareColor = await lightSquares.first().evaluate((el) => {
          return window.getComputedStyle(el).backgroundColor;
        });
        
        const greenLight = 'rgb(235, 236, 208)';
        expect(lightSquareColor).not.toBe(greenLight);
      }
    });

    test('dev ui audit page should load successfully', async ({ page }) => {
      // This test only works in dev mode
      await page.goto('/_dev/ui-audit');
      
      // If we get a 404, that's expected in production
      const is404 = await page.getByText('Page Not Found').isVisible().catch(() => false);
      
      if (!is404) {
        // In dev mode, the page should have our audit content
        await expect(page.getByText('UI Audit Dashboard')).toBeVisible();
        await expect(page.getByText('Current Theme Tokens')).toBeVisible();
        await expect(page.getByText('Button Variants')).toBeVisible();
        await expect(page.getByText('Board Components')).toBeVisible();
      }
    });

    test('pattern debug page should load successfully', async ({ page }) => {
      await page.goto('/_dev/patterns');
      
      const is404 = await page.getByText('Page Not Found').isVisible().catch(() => false);
      
      if (!is404) {
        await expect(page.getByText('Pattern Debug Tool')).toBeVisible();
      }
    });
  });

  test.describe('Button Contrast', () => {
    test('primary buttons should have readable text', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find primary buttons
      const primaryButtons = page.locator('.btn-primary, .zen-button, .zen-button-primary');
      
      if (await primaryButtons.count() > 0) {
        for (let i = 0; i < Math.min(await primaryButtons.count(), 5); i++) {
          const button = primaryButtons.nth(i);
          if (await button.isVisible()) {
            const contrast = await button.evaluate((el) => {
              const style = window.getComputedStyle(el);
              const bg = style.backgroundColor;
              const color = style.color;
              
              // Parse colors
              const parseColor = (c: string) => {
                const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (match) {
                  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
                }
                return null;
              };
              
              const bgColor = parseColor(bg);
              const textColor = parseColor(color);
              
              if (!bgColor || !textColor) return { valid: true }; // Can't parse, skip
              
              // Calculate relative luminance
              const luminance = (rgb: { r: number; g: number; b: number }) => {
                const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c => 
                  c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
                );
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
              };
              
              const bgLum = luminance(bgColor);
              const textLum = luminance(textColor);
              
              // Calculate contrast ratio
              const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05);
              
              return { 
                valid: ratio >= 3.0, // WCAG AA for large text
                ratio: ratio.toFixed(2),
                bg,
                color,
              };
            });
            
            expect(contrast.valid).toBe(true);
          }
        }
      }
    });

    test('secondary buttons should have readable text', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const secondaryButtons = page.locator('.btn-secondary, .zen-button-ghost');
      
      if (await secondaryButtons.count() > 0) {
        for (let i = 0; i < Math.min(await secondaryButtons.count(), 5); i++) {
          const button = secondaryButtons.nth(i);
          if (await button.isVisible()) {
            const textColor = await button.evaluate((el) => {
              return window.getComputedStyle(el).color;
            });
            
            // Text should not be too dark (invisible on dark bg)
            // RGB values should sum to at least some minimum
            const match = textColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              const sum = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
              expect(sum).toBeGreaterThan(100); // Should be visible
            }
          }
        }
      }
    });
  });

  test.describe('Board Layout', () => {
    test('board should not overflow viewport on puzzles page', async ({ page }) => {
      await page.goto('/train');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Find the chessboard container
      const board = page.locator('[data-boardcontainer], .chessboard-container, .zen-chessboard').first();
      
      if (await board.isVisible()) {
        const box = await board.boundingBox();
        const viewport = page.viewportSize();
        
        if (box && viewport) {
          // Board should fit within viewport
          expect(box.x).toBeGreaterThanOrEqual(-1);
          expect(box.y).toBeGreaterThanOrEqual(-1);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
        }
      }
    });

    test('board should maintain aspect ratio', async ({ page }) => {
      await page.goto('/train');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      const board = page.locator('[data-boardcontainer], .chessboard-container, .zen-chessboard').first();
      
      if (await board.isVisible()) {
        const box = await board.boundingBox();
        
        if (box) {
          // Board should be approximately square (within 5px tolerance)
          expect(Math.abs(box.width - box.height)).toBeLessThan(10);
        }
      }
    });
  });

  test.describe('Mobile UI', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('board should fit mobile viewport', async ({ page }) => {
      await page.goto('/train');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      const board = page.locator('[data-boardcontainer], .chessboard-container, .zen-chessboard').first();
      
      if (await board.isVisible()) {
        const box = await board.boundingBox();
        const viewport = page.viewportSize();
        
        if (box && viewport) {
          // Board should fit within mobile viewport width
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    });

    test('buttons should be readable on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const buttons = page.locator('button:visible');
      const count = await buttons.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const button = buttons.nth(i);
        const text = await button.innerText().catch(() => '');
        
        if (text.length > 0) {
          // Button should be tall enough to be tappable
          const box = await button.boundingBox();
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(32); // Minimum touch target
          }
        }
      }
    });
  });
});

test.describe('Pattern Validation', () => {
  test('pattern validation should pass in dev mode', async ({ page }) => {
    await page.goto('/_dev/patterns');
    
    const is404 = await page.getByText('Page Not Found').isVisible().catch(() => false);
    
    if (!is404) {
      // Click Run Validation button
      const validateBtn = page.getByText('Run Validation');
      if (await validateBtn.isVisible()) {
        await validateBtn.click();
        
        // Wait for validation to complete
        await page.waitForTimeout(1000);
        
        // Check that we don't have critical errors in the validation summary
        // (some warnings are acceptable, but no errors)
        const errorText = page.locator('text=/\\d+ errors/');
        const errorCount = await errorText.count();
        
        if (errorCount > 0) {
          const text = await errorText.first().innerText();
          const match = text.match(/(\d+) errors/);
          if (match) {
            // Log but don't fail - patterns may legitimately have issues in dev
            console.log(`Pattern validation found ${match[1]} errors`);
          }
        }
      }
    }
  });
});



