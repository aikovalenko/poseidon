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
import { mapActions } from 'vuex'
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
    // следим за введеными значениями
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal === '0' || newVal === '') {
          this.value = 1
          this.changeQuantity(this.value)
        } else if (newVal >= this.item.left) {
          // если пользователь захотел больше товаров чем есть - показываем предупрежние и не убираем его
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
  mounted() {
    this.value = this.item.quantity
  },
  methods: {
    ...mapActions(['setQuantity']),
    validate(e) {
      // не позволяем нажимать неугодные нам клавиши
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
      this.setQuantity({ payload })
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
