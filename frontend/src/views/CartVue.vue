<template>
  <div>
    <h2>Your Cart</h2>
    <div v-for="item in cart" :key="item.product_id">
      <p>{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</p>
      <button @click="removeFromCart(item.product_id)">Remove</button>
    </div>

    <div v-if="cart.length">
      <p><strong>Total: ${{ totalAmount }}</strong></p>
      <button @click="checkout">Checkout</button>
    </div>
    <div v-else>
      <p>Your cart is empty!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    cart() {
      return this.$store.state.cart
    },
    totalAmount() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId)
    },
    async checkout() {
      try {
        const orderData = {
          cart_items: this.cart.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
          })),
          total_amount: this.totalAmount
        }

        // Send checkout request to the backend
        const response = await axios.post('/api/orders', orderData)
        if (response.status === 200) {
          // Clear the cart after successful checkout
          this.$store.commit('SET_CART', [])
          alert('Order placed successfully!')
          this.$router.push('/')
        }
      } catch (error) {
        console.error('Error during checkout:', error)
        alert('There was an error placing your order. Please try again later.')
      }
    }
  }
}
</script>
