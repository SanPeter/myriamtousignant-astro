import React, { useState } from 'react';

const HeaderNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-3">
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
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/projets">Projets</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/expositions">Expositions</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/art-public">Art Public</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/livres-artiste">Livres d'artiste</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/mediations">Médiations</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/biographie-demarche">Biographie & Démarche</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/boutique">Boutique</a>
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
        
        {/* Mobile menu - collapsible */}
        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-3`} 
          id="navbarNav"
        >
          <div className="flex flex-col space-y-2 py-2">
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/projets">Projets</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/expositions">Expositions</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/art-public">Art Public</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/livres-artiste">Livres d'artiste</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/mediations">Médiations</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/biographie-demarche">Biographie & Démarche</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded" href="/boutique">Boutique</a>
            <a 
              href="https://www.instagram.com/myriamtousignant_art/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded flex items-center"
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
