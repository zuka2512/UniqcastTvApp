import React, { useEffect, useState } from 'react';
import ParallaxCarousel from '../ParallaxCarousel/ParallaxCarousel';
import { fetchMoviesByCategory } from '../../api/omdb';
import { MovieRailProps } from '../../models/MovieRail';
import { Movie } from '../../models/Movie';
import './MovieRail.css';

const MovieRail: React.FC<MovieRailProps> = ({
  category,
  isDimmed = false,
  selectedMovieIndex = 0,
  setIsAnimating,
  onMovieFocus,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const movieData = await fetchMoviesByCategory(category);
      setMovies(movieData);
      if (movieData.length > 0 && onMovieFocus) {
        onMovieFocus(movieData[selectedMovieIndex].Title, movieData[selectedMovieIndex].Plot, movieData[selectedMovieIndex].imdbID);
      }
    };
    loadMovies();
  }, [category, selectedMovieIndex, onMovieFocus]);

  return (
    <div className={`movie-rail ${isDimmed ? 'dimmed' : 'focused'}`}>
      <h2>{category}</h2>
      <ParallaxCarousel
        movies={movies}
        selectedMovieIndex={selectedMovieIndex}
        setIsAnimating={setIsAnimating}
        onSlideChange={(index) => {
          if (onMovieFocus && movies[index]) {
            onMovieFocus(movies[index].Title, movies[index].Plot, movies[index].imdbID);
          }
        }}
      />
    </div>
  );
};

export default MovieRail;
