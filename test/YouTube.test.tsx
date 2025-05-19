import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import YouTube from '../src/components/YouTube';

describe('YouTube component', () => {
  it('should render with default props correctly', () => {
    render(<YouTube id="test123" />);
    
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toBe('https://www.youtube.com/embed/test123');
    expect(iframe.getAttribute('width')).toBe('560');
    expect(iframe.getAttribute('height')).toBe('315');
    expect(iframe.getAttribute('allow')).toBe('accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  });

  it('should render with custom props correctly', () => {
    render(
      <YouTube 
        id="custom123" 
        title="Custom Title" 
        width={640} 
        height={480}
        allow="accelerometer"
        className="custom-class"
      />
    );
    
    const iframe = screen.getByTitle('Custom Title');
    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toBe('https://www.youtube.com/embed/custom123');
    expect(iframe.getAttribute('width')).toBe('640');
    expect(iframe.getAttribute('height')).toBe('480');
    expect(iframe.getAttribute('allow')).toBe('accelerometer');
    expect(iframe.parentElement?.classList.contains('custom-class')).toBe(true);
  });
});
