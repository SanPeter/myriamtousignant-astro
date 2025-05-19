import { test, expect } from '@playwright/test';

test('La page Boutique affiche correctement le contenu Markdown', async ({ page }) => {
  await page.goto('/boutique/');

  // Vérifier que le titre est correct
  await expect(page.locator('h1')).toContainText('Boutique');
  
  // Vérifier que le contenu est chargé
  await expect(page).toHaveScreenshot('boutique-page.png');
  
  // Vérifier la présence des images
  const images = page.locator('img');
  await expect(images).toHaveCount(3);
  
  // Vérifier la présence des liens "Acheter maintenant"
  const buyLinks = page.getByText('Acheter maintenant');
  await expect(buyLinks).toHaveCount(3);
});
