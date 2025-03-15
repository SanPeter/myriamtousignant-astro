import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hello, Astro!/);
});

test('has heading', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect at least one h1 to have the text "Hello World!".
  const h1Element = page.locator('h1').filter({ hasText: 'Hello, World!' }).filter();
  await expect(h1Element).toHaveText('Hello, World!');
});