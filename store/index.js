export const state = () => ({
  cart: [],
  cartShow: false,
})

export const getters = {
  cart(state) {
    return state.cart
  },
  cartShow(state) {
    return state.cartShow
  },
  cartQuantity(state) {
    return state.cart.reduce((acc, item) => {
      return item.quantity + acc
    }, 0)
  },
  cartTotal(state) {
    return state.cart
      .reduce((acc, item) => {
        return item.quantity * item.price + acc
      }, 0)
      .toFixed(2)
  },
}

export const mutations = {
  addToCart(state, item) {
    const record = state.cart.find((i) => i.id === item.id)
    if (!record) {
      state.cart.push({
        ...item,
        quantity: 1,
      })
    } else if (record.quantity < record.left) record.quantity++
  },
  changeQuantity(state, { payload }) {
    const record = state.cart.find((i) => i.id === payload.item.id)
    record.quantity = payload.quantity
  },
  removeFromCart(state, item) {
    state.cart = state.cart.filter((i) => i.id !== item.id)
  },
  toggleCart(state) {
    state.cartShow = !state.cartShow
  },
}
