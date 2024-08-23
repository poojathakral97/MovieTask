// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [ratingRange, setRatingRange] = useState({ min: '', max: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const movieData = await fetchMovies(query, page);
        const filteredMovies = movieData.Search.filter(movie => {
          const year = parseInt(movie.Year);
          const rating = parseFloat(movie.imdbRating) || 0;

          const isYearInRange = (!yearRange.min || year >= parseInt(yearRange.min)) &&
                                 (!yearRange.max || year <= parseInt(yearRange.max));
          const isRatingInRange = (!ratingRange.min || rating >= parseFloat(ratingRange.min)) &&
                                   (!ratingRange.max || rating <= parseFloat(ratingRange.max));

          return isYearInRange && isRatingInRange;
        });

        if (movieData.Response === 'True') {
          setMovies(prevMovies => [...prevMovies, ...filteredMovies]);
        } else {
          setError(movieData.Error);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('An error occurred while fetching movies.');
      }

      setIsLoading(false);
    };

    loadMovies();
  }, [page, query, genre, yearRange, ratingRange]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setMovies([]);
    setPage(1);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setMovies([]);
    setPage(1);
  };

  const handleYearRangeChange = (e) => {
    setYearRange({
      ...yearRange,
      [e.target.name]: e.target.value
    });
    setMovies([]);
    setPage(1);
  };

  const handleRatingRangeChange = (e) => {
    setRatingRange({
      ...ratingRange,
      [e.target.name]: e.target.value
    });
    setMovies([]);
    setPage(1);
  };

  const handleFavorite = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleSearch}
      />
      <select onChange={handleGenreChange} value={genre}>
        <option value="">All Genres</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        {/* Add more genres as needed */}
      </select>
      <input
        type="number"
        name="min"
        placeholder="Min Year"
        value={yearRange.min}
        onChange={handleYearRangeChange}
      />
      <input
        type="number"
        name="max"
        placeholder="Max Year"
        value={yearRange.max}
        onChange={handleYearRangeChange}
      />
      <input
        type="number"
        step="0.1"
        name="min"
        placeholder="Min Rating"
        value={ratingRange.min}
        onChange={handleRatingRangeChange}
      />
      <input
        type="number"
        step="0.1"
        name="max"
        placeholder="Max Rating"
        value={ratingRange.max}
        onChange={handleRatingRangeChange}
      />
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} onFavorite={handleFavorite} />
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
