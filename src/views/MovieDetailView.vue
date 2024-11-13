<template>
  <div class="movie-detail">
    <div v-if="loading" class="loading">
      <div class="loader"></div>
      Загрузка информации о фильме...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="movie" class="movie-content">
      <div class="movie-header">
        <div class="movie-poster">
          <img 
            :src="posterUrl" 
            :alt="movie.title"
          >
        </div>
        
        <div class="movie-info">
          <h1>{{ movie.title }}</h1>
          
          <div class="movie-meta">
            <span class="year">{{ releaseYear }}</span>
            <span class="rating" v-if="movie.vote_average">
              ★ {{ movie.vote_average.toFixed(1) }}
            </span>
          </div>

          <div class="genres">
            <span 
              v-for="genre in movie.genres" 
              :key="genre.id"
              class="genre-tag"
            >
              {{ genre.name }}
            </span>
          </div>

          <p class="overview">{{ movie.overview }}</p>
        </div>
      </div>

      <!-- Cast Section -->
      <div v-if="topCast.length" class="cast-section">
        <h2>В главных ролях</h2>
        <div class="cast-list">
          <div 
            v-for="actor in topCast" 
            :key="actor.id"
            class="cast-card"
          >
            <img 
              :src="getActorImageUrl(actor.profile_path)" 
              :alt="actor.name"
            >
            <div class="actor-info">
              <h3>{{ actor.name }}</h3>
              <p>{{ actor.character }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Movies -->
      <div v-if="similarMovies.length" class="similar-section">
        <h2>Похожие фильмы</h2>
        <div class="similar-movies">
          <MovieCard 
            v-for="movie in similarMovies" 
            :key="movie.id" 
            :movie="movie"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { movieAPI } from '../services/api'
import MovieCard from '../components/MovieCard.vue'

export default {
  name: 'MovieDetailView',
  components: {
    MovieCard
  },
  data() {
    return {
      movie: null,
      loading: true,
      error: null
    }
  },
  computed: {
    posterUrl() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : '/placeholder.png'
    },
    releaseYear() {
      return this.movie.release_date
        ? new Date(this.movie.release_date).getFullYear()
        : 'Н/Д'
    },
    topCast() {
      return this.movie.credits?.cast?.slice(0, 3) || []
    },
    similarMovies() {
      return this.movie.similar?.results?.slice(0, 4) || []
    }
  },
  methods: {
    getActorImageUrl(path) {
      return path
        ? `https://image.tmdb.org/t/p/w200${path}`
        : '/placeholder.png'
    },
    async fetchMovieDetails() {
      try {
        this.loading = true
        this.error = null
        this.movie = await movieAPI.getMovieDetails(this.$route.params.id)
      } catch (err) {
        this.error = 'Ошибка при загрузке информации о фильме: ' + err.message
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchMovieDetails()
  }
}
</script>

<style scoped>
.movie-detail {
  padding: 20px 0;
}

.loading, .error {
  text-align: center;
  padding: 40px;
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
  color: #f44336;
  background-color: #ffebee;
  border-radius: 4px;
}

.movie-content {
  max-width: 1200px;
  margin: 0 auto;
}

.movie-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.movie-poster img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.movie-info h1 {
  margin: 0 0 20px 0;
  font-size: 2.5rem;
  color: #333;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.year {
  color: #666;
  font-size: 1.2rem;
}

.rating {
  background-color: #f5c518;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.genre-tag {
  background-color: #e0e0e0;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #333;
}

.overview {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
}

/* Cast Section Styles */
.cast-section {
  margin: 40px 0;
}

.cast-section h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
}

.cast-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.cast-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.cast-card:hover {
  transform: translateY(-5px);
}

.cast-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.actor-info {
  padding: 15px;
}

.actor-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: #333;
}

.actor-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

/* Similar Movies Section */
.similar-section {
  margin: 40px 0;
}

.similar-section h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.8rem;
}

.similar-movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .movie-header {
    grid-template-columns: 1fr;
  }

  .movie-poster {
    max-width: 300px;
    margin: 0 auto;
  }

  .movie-info h1 {
    font-size: 2rem;
    text-align: center;
  }

  .movie-meta {
    justify-content: center;
  }

  .genres {
    justify-content: center;
  }

  .cast-list, .similar-movies {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .movie-info h1 {
    font-size: 1.8rem;
  }

  .cast-list, .similar-movies {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }

  .cast-card img {
    height: 200px;
  }
}
</style>
