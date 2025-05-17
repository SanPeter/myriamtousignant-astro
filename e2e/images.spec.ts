import { test, expect } from '@playwright/test';

test.describe('Image Optimization Tests', () => {
  test('should display optimized images on project list page', async ({ page }) => {
    await page.goto('/projets');
    
    // Vérifier que la page contient des images
    const images = await page.$$('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Vérifier que les images utilisent des attributs appropriés pour l'optimisation
    for (const image of images) {
      // Vérifier les attributs srcset ou picture pour responsive images
      const hasSrcSet = await image.getAttribute('srcset');
      const isInPicture = await page.evaluate(el => {
        return el.closest('picture') !== null;
      }, image);
      
      // L'une des deux conditions devrait être vraie pour les images optimisées
      expect(hasSrcSet !== null || isInPicture).toBeTruthy();
      
      // Vérifier que les images ont des attributs de chargement paresseux
      const loadingAttr = await image.getAttribute('loading');
      expect(loadingAttr === 'lazy' || loadingAttr === null).toBeTruthy();
    }
  });

  test('should display optimized images on project detail page', async ({ page }) => {
    // Naviguer vers une page de projet spécifique 
    // (vous devrez peut-être adapter cette URL à un projet qui existe réellement)
    await page.goto('/projets');
    
    // Cliquer sur le premier projet pour accéder à sa page détaillée
    await page.click('.grid a:first-child');
    
    // Vérifier que la page a chargé correctement
    await expect(page).toHaveURL(/\/projets\/[^/]+/);
    
    // Vérifier que le carousel d'images est présent
    const carousel = await page.$('.carousel');
    expect(carousel).not.toBeNull();
    
    // Vérifier que les images du carousel sont optimisées
    const carouselImages = await page.$$('.carousel img');
    expect(carouselImages.length).toBeGreaterThan(0);
    
    // Vérifier les attributs d'optimisation sur au moins une image
    const firstImage = carouselImages[0];
    const width = await firstImage.getAttribute('width');
    const height = await firstImage.getAttribute('height');
    
    // Les images optimisées doivent avoir des dimensions définies
    expect(width).not.toBeNull();
    expect(height).not.toBeNull();
  });
});
