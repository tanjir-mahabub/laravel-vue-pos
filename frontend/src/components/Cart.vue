<template>
  <div class="cart">
    <h2>Cart</h2>
    <ul v-if="cart.length">
      <li v-for="item in cart" :key="item.product_id">
        {{ item.name }} - {{ item.quantity }} x ${{ item.price }} 
        <button @click="removeFromCart(item.product_id)">Remove</button>
      </li>
    </ul>
    <p v-else>No items in the cart.</p>
    <h3>Total: ${{ totalAmount }}</h3>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters['cart/cart'];
    },
    totalAmount() {
      return this.$store.getters['cart/totalAmount'];
    },
  },
  methods: {
    async removeFromCart(productId) {
      await this.$store.dispatch('cart/removeFromCart', productId);
    },
    async checkout() {
      await this.$store.dispatch('cart/checkout');
      this.$router.push('/confirmation');
    },
  },
  created() {
    this.$store.dispatch('cart/fetchCart');
  },
};
</script>

<style scoped>
.cart {
  margin: 20px;
}
button {
  margin-left: 10px;
}
</style>
