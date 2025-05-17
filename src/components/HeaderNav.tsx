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
          <div className="hidden md:flex space-x-4">
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/projets">Projets</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/expositions">Expositions</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/art-public">Art Public</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/livres-artiste">Livres d'artiste</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/mediations">Médiations</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/biographie-demarche">Biographie & Démarche</a>
            <a className="px-2 py-1 text-gray-700 hover:text-gray-900" href="/boutique">Boutique</a>
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
