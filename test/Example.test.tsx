import { render, screen } from '@testing-library/react';
import { Example } from '../src/components/Example';
import { describe, it, expect } from 'vitest';

describe('Example component', () => {
  it('renders with default greeting', () => {
    render(<Example />);
    expect(screen.getByTestId('example-heading')).toHaveTextContent('Hello, World!');
  });

  it('renders with custom greeting', () => {
    render(<Example greeting="Bonjour" />);
    expect(screen.getByTestId('example-heading')).toHaveTextContent('Bonjour, World!');
  });

  it('renders with another custom greeting', () => {
    render(<Example greeting="Hello" />);
    expect(screen.getByTestId('example-heading')).toHaveTextContent('Hello, World!');
  });

  it('contains a button', () => {
    render(<Example />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
