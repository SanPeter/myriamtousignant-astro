import { test, expect } from '@playwright/test';
test.describe('Google Analytics', () => {
  test('should load GA script on homepage', async ({ page }) => {
    // Intercepter les requêtes réseau pour Google Analytics
    let gaRequestCount = 0;
    page.on('request', request => {
      if (request.url().includes('googletagmanager.com')) {
        gaRequestCount++;
      }
    });

    // Charger la page d'accueil
    await page.goto('/');
    
    // Attendre que la page soit complètement chargée
    await page.waitForLoadState('networkidle');

    // Vérifier si le script GA est présent dans le document
    const hasGAScript = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('script'))
        .some(script => script.src?.includes('googletagmanager.com'));
    });

    // Vérifier si la fonction gtag est définie
    const hasGTagFunction = await page.evaluate(() => {
      return typeof window.gtag !== 'undefined';
    });

    expect(hasGAScript || gaRequestCount > 0 || hasGTagFunction).toBeTruthy();
  });
});
