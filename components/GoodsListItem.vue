<template>
  <div class="hover:bg-gray-100 cursor-pointer" @click="addToCart(item)">
    {{ item.name }} <span class="text-xs">({{ item.left }})</span> -
    <span class="">{{ item.price }}</span>
  </div>
</template>
<script>
export default {
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
