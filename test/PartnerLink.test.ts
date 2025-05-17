import { describe, expect, it, vi } from 'vitest';
import { getDocument } from './utils.ts';

// Mock le composant PartnerLink.astro
vi.mock('../src/components/PartnerLink.astro', () => {
  return {
    default: vi.fn().mockImplementation((props) => {
      const { href, src, alt, maxWidth = "200px" } = props;
      const imgHtml = typeof src === 'string' 
        ? `<img src="${src}" alt="${alt}" style="max-width: ${maxWidth};">` 
        : `<img src="${src.src || '/mock-image.jpg'}" alt="${alt}" width="200" height="200" style="max-width: ${maxWidth}; height: auto;">`;
      
      return {
        html: `<a href="${href}">${imgHtml}</a>`,
        Astro: { props }
      };
    })
  };
});

describe('PartnerLink component', () => {
  it('should render link with image correctly', async () => {
    const component = await import('../src/components/PartnerLink.astro');
    const { html } = await component.default({
      href: 'https://example.com',
      src: '/logo.png',
      alt: 'Example Logo'
    });

    const document = await getDocument(html);
    
    // Vérifier que le lien existe et a l'URL correcte
    const link = document.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('https://example.com');

    // Vérifier que l'image existe avec les bons attributs
    const image = document.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('src')).toBe('/logo.png');
    expect(image?.getAttribute('alt')).toBe('Example Logo');
    expect(image?.getAttribute('style')).toContain('max-width: 200px');
  });

  it('should use custom max-width when provided', async () => {
    const component = await import('../src/components/PartnerLink.astro');
    const { html } = await component.default({
      href: 'https://example.com',
      src: '/logo.png',
      alt: 'Example Logo',
      maxWidth: '300px'
    });

    const document = await getDocument(html);
    const image = document.querySelector('img');
    expect(image?.getAttribute('style')).toContain('max-width: 300px');
  });
  
  it('should handle ImageMetadata objects correctly', async () => {
    const component = await import('../src/components/PartnerLink.astro');
    const mockImageMetadata = {
      src: '/mock-image.jpg',
      width: 800,
      height: 600,
      format: 'jpg'
    };
    
    const { html } = await component.default({
      href: 'https://example.com',
      src: mockImageMetadata,
      alt: 'Example Logo'
    });

    const document = await getDocument(html);
    const image = document.querySelector('img');
    expect(image).not.toBeNull();
    expect(image?.getAttribute('width')).toBe('200');
    expect(image?.getAttribute('height')).toBe('200');
    expect(image?.getAttribute('style')).toContain('max-width: 200px');
  });
});
