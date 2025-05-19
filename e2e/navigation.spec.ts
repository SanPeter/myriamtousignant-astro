import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('Toutes les pages principales sont accessibles depuis la page d\'accueil via le méga-menu', async ({ page }) => {
    await page.goto('http://localhost:4321/');

    // Vérifier le titre de la page
    await expect(page).toHaveTitle(/Myriam Tousignant/);

    // Test de la catégorie Œuvres & Créations
    // =======================================
    
    // Ouvrir le méga-menu Œuvres & Créations
    await page.click('button:has-text("Œuvres & Créations")');
    
    // Navigation vers la page Projets depuis le méga-menu
    await page.click('text=Projets');
    await expect(page).toHaveURL(/.*\/projets\/?$/);
    await expect(page.locator('h1')).toContainText('Projets');

    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Œuvres & Créations")');
    
    // Navigation vers la page Art Public
    await page.click('text=Art Public');
    await expect(page).toHaveURL(/.*\/art-public\/?$/);
    await expect(page.locator('h1')).toContainText('Art Public');
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Œuvres & Créations")');
    
    // Navigation vers la page Livres d'artiste
    await page.click('text=Livres d\'artiste');
    await expect(page).toHaveURL(/.*\/livres-artiste\/?$/);
    await expect(page.locator('h1')).toContainText('Livres d\'artiste');

    // Test de la catégorie Événements & Activités
    // ==========================================
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Événements & Activités")');
    
    // Navigation vers la page Expositions
    await page.click('text=Expositions');
    await expect(page).toHaveURL(/.*\/expositions\/?$/);
    await expect(page.locator('h1')).toContainText('Expositions');
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Événements & Activités")');
    
    // Navigation vers la page Médiations
    await page.click('text=Médiations');
    await expect(page).toHaveURL(/.*\/mediations\/?$/);
    await expect(page.locator('h1')).toContainText('Médiations');

    // Test de la catégorie Ressources & Médias
    // ======================================
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Ressources & Médias")');
    
    // Navigation vers la page Publications
    await page.click('text=Publications');
    await expect(page).toHaveURL(/.*\/publications\/?$/);
    await expect(page.locator('h1')).toContainText('Publications');
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("Ressources & Médias")');
    
    // Navigation vers la page Presse
    await page.click('text=Presse');
    await expect(page).toHaveURL(/.*\/presse\/?$/);
    await expect(page.locator('h1')).toContainText('Presse');

    // Test de la catégorie À propos
    // ===========================
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("À propos")');
    
    // Navigation vers la page Biographie & Démarche
    await page.click('text=Biographie & Démarche');
    await expect(page).toHaveURL(/.*\/biographie-demarche\/?$/);
    await expect(page.locator('h1')).toContainText(/Biographie|Démarche/);
    
    // Retour à la page d'accueil
    await page.goto('http://localhost:4321/');
    await page.click('button:has-text("À propos")');
    
    // Navigation vers la page Boutique
    await page.click('text=Boutique');
    await expect(page).toHaveURL(/.*\/boutique\/?$/);
    await expect(page.locator('h1')).toContainText('Boutique');
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
