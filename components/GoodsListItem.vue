<template>
  <div class="hover:bg-gray-100 cursor-pointer" @click="addToCart(item)">
    {{ item.name }} <span class="text-xs">({{ item.left }})</span> -
    <Price :price="item.price" />
  </div>
</template>
<script>
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
    addToCart(item) {
      this.$store.commit('addToCart', item)
    },
  },
}
</script>
