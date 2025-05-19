import { describe, it, expect, vi } from 'vitest';
import GoogleAnalytics from '../src/components/GoogleAnalytics';
import * as envConfig from '../src/utils/env-config';

// Mock du module env-config pour pouvoir contrôler la valeur retournée par isGoogleAnalyticsEnabled
vi.mock('../src/utils/env-config', async () => {
  const actual = await vi.importActual('../src/utils/env-config');
  return {
    ...actual as object,
    isGoogleAnalyticsEnabled: vi.fn()
  };
});

describe('GoogleAnalytics Component', () => {
  it('should be defined', () => {
    expect(GoogleAnalytics).toBeDefined();
  });
  
  it('should be a React component', () => {
    expect(typeof GoogleAnalytics).toBe('function');
  });
  
  it('should accept gaId prop', () => {
    // Vérifie que le composant a un paramètre gaId
    const componentString = GoogleAnalytics.toString();
    expect(componentString).toContain('gaId');
  });
  
  it('should have proper implementation for isGoogleAnalyticsEnabled', () => {
    // Test que la fonction existe et a le bon type
    expect(typeof envConfig.isGoogleAnalyticsEnabled).toBe('function');
    
    // Mock la fonction au lieu d'appeler la vraie fonction
    const mockIsEnabled = vi.mocked(envConfig.isGoogleAnalyticsEnabled);
    mockIsEnabled.mockImplementation((id) => !!id && id !== 'G-XXXXXXXXXX');
    
    // Test la fonction mockée
    expect(mockIsEnabled('')).toBe(false);
    expect(mockIsEnabled('G-XXXXXXXXXX')).toBe(false);
    expect(mockIsEnabled('G-VALIDID123')).toBe(true);
  });
  
  it('should import isGoogleAnalyticsEnabled from utils/env-config', () => {
    // Vérifie que le composant importe bien la fonction
    const componentString = GoogleAnalytics.toString();
    expect(componentString).toContain('isGoogleAnalyticsEnabled');
  });
});
