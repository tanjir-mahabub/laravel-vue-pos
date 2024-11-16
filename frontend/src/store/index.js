import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    cart: [],
    products: [],
    reports: {
      sales: [],
      stock: []
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_CART(state, cart) {
      state.cart = cart
    },
    ADD_TO_CART(state, item) {
      state.cart.push(item)
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.product_id !== productId)
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_REPORTS(state, reports) {
      state.reports = reports
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/api/products')
        commit('SET_PRODUCTS', response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        commit('SET_USER', response.data.user)
        localStorage.setItem('auth_token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    async fetchReports({ commit }, dateRange) {
      try {
        const response = await axios.post('/api/sales/date-wise', dateRange)
        commit('SET_REPORTS', response.data)
      } catch (error) {
        console.error('Error fetching reports:', error)
      }
    }
  }
})
