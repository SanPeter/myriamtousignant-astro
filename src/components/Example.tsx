import React from 'react';

interface ExampleProps {
  greeting?: string;
}

export const Example = ({ greeting = 'Hello' }: ExampleProps) => {
  return (
    <div>
      <h1 data-testid="example-heading">{greeting}, World!</h1>
      <button>Click me</button>
    </div>
  );
};
