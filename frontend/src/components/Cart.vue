<template>
  <div class="cart-container">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty. Add some products!</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="product image" class="cart-item-img" />
          <div class="cart-item-details">
            <p>{{ item.name }}</p>
            <p>${{ item.price }}</p>
            <input
              type="number"
              v-model="item.quantity"
              min="1"
              @input="updateCart(item)"
            />
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </li>
      </ul>
      <div class="cart-summary">
        <p>Total: ${{ cartTotal }}</p>
        <button @click="checkout" :disabled="cartItems.length === 0">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  methods: {
    updateCart(item) {
      this.$store.dispatch('addToCart', item);  // Updates cart with new quantity
    },
    removeFromCart(itemId) {
      this.$store.dispatch('removeFromCart', itemId);  // Removes item from cart
    },
    async checkout() {
      try {
        const orderData = {
          items: this.cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          })),
        };

        const response = await this.$axios.post('/cart/checkout', orderData);
        if (response.status === 200) {
          this.$store.dispatch('clearCart');  // Clear the cart after successful checkout
          this.$router.push('/order-success');  // Redirect to order success page
        }
      } catch (error) {
        console.error('Checkout failed', error);
      }
    }
  }
};
</script>

<style scoped>
.cart-container {
  margin-top: 20px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.cart-item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cart-summary {
  margin-top: 20px;
  font-size: 18px;
}
button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
