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

    await expect(page.getByTestId('pre-sale-bottom-cta-primary')).toHaveText('Précommander');
  });

  test('s affiche en EN quand lang=en', async ({ page }) => {
    await page.goto('/?lang=en');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(banner).toContainText('Choral narrative');
    await expect(banner).toContainText('Limited edition — 150 copies');
    await expect(page.getByTestId('pre-sale-cta')).toHaveText('Pre-order');
    await expect(page.getByTestId('pre-sale-bottom-cta-primary')).toHaveText('Pre-order');
  });

  test('sticky CTA apparait quand le bloc sort de l ecran', async ({ page }) => {
    await page.goto('/?lang=fr');

    const sticky = page.getByTestId('pre-sale-sticky');
    await expect(sticky).toBeHidden();

    await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'instant' }));

    await expect(sticky).toBeVisible();
    await expect(sticky).toContainText('Prévente en cours — Récit choral');
    await expect(sticky.getByRole('link', { name: 'Précommander' })).toBeVisible();
  });

  test('sticky CTA peut etre ferme', async ({ page }) => {
    await page.goto('/?lang=fr');
    await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'instant' }));

    const sticky = page.getByTestId('pre-sale-sticky');
    await expect(sticky).toBeVisible();

    await sticky.getByRole('button', { name: 'Fermer le rappel prévente' }).click();
    await expect(sticky).toBeHidden();

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'instant' }));
    await expect(sticky).toBeHidden();
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
