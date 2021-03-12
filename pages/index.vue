<template>
  <div class="container mx-auto px-2 pt-16">
    <CartOpener />
    <Cart />

    <div class="space-y-4">
      <div v-for="(value, key, index) in dataByCategory" :key="index">
        <div class="mb-2 text-lg font-medium">{{ key }}</div>
        <div v-for="x in value" :key="x.id">
          <div class="hover:bg-gray-100 cursor-pointer" @click="addToCart(x)">
            {{ x.name }} <span class="text-xs">({{ x.left }})</span> -
            <span class="">{{ x.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
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
    // setInterval(() => this.fetchCourses(), 1500)
  },
  methods: {
    async fetchCourses() {
      this.goods = await this.$axios
        .get(process.env.baseURL + '/data/data.json')
        .then((res) => res.data.Value.Goods)
    },
    groupBy(array, key) {
      return array.reduce((accumulator, i) => {
        ;(accumulator[i[key]] = accumulator[i[key]] || []).push(i)
        return accumulator
      }, {})
    },
    addToCart(item) {
      this.$store.commit('addToCart', item)
    },
  },
}
</script>
