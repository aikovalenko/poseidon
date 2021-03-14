<template>
  <div class="container mx-auto px-2 pt-16">
    <CartOpener />
    <Cart />
    <div class="space-y-4">
      <CategoriesList
        v-for="(value, key, index) in dataByCategory"
        :key="index"
        :goods="value"
        :category="key"
      />
    </div>
  </div>
</template>

<script>
import CartOpener from '~/components/CartOpener.vue'
import Cart from '~/components/Cart.vue'
import CategoriesList from '~/components/CategoriesList.vue'
export default {
  components: { CartOpener, Cart, CategoriesList },
  async asyncData({ $axios }) {
    // первый раз забираем данные
    const data = await $axios
      .get(process.env.baseURL + '/data/data.json')
      .then((res) => res.data)

    const names1 = await $axios
      .get(process.env.baseURL + '/data/names.json')
      .then((res) => res.data)

    return { goods: data.Value.Goods, names: names1 }
  },
  data() {
    return {
      goods: {},
      names: {},
    }
  },
  computed: {
    dataByCategory() {
      // наш рабочий массив с человекочитаемыми объктами
      const array = this.goods.reduce((accumulator, i) => {
        accumulator.push({
          id: i.T,
          category: this.names[i.G].G,
          name: this.names[i.G].B[i.T].N,
          price: i.C,
          left: i.P,
        })
        return accumulator
      }, [])
      return this.groupBy(array, 'category')
    },
  },
  mounted() {
    // определяем курс и обновляем данные
    this.$store.commit('setUsdt', this.getRandomArbitrary(20, 80))
    setInterval(() => {
      this.fetchCourses()
      this.$store.commit('setUsdt', this.getRandomArbitrary(20, 80))
    }, 15000)
  },
  methods: {
    // метод для обновления данных
    async fetchCourses() {
      this.goods = await this.$axios
        .get(process.env.baseURL + '/data/data.json')
        .then((res) => res.data.Value.Goods)
    },
    // группировка по категории
    groupBy(array, key) {
      return array.reduce((accumulator, i) => {
        ;(accumulator[i[key]] = accumulator[i[key]] || []).push(i)
        return accumulator
      }, {})
    },
    // определяем котировку
    getRandomArbitrary(min, max) {
      return Number((Math.random() * (max - min) + min).toFixed(2))
    },
  },
}
</script>
