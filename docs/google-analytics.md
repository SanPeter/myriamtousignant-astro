# Google Analytics

Ce site utilise Google Analytics pour suivre les statistiques de visite.

## Configuration

L'ID Google Analytics est configuré via une variable d'environnement dans le fichier `.env`:

```
PUBLIC_GA_ID=G-XXXXXXXXXX
```

Remplacez `G-XXXXXXXXXX` par votre ID Google Analytics réel.

## Architecture

L'intégration est organisée en plusieurs couches:

1. **Fichier d'environnement** (`.env`) - Stocke l'ID Google Analytics
2. **Utilitaire de configuration** (`src/utils/env-config.ts`) - Fournit des fonctions d'aide pour vérifier la validité de l'ID GA
3. **Composant React** (`GoogleAnalytics.tsx`) - Implémente la logique d'intégration GA
4. **Layout Astro** (`BaseLayout.astro`) - Intègre le composant dans toutes les pages

## Implémentation

L'intégration de Google Analytics est faite via un composant React (`GoogleAnalytics.tsx`) qui est chargé dans le layout de base (`BaseLayout.astro`).

Le composant:
- Vérifie si Google Analytics est activé via l'utilitaire `isGoogleAnalyticsEnabled(gaId)`
- Charge le script Google Analytics de façon asynchrone
- Initialise la fonction gtag et le dataLayer
- Configure le tracking avec l'ID fourni
- Gère le nettoyage lors du démontage du composant

## Activation/Désactivation

Google Analytics est automatiquement activé ou désactivé en fonction de la valeur de `PUBLIC_GA_ID` dans le fichier `.env`:

- Si `PUBLIC_GA_ID` est vide ou a la valeur `G-XXXXXXXXXX`, Google Analytics sera désactivé
- Si `PUBLIC_GA_ID` contient un ID valide, Google Analytics sera activé

Cette logique est gérée par la fonction `isGoogleAnalyticsEnabled(id)` dans `src/utils/env-config.ts`, qui prend l'ID GA en paramètre et retourne un booléen indiquant si l'ID est valide.

## Tests

### Tests unitaires
Les tests unitaires (`/test/GoogleAnalytics.test.tsx`) vérifient:
- La définition du composant
- La logique d'activation/désactivation
- L'initialisation correcte lorsque activé

### Tests end-to-end
Les tests e2e (`/e2e/analytics.spec.ts`) vérifient:
- Le chargement des scripts GA sur la page d'accueil
- L'absence de scripts GA quand désactivé
- La présence de requêtes vers googletagmanager.com

## RGPD et consentement aux cookies

**Note importante:** Cette implémentation ne gère pas le consentement RGPD. Il est recommandé d'ajouter un mécanisme de consentement aux cookies pour être conforme à la législation européenne.

### Solution recommandée pour le RGPD

Pour être conforme au RGPD, il faudrait:

1. Ajouter une bannière de consentement aux cookies
2. Désactiver le chargement des scripts GA jusqu'à ce que l'utilisateur donne son consentement
3. Stocker le consentement dans localStorage/cookies pour les visites suivantes

## Événements personnalisés

Pour ajouter des événements personnalisés, utilisez la fonction `gtag` comme ceci:

```javascript
// Exemple: suivre un clic sur un bouton
window.gtag('event', 'click', {
  'event_category': 'engagement',
  'event_label': 'bouton_contact'
});
```
