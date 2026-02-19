import { test, expect } from '@playwright/test';

test('Le composant InstagramPosts apparaît correctement sur la page du projet', async ({ page }) => {
  // Accéder à la page du projet qui contient le composant Instagram
  await page.goto('/projets/residence-ig-culture-monteregie');
  
  // Attendre le rendu principal (les embeds tiers peuvent garder le réseau actif)
  await expect(page.getByRole('heading', { level: 1, name: /Résidence Instagram/ }).first()).toBeVisible();
  
  // Vérifier que le titre du projet est correct
  const title = await page.getByRole('heading', { level: 1, name: /Résidence Instagram/ }).first().textContent();
  expect(title).toContain('Résidence Instagram - Culture Montérégie');
  
  // Vérifier qu'il y a plusieurs publications Instagram
  const instagramPosts = await page.locator('.instagram-post-wrapper');
  await expect(instagramPosts.first()).toBeVisible();
  const count = await instagramPosts.count();
  expect(count).toBeGreaterThanOrEqual(20);
  
  // Vérifier que le script Instagram est chargé
  const instagramScript = await page.locator('script[src*="instagram.com/embed.js"]');
  await expect(instagramScript).toHaveCount(1);
  
  // Attendre que le contenu Instagram se charge (peut prendre du temps)
  // Note: Cette attente peut être ajustée ou supprimée selon les besoins
  await page.waitForTimeout(3000);
  
  // Vérifier que la mise en page responsive fonctionne
  // Sur un grand écran (desktop), il devrait y avoir 3 colonnes
  // NOTE: Cette vérification peut nécessiter une vérification visuelle ou une capture d'écran
});

test('Le composant InstagramPosts est responsive', async ({ page }) => {
  // Accéder à la page du projet
  await page.goto('/projets/residence-ig-culture-monteregie');
  
  // Attendre le rendu principal (les embeds tiers peuvent garder le réseau actif)
  await expect(page.getByRole('heading', { level: 1, name: /Résidence Instagram/ }).first()).toBeVisible();
  
  // Tester sur différentes tailles d'écran
  
  // Desktop - 3 colonnes
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  await expect(page.locator('.instagram-post-wrapper').first()).toBeVisible();
  
  // Tablette - 2 colonnes
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  await expect(page.locator('.instagram-post-wrapper').first()).toBeVisible();
  
  // Mobile - 1 colonne
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500); // Attendre que le layout s'ajuste
  await expect(page.locator('.instagram-post-wrapper').first()).toBeVisible();
});
