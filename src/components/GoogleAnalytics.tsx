import React, { useEffect } from 'react';

// Déclarations de types pour TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

/**
 * Composant Google Analytics
 * 
 * Ce composant charge le script Google Analytics et initialise le tracking
 * Il est utilisé dans le BaseLayout pour être inclus sur toutes les pages
 */
const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ gaId }) => {
  useEffect(() => {
    // Vérifier que nous sommes côté client et que l'ID est valide
    if (typeof window === 'undefined' || !gaId) {
      return;
    }

    try {
      // Créer le script Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      // Initialiser dataLayer et gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      // Configuration de base
      gtag('js', new Date());
      gtag('config', gaId);

      return () => {
        // Nettoyage à la démontage du composant
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Google Analytics:', error);
    }
  }, [gaId]);

  // Le composant ne rend rien visuellement
  return null;
};

export default GoogleAnalytics;
