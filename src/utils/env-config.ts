/**
 * Utilitaires pour accéder aux variables d'environnement
 */

/**
 * Configuration pour les services externes comme Google Analytics
 */
export const siteConfig = {
  googleAnalytics: {
    /**
     * ID Google Analytics provenant de la variable d'environnement PUBLIC_GA_ID
     * Exemple: G-XXXXXXXXXX
     */
    id: import.meta.env.PUBLIC_GA_ID || ''
  }
};

/**
 * Vérifie si l'ID Google Analytics est valide (pas vide et pas la valeur placeholder)
 * @param id L'ID Google Analytics à vérifier
 * @returns true si l'ID est valide, false sinon
 */
export function isGoogleAnalyticsEnabled(id: string): boolean {
  return !!id && id !== 'G-XXXXXXXXXX';
}
