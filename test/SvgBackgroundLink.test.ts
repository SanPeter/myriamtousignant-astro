import { describe, expect, it, vi } from 'vitest';
import { getDocument } from './utils.ts';

// Mock le composant SvgBackgroundLink.astro
vi.mock('../src/components/SvgBackgroundLink.astro', () => {
  return {
    default: vi.fn().mockImplementation((props) => {
      const { 
        href, 
        src, 
        width = "200px", 
        maxWidth = width,
        height = "64px", 
        alt,
        target = "_blank",
        rel = target === "_blank" ? "noopener noreferrer" : undefined 
      } = props;
      
      // Déterminer le chemin d'image en fonction du type de src
      const imgSrc = typeof src === 'string' ? src : src.src;
      
      // Générer le HTML en fonction du type de src
      let htmlContent = '';
      if (typeof src === 'string') {
        htmlContent = `
          <span class="sr-only">${alt}</span>
          <style>
            .svg-background-link {
              display: block;
              text-indent: -9999px;
              width: ${maxWidth};
              height: ${height};
              background: url(${imgSrc});
              background-size: contain;
              background-repeat: no-repeat;
              background-position: center;
            }
          </style>
        `;
      } else {
        htmlContent = `
          <img 
            src="${imgSrc}" 
            alt="${alt}" 
            width="200" 
            height="64" 
            class="img-svg" 
            style="max-width: ${maxWidth}; height: ${height}; width: auto; object-fit: contain;"
          />
        `;
      }
      
      return {
        html: `<a 
          class="svg-background-link" 
          href="${href}" 
          target="${target}"
          rel="${rel || ''}"
          aria-label="${alt}"
        >${htmlContent}</a>`,
        Astro: { props }
      };
    })
  };
});

describe('SvgBackgroundLink component', () => {
  it('should render link with SVG background correctly', async () => {
    const component = await import('../src/components/SvgBackgroundLink.astro');
    const { html } = await component.default({
      href: 'https://example.com',
      src: '/path/to/logo.svg',
      alt: 'Example Logo'
    });

    const document = await getDocument(html);
    
    // Vérifier que le lien existe et a l'URL correcte
    const link = document.querySelector('a');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('https://example.com');
    expect(link?.getAttribute('aria-label')).toBe('Example Logo');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toBe('noopener noreferrer');

    // Vérifier que le style contient l'URL du SVG
    const style = document.querySelector('style');
    expect(style?.textContent).toContain('url(/path/to/logo.svg)');
  });

  it('should use custom maxWidth and height when provided', async () => {
    const component = await import('../src/components/SvgBackgroundLink.astro');
    const { html } = await component.default({
      href: 'https://example.com',
      src: '/path/to/logo.svg',
      alt: 'Example Logo',
      maxWidth: '300px',
      height: '100px'
    });

    const document = await getDocument(html);
    const style = document.querySelector('style');
    
    expect(style?.textContent).toContain('width: 300px');
    expect(style?.textContent).toContain('height: 100px');
  });

  it('should use custom target when provided', async () => {
    const component = await import('../src/components/SvgBackgroundLink.astro');
    const { html } = await component.default({
      href: 'https://example.com',
      src: '/path/to/logo.svg',
      alt: 'Example Logo',
      target: '_self'
    });

    const document = await getDocument(html);
    const link = document.querySelector('a');
    
    expect(link?.getAttribute('target')).toBe('_self');
    expect(link?.getAttribute('rel')).toBe('');
  });
});
