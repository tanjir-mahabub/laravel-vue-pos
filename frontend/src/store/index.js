import axios from '@/axios';  // Import axios instance
import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem('auth_token') || null,  // Load token from localStorage
        cart: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('auth_token', token);  // Store token in localStorage
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('auth_token');  // Remove token from localStorage
        },
        addToCart(state, product) {
            const existingProduct = state.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;  // Increase quantity if already in cart
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
        },
        clearCart(state) {
            state.cart = [];
        }
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('/login', credentials);
                commit('setToken', response.data.token);
                commit('setUser', response.data.user);
            } catch (error) {
                console.error('Login failed', error);
            }
        },
        logout({ commit }) {
            commit('logout');
        },
        addToCart({ commit }, product) {
            commit('addToCart', product);
        },
        removeFromCart({ commit }, productId) {
            commit('removeFromCart', productId);
        },
        clearCart({ commit }) {
            commit('clearCart');
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;  // Check if there's a token
        },
        user(state) {
            return state.user;
        },
        cartItems(state) {
            return state.cart;
        },
        cartTotal(state) {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }
});
