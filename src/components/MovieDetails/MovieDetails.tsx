import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/omdb';
import Player from '../Player/Player';
import './MovieDetails.css';
import { MovieDetails } from '../../models/MovieDetails';
import { pexelsVideoUrl } from '../../config';

const MovieDetailsScreen: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovieDetails(imdbID!).then((data) => setMovie(data));
  }, [imdbID]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-screen">
      <div className="movie-details-info">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" loading="lazy" />
        <h1>{movie.Title} ({movie.Year})</h1>
        <p>{movie.Plot}</p>
      </div>
      <div className="movie-player">
        <Player videoUrl={pexelsVideoUrl} />
      </div>
    </div>
  );
};

export default MovieDetailsScreen;