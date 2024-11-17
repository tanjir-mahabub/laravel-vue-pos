import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        token: localStorage.getItem('authToken') || '', 
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
        isAuthenticated: (state) => !!state.token, 
        products: (state) => state.products,
        cart: (state) => state.cart,
        reports: (state) => state.reports,
        userRole: (state) => (state.user ? state.user.role : null),
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('authToken', token); 
        },
        CLEAR_TOKEN(state) {
            state.token = '';
            localStorage.removeItem('authToken'); 
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
                const { data } = await axios.post('/login', credentials); 
                commit('SET_TOKEN', data.token);  
                commit('SET_USER', data.user);  
            } catch (error) {
                console.error('Login failed', error);
            }
        },
        async logout({ commit }) {
            try {
                await axios.post('/logout');  
                commit('CLEAR_TOKEN');  
                commit('SET_USER', null);
                commit('LOGOUT'); 
            } catch (error) {
                console.error('Logout failed', error);
            }
        },
        async fetchProducts({ commit }) {
            try {
                const { data } = await axios.get('/products');  
                commit('SET_PRODUCTS', data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        },
        async fetchCart({ commit }) {
            try {
                const { data } = await axios.get('/cart');  
                commit('SET_CART', data);
            } catch (error) {
                console.error('Failed to fetch cart', error);
            }
        },
        async addToCart({ dispatch }, item) {
            try {
                await axios.post('/cart/add', item);  
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to add item to cart', error);
            }
        },
        async removeFromCart({ dispatch }, itemId) {
            try {
                await axios.delete(`/cart/item/${itemId}`);  
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to remove item from cart', error);
            }
        },
        async checkoutCart({ dispatch }) {
            try {
                await axios.post('/cart/checkout');  
                await dispatch('fetchCart');
            } catch (error) {
                console.error('Failed to checkout cart', error);
            }
        },
        async fetchDateWiseReport({ commit }, payload) {
            try {
                const { data } = await axios.post('/sales/date-wise', payload);  
                commit('SET_REPORTS', { type: 'dateWise', data });
            } catch (error) {
                console.error('Failed to fetch date-wise sales report', error);
            }
        },
        async fetchProductWiseReport({ commit }, payload) {
            try {
                const { data } = await axios.post('/sales/product-wise', payload);  
                commit('SET_REPORTS', { type: 'productWise', data });
            } catch (error) {
                console.error('Failed to fetch product-wise sales report', error);
            }
        },
        async fetchStockReport({ commit }) {
            try {
                const { data } = await axios.get('/sales/stock');  
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
                    const { data } = await axios.get('/user');  
                    commit('SET_USER', data);
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
            }
        },
    },
    modules: {},
});


axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
