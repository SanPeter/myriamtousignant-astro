import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-3 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <p>&copy; {currentYear} Myriam Tousignant. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
