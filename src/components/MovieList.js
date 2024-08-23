// src/components/MovieList.js
import React from 'react';

const MovieList = ({ movies, onFavorite, onRemoveFavorite }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map(movie => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300'}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            {onFavorite && <button onClick={() => onFavorite(movie)}>Add to Favorites</button>}
            {onRemoveFavorite && <button onClick={() => onRemoveFavorite(movie.imdbID)}>Remove from Favorites</button>}
          </div>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
