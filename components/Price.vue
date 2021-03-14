<template>
  <span :class="changeClass">{{ convertedPrice }}</span>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      change: null,
    }
  },
  computed: {
    ...mapGetters(['usdt']),
    convertedPrice() {
      return Number((this.price * this.usdt).toFixed(2))
    },
    changeClass() {
      let className = ''
      if (this.change === 'up') {
        className = 'price-up'
      } else if (this.change === 'down') {
        className = 'price-down'
      }
      return className
    },
  },
  watch: {
    convertedPrice(newVal, oldVal) {
      if (newVal > oldVal) {
        this.change = 'up'
      } else if (newVal < oldVal) {
        this.change = 'down'
      } else this.change = null
      setTimeout(() => {
        this.change = null
      }, 1000)
    },
  },
}
</script>

<style lang="postcss" scoped>
.price-down {
  animation: bg-green 0.8s ease;
}

.price-up {
  animation: bg-red 0.8s ease;
}

@keyframes bg-green {
  0% {
    @apply bg-green-300;
  }
  100% {
    @apply bg-transparent;
  }
}

@keyframes bg-red {
  0% {
    @apply bg-red-300;
  }
  100% {
    @apply bg-transparent;
  }
}
</style>
