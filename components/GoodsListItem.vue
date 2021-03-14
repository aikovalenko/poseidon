<template>
  <div
    class="flex justify-between items-start py-1 space-x-4 hover-bg-gray-200 cursor-pointer"
    @click="addToCart(item)"
  >
    <div>
      {{ item.name }} <span class="text-xs">({{ item.left }})</span>
    </div>
    <Price class="flex-shrink-0" :price="item.price" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Price from './Price.vue'
export default {
  components: { Price },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['addToCart']),
  },
}
</script>
