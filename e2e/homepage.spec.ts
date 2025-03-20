import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4321/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Myriam Tousignant/);
});

// test('h1 has correct color', async ({ page }) => {
//   await page.goto('http://localhost:4321/');

//   // Expect the h1 with text "Hello World!" to have the color oklch(0.623 0.214 259.815).
//   const h1Element = page.locator('h1').filter({ hasText: 'Hello, World!' }).first();
//   const color = await h1Element.evaluate((element) => getComputedStyle(element).color);
//   expect(color).toBe('oklch(0.623 0.214 259.815)');
// });

// test('h1 has correct classes', async ({ page }) => {
//   await page.goto('http://localhost:4321/');

//   // Expect the h1 with text "Hello World!" to have classes "text-3xl" and "text-blue-500".
//   const h1Element = page.locator('h1').filter({ hasText: 'Hello, World!' }).first();
//   const classList = await h1Element.evaluate((element) => Array.from(element.classList));
//   expect(classList).toContain('text-3xl');
//   expect(classList).toContain('text-blue-500');
// });