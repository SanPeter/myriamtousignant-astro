import { test, expect } from '@playwright/test';

test('Le composant InstagramPosts apparaît correctement sur la page du projet', async ({ page }) => {
  // Accéder à la page du projet qui contient le composant Instagram
  await page.goto('/projets/residence-ig-culture-monteregie');
  
  // Attendre que la page se charge complètement
  await page.waitForLoadState('networkidle');
  
  // Vérifier que le titre du projet est correct
  const title = await page.locator('h1').textContent();
  expect(title).toContain('Résidence Instagram - Culture Montérégie');
  
  // Vérifier que la grille Instagram est présente
  const instagramGrid = await page.locator('.grid');
  await expect(instagramGrid).toBeVisible();
  
  // Vérifier qu'il y a plusieurs publications Instagram (6 sont attendues)
  const instagramPosts = await page.locator('.instagram-post-wrapper');
  const count = await instagramPosts.count();
  expect(count).toBe(6);
  
  // Vérifier que le script Instagram est chargé
  const instagramScript = await page.locator('script[src*="instagram.com/embed.js"]');
  await expect(instagramScript).toHaveCount(1);
  
  // Attendre que le contenu Instagram se charge (peut prendre du temps)
  // Note: Cette attente peut être ajustée ou supprimée selon les besoins
  await page.waitForTimeout(3000);
  
  // Vérifier que les liens Instagram sont présents
  const instagramLinks = await page.locator('.instagram-link');
  await expect(instagramLinks).toHaveCount(6);
  
  // Vérifier qu'au moins un des liens contient l'URL Instagram attendue
  const firstLinkHref = await instagramLinks.first().getAttribute('href');
  expect(firstLinkHref).toContain('instagram.com/p/');
  
  // Vérifier que la mise en page responsive fonctionne
  // Sur un grand écran (desktop), il devrait y avoir 3 colonnes
  // NOTE: Cette vérification peut nécessiter une vérification visuelle ou une capture d'écran
});

test('Le composant InstagramPosts est responsive', async ({ page }) => {
  // Accéder à la page du projet
  await page.goto('/projets/residence-ig-culture-monteregie');
  
  // Attendre que la page se charge complètement
  await page.waitForLoadState('networkidle');
  
  // Tester sur différentes tailles d'écran
  
  // Desktop - 3 colonnes
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  
  // Prendre une capture d'écran pour la taille desktop
  await page.screenshot({ path: 'instagram-desktop.png' });
  
  // Tablette - 2 colonnes
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  
  // Prendre une capture d'écran pour la taille tablette
  await page.screenshot({ path: 'instagram-tablet.png' });
  
  // Mobile - 1 colonne
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  
  // Prendre une capture d'écran pour la taille mobile
  await page.screenshot({ path: 'instagram-mobile.png' });
  
  // Note: Dans un test complet, on vérifierait visuellement ces captures d'écran
  // ou on utiliserait des assertions plus précises sur la mise en page
});
