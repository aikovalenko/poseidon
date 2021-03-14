<template>
  <div>
    <div class="mb-2 text-lg font-medium">{{ category }}</div>
    <GoodsList v-for="item in goods" :key="item.id" :item="item" />
  </div>
</template>
<script>
import GoodsList from '~/components/GoodsList.vue'
export default {
  components: { GoodsList },
  props: {
    goods: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
}
</script>
