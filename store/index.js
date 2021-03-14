export const state = () => ({
  cart: [],
  cartShow: false,
  usdt: false,
})

export const getters = {
  cart(state) {
    return state.cart
  },
  cartShow(state) {
    return state.cartShow
  },
  itemById(state) {
    return (item) => state.cart.find((i) => i.id === item.id)
  },
  cartItemsExeptId(state) {
    return (item) => state.cart.filter((i) => i.id !== item.id)
  },
  usdt(state) {
    return state.usdt
  },
  cartQuantity(state) {
    return state.cart.reduce((acc, item) => {
      return item.quantity + acc
    }, 0)
  },
  cartTotal(state) {
    return Number(
      state.cart
        .reduce((acc, item) => {
          return item.quantity * item.price + acc
        }, 0)
        .toFixed(2)
    )
  },
}

export const mutations = {
  addNewItem(state, item) {
    state.cart.push({
      ...item,
      quantity: 1,
    })
  },
  setQuantity(state, { payload }) {
    const record = state.cart.find((i) => i.id === payload.item.id)
    if (payload.quantity) {
      record.quantity = payload.quantity
    } else {
      record.quantity++
    }
  },
  setCart(state, payload) {
    state.cart = payload
  },
  toggleCart(state) {
    state.cartShow = !state.cartShow
  },
  setUsdt(state, payload) {
    state.usdt = payload
  },
}
export const actions = {
  addToCart({ commit, getters }, item) {
    const record = getters.itemById(item)
    if (!record) {
      commit('addNewItem', item)
    } else if (record.quantity < record.left) {
      const payload = {
        item: record,
      }
      commit('setQuantity', { payload })
    }
  },
  setQuantity({ commit }, payload) {
    commit('setQuantity', payload)
  },
  removeFromCart({ commit, getters }, payload) {
    commit('setCart', getters.cartItemsExeptId(payload))
  },
}
