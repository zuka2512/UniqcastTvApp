import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieRail from '../MovieRail/MovieRail';
import { movieCount, animationDuration, rails } from '../../config';
import './Homescreen.css';

const HomeScreen = () => {
  const [activeRailIndex, setActiveRailIndex] = useState(0);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [currentMovieTitle, setCurrentMovieTitle] = useState('');
  const [currentMovieDescription, setCurrentMovieDescription] = useState('');
  const [currentMovieID, setCurrentMovieID] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCategoryChanging, setIsCategoryChanging] = useState(false); 
  const homeScreenRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (homeScreenRef.current) {
      homeScreenRef.current.focus();
    }
  }, []);

  const updateMovieInfo = (index: number) => {
    setSelectedMovieIndex(index);
  };

  const waitForAnimation = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsAnimating(false);
        setIsCategoryChanging(false);
        resolve();
      }, animationDuration * 1.1);
    });
  };

  const handleNavigation = async (navigationFn: () => void) => {
    if (isAnimating === false) {
      setIsAnimating(true);
      navigationFn();
      await waitForAnimation();
    }
  };

  const moveDown = () =>
    handleNavigation(() => {
      setIsCategoryChanging(true);
      setActiveRailIndex((prevIndex) => (prevIndex + 1) % rails.length);
      updateMovieInfo(0);
    });

  const moveUp = () =>
    handleNavigation(() => {
      if (activeRailIndex > 0) {
        setIsCategoryChanging(true);
        setActiveRailIndex((prevIndex) => (prevIndex - 1 + rails.length) % rails.length);
        updateMovieInfo(0);
      }
    });

  const moveLeft = () =>
    handleNavigation(() => {
      if (selectedMovieIndex > 0) {
        updateMovieInfo(selectedMovieIndex - 1);
      }
    });

  const moveRight = () =>
    handleNavigation(() => {
      const newIndex = selectedMovieIndex + 1;
      updateMovieInfo(newIndex < movieCount ? newIndex : 0);
    });

  const handleEnter = () => {
    if (currentMovieID) {
      navigate(`/movie/${currentMovieID}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') moveUp();
    else if (e.key === 'ArrowDown') moveDown();
    else if (e.key === 'ArrowLeft') moveLeft();
    else if (e.key === 'ArrowRight') moveRight();
    else if (e.key === 'Enter') handleEnter();
    else if (e.key === 'Backspace') navigate(-1);
  };

  const handleOnMovieFocus = (title: string, description: string, imdbID: string) => {
    setCurrentMovieTitle(title);
    setCurrentMovieDescription(description);
    setCurrentMovieID(imdbID);
  }

  return (
    <div className="home-screen" ref={homeScreenRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className={`movie-info fade-text`} key={currentMovieID}>
        <h1>{currentMovieTitle}</h1>
        <p>{currentMovieDescription}</p>
      </div>
      <div className={`movie-rail-container ${isCategoryChanging ? 'fade-category' : ''}`}>
        <MovieRail
          category={rails[activeRailIndex]}
          selectedMovieIndex={selectedMovieIndex}
          onMovieFocus={handleOnMovieFocus}
        />
        {activeRailIndex < rails.length - 1 && (
          <MovieRail
            category={rails[(activeRailIndex + 1) % rails.length]}
            isDimmed={true}
          />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
