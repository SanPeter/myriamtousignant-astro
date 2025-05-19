import React from 'react';

interface JumbotronProps {
  title?: string;
  description?: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ title, description }) => {
  return (
    <div className="py-8 mb-10 border-b border-gray-200">
      {title && <h1 className="text-6xl mb-3">{title}</h1>}
      {description && <p className="text-xl text-gray-600">{description}</p>}
    </div>
  );
};

export default Jumbotron;
