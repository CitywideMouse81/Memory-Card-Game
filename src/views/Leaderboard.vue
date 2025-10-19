<template>
  <div class="leaderboard">
    <h2>🏆 Leaderboard 🏆</h2>
    <div v-if="leaderboard.length > 0" class="leaderboard-list">
      <div
        v-for="(entry, index) in leaderboard"
        :key="index"
        class="leaderboard-entry"
        :class="`rank-${index + 1}`"
      >
        <span class="rank">{{ index + 1 }}</span>
        <span class="score">{{ entry.score }} points</span>
        <span class="moves">{{ entry.moves }} moves</span>
        <span class="difficulty">{{ entry.difficulty }}</span>
      </div>
    </div>
    <p v-else>No scores yet. Play a game to get started!</p>
    <button @click="$router.push('/')">Back to Home</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Leaderboard",
  setup() {
    const store = useStore();
    const leaderboard = computed(() => store.state.leaderboard);

    return {
      leaderboard,
    };
  },
};
</script>

<style scoped>
.leaderboard {
  background: white;
  padding: 50px;
  border-radius: 20px;
  text-align: center;
}

.leaderboard h2 {
  color: #667eea;
  margin-bottom: 30px;
}

.leaderboard-list {
  margin: 30px 0;
}

.leaderboard-entry {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin: 10px 0;
  background: #f5f5f5;
  border-radius: 10px;
  align-items: center;
}

.leaderboard-entry.rank-1 {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
}

.leaderboard-entry.rank-2 {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
}

.leaderboard-entry.rank-3 {
  background: linear-gradient(135deg, #cd7f32 0%, #e8a87c 100%);
}

.rank {
  font-weight: bold;
  font-size: 1.5em;
}

button {
  margin-top: 30px;
  padding: 15px 40px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
