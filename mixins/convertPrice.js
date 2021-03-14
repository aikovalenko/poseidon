import { mapGetters } from 'vuex'
export default {
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['usdt']),
    convertedPrice() {
      return (this.price * this.usdt).toFixed(2)
    },
  },
}
