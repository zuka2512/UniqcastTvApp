import axios from 'axios';
import { Movie } from '../models/Movie';
import { API_KEY, API_URL, movieCount } from '../config';

export const fetchMovieDetails = async (imdbID: string) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      i: imdbID,
      apikey: API_KEY,
      plot: 'short'
    },
  });

  return response.data;
};

export const fetchMoviesByCategory = async (category: string): Promise<Movie[]> => {
  let movies: Movie[] = [];
  let page = 1;

  try {
    while (movies.length < movieCount) {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}&type=movie&page=${page}`
      );

      if (response.data.Response === "True") {
        movies = movies.concat(response.data.Search);
        page += 1;
      } else {
        console.error("Error fetching movies:", response.data.Error);
        break;
      }
    }

    // Limit number of movies
    movies = movies.slice(0, movieCount);

    // Adding plot
    const detailedMovies = await Promise.all(
      movies.map(async (movie: { imdbID: string; Title: string; Poster: string; Type: string }) => {
        const detailsResponse = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            apikey: API_KEY,
            i: movie.imdbID,
            plot: 'short',
          },
        });
        return {
          imdbID: movie.imdbID,
          Title: movie.Title,
          Poster: movie.Poster,
          Plot: detailsResponse.data.Plot || 'No description available',
          Type: movie.Type,
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
