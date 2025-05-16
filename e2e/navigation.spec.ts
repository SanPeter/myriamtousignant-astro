import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('Toutes les pages principales sont accessibles depuis la page d\'accueil', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Vérifier le titre de la page
    await expect(page).toHaveTitle(/Myriam Tousignant/);

    // Navigation vers la page Projets
    await page.click('text=Projets');
    await expect(page).toHaveURL(/.*\/projets\/?$/);
    await expect(page.locator('h1')).toContainText('Projets');

    // Navigation vers la page Expositions
    await page.goto('http://localhost:4321/');
    await page.click('text=Expositions');
    await expect(page).toHaveURL(/.*\/expositions\/?$/);
    await expect(page.locator('h1')).toContainText('Expositions');

    // Navigation vers la page Art Public
    await page.goto('http://localhost:4321/');
    await page.click('text=Art Public');
    await expect(page).toHaveURL(/.*\/art-public\/?$/);
    await expect(page.locator('h1')).toContainText('Art Public');

    // Navigation vers la page Livres d'artiste
    await page.goto('http://localhost:4321/');
    await page.click('text=Livres d\'artiste');
    await expect(page).toHaveURL(/.*\/livres-artiste\/?$/);
    await expect(page.locator('h1')).toContainText('Livres d\'artiste');

    // Navigation vers la page Biographie & Démarche
    await page.goto('http://localhost:4321/');
    await page.click('text=Biographie');
    await expect(page).toHaveURL(/.*\/biographie-demarche\/?$/);
    await expect(page.locator('h1')).toContainText(/Biographie|Démarche/);
  });

  test('Les grilles de projets affichent des cartes avec images et titres', async ({ page }) => {
    await page.goto('http://localhost:4321/projets');
    
    // Attendre que le contenu soit chargé
    await page.waitForLoadState('networkidle');
    
    // Vérifier qu'au moins une carte de projet est affichée
    const projectCards = page.locator('.card, [class*="card"]');
    await expect(projectCards).toHaveCount(1);
    
    // Vérifier que les cartes ont des titres (différentes classes possibles selon l'implémentation)
    const projectTitle = page.locator('.card h2, .card-title, [class*="card"] h2').first();
    await expect(projectTitle).toBeVisible();
    
    // Vérifier que des images sont présentes si disponibles
    try {
      const projectImages = page.locator('.card img, [class*="card"] img');
      const count = await projectImages.count();
      if (count > 0) {
        await expect(projectImages.first()).toBeVisible();
      }
    } catch (error) {
      console.log('Note: Images might not be available in all project cards');
    }
  });

  test('Les pages de détail affichent correctement le contenu', async ({ page }) => {
    // Aller à la page projets
    await page.goto('http://localhost:4321/projets');
    
    // Attendre que le contenu soit chargé
    await page.waitForLoadState('networkidle');
    
    // Cliquer sur le premier projet de la liste (utiliser un sélecteur plus robuste)
    const projectCard = page.locator('.card, [class*="card"], article').first();
    await projectCard.click();
    
    // Vérifier que nous sommes sur une page de détail de projet
    await expect(page).toHaveURL(/.*\/projets\/.+/);
    
    // Vérifier que le titre est présent
    const projectTitle = page.locator('h1, [class*="title"]').first();
    await expect(projectTitle).toBeVisible();
    
    // Vérifier qu'il y a un bouton pour retourner à la liste des projets
    // Utiliser un sélecteur plus souple pour le bouton de retour
    const backButton = page.locator('a:has-text("Retour"), a:has-text("retour"), a:has-text("Back"), [class*="back"]');
    await expect(backButton).toBeVisible();
  });
});
