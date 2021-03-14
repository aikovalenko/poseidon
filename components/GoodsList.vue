<template>
  <div>
    <GoodsListItem :item="item" />
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  components: { GoodsListItem },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
