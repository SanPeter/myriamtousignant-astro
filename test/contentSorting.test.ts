import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCollection } from 'astro:content';

// Mock de getCollection pour les tests
vi.mock('astro:content', () => ({
  getCollection: vi.fn()
}));

describe('Content sorting', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should sort projects by date, most recent first', async () => {
    // Données de test pour les projets
    const mockProjects: Array<{
      id: string;
      collection: "projets";
      data: {
        title: string;
        draft: boolean;
        featured: boolean;
        date?: Date;
        weight?: number;
        description?: string;
        summaryImage?: string;
        listImage?: string;
        projectImages?: string[];
      };
    }> = [
      { 
        id: 'projet-ancien.md',
        collection: 'projets',
        data: { 
          title: 'Projet ancien', 
          date: new Date('2020-01-01'), 
          draft: false,
          featured: false
        }
      },
      {
        id: 'projet-nouveau.md',
        collection: 'projets',
        data: { 
          title: 'Projet nouveau', 
          date: new Date('2023-12-31'), 
          draft: false,
          featured: true
        }
      },
      {
        id: 'projet-moyen.md',
        collection: 'projets',
        data: { 
          title: 'Projet moyen', 
          date: new Date('2022-06-15'), 
          draft: false,
          featured: false
        }
      }
    ];

    // Configuration du mock
    vi.mocked(getCollection).mockResolvedValue(mockProjects);

    // Fonction de tri à tester (similaire à celle utilisée dans les pages)
    const sortedProjects = await getCollection('projets').then(items => items.sort((a, b) => {
      if (!a.data.date || !b.data.date) return 0;
      return b.data.date.valueOf() - a.data.date.valueOf();
    }));

    // Vérification du tri
    expect(sortedProjects[0].data.title).toBe('Projet nouveau');
    expect(sortedProjects[1].data.title).toBe('Projet moyen');
    expect(sortedProjects[2].data.title).toBe('Projet ancien');
  });

  it('should sort expositions by startDate if available, most recent first', async () => {
    // Données de test pour les expositions
    const mockExpositions: Array<{
      id: string;
      collection: "expositions";
      data: {
        title: string;
        draft: boolean;
        featured: boolean;
        date?: Date;
        startDate?: Date;
        weight?: number;
        description?: string;
        summaryImage?: string;
        listImage?: string;
        projectImages?: string[];
        location?: string;
        endDate?: Date;
      };
    }> = [
      { 
        id: 'expo-ancienne.md',
        collection: 'expositions',
        data: { 
          title: 'Expo ancienne', 
          startDate: new Date('2020-01-01'), 
          date: new Date('2020-01-01'),
          draft: false,
          featured: false
        }
      },
      {
        id: 'expo-nouvelle.md',
        collection: 'expositions',
        data: { 
          title: 'Expo nouvelle', 
          startDate: new Date('2023-12-31'), 
          date: new Date('2023-12-01'),
          draft: false,
          featured: false
        }
      },
      {
        id: 'expo-sans-startDate.md',
        collection: 'expositions',
        data: { 
          title: 'Expo sans startDate', 
          date: new Date('2022-06-15'), 
          draft: false,
          featured: false
        }
      }
    ];

    // Configuration du mock
    vi.mocked(getCollection).mockResolvedValue(mockExpositions);

    // Fonction de tri à tester
    const sortedExpositions = await getCollection('expositions').then(items => items.sort((a, b) => {
      // Si startDate est disponible, l'utiliser (spécifique aux expositions)
      if (a.data.startDate && b.data.startDate) {
        return b.data.startDate.valueOf() - a.data.startDate.valueOf();
      }
      // Sinon utiliser date normale
      if (!a.data.date || !b.data.date) return 0;
      return b.data.date.valueOf() - a.data.date.valueOf();
    }));

    // Vérification du tri
    expect(sortedExpositions[0].data.title).toBe('Expo nouvelle');
    expect(sortedExpositions[1].data.title).toBe('Expo sans startDate');
    expect(sortedExpositions[2].data.title).toBe('Expo ancienne');
  });

  it('should sort publications by publicationDate if available, most recent first', async () => {
    // Données de test pour les publications
    const mockPublications: Array<{
      id: string;
      collection: "publications";
      data: {
        title: string;
        draft: boolean;
        featured: boolean;
        publicationDate?: string;
        date?: Date;
        weight?: number;
        description?: string;
        summary?: string;
      };
    }> = [
      { 
        id: 'pub-ancienne.md',
        collection: 'publications',
        data: { 
          title: 'Publication ancienne', 
          publicationDate: '2020-01-01', 
          date: new Date('2020-01-15'),
          draft: false,
          featured: false
        }
      },
      {
        id: 'pub-nouvelle.md',
        collection: 'publications',
        data: { 
          title: 'Publication nouvelle', 
          publicationDate: '2023-12-31', 
          date: new Date('2023-12-15'),
          draft: false,
          featured: false
        }
      },
      {
        id: 'pub-sans-pubDate.md',
        collection: 'publications',
        data: { 
          title: 'Publication sans publicationDate', 
          date: new Date('2022-06-15'), 
          draft: false,
          featured: false
        }
      }
    ];

    // Configuration du mock
    vi.mocked(getCollection).mockResolvedValue(mockPublications);

    // Fonction de tri à tester
    const sortedPublications = await getCollection('publications').then(items => items.sort((a, b) => {
      // D'abord par date de publication si disponible
      if (a.data.publicationDate && b.data.publicationDate) {
        if (a.data.publicationDate > b.data.publicationDate) return -1;
        if (a.data.publicationDate < b.data.publicationDate) return 1;
      }
      // Sinon par date normale
      if (a.data.date && b.data.date) {
        return b.data.date.valueOf() - a.data.date.valueOf();
      }
      return 0;
    }));

    // Vérification du tri
    expect(sortedPublications[0].data.title).toBe('Publication nouvelle');
    expect(sortedPublications[1].data.title).toBe('Publication sans publicationDate');
    expect(sortedPublications[2].data.title).toBe('Publication ancienne');
  });
});
