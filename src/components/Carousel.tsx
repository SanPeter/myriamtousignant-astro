import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  altText: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altText }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Vérifie que le code s'exécute côté client
    setIsClient(true);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  if (!isClient || images.length === 0) return null;

  return (
    <div id="carouselControls" className="carousel carousel-dark slide mx-auto mb-5">
      {/* Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            onClick={() => goToSlide(index)}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Image ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Carousel items */}
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={`slide-${index}`}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <div className="d-flex justify-content-center">
              <img src={image} alt={`${altText} - ${index + 1}`} className="img-fluid mb-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button 
        className="carousel-control-prev" 
        type="button"
        onClick={handlePrev}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Précédent</span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Suivant</span>
      </button>
    </div>
  );
};

export default Carousel;
