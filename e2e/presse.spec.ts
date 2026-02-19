import { test, expect } from '@playwright/test';

test('La page Presse affiche correctement le contenu Markdown', async ({ page }) => {
  await page.goto('/presse/');

  // Vérifier que le titre est correct
  await expect(page.locator('h1').first()).toContainText('Presse');
  
  // Vérifier la présence des entêtes de mois (au moins quelques uns)
  const headings = page.locator('.prose h2, .prose h3, .prose h4, .prose h5');
  const count = await headings.count();
  expect(count).toBeGreaterThan(0);
  
  // Vérifier la présence des liens
  const links = page.locator('.prose a');
  const linksCount = await links.count();
  expect(linksCount).toBeGreaterThan(0);
});
