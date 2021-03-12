<template>
  <div
    v-if="cartShow"
    class="fixed right-0 top-0 w-full max-w-4xl p-4 space-y-4 bg-white shadow-md"
  >
    <div class="flex justify-end">
      <button
        class="py-1 px-4 rounded-xl bg-gray-200 focus:outline-none"
        @click="toggleCart"
      >
        Продолжить покупки &rarr;
      </button>
    </div>
    <CartList />
    <div class="flex justify-end">Общая стоимость {{ cartTotal }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CartList from './CartList.vue'
export default {
  components: { CartList },
  computed: {
    ...mapGetters(['cart', 'cartShow', 'cartQuantity', 'cartTotal']),
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item)
    },
    toggleCart() {
      this.$store.commit('toggleCart')
    },
  },
}
</script>
