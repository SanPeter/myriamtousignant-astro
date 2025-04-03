import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Myriam Tousignant/);
});

test.describe('Footer layout', () => {
  test('displays content in column on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Taille d'un mobile
    await page.goto('http://localhost:4321/');

    const footer = page.locator('footer');
    const flexDirection = await footer.evaluate((element) => getComputedStyle(element).flexDirection);
    expect(flexDirection).toBe('column');
  });

  test('displays content in row on larger display', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 }); // Taille d'un écran plus grand
    await page.goto('http://localhost:4321/');

    const footer = page.locator('footer');
    const flexDirection = await footer.evaluate((element) => getComputedStyle(element).flexDirection);
    expect(flexDirection).toBe('row');
  });

  test('each div under footer has a list of links', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const divs = page.locator('footer > div');
    const divCount = await divs.count();

    for (let i = 0; i < divCount; i++) {
      const links = divs.nth(i).locator('a');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test('each list of links has a title', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    const divs = page.locator('footer > div');
    const divCount = await divs.count();

    for (let i = 0; i < divCount; i++) {
      const title = divs.nth(i).locator('h2');
      await expect(title).toBeVisible();
    }
  });
  
  
});