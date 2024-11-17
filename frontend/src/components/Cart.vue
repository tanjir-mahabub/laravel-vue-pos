<template>
  <v-container>
    <!-- Check if the cart has items -->
    <v-list v-if="cart.length > 0">
      <v-list-item-group>
        <v-list-item v-for="item in cart" :key="item.product_id">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>Quantity: {{ item.quantity }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn @click="removeItem(item.product_id)" color="red" outlined>
              Remove
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </v-list-item-group>
      <v-btn @click="checkout" color="primary" block>
        Checkout
      </v-btn>
    </v-list>

    <!-- If the cart is empty, show an alert -->
    <v-alert v-else type="info" border="left">
      Your cart is empty.
    </v-alert>
  </v-container>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cart; // Get the cart from the store
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

<style scoped>
/* Add custom styles here if needed */
</style>
