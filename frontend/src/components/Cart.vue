<template>
  <div>
    <div v-for="item in cart" :key="item.product_id">
      <p>{{ item.name }} - {{ item.quantity }}</p>
      <button @click="removeItem(item.product_id)">Remove</button>
    </div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
  },
  methods: {
    async removeItem(productId) {
      await this.$store.dispatch('removeFromCart', productId); // Dispatch to remove item from the cart
    },
    async checkout() {
      await this.$store.dispatch('checkout'); // Dispatch checkout action
    },
  },
};
</script>
