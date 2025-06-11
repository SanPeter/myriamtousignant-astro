# Mémoire du Projet

## Informations Générales
- Pile technologique: Node, TypeScript, Astro, React, TailwindCSS
- Outils de test: Vitest (tests unitaires), Testing Library (tests UI), Playwright (tests e2e)
- Date dernière mise à jour: 11 juin 2025

## Projets en Cours
- MT-1: Fusion des layouts (en cours d'implémentation)

## Structure du Projet
- Tests unitaires et de composants dans le dossier `test`
- Tests e2e dans le dossier `e2e`
- Collections de contenu définies dans `src/content.config.ts`

## Consignes Techniques
- Pour les nouvelles fonctionnalités, toujours ajouter des tests correspondants
- Les collections Astro nécessitent un `loader` et un `schema` (voir documentation: https://docs.astro.build/en/guides/content-collections/)

## Progression des Projets

### MT-1: Fusion des Layouts
- Objectif: Simplifier la maintenance en fusionnant plusieurs layouts similaires
- État: Implémentation majeure terminée
  - Création d'un `GenericLayout.astro` pour remplacer plusieurs layouts spécifiques
  - Migration des pages clés vers le nouveau layout
  - Tests unitaires et e2e ajoutés
  - Documentation créée
- Tâches restantes: 
  - Supprimer les anciens layouts après migration complète de toutes les pages
- Fichier de suivi: `.docs/MT-1-layouts.md`
- Documentation: `.docs/GenericLayout-doc.md`
