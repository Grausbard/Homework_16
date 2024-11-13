<template>
  <header class="header">
    <div class="header-content">
      <h1>Movie Search</h1>
      <nav>
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/movies" class="nav-link">Поиск фильмов</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background-color: #1a1a1a;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  color: #ffffff;
  margin: 0;
}

nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #333;
}
</style>
