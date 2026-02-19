import { test, expect } from '@playwright/test';

test.describe('Bloc prévente', () => {
  test('s affiche en FR sur la home avec CTA Square en nouvel onglet', async ({ page }) => {
    await page.goto('/?lang=fr');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Prévente');
    await expect(banner).toContainText('Récit choral | Option d\'achat');

    const cta = page.getByTestId('pre-sale-cta');
    await expect(cta).toHaveText('Acheter sur Square');
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
    await expect(cta).toHaveAttribute('href', /square\.link/);
  });

  test('s affiche en EN quand lang=en', async ({ page }) => {
    await page.goto('/?lang=en');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(banner).toContainText('Pre-sale');
    await expect(banner).toContainText('Choral narrative | Purchase option');
    await expect(page.getByTestId('pre-sale-cta')).toHaveText('Buy on Square');
  });

  test('reste utilisable sur mobile, tablette et desktop', async ({ page }) => {
    for (const viewport of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 800 }
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      const banner = page.getByTestId('pre-sale-banner');
      const cta = page.getByTestId('pre-sale-cta');

      await expect(banner).toBeVisible();
      await expect(cta).toBeVisible();
    }
  });

  test('permet la navigation clavier jusqu au CTA', async ({ page }) => {
    await page.goto('/');

    const cta = page.getByTestId('pre-sale-cta');

    for (let index = 0; index < 12; index += 1) {
      if (await cta.evaluate((node) => node === document.activeElement)) {
        break;
      }
      await page.keyboard.press('Tab');
    }

    await expect(cta).toBeFocused();
  });
});
