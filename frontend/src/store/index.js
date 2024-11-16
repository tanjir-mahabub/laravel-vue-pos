import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null, // User data for authentication
        cart: [], // Array to hold items in the cart
        products: [], // Array to hold the products available
        reports: {
            sales: [], // Sales report data
            stock: [] // Stock report data
        }
    },
    mutations: {
        // Mutation to set user data
        SET_USER(state, user) {
            state.user = user
        },
        // Mutation to set cart data
        SET_CART(state, cart) {
            state.cart = cart
        },
        // Mutation to add an item to the cart
        ADD_TO_CART(state, item) {
            state.cart.push(item)
        },
        // Mutation to remove an item from the cart
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.product_id !== productId)
        },
        // Mutation to set the products list
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        // Mutation to set the reports data
        SET_REPORTS(state, reports) {
            state.reports = reports
        }
    },
    actions: {
        // Action to fetch products from the backend API
        async fetchProducts({ commit }) {
            try {
                const response = await axios.get('/api/products')
                commit('SET_PRODUCTS', response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        },
        // Action to handle login, saving user data and token
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('/api/login', credentials)
                commit('SET_USER', response.data.user)
                // Save token to localStorage
                localStorage.setItem('auth_token', response.data.token)
                // Set authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            } catch (error) {
                console.error('Login error:', error)
            }
        },
        // Action to fetch reports based on a date range
        async fetchReports({ commit }, dateRange) {
            try {
                const response = await axios.post('/api/sales/date-wise', dateRange)
                commit('SET_REPORTS', response.data)
            } catch (error) {
                console.error('Error fetching reports:', error)
            }
        },
        // Action to logout by clearing user data and token
        logout({ commit }) {
            commit('SET_USER', null) // Clear user data
            commit('SET_CART', []) // Clear the cart
            localStorage.removeItem('auth_token') // Remove token from localStorage
            delete axios.defaults.headers.common['Authorization'] // Remove authorization header
        }
    },
    getters: {
        // Getter to get the current user's information
        currentUser: (state) => {
            return state.user
        },
        // Getter to get the current cart items
        currentCart: (state) => {
            return state.cart
        },
        // Getter to get all the available products
        availableProducts: (state) => {
            return state.products
        },
        // Getter to get the sales report
        salesReport: (state) => {
            return state.reports.sales
        },
        // Getter to get the stock report
        stockReport: (state) => {
            return state.reports.stock
        }
    }
})
