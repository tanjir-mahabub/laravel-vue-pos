export default createStore({
    state: {
        user: null,
        cart: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        addToCart(state, product) {
            const existingProduct = state.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity if already in cart
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
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('setUser', null);
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
            return !!state.user;
        },
        cartItems(state) {
            return state.cart;
        },
        cartTotal(state) {
            return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
        }
    }
});
