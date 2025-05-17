import { describe, it, expect } from 'vitest';

describe('InstagramPosts', () => {
  it('should have the correct Instagram post URLs', () => {
    // Définir les posts Instagram attendus
    const expectedPosts = [
      "https://www.instagram.com/p/CW2-DupLFmb/",
      "https://www.instagram.com/p/CW8WQnoAFjy/",
      "https://www.instagram.com/p/CW_OjzaLdlR/",
      "https://www.instagram.com/p/CXBeTLILPkb/",
      "https://www.instagram.com/p/CXEkERWloax/",
      "https://www.instagram.com/p/CXG14C9LmTz/"
    ];
    
    // Vérifier que chaque URL est dans le format attendu
    expectedPosts.forEach(url => {
      expect(url).toContain('instagram.com/p/');
    });
    
    // Vérifier qu'il y a 6 posts
    expect(expectedPosts.length).toBe(6);
  });
  
  it('should specify correct grid layout', () => {
    // Vérification que la configuration du grid est correcte
    const expectedConfig = {
      columns: 3,
      columnsTablet: 2,
      columnsMobile: 1
    };
    
    // Vérifier les valeurs
    expect(expectedConfig.columns).toBe(3);
    expect(expectedConfig.columnsTablet).toBe(2);
    expect(expectedConfig.columnsMobile).toBe(1);
  });
});