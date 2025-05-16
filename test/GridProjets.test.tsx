import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GridProjets from '../src/components/GridProjets';

describe('GridProjets Component', () => {
  const mockProjects = [
    {
      url: '/projets/projet-1',
      title: 'Projet 1',
      thumbnail: '/images/projet1.jpg',
      description: 'Description du projet 1',
      dateInfo: '2024-05-15'
    },
    {
      url: '/projets/projet-2',
      title: 'Projet 2',
      thumbnail: '/images/projet2.jpg',
      description: 'Description du projet 2',
      location: 'Montréal'
    },
    {
      url: '/projets/projet-3',
      title: 'Projet 3',
      description: 'Description du projet 3 sans image'
    }
  ];

  it('should render a grid with projects', () => {
    render(<GridProjets projects={mockProjects} />);
    
    // Vérifie que les titres des projets sont affichés
    expect(screen.getByText('Projet 1')).toBeDefined();
    expect(screen.getByText('Projet 2')).toBeDefined();
    expect(screen.getByText('Projet 3')).toBeDefined();
    
    // Vérifie que les descriptions sont affichées
    expect(screen.getByText('Description du projet 1')).toBeDefined();
    expect(screen.getByText('Description du projet 2')).toBeDefined();
    expect(screen.getByText('Description du projet 3 sans image')).toBeDefined();
  });

  it('should render images for projects with thumbnails', () => {
    render(<GridProjets projects={mockProjects} />);
    
    // Vérifie que les images sont bien affichées pour les projets qui en ont
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2); // Seulement 2 projets ont des images
  });

  it('should handle projects without thumbnails', () => {
    render(<GridProjets projects={mockProjects} />);
    
    // La grille entière devrait s'afficher sans erreur même s'il manque des images
    expect(screen.getByText('Projet 3')).toBeDefined();
  });

  it('should render optional metadata when available', () => {
    render(<GridProjets projects={mockProjects} />);
    
    // Vérifie que les informations de date et d'emplacement sont affichées
    expect(screen.getByText('2024-05-15')).toBeDefined();
    expect(screen.getByText('Montréal')).toBeDefined();
  });

  it('should handle empty projects array', () => {
    const { container } = render(<GridProjets projects={[]} />);
    
    // Le composant actuel ne gère pas explicitement le cas des tableaux vides
    // mais ne devrait pas générer d'erreur
    const gridContainer = container.querySelector('.grid-projets');
    expect(gridContainer).toBeTruthy();
  });
});