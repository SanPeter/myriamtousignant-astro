import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getContentImagePath, getImageBySummaryPath, getImagesBySlug } from '../src/utils/contentImages';

// Mock de import.meta.glob pour simuler les images
vi.mock('import.meta.glob', () => {
  return {
    default: () => {
      return {
        '../content/projets/projet-test/image1.jpg': () => Promise.resolve({ default: { src: '/mock-image-path1.jpg', width: 800, height: 600 } }),
        '../content/projets/projet-test/image2.jpg': () => Promise.resolve({ default: { src: '/mock-image-path2.jpg', width: 800, height: 600 } }),
        '../content/expositions/expo-test/summary.jpg': () => Promise.resolve({ default: { src: '/mock-expo-image.jpg', width: 1200, height: 800 } }),
      }
    }
  }
});

describe('Content Images Utilities', () => {
  describe('getContentImagePath', () => {
    it('should return undefined if no image path is provided', () => {
      expect(getContentImagePath('projets', 'projet-test', undefined)).toBeUndefined();
    });

    it('should return the absolute path as is', () => {
      expect(getContentImagePath('projets', 'projet-test', '/absolute/path.jpg')).toBe('/absolute/path.jpg');
      expect(getContentImagePath('projets', 'projet-test', 'http://example.com/image.jpg')).toBe('http://example.com/image.jpg');
    });

    it('should build the correct path for content images', () => {
      expect(getContentImagePath('projets', 'projet-test', 'image.jpg')).toBe('../content/projets/projet-test/image.jpg');
    });

    it('should extract folder name from nested content', () => {
      expect(getContentImagePath('projets', 'projet-test/index.md', 'image.jpg')).toBe('../content/projets/projet-test/image.jpg');
    });
  });

  // Test pour getImageBySummaryPath et getImagesBySlug peuvent être ajoutés quand ces fonctions seront complètement implémentées
});
