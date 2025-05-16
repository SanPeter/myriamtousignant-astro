import React from 'react';

interface Project {
  url: string;
  title: string;
  thumbnail?: string;
  description?: string;
  dateInfo?: string;
  location?: string;
}

interface GridProjetsProps {
  projects: Project[];
}

const GridProjets: React.FC<GridProjetsProps> = ({ projects }) => {
  return (
    <div className="grid-projets">
      <ul className="row flex-container list-unstyled">
        {projects.map((project, index) => (
          <li key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <a href={project.url} className="stretched-link">
                {project.thumbnail && (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  {project.dateInfo && (
                    <p className="card-text text-sm text-gray-600 mt-1">
                      {project.dateInfo}
                    </p>
                  )}
                  {project.location && (
                    <p className="card-text text-sm text-gray-600">
                      {project.location}
                    </p>
                  )}
                  {project.description && (
                    <p className="card-text">{project.description}</p>
                  )}
                </div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GridProjets;
