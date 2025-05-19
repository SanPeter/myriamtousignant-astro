import { test, expect } from '@playwright/test';

test('La page Presse affiche correctement le contenu Markdown', async ({ page }) => {
  await page.goto('/presse/');

  // Vérifier que le titre est correct
  await expect(page.locator('h1')).toContainText('Presse');
  
  // Vérifier que le contenu est chargé
  await expect(page).toHaveScreenshot('presse-page.png');
  
  // Vérifier la présence des entêtes de mois (au moins quelques uns)
  const headings = page.locator('.prose h5');
  const count = await headings.count();
  expect(count).toBeGreaterThan(4);
  
  // Vérifier la présence des liens
  const links = page.locator('.prose a');
  await expect(links).toHaveCount({ gte: 10 });
});
