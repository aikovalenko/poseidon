<template>
  <div
    v-if="cartShow"
    class="fixed right-0 top-0 w-full max-h-full max-w-4xl p-4 space-y-4 bg-white shadow-md overflow-y-auto"
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
    <div class="flex justify-end">
      <CartTotal :price="cartTotal" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CartList from './CartList.vue'
import CartTotal from './CartTotal.vue'
export default {
  components: { CartList, CartTotal },
  computed: {
    ...mapGetters(['cart', 'cartShow', 'cartQuantity', 'cartTotal']),
  },
  methods: {
    toggleCart() {
      this.$store.commit('toggleCart')
    },
  },
}
</script>
