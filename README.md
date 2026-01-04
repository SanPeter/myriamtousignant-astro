# myriamtousignant-astro

## Outils principaux

| Domaine | Outils |
| --- | --- |
| Framework principal | Astro |
| UI | React + React DOM |
| Styles | Tailwind CSS + plugin Typography |
| Contenu | MDX via `@astrojs/mdx` |
| Tests | Vitest, Playwright, Testing Library, jsdom |

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Astro |
| `npm run build` | Génère le site pour la production |
| `npm run preview` | Lance un serveur pour prévisualiser le build |
| `npm run test` | Lance la suite Vitest en mode non interactif |
| `npm run test:watch` | Lance Vitest en mode watch |
| `npm run test:vitest` | Alias de Vitest |
| `npm run test:e2e` | Lance les tests end-to-end Playwright |

## Structure du projet

| Chemin | Rôle |
| --- | --- |
| `src/pages/` | Pages et routes Astro |
| `src/components/` | Composants Astro/React |
| `src/layouts/` | Layouts partagés |
| `src/content/` | Contenu Markdown/MDX et médias |
| `src/styles/` | Styles globaux |
| `public/` | Fichiers statiques |
| `test/` | Tests unitaires et d'intégration (Vitest) |
| `e2e/` | Tests end-to-end (Playwright) |
