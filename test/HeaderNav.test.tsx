import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderNav from '../src/components/HeaderNav';

describe('HeaderNav Component', () => {
  it('should render category navigation links', () => {
    render(<HeaderNav />);
    
    // Vérifie que les catégories principales sont présentes
    // Utilise getAllByText puisque les textes apparaissent dans les versions desktop et mobile
    expect(screen.getAllByText('Œuvres & Créations')[0]).toBeDefined();
    expect(screen.getAllByText('Événements & Activités')[0]).toBeDefined();
    expect(screen.getAllByText('Ressources & Médias')[0]).toBeDefined();
    expect(screen.getAllByText('À propos')[0]).toBeDefined();
  });
  
  it('should show mega menu when clicking on a category', () => {
    render(<HeaderNav />);
    
    // Sélectionne spécifiquement le bouton de la catégorie par son attribut aria-controls
    const buttons = screen.getAllByRole('button', { name: /Œuvres & Créations/i });
    const categoryButton = Array.from(buttons).find(
      button => button.getAttribute('aria-controls') === 'megamenu-oeuvres'
    );
    
    // Vérifie que le bouton a bien été trouvé
    expect(categoryButton).toBeDefined();
    
    // Clique sur le bouton pour ouvrir le mega-menu
    if (categoryButton) {
      fireEvent.click(categoryButton);
    }
    
    // Vérifier que les liens sous-catégories sont visibles - utiliser des sélecteurs plus spécifiques
    const projectsTitle = screen.getAllByText('Projets')[0];
    expect(projectsTitle).toBeDefined();
    
    const artPublicTitle = screen.getAllByText('Art Public')[0];
    expect(artPublicTitle).toBeDefined();
    
    const livresTitles = screen.getAllByText('Livres d\'artiste')[0];
    expect(livresTitles).toBeDefined();
  });

  it('should include the artist name', () => {
    render(<HeaderNav />);
    
    // Vérifie que le nom de l'artiste est présent
    expect(screen.getByText('Myriam Tousignant')).toBeDefined();
  });
  
  it('should include the Instagram link', () => {
    render(<HeaderNav />);
    
    // Sélectionne le premier lien Instagram (version desktop)
    const instagramLinks = screen.getAllByLabelText('Instagram');
    expect(instagramLinks[0]).toBeDefined();
    expect(instagramLinks[0]).toHaveAttribute('href', 'https://www.instagram.com/myriamtousignant_art/');
  });
});