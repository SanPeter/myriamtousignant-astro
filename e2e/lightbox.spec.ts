import { test, expect } from '@playwright/test';

test('Le lightbox doit afficher les images en grand format', async ({ page }) => {
  // Naviguer vers une page contenant le composant ImageGrid
  await page.goto('/expositions/maskipeche-boucherville');
  
  // Vérifier que la grille d'images est chargée
  const imageGrid = page.locator('.w-full.overflow-hidden');
  await expect(imageGrid).toBeVisible();
  
  // Vérifier que les images sont présentes
  const images = page.locator('.grid img');
  await expect(images).toBeVisible();
  
  // Cliquer sur la première image
  await images.first().click();
  
  // Vérifier que le lightbox est visible
  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toBeVisible();
  
  // Vérifier que l'image du lightbox est visible
  const lightboxImage = page.locator('#lightbox-image');
  await expect(lightboxImage).toBeVisible();
  
  // Vérifier que l'image est plus grande que la miniature
  const imageSize = await lightboxImage.boundingBox();
  expect(imageSize?.width).toBeGreaterThan(400);
  expect(imageSize?.height).toBeGreaterThan(300);
  
  // Vérifier que les boutons de navigation fonctionnent
  const nextButton = page.locator('.lightbox-next');
  await nextButton.click();
  
  // Vérifier qu'une nouvelle image est chargée (comparaison de src)
  const initialSrc = await lightboxImage.getAttribute('src');
  await page.waitForTimeout(500); // Attendre le chargement
  const newSrc = await lightboxImage.getAttribute('src');
  expect(initialSrc).not.toEqual(newSrc);
  
  // Fermer le lightbox en cliquant sur le bouton de fermeture
  await page.locator('.lightbox-close').click();
  
  // Vérifier que le lightbox est fermé
  await expect(lightbox).toHaveClass(/hidden/);
});

test('Le lightbox doit réagir aux commandes clavier', async ({ page }) => {
  // Naviguer vers une page contenant le composant ImageGrid
  await page.goto('/expositions/maskipeche-boucherville');
  
  // Cliquer sur une image pour ouvrir le lightbox
  await page.locator('.grid img').first().click();
  
  // Vérifier que le lightbox est visible
  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toBeVisible();
  
  // Récupérer la source initiale de l'image
  const lightboxImage = page.locator('#lightbox-image');
  const initialSrc = await lightboxImage.getAttribute('src');
  
  // Appuyer sur la flèche droite pour passer à l'image suivante
  await page.keyboard.press('ArrowRight');
  
  // Attendre et vérifier que l'image a changé
  await page.waitForTimeout(500);
  const newSrc = await lightboxImage.getAttribute('src');
  expect(initialSrc).not.toEqual(newSrc);
  
  // Appuyer sur la flèche gauche pour revenir à l'image précédente
  await page.keyboard.press('ArrowLeft');
  
  // Attendre et vérifier que l'image est revenue à l'originale
  await page.waitForTimeout(500);
  const previousSrc = await lightboxImage.getAttribute('src');
  expect(previousSrc).toEqual(initialSrc);
  
  // Fermer le lightbox avec la touche Escape
  await page.keyboard.press('Escape');
  
  // Vérifier que le lightbox est fermé
  await expect(lightbox).toHaveClass(/hidden/);
});
