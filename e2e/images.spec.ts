import { test, expect } from '@playwright/test';

test.describe('Image Optimization Tests', () => {
  test('should display optimized images on project list page', async ({ page }) => {
    await page.goto('/projets');
    
    // Vérifier que la page contient des images
    const images = await page.$$('img');
    expect(images.length).toBeGreaterThan(0);
    
    // Vérifier qu'au moins une image est servie via le pipeline Astro (_image)
    let hasAstroOptimizedImage = false;
    for (const image of images) {
      const src = await image.getAttribute('src');
      if (src?.includes('/_image?')) {
        hasAstroOptimizedImage = true;
        break;
      }
    }
    expect(hasAstroOptimizedImage).toBeTruthy();
  });

  test('should display optimized images on detail page', async ({ page }) => {
    await page.goto('/expositions/maskipeche-boucherville');

    const detailImages = page.locator('article img, .grid img');
    expect(await detailImages.count()).toBeGreaterThan(0);

    const firstImage = detailImages.first();
    const width = await firstImage.getAttribute('width');
    const height = await firstImage.getAttribute('height');
    expect(width).not.toBeNull();
    expect(height).not.toBeNull();
  });
});
