<template>
  <div
    class="card"
    :class="{ flipped: isFlipped || isMatched, matched: isMatched }"
    @click="handleClick"
  >
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">{{ card.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
    isFlipped: {
      type: Boolean,
      default: false,
    },
    isMatched: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const handleClick = () => {
      if (!props.isFlipped && !props.isMatched) {
        emit("flip", props.card.id);
      }
    };

    return {
      handleClick,
    };
  },
};
</script>

<style scoped>
.card {
  aspect-ratio: 1;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 3em;
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-back {
  background: white;
  border: 3px solid #667eea;
  transform: rotateY(180deg);
}

.card.matched .card-back {
  background: #d4f1d4;
  border-color: #4caf50;
}
</style>
