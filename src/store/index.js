import { createStore } from "vuex";

const store = createStore({
  state: {
    cards: [],
    flippedCards: [],
    matchedCards: [],
    moves: 0,
    score: 0,
    gameStarted: false,
    gameCompleted: false,
    difficulty: "medium",
    leaderboard: [],
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    },
    FLIP_CARD(state, cardId) {
      if (
        state.flippedCards.length < 2 &&
        !state.flippedCards.includes(cardId)
      ) {
        state.flippedCards.push(cardId);
      }
    },
    UNFLIP_CARDS(state) {
      state.flippedCards = [];
    },
    ADD_MATCHED_CARDS(state, cardIds) {
      state.matchedCards.push(...cardIds);
    },
    INCREMENT_MOVES(state) {
      state.moves++;
    },
    UPDATE_SCORE(state, points) {
      state.score += points;
    },
    START_GAME(state) {
      state.gameStarted = true;
      state.moves = 0;
      state.score = 0;
      state.matchedCards = [];
      state.flippedCards = [];
      state.gameCompleted = false;
    },
    COMPLETE_GAME(state) {
      state.gameCompleted = true;
    },
    SET_DIFFICULTY(state, difficulty) {
      state.difficulty = difficulty;
    },
    ADD_TO_LEADERBOARD(state, entry) {
      state.leaderboard.push(entry);
      state.leaderboard.sort((a, b) => b.score - a.score);
      state.leaderboard = state.leaderboard.slice(0, 10);
    },
  },
  actions: {
    async initializeGame({ commit, state }) {
      const cardCount =
        state.difficulty === "easy"
          ? 6
          : state.difficulty === "medium"
          ? 8
          : 12;
      const cards = generateCards(cardCount);
      commit("SET_CARDS", cards);
      commit("START_GAME");
    },
    async flipCard({ commit, state, dispatch }, cardId) {
      if (state.flippedCards.length >= 2) return;

      commit("FLIP_CARD", cardId);

      if (state.flippedCards.length === 2) {
        commit("INCREMENT_MOVES");
        await dispatch("checkMatch");
      }
    },
    async checkMatch({ commit, state, dispatch }) {
      const [firstId, secondId] = state.flippedCards;
      const firstCard = state.cards.find((c) => c.id === firstId);
      const secondCard = state.cards.find((c) => c.id === secondId);

      return new Promise((resolve) => {
        setTimeout(() => {
          if (firstCard.value === secondCard.value) {
            commit("ADD_MATCHED_CARDS", [firstId, secondId]);
            commit("UPDATE_SCORE", 10);
            commit("UNFLIP_CARDS");

            if (state.matchedCards.length === state.cards.length) {
              dispatch("completeGame");
            }
          } else {
            commit("UPDATE_SCORE", -2);
            commit("UNFLIP_CARDS");
          }
          resolve();
        }, 1000);
      });
    },
    completeGame({ commit, state }) {
      commit("COMPLETE_GAME");
      const entry = {
        score: state.score,
        moves: state.moves,
        difficulty: state.difficulty,
        date: new Date().toISOString(),
      };
      commit("ADD_TO_LEADERBOARD", entry);
    },
  },
  getters: {
    isCardFlipped: (state) => (cardId) => {
      return state.flippedCards.includes(cardId);
    },
    isCardMatched: (state) => (cardId) => {
      return state.matchedCards.includes(cardId);
    },
    gameProgress: (state) => {
      return state.cards.length > 0
        ? (state.matchedCards.length / state.cards.length) * 100
        : 0;
    },
  },
});

function generateCards(pairCount) {
  const values = [
    "🍎",
    "🍌",
    "🍇",
    "🍊",
    "🍓",
    "🍉",
    "🍒",
    "🍍",
    "🥝",
    "🍑",
    "🥭",
    "🥥",
  ];
  const selectedValues = values.slice(0, pairCount);
  const cards = [];

  selectedValues.forEach((value, index) => {
    cards.push({ id: index * 2, value });
    cards.push({ id: index * 2 + 1, value });
  });

  return shuffleArray(cards);
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default store;
