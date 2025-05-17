import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderNav from '../src/components/HeaderNav';

describe('HeaderNav Component', () => {
  it('should render navigation links', () => {
    render(<HeaderNav />);
    
    // Vérifie que les liens principaux sont présents
    // Utilise getAllByText pour gérer les doublons dans le menu desktop et mobile
    expect(screen.getAllByText('Projets')[0]).toBeDefined();
    expect(screen.getAllByText('Expositions')[0]).toBeDefined();
    expect(screen.getAllByText('Art Public')[0]).toBeDefined();
    expect(screen.getAllByText('Livres d\'artiste')[0]).toBeDefined();
    expect(screen.getAllByText('Biographie & Démarche')[0]).toBeDefined();
  });

  it('should include the artist name', () => {
    render(<HeaderNav />);
    
    // Vérifie que le nom de l'artiste est présent
    expect(screen.getByText('Myriam Tousignant')).toBeDefined();
  });
});