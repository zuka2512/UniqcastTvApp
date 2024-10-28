import { Movie } from "./Movie";

export interface ParallaxCarouselProps {
  movies: Movie[];
  selectedMovieIndex: number;
  onSlideChange?: (index: number) => void;
  setIsAnimating?: (isAnimating: boolean) => void;
}
