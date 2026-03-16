import { test, expect } from '@playwright/test';

test.describe('Bloc prévente', () => {
  test('s affiche en FR sur la home avec deux CTA Square en nouvel onglet', async ({ page }) => {
    await page.goto('/');

    const banner = page.getByTestId('pre-sale-banner');
    await expect(banner).toBeVisible();
    await expect(banner).toContainText('Récit choral');
    await expect(banner).toContainText('Édition limitée — 150 exemplaires');
    await expect(banner).toContainText('Prévente exclusive — dès le 16 mars');
    await expect(banner).toContainText('Édition luxe');

    const limitedHeroCta = page.getByTestId('pre-sale-cta-limited');
    const luxeHeroCta = page.getByTestId('pre-sale-cta-luxe');
    await expect(limitedHeroCta).toHaveText('Commander l’édition limitée');
    await expect(luxeHeroCta).toHaveText('Commander l’édition luxe');

    for (const cta of [limitedHeroCta, luxeHeroCta]) {
      await expect(cta).toHaveAttribute('target', '_blank');
      await expect(cta).toHaveAttribute('rel', /noopener/);
      await expect(cta).toHaveAttribute('href', /square\.link/);
    }

    await expect(page.getByTestId('pre-sale-bottom-cta-limited')).toHaveText('Commander cette édition');
    await expect(page.getByTestId('pre-sale-bottom-cta-luxe')).toHaveText('Réserver l’édition luxe');
  });

  test('sticky CTA apparait quand le bloc sort de l ecran', async ({ page }) => {
    await page.goto('/');

    const sticky = page.getByTestId('pre-sale-sticky');
    await expect(sticky).toBeHidden();

    await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'instant' }));

    await expect(sticky).toBeVisible();
    await expect(sticky).toContainText('Prévente en cours');
    await expect(sticky).toContainText('Choisissez votre édition sur Square.');
    await expect(sticky.getByTestId('pre-sale-sticky-cta-limited')).toBeVisible();
    await expect(sticky.getByTestId('pre-sale-sticky-cta-luxe')).toBeVisible();
  });

  test('sticky CTA peut etre ferme', async ({ page }) => {
    await page.goto('/');
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
      const limitedCta = page.getByTestId('pre-sale-cta-limited');
      const luxeCta = page.getByTestId('pre-sale-cta-luxe');

      await expect(banner).toBeVisible();
      await expect(limitedCta).toBeVisible();
      await expect(luxeCta).toBeVisible();
    }
  });

  test('sur iPhone 13 mini les badges restent dans la tuile et la description garde une largeur lisible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    for (const editionId of ['limited', 'luxe']) {
      const card = page.getByTestId(`pre-sale-card-${editionId}`);
      const badge = page.getByTestId(`pre-sale-card-badge-${editionId}`);
      const summary = page.getByTestId(`pre-sale-card-summary-${editionId}`);

      await expect(card).toBeVisible();
      await expect(badge).toBeVisible();
      await expect(summary).toBeVisible();

      const cardBox = await card.boundingBox();
      const badgeBox = await badge.boundingBox();
      const summaryBox = await summary.boundingBox();

      expect(cardBox).not.toBeNull();
      expect(badgeBox).not.toBeNull();
      expect(summaryBox).not.toBeNull();

      if (!cardBox || !badgeBox || !summaryBox) {
        throw new Error('Bounding boxes are required for responsive layout assertions.');
      }

      expect(badgeBox.x).toBeGreaterThanOrEqual(cardBox.x - 1);
      expect(badgeBox.x + badgeBox.width).toBeLessThanOrEqual(cardBox.x + cardBox.width + 1);
      expect(summaryBox.width).toBeGreaterThan(cardBox.width * 0.7);
      expect(badgeBox.y).toBeGreaterThan(summaryBox.y + 8);
    }
  });

  test('affiche un toast contextuel avant ouverture de Square', async ({ page }) => {
    await page.goto('/');

    const limitedCta = page.getByTestId('pre-sale-cta-limited');
    await limitedCta.click();

    await expect(page.locator('[data-pre-sale-toast]')).toContainText(
      'Ouverture de Square pour l’édition limitée.'
    );
  });

  test('permet la navigation clavier jusqu au premier CTA', async ({ page }) => {
    await page.goto('/');

    const cta = page.getByTestId('pre-sale-cta-limited');

    for (let index = 0; index < 12; index += 1) {
      if (await cta.evaluate((node) => node === document.activeElement)) {
        break;
      }
      await page.keyboard.press('Tab');
    }

    await expect(cta).toBeFocused();
  });
});
