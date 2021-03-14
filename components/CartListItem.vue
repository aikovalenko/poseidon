<template>
  <tr>
    <td>{{ item.category }}. {{ item.name }}</td>
    <td>
      <CartListItemQuantity :item="item" />
    </td>
    <td>
      <div class="inline-block">
        <Price class="inline-block" :price="item.price" :per-item="true" />
      </div>
    </td>
    <td>
      <button class="focus-outline-none" @click="removeFromCart(item)">
        Удалить
      </button>
    </td>
  </tr>
</template>
<script>
import { mapActions } from 'vuex'
import CartListItemQuantity from './CartListItemQuantity.vue'
import Price from './Price.vue'
export default {
  components: { CartListItemQuantity, Price },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['removeFromCart']),
  },
}
</script>
<style lang="postcss" scoped>
td {
  @apply px-2 py-4 border-t;
}
</style>
