import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import './ParallaxCarousel.css';
import { animationDuration } from '../../config';
import { ParallaxCarouselProps } from '../../models/ParallaxCarousel';

const ParallaxCarouselComponent: React.FC<ParallaxCarouselProps> = ({
  movies,
  selectedMovieIndex,
  onSlideChange,
  setIsAnimating,
}) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: animationDuration,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: true,
    beforeChange: () => {
      if (setIsAnimating) setIsAnimating(true);
    },
    afterChange: (currentIndex: number) => {
      if (setIsAnimating) setIsAnimating(false);
      if (onSlideChange) onSlideChange(currentIndex);
    },
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(selectedMovieIndex);
    }
  }, [selectedMovieIndex]);

  return (
    <div className="carousel-container">
      <Slider {...settings} ref={sliderRef}>
        {movies.map((movie, index) => (
          <div
            key={movie.imdbID}
            className={`carousel-item ${index === selectedMovieIndex ? 'focused' : ''}`}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/path-to-placeholder-image.jpg'}
              alt={movie.Title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const ParallaxCarousel = React.memo(ParallaxCarouselComponent);

export default ParallaxCarousel;
