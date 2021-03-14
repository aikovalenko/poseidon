<template>
  <span>Общая стоимость {{ convertedPrice }} руб.</span>
</template>
<script>
import convertPrice from '~/mixins/convertPrice'
export default {
  mixins: [convertPrice],
}
</script>
