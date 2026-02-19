import { test, expect } from '@playwright/test';

test.describe('Bloc prévente', () => {
  test('s affiche en FR sur la home avec CTA Square en nouvel onglet', async ({ page }) => {
    await page.goto('/?lang=fr');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Récit choral');
    await expect(banner).toContainText('Édition limitée — 150 exemplaires');
    await expect(banner).toContainText('Prévente exclusive — dès le 16 mars');
    await expect(banner).toContainText('Édition luxe');

    const heroCta = page.getByTestId('pre-sale-cta');
    await expect(heroCta).toHaveText('Précommander');
    await expect(heroCta).toHaveAttribute('target', '_blank');
    await expect(heroCta).toHaveAttribute('rel', /noopener/);
    await expect(heroCta).toHaveAttribute('href', /square\.link/);

    await expect(page.getByTestId('pre-sale-bottom-cta-primary')).toHaveText('Commander maintenant');
    await expect(page.getByTestId('pre-sale-bottom-cta-secondary')).toHaveText('Réserver mon exemplaire');
  });

  test('s affiche en EN quand lang=en', async ({ page }) => {
    await page.goto('/?lang=en');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(banner).toContainText('Choral narrative');
    await expect(banner).toContainText('Limited edition — 150 copies');
    await expect(page.getByTestId('pre-sale-cta')).toHaveText('Pre-order');
    await expect(page.getByTestId('pre-sale-bottom-cta-primary')).toHaveText('Order now');
    await expect(page.getByTestId('pre-sale-bottom-cta-secondary')).toHaveText('Reserve my copy');
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
