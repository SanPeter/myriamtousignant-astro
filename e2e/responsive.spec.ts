import { test, expect } from '@playwright/test';

test.describe('Layout Responsiveness Tests', () => {
  test('Le layout s\'adapte correctement sur mobile', async ({ page }) => {
    // Configurer une taille mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Vérifier que le bouton menu mobile est présent
    const menuToggle = page.getByRole('button', { name: 'Toggle navigation' });
    await expect(menuToggle).toBeVisible();
    
    // Vérifier que le grid des projets s'affiche en une seule colonne sur mobile
    await page.goto('/projets');
    const cards = page.locator('.grid-projets li');
    await expect(cards.first()).toBeVisible();
    if (await cards.count() > 1) {
      const first = await cards.first().boundingBox();
      const second = await cards.nth(1).boundingBox();
      expect(first && second).toBeTruthy();
      if (first && second) {
        expect(Math.abs(first.x - second.x)).toBeLessThan(5);
      }
    }
  });

  test('Le layout s\'adapte correctement sur desktop', async ({ page }) => {
    // Configurer une taille desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // Vérifier présence du menu desktop et absence du bouton mobile visible
    await expect(page.locator('button[aria-controls="megamenu-oeuvres"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Toggle navigation' })).toBeHidden();
    
    // Vérifier que le grid des projets s'affiche en plusieurs colonnes sur desktop
    await page.goto('/projets');
    const cards = page.locator('.grid-projets li');
    await expect(cards.first()).toBeVisible();
    if (await cards.count() > 1) {
      const first = await cards.first().boundingBox();
      const second = await cards.nth(1).boundingBox();
      expect(first && second).toBeTruthy();
      if (first && second) {
        expect(Math.abs(first.x - second.x)).toBeGreaterThan(10);
      }
    }
  });
});
