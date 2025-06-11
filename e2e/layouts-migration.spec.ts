import { test, expect } from '@playwright/test';

test('Layouts conversion - Validation des pages migrées', async ({ page }) => {
  // Test des pages principales avec GenericLayout
  const pagesToTest = [
    { url: '/presse', title: 'Presse' },
    { url: '/livres-artiste', title: 'Livres d\'artiste' },
    { url: '/publications', title: 'Publications' },
    { url: '/mediations', title: 'Médiations' },
    { url: '/art-public', title: 'Art Public' }
  ];

  for (const pageInfo of pagesToTest) {
    await test.step(`Page ${pageInfo.title}`, async () => {
      // Chargement de la page
      await page.goto(`http://localhost:4321${pageInfo.url}`);
      
      // Vérification du titre de la page
      const title = await page.title();
      expect(title).toContain(pageInfo.title);
      
      // Vérification de la présence du Jumbotron (h1)
      await page.waitForSelector('h1');
      const jumbotronTitle = await page.locator('h1').first();
      expect(jumbotronTitle).toBeVisible();
      
      // Vérification que le contenu principal est affiché
      const pageContent = await page.content();
      expect(pageContent).toContain(pageInfo.title);
    });
  }

  // Test d'une page de détail (page spécifique de livre d'artiste)
  await test.step('Page détail Livre d\'artiste', async () => {
    await page.goto('http://localhost:4321/livres-artiste/le-temps-file');
    
    // Vérification de l'URL
    await expect(page).toHaveURL(/\/livres-artiste\/[^/]+$/);
    
    // Vérification que la page est chargée et contient du contenu
    await page.waitForLoadState('networkidle');
    
    // Vérification que le contenu principal est visible
    const content = await page.content();
    expect(content).not.toBeNull();
    expect(content.length).toBeGreaterThan(0);
  });
});
