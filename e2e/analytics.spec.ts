import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Fonction utilitaire pour vérifier si GA est activé selon l'environnement
function getGoogleAnalyticsId() {
  try {
    // Essaie de lire le fichier .env pour vérifier l'ID GA
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/PUBLIC_GA_ID=([^\n]+)/);
      if (match) {
        return match[1].trim();
      }
    }
    return '';
  } catch (error) {
    console.error('Error reading GA ID:', error);
    return '';
  }
}

// Vérifie si l'ID Google Analytics est valide
function isGoogleAnalyticsEnabled() {
  const gaId = getGoogleAnalyticsId();
  return !!gaId && gaId !== 'G-XXXXXXXXXX';
}

test.describe('Google Analytics', () => {
  test('should load GA script on homepage if enabled', async ({ page, baseURL }) => {
    // Intercepter les requêtes réseau pour Google Analytics
    let gaRequestCount = 0;
    page.on('request', request => {
      if (request.url().includes('googletagmanager.com')) {
        gaRequestCount++;
      }
    });

    // Charger la page d'accueil
    await page.goto(baseURL || 'http://localhost:4321');
    
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

    if (isGoogleAnalyticsEnabled()) {
      // Si GA est activé, on s'attend à ce que le script soit chargé
      expect(hasGAScript || gaRequestCount > 0 || hasGTagFunction).toBeTruthy();
    } else {
      // Si GA n'est pas activé, on s'attend à ce que le script ne soit pas chargé
      expect(hasGAScript).toBeFalsy();
      expect(gaRequestCount).toBe(0);
    }
  });
});
