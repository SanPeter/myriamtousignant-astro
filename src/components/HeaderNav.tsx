import React, { useState, useRef, useEffect } from 'react';

// Structure des données du méga-menu
const menuData = [
  {
    id: 'oeuvres',
    title: 'Œuvres & Créations',
    items: [
      { title: 'Projets', url: '/projets', description: 'Découvrez mes projets artistiques' },
      { title: 'Art Public', url: '/art-public', description: 'Œuvres d\'art dans l\'espace public' },
      { title: 'Livres d\'artiste', url: '/livres-artiste', description: 'Livres et créations imprimées' },
    ]
  },
  {
    id: 'evenements',
    title: 'Événements & Activités',
    items: [
      { title: 'Expositions', url: '/expositions', description: 'Expositions en cours et passées' },
      { title: 'Médiations', url: '/mediations', description: 'Ateliers et activités de médiation' },
    ]
  },
  {
    id: 'ressources',
    title: 'Ressources & Médias',
    items: [
      { title: 'Publications', url: '/publications', description: 'Articles et textes publiés' },
      { title: 'Presse', url: '/presse', description: 'Revue de presse et médias' },
    ]
  },
  {
    id: 'apropos',
    title: 'À propos',
    items: [
      { title: 'Biographie & Démarche', url: '/biographie-demarche', description: 'Parcours artistique et démarche' },
      { title: 'Boutique', url: '/boutique', description: 'Œuvres et produits à l\'achat' },
    ]
  }
];

const HeaderNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMegaMenu(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleMegaMenu = (id: string) => {
    setOpenMegaMenu(openMegaMenu === id ? null : id);
  };
  
  // Fermer le menu ouvert lorsqu'on appuie sur Echap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMegaMenu(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="bg-white shadow-sm py-3 relative z-30" ref={navRef}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <a className="text-xl font-medium text-gray-800 hover:text-gray-600" href="/">Myriam Tousignant</a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-400 hover:text-gray-900 hover:border-gray-900" 
            onClick={toggleMenu}
            aria-controls="navbarNav" 
            aria-expanded={isMenuOpen ? "true" : "false"} 
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path 
                className={isMenuOpen ? "hidden" : "block"} 
                d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
              />
              <path 
                className={isMenuOpen ? "block" : "hidden"} 
                d="M6 18L18 6M6 6l12 12"
                strokeWidth="2" 
                stroke="currentColor" 
                fill="none" 
              />
            </svg>
          </button>
          
          {/* Desktop menu - always visible on desktop */}
          <div className="hidden md:flex space-x-4 items-center">
            {menuData.map((category) => (
              <div key={category.id} className="relative group">
                <button
                  className={`px-2 py-1 text-gray-700 hover:text-gray-900 flex items-center group focus:outline-none ${openMegaMenu === category.id ? 'font-medium text-gray-900' : ''}`}
                  onClick={() => toggleMegaMenu(category.id)}
                  aria-expanded={openMegaMenu === category.id}
                  aria-controls={`megamenu-${category.id}`}
                >
                  {category.title}
                  <svg 
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${openMegaMenu === category.id ? 'transform rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Méga menu */}
                <div 
                  id={`megamenu-${category.id}`}
                  className={`absolute left-0 w-80 mt-2 p-4 bg-white border border-gray-200 shadow-lg rounded-lg transition-opacity duration-200 ${openMegaMenu === category.id ? 'block opacity-100' : 'hidden opacity-0'}`}
                >
                  <div className="grid gap-4">
                    {category.items.map((item, i) => (
                      <a 
                        key={i}
                        href={item.url} 
                        className="flex flex-col hover:bg-gray-50 p-2 rounded-md transition-colors"
                        onClick={() => setOpenMegaMenu(null)}
                      >
                        <span className="font-medium text-gray-800">{item.title}</span>
                        <span className="text-sm text-gray-600 mt-1">{item.description}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <a 
              href="https://www.instagram.com/myriamtousignant_art/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2 py-1 text-gray-700 hover:text-gray-900"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.25c-2.71 0-3.05.01-4.12.06-1.07.05-1.8.22-2.43.46-.66.26-1.21.6-1.77 1.16-.56.56-.9 1.11-1.16 1.77-.24.64-.41 1.36-.46 2.43-.05 1.07-.06 1.41-.06 4.12s.01 3.05.06 4.12c.05 1.07.22 1.8.46 2.43.26.66.6 1.21 1.16 1.77.56.56 1.11.9 1.77 1.16.64.24 1.36.41 2.43.46 1.07.05 1.41.06 4.12.06s3.05-.01 4.12-.06c1.07-.05 1.8-.22 2.43-.46.66-.26 1.21-.6 1.77-1.16.56-.56.9-1.11 1.16-1.77.24-.64.41-1.36.46-2.43.05-1.07.06-1.41.06-4.12s-.01-3.05-.06-4.12c-.05-1.07-.22-1.8-.46-2.43-.26-.66-.6-1.21-1.16-1.77-.56-.56-1.11-.9-1.77-1.16-.64-.24-1.36-.41-2.43-.46-1.07-.05-1.41-.06-4.12-.06zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.46.18.8.4 1.15.75.35.35.57.69.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.46-.4.8-.75 1.15-.35.35-.69.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35-.46-.18-.8-.4-1.15-.75-.35-.35-.57-.69-.75-1.15-.14-.36-.31-.88-.35-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.46.4-.8.75-1.15.35-.35.69-.57 1.15-.75.36-.14.88-.31 1.86-.35 1.05-.05 1.37-.06 4.04-.06z" fill="currentColor" />
                <path d="M12 15.75a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zm0-9.5a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5z" fill="currentColor" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Mobile menu - collapsible avec accordéon */}
        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-3`} 
          id="navbarNav"
        >
          <div className="flex flex-col space-y-2 py-2">
            {menuData.map((category) => (
              <div key={category.id} className="border-b border-gray-100 pb-2">
                <button
                  className="w-full flex justify-between items-center px-2 py-2 text-gray-800 font-medium"
                  onClick={() => toggleMegaMenu(category.id)}
                  aria-expanded={openMegaMenu === category.id}
                >
                  {category.title}
                  <svg 
                    className={`ml-1 h-5 w-5 transition-transform duration-200 ${openMegaMenu === category.id ? 'transform rotate-180' : ''}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className={`mt-1 ${openMegaMenu === category.id ? 'block' : 'hidden'}`}>
                  {category.items.map((item, i) => (
                    <a 
                      key={i}
                      href={item.url}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            
            <a 
              href="https://www.instagram.com/myriamtousignant_art/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded flex items-center"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 2.25c-2.71 0-3.05.01-4.12.06-1.07.05-1.8.22-2.43.46-.66.26-1.21.6-1.77 1.16-.56.56-.9 1.11-1.16 1.77-.24.64-.41 1.36-.46 2.43-.05 1.07-.06 1.41-.06 4.12s.01 3.05.06 4.12c.05 1.07.22 1.8.46 2.43.26.66.6 1.21 1.16 1.77.56.56 1.11.9 1.77 1.16.64.24 1.36.41 2.43.46 1.07.05 1.41.06 4.12.06s3.05-.01 4.12-.06c1.07-.05 1.8-.22 2.43-.46.66-.26 1.21-.6 1.77-1.16.56-.56.9-1.11 1.16-1.77.24-.64.41-1.36.46-2.43.05-1.07.06-1.41.06-4.12s-.01-3.05-.06-4.12c-.05-1.07-.22-1.8-.46-2.43-.26-.66-.6-1.21-1.16-1.77-.56-.56-1.11-.9-1.77-1.16-.64-.24-1.36-.41-2.43-.46-1.07-.05-1.41-.06-4.12-.06zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.46.18.8.4 1.15.75.35.35.57.69.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.46-.4.8-.75 1.15-.35.35-.69.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35-.46-.18-.8-.4-1.15-.75-.35-.35-.57-.69-.75-1.15-.14-.36-.31-.88-.35-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.46.4-.8.75-1.15.35-.35.69-.57 1.15-.75.36-.14.88-.31 1.86-.35 1.05-.05 1.37-.06 4.04-.06z" fill="currentColor" />
                <path d="M12 15.75a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zm0-9.5a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5z" fill="currentColor" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
