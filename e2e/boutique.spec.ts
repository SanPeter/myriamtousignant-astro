import { test, expect } from '@playwright/test';

test('La page Boutique affiche correctement le contenu Markdown', async ({ page }) => {
  await page.goto('/boutique/');

  // Vérifier que le titre est correct
  await expect(page.locator('h1')).toContainText('Boutique');
  
  // Vérifier la présence d'images du contenu
  const images = page.locator('img');
  expect(await images.count()).toBeGreaterThan(0);
  
  // Vérifier la présence des liens "Acheter maintenant" (au moins un)
  const buyLinks = page.getByText('Acheter maintenant');
  expect(await buyLinks.count()).toBeGreaterThan(0);
});
