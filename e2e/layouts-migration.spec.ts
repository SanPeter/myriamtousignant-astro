import { test, expect } from '@playwright/test';

test('Layouts conversion - Validation des pages migrées', async ({ page }) => {
  // Test de la page Presse avec GenericLayout
  await test.step('Page Presse', async () => {
    await page.goto('/presse');
    
    // Vérifie que le titre est correct
    const title = await page.title();
    expect(title).toContain('Presse');
    
    // Vérifie la présence du Jumbotron
    const jumbotronTitle = await page.getByRole('heading', { name: /Presse/i }).first();
    expect(jumbotronTitle).toBeVisible();
    
    // Vérifie le contenu est bien affiché
    const contentContainer = await page.locator('.prose');
    expect(contentContainer).toBeVisible();
  });

  // Test de la page des livres d'artiste avec GenericLayout
  await test.step('Page Livres d\'artiste', async () => {
    await page.goto('/livres-artiste');
    
    // Vérifie que le titre est correct
    const title = await page.title();
    expect(title).toContain('Livres d\'artiste');
    
    // Vérifie la présence du Jumbotron
    const jumbotronTitle = await page.getByRole('heading', { name: /Livres d'artiste/i }).first();
    expect(jumbotronTitle).toBeVisible();
    
    // Vérifie la présence de la grille de projets
    const gridProjets = await page.locator('.grid');
    expect(gridProjets).toBeVisible();
    
    // Vérifie qu'il y a au moins un projet affiché
    const projetsItems = await page.locator('.grid > div').count();
    expect(projetsItems).toBeGreaterThan(0);
  });

  // Si possible, tester une page de livre d'artiste spécifique
  await test.step('Page détail Livre d\'artiste', async () => {
    // Aller à la page des livres
    await page.goto('/livres-artiste');
    
    // Cliquer sur le premier livre disponible
    const firstBook = await page.locator('.grid > div').first();
    await firstBook.click();
    
    // Vérifier que la page détail s'affiche correctement
    await expect(page).toHaveURL(/\/livres-artiste\/[^/]+$/);
    
    // Vérifier que le contenu est visible
    const articleContainer = await page.locator('article');
    expect(articleContainer).toBeVisible();
    
    // Si la page a un carousel, il devrait être visible (s'il y a des images)
    // Note: Ce test peut échouer si la page spécifique n'a pas d'images
    const carousel = await page.locator('.carousel');
    if (await carousel.count() > 0) {
      expect(carousel).toBeVisible();
    }
  });
});
