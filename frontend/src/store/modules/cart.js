import axios from 'axios';

export default {
    state: {
        cart: [],
        totalAmount: 0,
    },
    mutations: {
        SET_CART(state, cart) {
            state.cart = cart;
        },
        SET_TOTAL(state, total) {
            state.totalAmount = total;
        },
        ADD_TO_CART(state, product) {
            const item = state.cart.find(item => item.product_id === product.product_id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.product_id !== productId);
        },
        CLEAR_CART(state) {
            state.cart = [];
        },
    },
    actions: {
        async fetchCart({ commit }) {
            try {
                const response = await axios.get('/cart');
                commit('SET_CART', response.data.cart);
                commit('SET_TOTAL', response.data.totalAmount);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        },
        async addToCart({ commit }, product) {
            try {
                await axios.post('/cart/add', { product_id: product.id });
                commit('ADD_TO_CART', product);
            } catch (error) {
                console.error('Failed to add item to cart:', error);
            }
        },
        async removeFromCart({ commit }, productId) {
            try {
                await axios.post('/cart/remove', { product_id: productId });
                commit('REMOVE_FROM_CART', productId);
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
            }
        },
        async checkout({ state, commit }) {
            try {
                const response = await axios.post('/checkout', { cart: state.cart });
                if (response.data.success) {
                    commit('CLEAR_CART');
                }
            } catch (error) {
                console.error('Checkout failed:', error);
            }
        },
    },
    getters: {
        cart: (state) => state.cart,
        totalAmount: (state) => state.totalAmount,
    },
};
