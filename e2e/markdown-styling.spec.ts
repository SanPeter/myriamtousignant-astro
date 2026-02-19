import { test, expect } from '@playwright/test';

test('Les paragraphes dans le contenu Markdown ont un espacement correct', async ({ page }) => {
  // Accéder à une page qui contient du contenu Markdown
  await page.goto('/projets/diffuser-confinee');
  
  // Attendre que la page se charge complètement
  await page.waitForSelector('.prose p');
  
  // Obtenir tous les paragraphes dans la section prose
  const paragraphs = await page.locator('.prose p').all();
  
  // Vérifier qu'il y a au moins un paragraphe
  expect(paragraphs.length).toBeGreaterThan(0);
  
  // Pour chaque paragraphe sauf le dernier, vérifier la marge (> 0)
  if (paragraphs.length > 1) {
    for (let i = 0; i < paragraphs.length - 1; i++) {
      // Obtenir la marge inférieure du paragraphe actuel
      const marginBottom = await paragraphs[i].evaluate(node => {
        return parseFloat(window.getComputedStyle(node).marginBottom);
      });
      
      expect(marginBottom).toBeGreaterThan(0);
    }
    
    // Vérifier que le dernier paragraphe n'a pas de marge significative
    const lastMarginBottom = await paragraphs[paragraphs.length - 1].evaluate(node => {
      return parseFloat(window.getComputedStyle(node).marginBottom);
    });
    
    expect(lastMarginBottom).toBeLessThanOrEqual(1);
  }
});

test('Les liens dans le contenu Markdown sont correctement stylés', async ({ page }) => {
  await page.goto('/presse');
  const firstLink = page.locator('.prose a').first();
  await expect(firstLink).toBeVisible();

  const textDecoration = await firstLink.evaluate(node => {
    return window.getComputedStyle(node).textDecoration;
  });
  expect(textDecoration.includes('underline')).toBeTruthy();
});
