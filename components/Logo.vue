<template>
  <div></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      showCart: false,
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartQuantity', 'cartTotal']),
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item)
      this.hideCart()
    },
  },
}
</script>
<style>
.NuxtLogo {
  animation: 1s appear;
  margin: auto;
}
</style>
