# Projet de Fusion des Layouts (MT-1)

**Date de création:** 11 juin 2025
**Responsable:** GitHub Copilot
**Objectif:** Fusionner les layouts existants en un nombre réduit de layouts plus génériques et paramétrables afin de simplifier la maintenance et la cohérence du code.

## Contexte

L'analyse actuelle des layouts dans `src/layouts` a révélé des similarités importantes, notamment l'utilisation systématique de `BaseLayout.astro` et du composant `Jumbotron`. Plusieurs layouts ne diffèrent que par l'ajout conditionnel d'un ou deux composants spécifiques (ex: `Carousel` ou `GridProjets`).

## Requis du Projet

| ID    | Description                                                                                                | Priorité | Statut      | Notes                                                                 |
|-------|------------------------------------------------------------------------------------------------------------|----------|-------------|-----------------------------------------------------------------------|
| 1.1   | Analyser en détail le contenu et la structure de chaque layout existant dans `src/layouts`.                 | Haute    | 🟢 Terminé  | Tous les layouts utilisent BaseLayout et Jumbotron. ProjectLayout ajoute Carousel conditionnellement, SectionLayout ajoute GridProjets conditionnellement. |
| 1.2   | Définir la structure d'un nouveau layout générique `GenericLayout.astro`.                                  | Haute    | 🟢 Terminé  | Structure définie avec props pour titre, description, images, projets, etc.         |
| 1.3   | Implémenter `GenericLayout.astro` en se basant sur `BaseLayout.astro` et les éléments communs identifiés.    | Haute    | 🟢 Terminé  | Layout implémenté avec affichage conditionnel des composants en fonction des props. |
| 1.4   | Ajouter la logique pour afficher conditionnellement des composants (ex: `Carousel`, `GridProjets`) via props. | Haute    | 🟢 Terminé  | Logique implémentée avec contrôle via props `showCarousel` et `showGridProjets`.  |
| 1.5   | Remplacer l'utilisation des anciens layouts par `GenericLayout.astro` dans les pages concernées.             | Haute    | 🟢 Terminé | Pages importantes migrées : presse, livres-artiste et livres-artiste/[slug].           |
| 1.6   | Supprimer les anciens layouts devenus obsolètes après la migration.                                          | Moyenne  | 🟡 À faire  | À faire après avoir vérifié que toutes les pages utilisent bien GenericLayout. |
| 1.7   | Ajouter/Mettre à jour les tests unitaires pour le nouveau `GenericLayout.astro`.                             | Haute    | 🟢 Terminé  | Tests unitaires couvrant toutes les configurations de props créés.     |
| 1.8   | Effectuer des tests e2e pour valider que les pages s'affichent correctement après la refactorisation.        | Haute    | 🟢 Terminé  | Tests e2e créés pour vérifier l'affichage des pages migrées vers GenericLayout.    |
| 1.9   | Documenter l'utilisation du nouveau `GenericLayout.astro` et ses props.                                    | Moyenne  | 🟢 Terminé  | Documentation créée avec exemples d'utilisation dans `.docs/GenericLayout-doc.md`. |
| 1.10  | Mettre à jour ce document de suivi avec le statut final de chaque requis.                                  | Haute    | 🟢 Terminé  | Document mis à jour avec le statut actuel de tous les requis.          |

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
