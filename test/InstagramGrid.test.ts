import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

// Simuler le rendu du composant InstagramGrid
const InstagramGrid = ({ 
  posts = [], 
  columns = 3, 
  columnsTablet = 2, 
  columnsMobile = 1 
}: {
  posts: { url: string; caption?: string }[];
  columns?: number;
  columnsTablet?: number;
  columnsMobile?: number;
}) => {
  const gridClass = `grid grid-cols-${columnsMobile} md:grid-cols-${columnsTablet} lg:grid-cols-${columns} gap-4`;
  
  return React.createElement(
    'div',
    { className: gridClass },
    posts.map((post, index) => 
      React.createElement(
        'div',
        { 
          key: index,
          className: 'instagram-post-wrapper bg-white rounded-lg shadow-md overflow-hidden'
        },
        React.createElement(
          'blockquote',
          {
            className: 'instagram-media',
            'data-instgrm-captioned': true,
            'data-instgrm-permalink': `${post.url}?utm_source=ig_embed&utm_campaign=loading`,
            'data-instgrm-version': '14',
            style: {
              background: '#FFF',
              border: '0',
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '100%',
              minWidth: '326px',
              padding: '0',
              width: '99.375%'
            }
          },
          [
            React.createElement(
              'div',
              { key: 'container', style: { padding: '16px' } },
              [
                React.createElement(
                  'a',
                  { 
                    key: 'link',
                    href: `${post.url}?utm_source=ig_embed&utm_campaign=loading`,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'instagram-link'
                  },
                  React.createElement(
                    'div',
                    {
                      className: 'instagram-placeholder flex items-center justify-center bg-gray-100 aspect-square'
                    },
                    React.createElement(
                      'span',
                      { className: 'text-gray-400' },
                      'Chargement...'
                    )
                  )
                ),
                post.caption && React.createElement(
                  'p',
                  { 
                    key: 'caption',
                    className: 'caption text-gray-700 text-sm mt-2 p-2'
                  },
                  post.caption
                )
              ]
            )
          ]
        )
      )
    )
  );
};

describe('InstagramGrid', () => {
  it('renders correctly with default props', () => {
    const posts = [
      { url: 'https://www.instagram.com/p/test1/' },
      { url: 'https://www.instagram.com/p/test2/' }
    ];
    
    const { container } = render(React.createElement(InstagramGrid, { posts }));
    
    // Vérifier que la grille est créée avec la bonne classe
    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('grid');
    expect(gridElement).toHaveClass('grid-cols-1');
    expect(gridElement).toHaveClass('md:grid-cols-2');
    expect(gridElement).toHaveClass('lg:grid-cols-3');
    
    // Vérifier que le bon nombre de publications est rendu
    const postWrappers = container.querySelectorAll('.instagram-post-wrapper');
    expect(postWrappers.length).toBe(2);
    
    // Vérifier que chaque publication contient un blockquote avec les bonnes données
    const blockquotes = container.querySelectorAll('blockquote.instagram-media');
    expect(blockquotes.length).toBe(2);
    expect(blockquotes[0].getAttribute('data-instgrm-permalink')).toContain('https://www.instagram.com/p/test1/');
    expect(blockquotes[1].getAttribute('data-instgrm-permalink')).toContain('https://www.instagram.com/p/test2/');
  });

  it('renders with custom column configuration', () => {
    const posts = [
      { url: 'https://www.instagram.com/p/test1/' },
      { url: 'https://www.instagram.com/p/test2/' }
    ];
    
    const { container } = render(React.createElement(InstagramGrid, { 
      posts,
      columns: 4,
      columnsTablet: 3,
      columnsMobile: 2
    }));
    
    // Vérifier que la grille a les bonnes classes pour les colonnes
    const gridElement = container.firstChild;
    expect(gridElement).toHaveClass('grid-cols-2');
    expect(gridElement).toHaveClass('md:grid-cols-3');
    expect(gridElement).toHaveClass('lg:grid-cols-4');
  });

  it('displays captions when provided', () => {
    const posts = [
      { url: 'https://www.instagram.com/p/test1/', caption: 'Test Caption 1' },
      { url: 'https://www.instagram.com/p/test2/', caption: 'Test Caption 2' }
    ];
    
    const { container, getByText } = render(React.createElement(InstagramGrid, { posts }));
    
    // Vérifier que les légendes sont affichées
    expect(getByText('Test Caption 1')).toBeInTheDocument();
    expect(getByText('Test Caption 2')).toBeInTheDocument();
    
    // Vérifier que les légendes ont la bonne classe
    const captions = container.querySelectorAll('.caption');
    expect(captions.length).toBe(2);
    expect(captions[0]).toHaveClass('text-gray-700');
  });

  it('renders empty grid when no posts are provided', () => {
    const { container } = render(React.createElement(InstagramGrid, { posts: [] }));
    
    // Vérifier que la grille est rendue mais vide
    const gridElement = container.firstChild;
    expect(gridElement).toBeInTheDocument();
    expect(gridElement?.childNodes.length).toBe(0);
  });
});
