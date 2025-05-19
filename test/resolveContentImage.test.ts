import { describe, it, expect, vi, beforeEach } from 'vitest';

// Créer un mock pour la fonction import.meta.glob
const mockImportMetaGlob = vi.fn();

// Simuler les fichiers d'images disponibles
const mockImageModules: Record<string, () => Promise<{ default: { src: string } }>> = {
  '../content/projets/projet1/image1.jpg': () => Promise.resolve({ default: { src: '/assets/image1.jpg' } }),
  '../content/projets/projet1/images/image2.jpg': () => Promise.resolve({ default: { src: '/assets/image2.jpg' } }),
  '../content/expositions/expo1/image3.jpg': () => Promise.resolve({ default: { src: '/assets/image3.jpg' } })
};

// Mock de la fonction qui sera testée
async function resolveContentImage(collection: string, slug: string, imagePath: string) {
  if (!imagePath) return null;

  // Si le chemin commence par / ou http, on le retourne tel quel (pour les URLs externes)
  if (imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return { type: 'url', value: imagePath };
  }

  try {
    // Construire différentes variations potentielles du chemin de l'image
    const possiblePaths = [
      `../content/${collection}/${slug}/${imagePath}`,
      `../content/${collection}/${slug}/images/${imagePath.split('/').pop() || ''}`,
    ];
    
    // Rechercher l'image dans les chemins possibles
    for (const path of possiblePaths) {
      if (path in mockImageModules) {
        // Charger l'image dynamiquement
        const imageModule = await mockImageModules[path]();
        if (imageModule && imageModule.default) {
          return { type: 'import', value: imageModule.default };
        }
      }
    }
    
    console.warn(`Image non trouvée: ${imagePath} pour ${collection}/${slug}`);
    return { type: 'url', value: imagePath };
  } catch (error) {
    console.error(`Erreur lors du chargement de l'image ${imagePath}:`, error);
    return { type: 'url', value: imagePath };
  }
}

describe('resolveContentImage', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
    console.warn = vi.fn();
    console.error = vi.fn();
  });

  it('devrait retourner null si aucun chemin d\'image n\'est fourni', async () => {
    const result = await resolveContentImage('projets', 'projet1', '');
    expect(result).toBeNull();
  });

  it('devrait retourner une URL si le chemin commence par "/"', async () => {
    const result = await resolveContentImage('projets', 'projet1', '/images/test.jpg');
    expect(result).toEqual({ type: 'url', value: '/images/test.jpg' });
  });

  it('devrait retourner une URL si le chemin commence par "http"', async () => {
    const result = await resolveContentImage('projets', 'projet1', 'http://example.com/image.jpg');
    expect(result).toEqual({ type: 'url', value: 'http://example.com/image.jpg' });
  });

  it('devrait trouver une image dans le dossier racine du projet', async () => {
    const result = await resolveContentImage('projets', 'projet1', 'image1.jpg');
    expect(result).toEqual({ type: 'import', value: { src: '/assets/image1.jpg' } });
  });

  it('devrait trouver une image dans le sous-dossier images du projet', async () => {
    const result = await resolveContentImage('projets', 'projet1', 'images/image2.jpg');
    expect(result).toEqual({ type: 'import', value: { src: '/assets/image2.jpg' } });
  });

  it('devrait retourner le chemin d\'origine si l\'image n\'est pas trouvée', async () => {
    const result = await resolveContentImage('projets', 'projet1', 'nonexistent.jpg');
    expect(result).toEqual({ type: 'url', value: 'nonexistent.jpg' });
    expect(console.warn).toHaveBeenCalled();
  });
});