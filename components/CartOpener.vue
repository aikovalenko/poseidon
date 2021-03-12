<template>
  <div class="fixed right-0 top-0 p-4">
    <button
      class="py-1 px-4 rounded-xl bg-green-200 focus:outline-none"
      @click="toggleCart"
    >
      Корзина -
      <!-- тут напрашиватся pluralization от i18n  -->
      <span v-if="cartQuantity === 0"> пусто</span>
      <span v-else-if="cartQuantity === 1"> {{ cartQuantity }} предмет</span>
      <span v-else-if="cartQuantity > 1 && cartQuantity < 5">
        {{ cartQuantity }} предмета</span
      >
      <span v-else> {{ cartQuantity }} предметов</span>
    </button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['cartQuantity']),
  },
  methods: {
    toggleCart() {
      this.$store.commit('toggleCart')
    },
  },
}
</script>
