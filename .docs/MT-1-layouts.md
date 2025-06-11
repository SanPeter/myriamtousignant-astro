# Projet de Fusion des Layouts (MT-1)

**Date de création:** 11 juin 2025
**Responsable:** GitHub Copilot
**Objectif:** Fusionner les layouts existants en un nombre réduit de layouts plus génériques et paramétrables afin de simplifier la maintenance et la cohérence du code.

## Contexte

L'analyse actuelle des layouts dans `src/layouts` a révélé des similarités importantes, notamment l'utilisation systématique de `BaseLayout.astro` et du composant `Jumbotron`. Plusieurs layouts ne diffèrent que par l'ajout conditionnel d'un ou deux composants spécifiques (ex: `Carousel` ou `GridProjets`).

## Requis du Projet

| ID    | Description                                                                                                | Priorité | Statut      | Notes                                                                 |
|-------|------------------------------------------------------------------------------------------------------------|----------|-------------|-----------------------------------------------------------------------|
| 1.1   | Analyser en détail le contenu et la structure de chaque layout existant dans `src/layouts`.                 | Haute    | 🟡 À faire  | Identifier les parties communes et les variations.                    |
| 1.2   | Définir la structure d'un nouveau layout générique `GenericLayout.astro`.                                  | Haute    | 🟡 À faire  | Ce layout devra accepter des props pour gérer les variations.         |
| 1.3   | Implémenter `GenericLayout.astro` en se basant sur `BaseLayout.astro` et les éléments communs identifiés.    | Haute    | 🟡 À faire  |                                                                       |
| 1.4   | Ajouter la logique pour afficher conditionnellement des composants (ex: `Carousel`, `GridProjets`) via props. | Haute    | 🟡 À faire  |                                                                       |
| 1.5   | Remplacer l'utilisation des anciens layouts par `GenericLayout.astro` dans les pages concernées.             | Haute    | 🟡 À faire  | S'assurer que toutes les fonctionnalités sont préservées.             |
| 1.6   | Supprimer les anciens layouts devenus obsolètes après la migration.                                          | Moyenne  | 🟡 À faire  | Nettoyage du code.                                                    |
| 1.7   | Ajouter/Mettre à jour les tests unitaires pour le nouveau `GenericLayout.astro`.                             | Haute    | 🟡 À faire  | Couvrir les différentes configurations de props.                      |
| 1.8   | Effectuer des tests e2e pour valider que les pages s'affichent correctement après la refactorisation.        | Haute    | 🟡 À faire  | Vérifier l'affichage et les fonctionnalités sur les pages migrées.    |
| 1.9   | Documenter l'utilisation du nouveau `GenericLayout.astro` et ses props.                                    | Moyenne  | 🟡 À faire  | Mettre à jour la documentation interne si nécessaire.                 |
| 1.10  | Mettre à jour ce document de suivi avec le statut final de chaque requis.                                  | Haute    | 🟡 À faire  |                                                                       |

## Layouts Actuels à Analyser

- `src/layouts/BaseLayout.astro` (Base, à conserver et potentiellement enrichir)
- `src/layouts/BiographieLayout.astro`
- `src/layouts/BoutiqueLayout.astro`
- `src/layouts/PresseLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/layouts/SectionLayout.astro`

## Critères de Succès

- Réduction significative du nombre de fichiers de layout.
- Maintien de toutes les fonctionnalités existantes des pages.
- Amélioration de la maintenabilité du code des layouts.
- Tests unitaires et e2e passant avec succès.
