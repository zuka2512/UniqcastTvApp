export interface MovieRailProps {
    category: string;
    isDimmed?: boolean;
    selectedMovieIndex?: number;
    setIsAnimating?: (isAnimating: boolean) => void;
    onMovieFocus?: (title: string, description: string, imdbID: string) => void;
  }