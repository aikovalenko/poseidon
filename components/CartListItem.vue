<template>
  <tr>
    <td>{{ item.category }}. {{ item.name }}</td>
    <td>
      <CartListItemQuantity :item="item" />
    </td>
    <td>{{ item.price }}</td>
    <td>
      <button class="focus:outline-none" @click="removeFromCart(item)">
        Удалить
      </button>
    </td>
  </tr>
</template>
<script>
import CartListItemQuantity from './CartListItemQuantity.vue'
export default {
  components: { CartListItemQuantity },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item)
    },
  },
}
</script>
