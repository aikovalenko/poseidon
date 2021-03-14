<template>
  <div>
    <input
      v-model="value"
      class="w-16 border focus:outline-none"
      type="number"
      min="1"
      :max="item.left"
      @keypress="validate"
      @input="changeQuantityByInput($event)"
    />
    <div v-show="itemIsLimited" class="text-xs">Количество ограничено</div>
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
  data() {
    return {
      value: 1,
      itemIsLimited: false,
    }
  },
  computed: {
    quantity() {
      return this.item.quantity
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal === '0' || newVal === '') {
          this.value = 1
          this.changeQuantity(this.value)
        } else if (newVal >= this.item.left) {
          this.value = this.item.left
          this.changeQuantity(this.value)
          this.itemIsLimited = true
        }
      },
    },
    quantity(newVal) {
      this.value = newVal
    },
  },
  created() {
    this.value = this.item.quantity
  },
  methods: {
    validate(e) {
      const exeptions = ['KeyE', 'Minus', 'Equal', 'Plus', 'Comma', 'Period']
      if (exeptions.includes(e.code)) {
        e.preventDefault()
      }
    },
    changeQuantity(value) {
      const payload = {
        item: this.item,
        quantity: value,
      }
      this.$store.commit('changeQuantity', { payload })
    },
    changeQuantityByInput(event) {
      const newQuantity = Number(event.target.value)
      if (newQuantity > 0 && newQuantity <= this.item.left) {
        this.changeQuantity(newQuantity)
      }
    },
  },
}
</script>
