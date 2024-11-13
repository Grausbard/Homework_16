<template>
    <div class="search-form">
      <form @submit.prevent="handleSubmit">
        <div class="search-input-wrapper">
          <input 
            type="text"
            v-model="searchQuery"
            placeholder="Введите название фильма..."
            class="search-input"
          >
          <button type="submit" class="search-button">
            Поиск
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchForm',
    data() {
      return {
        searchQuery: ''
      }
    },
    methods: {
      handleSubmit() {
        if (this.searchQuery.trim()) {
          this.$emit('search', this.searchQuery.trim())
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .search-form {
    margin-bottom: 30px;
  }
  
  .search-input-wrapper {
    display: flex;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #2196F3;
  }
  
  .search-button {
    padding: 12px 24px;
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .search-button:hover {
    background-color: #1976D2;
  }
  </style>
  