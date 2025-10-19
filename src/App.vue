<template>
  <div id="app">
    <header>
      <h1>Memory Card Game</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/game">Game</router-link>
        <router-link to="/leaderboard">Leaderboard</router-link>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

header h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  transition: all 0.3s;
}

nav a:hover,
nav a.router-link-active {
  background: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  header h1 {
    font-size: 2em;
  }

  nav {
    flex-direction: column;
  }
}
</style>
