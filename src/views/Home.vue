<template>
  <div class="home">
    <h2>Welcome to Memory Card Game!</h2>
    <p>Test your memory by matching pairs of cards.</p>

    <div class="difficulty-selector">
      <h3>Select Difficulty:</h3>
      <div class="buttons">
        <button
          @click="setDifficulty('easy')"
          :class="{ active: difficulty === 'easy' }"
        >
          Easy (6 pairs)
        </button>
        <button
          @click="setDifficulty('medium')"
          :class="{ active: difficulty === 'medium' }"
        >
          Medium (8 pairs)
        </button>
        <button
          @click="setDifficulty('hard')"
          :class="{ active: difficulty === 'hard' }"
        >
          Hard (12 pairs)
        </button>
      </div>
    </div>

    <button class="start-button" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const router = useRouter();

    const difficulty = computed(() => store.state.difficulty);

    const setDifficulty = (level) => {
      store.commit("SET_DIFFICULTY", level);
    };

    const startGame = async () => {
      await store.dispatch("initializeGame");
      router.push("/game");
    };

    return {
      difficulty,
      setDifficulty,
      startGame,
    };
  },
};
</script>

<style scoped>
.home {
  background: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
}

.home h2 {
  color: #667eea;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.home p {
  font-size: 1.2em;
  margin-bottom: 40px;
  color: #666;
}

.difficulty-selector {
  margin: 40px 0;
}

.difficulty-selector h3 {
  margin-bottom: 20px;
  color: #333;
}

.buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.buttons button {
  padding: 15px 30px;
  border: 2px solid #667eea;
  background: white;
  color: #667eea;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.buttons button:hover,
.buttons button.active {
  background: #667eea;
  color: white;
}

.start-button {
  padding: 20px 50px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s;
}

.start-button:hover {
  background: #764ba2;
  transform: translateY(-3px);
}
</style>
