<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image_url" alt="Product Image" />
        <div class="cart-item-info">
          <h3>{{ item.name }}</h3>
          <p>Price: ${{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal }}</h3>
        <button @click="completeTransaction">Complete Transaction</button>
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
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
    },
    completeTransaction() {
      // Call API to complete transaction
      this.$axios.post('http://localhost/api/transactions', {
        items: this.cartItems
      })
      .then(response => {
        alert('Transaction completed successfully');
        this.$store.dispatch('clearCart'); // Clear cart after transaction
      })
      .catch(error => {
        console.error('Error completing transaction:', error);
      });
    }
  }
};
</script>

<style scoped>
/* Add styles for cart */
.cart-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.cart-item-info {
  margin-left: 15px;
}

button {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}

.cart-total {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
