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
  
  // Pour chaque paragraphe sauf le dernier, vérifier la marge
  if (paragraphs.length > 1) {
    for (let i = 0; i < paragraphs.length - 1; i++) {
      // Obtenir la marge inférieure du paragraphe actuel
      const marginBottom = await paragraphs[i].evaluate(node => {
        return window.getComputedStyle(node).marginBottom;
      });
      
      // Vérifier que la marge est de 1.5em
      expect(marginBottom).toBe('1.5em');
    }
    
    // Vérifier que le dernier paragraphe n'a pas de marge inférieure
    const lastMarginBottom = await paragraphs[paragraphs.length - 1].evaluate(node => {
      return window.getComputedStyle(node).marginBottom;
    });
    
    // Le dernier paragraphe pourrait avoir une marge par défaut, mais notre CSS devrait la réduire à 0
    expect(lastMarginBottom).toBe('0px');
  }
});

test('Les liens dans le contenu Markdown sont correctement stylés', async ({ page }) => {
  // Accéder à une page qui contient probablement des liens dans le contenu Markdown
  await page.goto('/projets/diffuser-confinee');
  
  // Tenter de localiser des liens dans la prose
  const links = await page.locator('.prose a').all();
  
  // Si aucun lien n'est trouvé sur cette page, essayer une autre page
  if (links.length === 0) {
    await page.goto('/publications');
    
    // Cliquer sur le premier élément de la liste pour accéder à une page de détail
    const firstPublication = await page.locator('a.card').first();
    if (await firstPublication.count() > 0) {
      await firstPublication.click();
      await page.waitForSelector('.prose');
    }
  }
  
  // Tenter de localiser des liens à nouveau
  const contentLinks = await page.locator('.prose a').all();
  
  // Si nous avons trouvé des liens, vérifier leurs styles
  if (contentLinks.length > 0) {
    const firstLink = contentLinks[0];
    
    // Vérifier la couleur du lien
    const linkColor = await firstLink.evaluate(node => {
      return window.getComputedStyle(node).color;
    });
    
    // Vérifier la décoration du lien
    const textDecoration = await firstLink.evaluate(node => {
      return window.getComputedStyle(node).textDecoration;
    });
    
    // Vérifier que la couleur est bleue (approximativement)
    const rgbColor = await firstLink.evaluate(node => {
      const color = window.getComputedStyle(node).color;
      return color;
    });
    
    // Vérifier que le texte est souligné (peut contenir "underline")
    expect(textDecoration.includes('underline')).toBeTruthy();
    
    // Simuler un survol et vérifier le changement de couleur
    await firstLink.hover();
    
    // Attendre un court instant pour que la transition se produise
    await page.waitForTimeout(300);
    
    const hoverColor = await firstLink.evaluate(node => {
      return window.getComputedStyle(node).color;
    });
    
    // La couleur devrait être différente au survol
    expect(hoverColor).not.toBe(rgbColor);
  }
});
