// src/services/movieService.js
import axios from 'axios';

const API_KEY = '4586cd63'; // OMDb API key
const BASE_URL = 'http://www.omdbapi.com/';

// Function to fetch movies based on a search query
export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        s: query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { Search: [] };
  }
};

// Function to fetch popular movies (since OMDb doesn't provide a "popular" endpoint, you can use a predefined search term or something similar)
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        s: 'The Godfather', // Example search for popular movies
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return { Search: [] };
  }
};
