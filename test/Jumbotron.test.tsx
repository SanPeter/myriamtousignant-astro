import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import Jumbotron from '../src/components/Jumbotron';

describe('Jumbotron Component', () => {
  it('should render title and description', () => {
    const { getByText } = render(
      <Jumbotron
        title="Titre de test"
        description="Description de test"
      />
    );
    
    expect(getByText('Titre de test')).toBeDefined();
    expect(getByText('Description de test')).toBeDefined();
  });

  it('should render just title when no description is provided', () => {
    const { getByText, container } = render(
      <Jumbotron
        title="Titre sans description"
      />
    );
    
    expect(getByText('Titre sans description')).toBeDefined();
    
    // Vérifie que le paragraphe de description n'est pas présent
    const paragraphs = container.querySelectorAll('p.lead');
    expect(paragraphs.length).toBe(0);
  });

  it('should have expected CSS classes', () => {
    const { container } = render(
      <Jumbotron
        title="Titre personnalisé"
        description="Description personnalisée"
      />
    );
    
    // Recherche l'élément racine du jumbotron avec les classes Tailwind actuelles
    const jumbotronElement = container.firstChild;
    expect(jumbotronElement).toHaveClass('py-8');
    expect(jumbotronElement).toHaveClass('mb-10');
    expect(jumbotronElement).toHaveClass('border-b');
    expect(jumbotronElement).toHaveClass('border-gray-200');
  });
});
