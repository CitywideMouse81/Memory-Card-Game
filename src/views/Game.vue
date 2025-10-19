<template>
  <div class="game">
    <div class="game-info">
      <div class="stat">
        <span>Moves:</span>
        <strong>{{ moves }}</strong>
      </div>
      <div class="stat">
        <span>Score:</span>
        <strong>{{ score }}</strong>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${gameProgress}%` }"></div>
      </div>
    </div>

    <div class="cards-grid" :class="`difficulty-${difficulty}`">
      <Card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :isFlipped="isCardFlipped(card.id)"
        :isMatched="isCardMatched(card.id)"
        @flip="flipCard"
      />
    </div>

    <div v-if="gameCompleted" class="game-complete">
      <h2>🎉 Congratulations! 🎉</h2>
      <p>Score: {{ score }}</p>
      <p>Moves: {{ moves }}</p>
      <button @click="restartGame">Play Again</button>
      <button @click="$router.push('/leaderboard')">View Leaderboard</button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Card from "../components/Card.vue";

export default {
  name: "Game",
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const cards = computed(() => store.state.cards);
    const moves = computed(() => store.state.moves);
    const score = computed(() => store.state.score);
    const gameCompleted = computed(() => store.state.gameCompleted);
    const difficulty = computed(() => store.state.difficulty);
    const gameProgress = computed(() => store.getters.gameProgress);

    const isCardFlipped = (cardId) => store.getters.isCardFlipped(cardId);
    const isCardMatched = (cardId) => store.getters.isCardMatched(cardId);

    const flipCard = (cardId) => {
      store.dispatch("flipCard", cardId);
    };

    const restartGame = async () => {
      await store.dispatch("initializeGame");
    };

    if (cards.value.length === 0) {
      store.dispatch("initializeGame");
    }

    return {
      cards,
      moves,
      score,
      gameCompleted,
      difficulty,
      gameProgress,
      isCardFlipped,
      isCardMatched,
      flipCard,
      restartGame,
    };
  },
};
</script>

<style scoped>
.game {
  background: white;
  padding: 30px;
  border-radius: 20px;
}

.game-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.stat {
  display: flex;
  gap: 10px;
  font-size: 1.2em;
}

.stat strong {
  color: #667eea;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s;
}

.cards-grid {
  display: grid;
  gap: 15px;
  margin: 30px 0;
}

.cards-grid.difficulty-easy {
  grid-template-columns: repeat(3, 1fr);
}

.cards-grid.difficulty-medium {
  grid-template-columns: repeat(4, 1fr);
}

.cards-grid.difficulty-hard {
  grid-template-columns: repeat(6, 1fr);
}

.game-complete {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
}

.game-complete h2 {
  color: #667eea;
  margin-bottom: 20px;
}

.game-complete p {
  font-size: 1.2em;
  margin: 10px 0;
}

.game-complete button {
  margin: 10px;
  padding: 15px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cards-grid.difficulty-medium {
    grid-template-columns: repeat(3, 1fr);
  }

  .cards-grid.difficulty-hard {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
