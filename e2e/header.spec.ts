import { test, expect } from '@playwright/test';

test.describe('Header Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
    });

    test('Le menu mobile s\'affiche et se cache correctement', async ({ page }) => {
        const menuToggleButton = page.getByRole('button', { name: 'Toggle navigation' });
        const menu = page.locator('#navbarNav');
        
        // Vérifiez que le menu est caché par défaut
        await expect(menu).toBeHidden();
        
        // Cliquez sur le bouton du menu mobile pour l'ouvrir
        await menuToggleButton.click();
        
        // Vérifiez que le menu est visible
        await expect(menu).toBeVisible();
        await expect(menuToggleButton).toHaveAttribute('aria-expanded', 'true');
        
        // Cliquez à nouveau sur le bouton du menu mobile pour le fermer
        await menuToggleButton.click();
        
        // Vérifiez que le menu est caché
        await expect(menu).toBeHidden();
        await expect(menuToggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('Le panneau mobile expose les liens de navigation', async ({ page }) => {
        const menuToggleButton = page.getByRole('button', { name: 'Toggle navigation' });

        await menuToggleButton.click();

        const mobileMenu = page.locator('#navbarNav');
        await expect(mobileMenu).toBeVisible();
        await expect(mobileMenu.locator('button[aria-expanded]').first()).toBeVisible();

        // Ouvrir la première section mobile puis vérifier qu'un lien interne devient visible.
        await mobileMenu.locator('button[aria-expanded]').first().click();
        await expect(mobileMenu.locator('a[href^="/"]').first()).toBeVisible();
    });

    test('Le titre du site reste visible quand le menu mobile est ouvert', async ({ page }) => {
        const menuToggleButton = page.getByRole('button', { name: 'Toggle navigation' });
        const brand = page.locator('header a[href="/"]');

        await menuToggleButton.click();

        await expect(brand).toBeVisible();
        await expect(menuToggleButton).toBeVisible();
    });    
});
