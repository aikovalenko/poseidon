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
        className = 'bg-red-300'
      } else if (this.change === 'down') {
        className = 'bg-green-300'
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
    },
  },
}
</script>
