import axios from 'axios';

const API_KEY = 'a99fb7aa219419a4339782394a770f23'
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieAPI = {
  async getTopMovies() {
    try {
      const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: {
          api_key: API_KEY,
          language: 'ru-RU',
          page: 1
        }
      });
      return response.data.results.slice(0, 20); // берем первые 20 фильмов
    } catch (error) {
      console.error('Error fetching top movies:', error);
      throw error;
    }
  },

  async searchMovies(query) {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          language: 'ru-RU',
          query: query
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  async getMovieDetails(id) {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'ru-RU',
          append_to_response: 'credits,similar'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
};
