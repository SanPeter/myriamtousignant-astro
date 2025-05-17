import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-3 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-3 md:mb-0">
            <p>&copy; {currentYear} Myriam Tousignant. Tous droits réservés.</p>
          </div>
          <div className="flex">
            <div className="social-links">
              <a 
                href="https://www.instagram.com/myriamtousignant" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mr-3 text-gray-700 hover:text-gray-900"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25c-2.71 0-3.05.01-4.12.06-1.07.05-1.8.22-2.43.46-.66.26-1.21.6-1.77 1.16-.56.56-.9 1.11-1.16 1.77-.24.64-.41 1.36-.46 2.43-.05 1.07-.06 1.41-.06 4.12s.01 3.05.06 4.12c.05 1.07.22 1.8.46 2.43.26.66.6 1.21 1.16 1.77.56.56 1.11.9 1.77 1.16.64.24 1.36.41 2.43.46 1.07.05 1.41.06 4.12.06s3.05-.01 4.12-.06c1.07-.05 1.8-.22 2.43-.46.66-.26 1.21-.6 1.77-1.16.56-.56.9-1.11 1.16-1.77.24-.64.41-1.36.46-2.43.05-1.07.06-1.41.06-4.12s-.01-3.05-.06-4.12c-.05-1.07-.22-1.8-.46-2.43-.26-.66-.6-1.21-1.16-1.77-.56-.56-1.11-.9-1.77-1.16-.64-.24-1.36-.41-2.43-.46-1.07-.05-1.41-.06-4.12-.06zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.46.18.8.4 1.15.75.35.35.57.69.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.46-.4.8-.75 1.15-.35.35-.69.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35-.46-.18-.8-.4-1.15-.75-.35-.35-.57-.69-.75-1.15-.14-.36-.31-.88-.35-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.46.4-.8.75-1.15.35-.35.69-.57 1.15-.75.36-.14.88-.31 1.86-.35 1.05-.05 1.37-.06 4.04-.06z" fill="currentColor" />
                  <path d="M12 15.75a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5zm0-9.5a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5z" fill="currentColor" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>
              <a 
                href="mailto:contact@myriamtousignant.com"
                className="text-gray-700 hover:text-gray-900"
                aria-label="Courriel"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
