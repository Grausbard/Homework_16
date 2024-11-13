<template>
  <div class="home">
    <div class="header-actions">
      <h2>Топ фильмов</h2>
      <router-link to="/movies" class="search-button">
        Найти фильм
      </router-link>
    </div>

    <div class="filters">
      <button 
        :class="{ active: showHighRated }"
        @click="showHighRated = !showHighRated"
      >
        Рейтинг > 9
      </button>
      <button 
        :class="{ active: showAfter2000 }"
        @click="showAfter2000 = !showAfter2000"
      >
        После 2000 года
      </button>
    </div>

    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="movies-grid">
      <MovieCard 
        v-for="movie in filteredMovies" 
        :key="movie.id" 
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import { movieAPI } from '../services/api'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'HomeView',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [],
      loading: true,
      error: null,
      showHighRated: false,
      showAfter2000: false
    }
  },
  computed: {
    filteredMovies() {
      let filtered = [...this.movies]

      if (this.showHighRated) {
        filtered = filtered.filter(movie => movie.vote_average > 9)
      }

      if (this.showAfter2000) {
        filtered = filtered.filter(movie => {
          const year = new Date(movie.release_date).getFullYear()
          return year >= 2000
        })
      }

      return filtered
    }
  },
  async created() {
    try {
      this.loading = true
      this.movies = await movieAPI.getTopMovies()
    } catch (err) {
      this.error = 'Ошибка при загрузке фильмов: ' + err.message
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px 0;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-button {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #1976D2;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filters button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
}

.filters button:hover {
  background-color: #d0d0d0;
}

.filters button.active {
  background-color: #2196F3;
  color: white;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 4px;
}
</style>
