<template>
  <div>
    <h1>Product List</h1>
    <div v-if="loading">Loading products...</div>
    <div v-else-if="products.length === 0">No products available.</div>
    <div v-else>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name || 'Unnamed Product' }} - ${{ product.price || 'N/A' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  methods: {
    async fetchProducts() {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

      if (!token || this.isTokenExpired(token)) {
        console.error('Token is expired or missing');
        // You could redirect the user to login or refresh token here
        this.loading = false;
        return;
      }

      try {
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        this.products = response.data;
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else {
          console.error('Error message:', error.message);
        }
        this.products = []; // Optionally set products to empty if error occurs
      } finally {
        this.loading = false; // Set loading to false after the API call completes
      }
    },

    // Token expiration check (example, modify based on how you store token expiration)
    isTokenExpired(token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodes the JWT payload
      const expiryTime = decodedToken.exp * 1000; // Convert expiry time from seconds to milliseconds
      return Date.now() > expiryTime; // Return true if the token is expired
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
