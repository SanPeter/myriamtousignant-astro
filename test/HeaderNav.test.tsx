import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeaderNav from '../src/components/HeaderNav';

describe('HeaderNav Component', () => {
  it('should render navigation links', () => {
    render(<HeaderNav />);
    
    // Vérifie que les liens principaux sont présents
    expect(screen.getByText('Projets')).toBeDefined();
    expect(screen.getByText('Expositions')).toBeDefined();
    expect(screen.getByText('Art Public')).toBeDefined();
    expect(screen.getByText('Livres d\'artiste')).toBeDefined();
    expect(screen.getByText('Biographie & Démarche')).toBeDefined();
  });

  it('should include the artist name', () => {
    render(<HeaderNav />);
    
    // Vérifie que le nom de l'artiste est présent
    expect(screen.getByText('Myriam Tousignant')).toBeDefined();
  });
});