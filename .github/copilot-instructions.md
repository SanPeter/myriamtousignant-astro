## Pile technologique
- Node
- TypeScript
- Astro
- React
- TailwindCSS

## Outils pour les tests
- Vitest pour les tests unitaires
- Testing Library pour les tests de composants UI
- Playwright pour les tests e2e

Lorsque des fonctionnalités seront implémentées pour le site, toujours ajouter les tests correspondants pour confirmer le requis corredpondant.
Les tests unitaire et de composants seront dans le dossier `test`.
Les tests e2e seront dans le dossier `e2e`.

## Définition des collections de contenu Astro
- Les collections sont définies dans le fichier src/content.config.ts.
- Pour définir une collection, il faut créer un à `loader` et un `schema`.
- La documentation pour configurer les collections est disponible ici : https://docs.astro.build/en/guides/content-collections/