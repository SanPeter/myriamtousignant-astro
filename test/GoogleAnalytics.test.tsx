import { describe, it, expect, vi } from 'vitest';
import GoogleAnalytics from '../src/components/GoogleAnalytics';

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
});
