import React, { useState } from 'react';

const HeaderNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">Myriam Tousignant</a>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen ? "true" : "false"} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/projets">Projets</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/expositions">Expositions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/art-public">Art Public</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/livres-artiste">Livres d'artiste</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/mediations">Médiations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/biographie-demarche">Biographie & Démarche</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/boutique">Boutique</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
