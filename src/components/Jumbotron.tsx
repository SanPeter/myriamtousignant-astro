import React from 'react';

interface JumbotronProps {
  title?: string;
  description?: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({ title, description }) => {
  return (
    <div className="jumbotron jumbotron-fluid mb-5">
      {title && <h1 className="display-4">{title}</h1>}
      {description && <p className="lead">{description}</p>}
    </div>
  );
};

export default Jumbotron;
