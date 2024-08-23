// src/pages/FavoritesPage.js
import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <MovieList movies={favorites} onRemoveFavorite={handleRemoveFavorite} />
      ) : (
        <p>No favorite movies saved.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
