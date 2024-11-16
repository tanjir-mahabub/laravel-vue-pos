import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        token: localStorage.getItem('authToken') || '', // Initial token from localStorage
        user: null,
        isAuthenticated: false,
        products: [],
        cart: [],
        reports: {
            dateWise: [],
            productWise: [],
            stock: [],
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token, // Check if token exists
        products: (state) => state.products,
        cart: (state) => state.cart,
        reports: (state) => state.reports,
        userRole: (state) => (state.user ? state.user.role : null),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('authToken', token); // Store token in localStorage
        },
        CLEAR_TOKEN(state) {
            state.token = '';
            localStorage.removeItem('authToken'); // Remove token from localStorage
        },
        SET_USER(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_CART(state, cart) {
            state.cart = cart;
        },
        SET_REPORTS(state, { type, data }) {
            state.reports[type] = data;
        },
        LOGOUT(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.cart = [];
            state.reports = {
                dateWise: [],
                productWise: [],
                stock: [],
            };
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const { data } = await axios.post('/api/login', credentials);  // Replace with correct API endpoint
                commit('SET_TOKEN', data.token);  // Store token in Vuex state
                commit('SET_USER', data.user);   // Store user data in Vuex state
            } catch (error) {
                console.error('Login failed', error);
            }
        },
        async logout({ commit }) {
            try {
                await axios.post('/api/logout');  // Replace with correct API endpoint
                commit('CLEAR_TOKEN');  // Clear token from Vuex state
                commit('SET_USER', null);  // Clear user data from Vuex state
                commit('LOGOUT'); // Reset other state variables like cart and reports
            } catch (error) {
                console.error('Logout failed', error);
            }
        },
        async fetchProducts({ commit }) {
            try {
                const { data } = await axios.get('/api/products');  // Replace with correct API endpoint
                commit('SET_PRODUCTS', data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        },
        async fetchCart({ commit }) {
            try {
                const { data } = await axios.get('/api/cart');  // Replace with correct API endpoint
                commit('SET_CART', data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
            }
        },
        async addToCart({ dispatch }, item) {
            try {
                await axios.post('/api/cart/add', item);  // Replace with correct API endpoint
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to add item to cart', error);
            }
        },
        async removeFromCart({ dispatch }, itemId) {
            try {
                await axios.delete(`/api/cart/item/${itemId}`);  // Replace with correct API endpoint
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to remove item from cart', error);
            }
        },
        async checkoutCart({ dispatch }) {
            try {
                await axios.post('/api/cart/checkout');  // Replace with correct API endpoint
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to checkout cart', error);
            }
        },
        async fetchDateWiseReport({ commit }, payload) {
            try {
                const { data } = await axios.post('/api/sales/date-wise', payload);  // Replace with correct API endpoint
                commit('SET_REPORTS', { type: 'dateWise', data });
            } catch (error) {
                console.error('Failed to fetch date-wise sales report', error);
            }
        },
        async fetchProductWiseReport({ commit }, payload) {
            try {
                const { data } = await axios.post('/api/sales/product-wise', payload);  // Replace with correct API endpoint
                commit('SET_REPORTS', { type: 'productWise', data });
            } catch (error) {
                console.error('Failed to fetch product-wise sales report', error);
            }
        },
        async fetchStockReport({ commit }) {
            try {
                const { data } = await axios.get('/api/sales/stock');  // Replace with correct API endpoint
                commit('SET_REPORTS', { type: 'stock', data });
            } catch (error) {
                console.error('Failed to fetch stock report', error);
            }
        },
        async checkAuthentication({ commit }) {
            const token = localStorage.getItem('authToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const { data } = await axios.get('/api/user');  // Replace with correct API endpoint
                    commit('SET_USER', data);
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        },
    },
    modules: {},
});

// Interceptor to add token to each request
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
