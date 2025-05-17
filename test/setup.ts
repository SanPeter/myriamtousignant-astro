import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Création d'un mock global pour astro:assets
vi.mock('astro:assets', () => {
  return {
    Image: vi.fn().mockImplementation(({ src, alt }) => {
      return {
        render: () => {
          return `<img src="${src}" alt="${alt || ''}" />`;
        }
      };
    }),
    getImage: vi.fn().mockImplementation(() => {
      return { src: '/mock-image.jpg' };
    })
  };
});

// Mock pour import.meta.glob qui est utilisé par ImageGrid
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    };
  };
}

// Mock global pour import.meta.glob
vi.mock('../src/components/ImageGrid.astro', async () => {
  const mockImageMetadata = {
    src: '/mock-image.jpg',
    width: 800,
    height: 600,
    format: 'jpg'
  };
  
  const Astro = {
    props: {},
    url: { pathname: '/test/path' }
  };
  
  return {
    default: vi.fn().mockImplementation((props) => {
      Astro.props = props;
      const mock = {
        default: mockImageMetadata
      };
      
      // Simuler le rendu du composant
      let html = '<div class="image-grid">';
      
      // Si le pattern ne correspond à aucune image, afficher le message "Aucune image"
      if (props.match.includes('nonexistent')) {
        html += '<p class="text-gray-500">Aucune image trouvée.</p>';
      } else {
        html += '<div class="grid-item"><img src="/mock-image.jpg" alt="Image" /></div>';
        html += '<div id="lightbox" class="lightbox">';
        html += '<button class="lightbox-prev">Précédent</button>';
        html += '<button class="lightbox-next">Suivant</button>';
        html += '<div id="lightbox-loader" class="lightbox-loader">Chargement...</div>';
        html += '</div>';
      }
      
      html += '</div>';
      
      return {
        html,
        Astro
      };
    })
  };
});
