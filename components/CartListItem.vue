<template>
  <tr>
    <td>{{ item.category }}. {{ item.name }}</td>
    <td>{{ item.quantity }}</td>
    <td>{{ item.price }}</td>
    <td>
      <button class="focus:outline-none" @click="removeFromCart(item)">
        Удалить
      </button>
    </td>
  </tr>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['cartQuantity']),
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item)
    },
  },
}
</script>
