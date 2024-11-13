<template>
    <div class="movie-list-container">
      <div class="filters">
        <button 
          :class="{ active: showHighRated }"
          @click="toggleHighRated"
          class="filter-btn"
        >
          Рейтинг > 9
        </button>
        <button 
          :class="{ active: showAfter2000 }"
          @click="toggleAfter2000"
          class="filter-btn"
        >
          После 2000 года
        </button>
      </div>
  
      <div class="movies-grid">
        <MovieCard 
          v-for="movie in filteredMovies" 
          :key="movie.id" 
          :movie="movie"
        />
      </div>
  
      <div v-if="filteredMovies.length === 0" class="no-results">
        Фильмы не найдены
      </div>
    </div>
  </template>
  
  <script>
  import MovieCard from './MovieCard.vue'
  
  export default {
    name: 'MovieList',
    components: {
      MovieCard
    },
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
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
          filtered = filtered.filter(movie
  