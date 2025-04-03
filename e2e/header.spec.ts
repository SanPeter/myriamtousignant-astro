import { test, expect } from '@playwright/test';

test.describe('Header Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:4321/'); // Remplacez par l'URL de votre application
    });

    test('Le menu mobile s\'affiche et se cache correctement', async ({ page }) => {
        //await page.setViewportSize({ width: 375, height: 667 });
        //await page.goto('http://localhost:4321/');

        const menuToggleLabel = page.locator('label[for="menu-toggle"]');
        const menuToggle = page.locator('#menu-toggle');
        const menuIcon = page.locator('#menu-icon');
        const closeIcon = page.locator('#close-icon');
        const menu = page.locator('#menu');
        
        // Vérifiez que le menu est caché par défaut
        await expect(menu).toBeHidden();
        
        // Cliquez sur le bouton du menu mobile pour l'ouvrir
        await menuToggleLabel.click();
        
        // Vérifiez que le menu est visible
        await expect(menu).toBeVisible();
        await expect(menuIcon).toBeHidden();
        await expect(closeIcon).toBeVisible();
        
        // Cliquez à nouveau sur le bouton du menu mobile pour le fermer
         await menuToggleLabel.click();
        
        // Vérifiez que le menu est caché
        await expect(menu).toBeHidden();
        await expect(menuIcon).toBeVisible();
        await expect(closeIcon).toBeHidden();
    });

    test('Le défilement est désactivé lorsque le menu mobile est ouvert', async ({ page }) => {
        const menuToggleLabel = page.locator('label[for="menu-toggle"]');
        const body = page.locator('body');

        // Cliquez sur le bouton du menu mobile pour l'ouvrir
        await menuToggleLabel.click();

        // Vérifiez que la classe no-scroll est ajoutée au body
        await expect(body).toHaveClass(/no-scroll/);

        // Cliquez à nouveau sur le bouton du menu mobile pour le fermer
        await menuToggleLabel.click();

        // Vérifiez que la classe no-scroll est supprimée du body
        await expect(body).not.toHaveClass(/no-scroll/);
    });

    test('Le texte "Brand" et l\'icône de menu mobile ne sont pas cachés lorsque le menu mobile est affiché', async ({ page }) => {
        const menuToggleLabel = page.locator('label[for="menu-toggle"]');
        const brand = page.locator('header .text-2xl');
        const menuIcon = page.locator('#menu-icon');

        // Cliquez sur le bouton du menu mobile pour l'ouvrir
        await menuToggleLabel.click();

        // Vérifiez que le texte "Brand" est visible
        await expect(brand).toBeVisible();

        // Vérifiez que l'icône de menu mobile est visible
        await expect(menuToggleLabel).toBeVisible();
    });    
});