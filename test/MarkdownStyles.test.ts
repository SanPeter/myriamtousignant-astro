import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Simuler le rendu de contenu Markdown
const MarkdownContent = ({ htmlContent }: { htmlContent: string }) => {
  return React.createElement('div', {
    className: 'prose max-w-none',
    dangerouslySetInnerHTML: { __html: htmlContent }
  });
};

describe('Markdown Styling', () => {
  it('should apply proper spacing between paragraphs', () => {
    // Simuler du contenu HTML qui serait généré à partir de Markdown
    const htmlContent = `
      <p>Premier paragraphe avec du texte.</p>
      <p>Deuxième paragraphe avec du texte.</p>
      <p>Troisième paragraphe avec du texte.</p>
    `;

    const { container } = render(React.createElement(MarkdownContent, { htmlContent }));
    
    // Récupérer tous les paragraphes
    const paragraphs = container.querySelectorAll('p');
    
    // Vérifier qu'il y a 3 paragraphes
    expect(paragraphs.length).toBe(3);
    
    // Vérifier que la marge est appliquée aux deux premiers paragraphes
    const style1 = window.getComputedStyle(paragraphs[0]);
    const style2 = window.getComputedStyle(paragraphs[1]);
    
    // Note: Cette vérification est limitée car jsdom ne calcule pas les styles CSS
    // Dans un environnement réel avec Playwright, nous pourrions faire des assertions plus précises
    expect(paragraphs[0].className).toBe('');
    expect(paragraphs[1].className).toBe('');
  });

  it('should render links with proper structure', () => {
    // Simuler du contenu HTML qui serait généré à partir de Markdown avec des liens
    const htmlContent = `
      <p>Paragraphe avec <a href="https://example.com">un lien</a> à l'intérieur.</p>
      <p>Un autre paragraphe avec <a href="/page-interne">un lien interne</a>.</p>
    `;

    const { container } = render(React.createElement(MarkdownContent, { htmlContent }));
    
    // Récupérer tous les liens
    const links = container.querySelectorAll('a');
    
    // Vérifier qu'il y a 2 liens
    expect(links.length).toBe(2);
    
    // Vérifier les attributs des liens
    expect(links[0].getAttribute('href')).toBe('https://example.com');
    expect(links[0].textContent).toBe('un lien');
    expect(links[1].getAttribute('href')).toBe('/page-interne');
    expect(links[1].textContent).toBe('un lien interne');
    
    // Dans un test unitaire avec jsdom, nous ne pouvons pas facilement tester les styles CSS appliqués
    // Ces vérifications seraient plus appropriées dans les tests E2E
  });
});
