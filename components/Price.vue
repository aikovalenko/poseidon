<template>
  <div :class="changeClass">
    {{ convertedPrice }} руб
    <span v-show="perItem" class="text-xs text-gray-600">/ шт.</span>
  </div>
</template>
<script>
import convertPrice from '~/mixins/convertPrice'
export default {
  mixins: [convertPrice],
  props: {
    perItem: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      change: null,
    }
  },
  computed: {
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
      }, 5000)
    },
  },
}
</script>

<style lang="postcss" scoped>
.price-down {
  animation: bg-green 3s ease;
}

.price-up {
  animation: bg-red 3s ease;
}

@keyframes bg-green {
  0% {
    background-color: green;
  }
  100% {
    background-color: transparent;
  }
}

@keyframes bg-red {
  0% {
    background-color: red;
  }
  100% {
    background-color: transparent;
  }
}
</style>
