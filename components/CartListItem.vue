<template>
  <tr>
    <td>{{ item.category }}. {{ item.name }}</td>
    <td>
      <CartListItemQuantity :item="item" />
    </td>
    <td>
      <Price :price="item.price" />
    </td>
    <td>
      <button class="focus:outline-none" @click="removeFromCart(item)">
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
