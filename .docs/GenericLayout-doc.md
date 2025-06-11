# Documentation de GenericLayout

Ce document décrit comment utiliser le `GenericLayout` dans le projet myriamtousignant-astro.

## Vue d'ensemble

`GenericLayout` est un layout flexible et configurable qui remplace plusieurs layouts spécifiques précédents (BiographieLayout, PresseLayout, ProjectLayout, SectionLayout, etc.). Il permet d'afficher différents types de contenu avec une structure cohérente, incluant des éléments optionnels comme un carousel d'images ou une grille de projets.

## Utilisation de base

```astro
---
import GenericLayout from '../layouts/GenericLayout.astro';
---

<GenericLayout
  title="Titre de la page"
  description="Description de la page pour les métadonnées et le Jumbotron">
  <p>Contenu de la page ici...</p>
</GenericLayout>
```

## Propriétés (Props)

| Propriété | Type | Description | Défaut |
|-----------|------|-------------|--------|
| `title` | `string` | Titre de la page (obligatoire) | - |
| `description` | `string` | Description pour les métadonnées et le Jumbotron | `undefined` |
| `images` | `string[]` | Chemins des images à afficher dans le carousel | `[]` |
| `projectsData` | `any[]` | Données des projets pour GridProjets | `[]` |
| `showCarousel` | `boolean` | Afficher ou non le carousel | `true` |
| `showGridProjets` | `boolean` | Afficher ou non la grille de projets | `true` |
| `className` | `string` | Classes CSS pour le conteneur principal | `"max-w-6xl mx-auto px-4 mb-16"` |

## Exemples d'utilisation

### Page simple avec Jumbotron

```astro
<GenericLayout
  title="Biographie"
  description="À propos de Myriam Tousignant">
  <div class="bg-white p-6 rounded-lg shadow-md">
    <p>Contenu de la biographie...</p>
  </div>
</GenericLayout>
```

### Page de projet avec carousel d'images

```astro
<GenericLayout
  title="Mon Projet"
  description="Description du projet"
  images={['chemin/image1.jpg', 'chemin/image2.jpg']}
  showCarousel={true}
  showGridProjets={false}>
  <article>
    <p>Description détaillée du projet...</p>
  </article>
</GenericLayout>
```

### Page de section avec grille de projets

```astro
<GenericLayout
  title="Livres d'artiste"
  description="Mes publications"
  projectsData={livresArtisteData}
  showCarousel={false}
  showGridProjets={true}>
  <p>Explorez mes livres d'artiste...</p>
</GenericLayout>
```

## Architecture

`GenericLayout` s'appuie sur les composants suivants:

- `BaseLayout`: Gère la structure HTML de base, les métadonnées et les éléments communs du site
- `Jumbotron`: Affiche le titre et la description en haut de la page
- `Carousel`: Affiche un carousel d'images (conditionnel)
- `GridProjets`: Affiche une grille de projets (conditionnel)

## Bonnes pratiques

1. Définissez explicitement `showCarousel` et `showGridProjets` pour clarifier votre intention
2. N'utilisez pas ce layout pour les pages très spécifiques qui nécessiteraient beaucoup de personnalisation
3. Si vous avez besoin de fonctionnalités qui ne sont pas prises en charge par GenericLayout, envisagez d'ajouter ces fonctionnalités plutôt que de créer un nouveau layout
