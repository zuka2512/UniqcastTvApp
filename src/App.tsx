import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen/HomeScreen';
import MovieDetailsScreen from './components/MovieDetails/MovieDetails';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
