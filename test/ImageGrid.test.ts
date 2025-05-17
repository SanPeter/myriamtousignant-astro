import { describe, expect, it, vi } from 'vitest';
import { getDocument } from './utils.ts'

// Les mocks sont maintenant définis dans setup.ts

describe('ImageGrid component', () => {
  it('should render an empty state when no images match', async () => {
    const component = await import('../src/components/ImageGrid.astro');
    const { html } = await component.default({
      match: 'nonexistent/*.jpg',
    });

    const document = await getDocument(html);
    const message = document.querySelector('.text-gray-500');
    
    expect(message).not.toBeNull();
    expect(message?.textContent).toContain('Aucune image');
  });

  it('should render lightbox with proper attributes', async () => {
    const component = await import('../src/components/ImageGrid.astro');
    const { html } = await component.default({
      match: 'images/*.jpg',
    });

    const document = await getDocument(html);
    
    // Vérifier que le lightbox existe
    const lightbox = document.getElementById('lightbox');
    expect(lightbox).not.toBeNull();
    
    // Vérifier que les boutons de navigation existent
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    expect(prevButton).not.toBeNull();
    expect(nextButton).not.toBeNull();
    
    // Vérifier que le loader existe
    const loader = document.getElementById('lightbox-loader');
    expect(loader).not.toBeNull();
  });
});
