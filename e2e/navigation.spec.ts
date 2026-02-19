import { test, expect } from '@playwright/test';

const desktopMenuCases = [
  { menu: 'oeuvres', link: 'Projets', expectedUrl: /\/projets\/?$/, heading: 'Projets' },
  { menu: 'oeuvres', link: 'Art Public', expectedUrl: /\/art-public\/?$/, heading: 'Art Public' },
  { menu: 'oeuvres', link: 'Livres d\'artiste', expectedUrl: /\/livres-artiste\/?$/, heading: 'Livres d\'artiste' },
  { menu: 'evenements', link: 'Expositions', expectedUrl: /\/expositions\/?$/, heading: 'Expositions' },
  { menu: 'evenements', link: 'Médiations', expectedUrl: /\/mediations\/?$/, heading: 'Médiations' },
  { menu: 'ressources', link: 'Publications', expectedUrl: /\/publications\/?$/, heading: 'Publications' },
  { menu: 'ressources', link: 'Presse', expectedUrl: /\/presse\/?$/, heading: 'Presse' },
  { menu: 'apropos', link: 'Biographie & Démarche', expectedUrl: /\/biographie-demarche\/?$/, heading: /Biographie|Démarche/ },
  { menu: 'apropos', link: 'Boutique', expectedUrl: /\/boutique\/?$/, heading: 'Boutique' },
];

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
  });

  test('Toutes les pages principales sont accessibles depuis le méga-menu desktop', async ({ page }) => {
    for (const menuCase of desktopMenuCases) {
      await page.goto('/');
      await expect(page).toHaveTitle(/Myriam Tousignant/);

      await page.locator(`button[aria-controls="megamenu-${menuCase.menu}"]`).click();
      await page.locator(`#megamenu-${menuCase.menu} a`, { hasText: menuCase.link }).click();

      await expect(page).toHaveURL(menuCase.expectedUrl);
      await expect(page.locator('h1').first()).toContainText(menuCase.heading);
    }
  });

  test('La grille projets affiche des cartes avec titre et image', async ({ page }) => {
    await page.goto('/projets');
    await page.waitForLoadState('networkidle');

    const cards = page.locator('.grid-projets li');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);

    await expect(cards.first().locator('h5')).toBeVisible();
    await expect(cards.first().locator('img')).toBeVisible();
  });

  test('Une carte projet ouvre une page détail avec un titre', async ({ page }) => {
    await page.goto('/projets');
    await page.waitForLoadState('networkidle');

    await page.locator('.grid-projets a').first().click();

    await expect(page).toHaveURL(/\/projets\/.+/);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('article .prose')).toBeVisible();
  });
});
