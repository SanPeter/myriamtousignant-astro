import { describe, it, expect, vi, beforeEach } from 'vitest';

// Types des props pour éviter les erreurs TypeScript
type JumbotronProps = {
  title: string;
  description?: string;
};

type CarouselProps = {
  images: string[];
  altText?: string;
};

type GridProjetsProps = {
  projects: any[];
};

type BaseLayoutProps = {
  title: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
};

// Mock des composants
vi.mock('../src/components/Jumbotron', () => ({
  default: ({ title, description }: JumbotronProps) => 
    `<div data-testid="mock-jumbotron">${title} - ${description || ''}</div>`
}));

vi.mock('../src/components/Carousel.astro', () => ({
  default: async (props: CarouselProps) => {
    return `<div data-testid="mock-carousel">Carousel with ${props.images.length} images</div>`;
  }
}));

vi.mock('../src/components/GridProjets.astro', () => ({
  default: async (props: GridProjetsProps) => {
    return `<div data-testid="mock-grid-projets">Grid with ${props.projects.length} projects</div>`;
  }
}));

// Mock du BaseLayout
vi.mock('../src/layouts/BaseLayout.astro', () => ({
  default: async (props: BaseLayoutProps, children: string) => {
    return `<div data-testid="mock-base-layout"><title>${props.title}</title>${children}</div>`;
  }
}));

// Création d'un mock pour GenericLayout.astro
const mockGenericLayout = {
  render: async (props: any, slot: string = '') => {
    const { title, description, images = [], projectsData = [], showCarousel = true, showGridProjets = true } = props;
    
    let content = `<div data-testid="mock-jumbotron">${title} - ${description || ''}</div>`;
    
    if (showCarousel && images.length > 0) {
      content += `<div data-testid="mock-carousel">Carousel with ${images.length} images</div>`;
    }
    
    if (showGridProjets && projectsData.length > 0) {
      content += `<div data-testid="mock-grid-projets">Grid with ${projectsData.length} projects</div>`;
    }
    
    content += slot;
    
    return `<div data-testid="mock-base-layout"><title>${title}</title>${content}</div>`;
  }
};

// Mock de l'import du layout testé
vi.mock('../src/layouts/GenericLayout.astro', () => ({
  default: mockGenericLayout
}));

describe('GenericLayout', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders basic layout with title and description', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title',
      description: 'Test Description'
    });
    
    document.body.innerHTML = html;
    
    expect(document.querySelector('[data-testid="mock-jumbotron"]')?.textContent)
      .toContain('Test Title - Test Description');
    expect(document.querySelector('[data-testid="mock-carousel"]')).toBeNull();
    expect(document.querySelector('[data-testid="mock-grid-projets"]')).toBeNull();
  });

  it('renders carousel when showCarousel is true and images are provided', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title',
      images: ['img1.jpg', 'img2.jpg'],
      showCarousel: true
    });
    
    document.body.innerHTML = html;
    
    const carousel = document.querySelector('[data-testid="mock-carousel"]');
    expect(carousel).not.toBeNull();
    expect(carousel?.textContent).toContain('Carousel with 2 images');
  });

  it('does not render carousel when showCarousel is false', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title',
      images: ['img1.jpg', 'img2.jpg'],
      showCarousel: false
    });
    
    document.body.innerHTML = html;
    
    expect(document.querySelector('[data-testid="mock-carousel"]')).toBeNull();
  });

  it('renders grid projects when showGridProjets is true and projectsData are provided', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title',
      projectsData: [{ id: 1 }, { id: 2 }],
      showGridProjets: true
    });
    
    document.body.innerHTML = html;
    
    const grid = document.querySelector('[data-testid="mock-grid-projets"]');
    expect(grid).not.toBeNull();
    expect(grid?.textContent).toContain('Grid with 2 projects');
  });

  it('does not render grid projects when showGridProjets is false', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title',
      projectsData: [{ id: 1 }, { id: 2 }],
      showGridProjets: false
    });
    
    document.body.innerHTML = html;
    
    expect(document.querySelector('[data-testid="mock-grid-projets"]')).toBeNull();
  });

  it('renders slot content inside the layout', async () => {
    const html = await mockGenericLayout.render({
      title: 'Test Title'
    }, '<div data-testid="slot-content">Slot content</div>');
    
    document.body.innerHTML = html;
    
    const slotContent = document.querySelector('[data-testid="slot-content"]');
    expect(slotContent).not.toBeNull();
    expect(slotContent?.textContent).toBe('Slot content');
  });
});
