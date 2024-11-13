<template>
  <div class="search-page">
    <h2>Поиск фильмов</h2>
    
    <SearchForm @search="searchMovies" />
    
    <div v-if="loading" class="loading">
      <div class="loader"></div>
      Поиск фильмов...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="movies.length" class="movies-grid">
      <MovieCard 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie"
      />
    </div>
    
    <div v-else-if="hasSearched" class="no-results">
      <h3>По вашему запросу ничего не найдено</h3>
      <p>Попробуйте изменить поисковый запрос</p>
    </div>
  </div>
</template>

<script>
import { movieAPI } from '../services/api'
import SearchForm from '../components/SearchForm.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'SearchView',
  components: {
    SearchForm,
    MovieCard
  },
  data() {
    return {
      movies: [],
      loading: false,
      error: null,
      hasSearched: false
    }
  },
  methods: {
    async searchMovies(query) {
      try {
        this.loading = true
        this.error = null
        this.movies = await movieAPI.searchMovies(query)
        this.hasSearched = true
      } catch (err) {
        this.error = 'Ошибка при поиске фильмов: ' + err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.search-page {
  padding: 20px 0;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 20px;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 4px;
  margin: 20px 0;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-results h3 {
  margin-bottom: 10px;
  color: #333;
}

.no-results p {
  color: #666;
}
</style>
