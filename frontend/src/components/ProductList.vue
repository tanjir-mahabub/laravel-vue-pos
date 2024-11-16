<template>
  <div class="product-list">
    <h2>Available Products</h2>
    <div v-for="product in products" :key="product.id" class="product-item">
      <img :src="product.image_url" alt="Product Image" />
      <div class="product-info">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p>Price: ${{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
        try {
            const response = await axiosInstance.get('/products');
            this.products = response.data;
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
  },
};
</script>

<style scoped>
/* Add styles for product list */
.product-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.product-info {
  margin-left: 15px;
}

button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
