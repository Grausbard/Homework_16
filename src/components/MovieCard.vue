<template>
    <div class="movie-card" @click="goToMovie">
      <img 
        :src="posterUrl" 
        :alt="movie.title"
        class="movie-poster"
      >
      <div class="movie-info">
        <h3>{{ movie.title }}</h3>
        <div class="movie-meta">
          <span class="movie-year">{{ releaseYear }}</span>
          <span class="movie-rating" v-if="movie.vote_average">
            ★ {{ movie.vote_average.toFixed(1) }}
          </span>
        </div>
        <p class="movie-description">{{ truncatedOverview }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieCard',
    props: {
      movie: {
        type: Object,
        required: true
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
      truncatedOverview() {
        return this.movie.overview?.length > 150
          ? this.movie.overview.slice(0, 150) + '...'
          : this.movie.overview
      }
    },
    methods: {
      goToMovie() {
        this.$router.push(`/movies/${this.movie.id}`)
      }
    }
  }
  </script>
  
  <style scoped>
  .movie-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
    cursor: pointer;
  }
  
  .movie-card:hover {
    transform: translateY(-5px);
  }
  
  .movie-poster {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .movie-info {
    padding: 15px;
  }
  
  h3 {
    margin: 0 0 10px 0;
    font-size: 1.2rem;
    color: #333;
  }
  
  .movie-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .movie-year {
    color: #666;
  }
  
  .movie-rating {
    color: #f5c518;
    font-weight: bold;
  }
  
  .movie-description {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
  </style>
  