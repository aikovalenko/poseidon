<template>
  <table class="table w-full text-left">
    <tr>
      <th>Наименование товара и описание</th>
      <th>Количество</th>
      <th>Цена (руб.)</th>
      <th></th>
    </tr>
    <template v-if="cartQuantity > 0">
      <CartListItem v-for="item in cart" :key="item.id" :item="item" />
    </template>
    <template v-else>
      <tr>
        <td colspan="3" class="p-4 text-center">
          Корзина пуста, выберите что-нибудь ;-)
        </td>
      </tr>
    </template>
  </table>
</template>
<script>
import { mapGetters } from 'vuex'
import CartListItem from './CartListItem.vue'
export default {
  components: { CartListItem },
  computed: {
    ...mapGetters(['cart', 'cartQuantity']),
  },
}
</script>
<style lang="postcss" scoped>
th {
  @apply text-sm font-normal text-gray-700;
}
</style>
