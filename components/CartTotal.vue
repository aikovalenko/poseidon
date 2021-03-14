<template>
  <span
    >Общая стоимость <b>{{ convertedPrice }} руб</b></span
  >
</template>
<script>
import convertPrice from '~/mixins/convertPrice'
export default {
  mixins: [convertPrice],
}
</script>
