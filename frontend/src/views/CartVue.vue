<template>
  <div>
    <h2>Your Cart</h2>
    <div v-for="item in cart" :key="item.product_id">
      <p>{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</p>
      <button @click="removeFromCart(item.product_id)">Remove</button>
    </div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart
    }
  },
  methods: {
    removeFromCart(productId) {
      this.$store.commit('REMOVE_FROM_CART', productId)
    },
    async checkout() {
      // Handle checkout, submit the order to the API
    }
  }
}
</script>
