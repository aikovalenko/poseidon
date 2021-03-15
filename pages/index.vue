<template>
  <div class="container mx-auto max-w-3xl px-2 pt-16">
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
    const rawData = await $axios
      .get(process.env.baseURL + '/data/data.json')
      .then((res) => res.data)

    const rawNames = await $axios
      .get(process.env.baseURL + '/data/names.json')
      .then((res) => res.data)

    return { goods: rawData.Value.Goods, names: rawNames }
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
        const idRaw = i.T || 0
        const priceRaw = i.C || 0
        const leftRaw = i.P || 0
        const categoriesListRaw = this.names[i.G]
        const categoryRaw = categoriesListRaw ? categoriesListRaw.G : ''
        const goodsListByCategoryRaw =
          categoryRaw && categoriesListRaw ? categoriesListRaw.B : ''
        const goodsListItemRaw =
          categoryRaw && categoriesListRaw && goodsListByCategoryRaw
            ? goodsListByCategoryRaw[i.T]
            : ''
        const goodsListItemRawName =
          categoryRaw &&
          categoriesListRaw &&
          goodsListByCategoryRaw &&
          goodsListItemRaw
            ? goodsListItemRaw.N
            : ''
        accumulator.push({
          id: idRaw,
          category: categoryRaw,
          name: goodsListItemRawName,
          price: priceRaw,
          left: leftRaw,
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
