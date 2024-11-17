<template>
  <v-container>
    <h1>Product List</h1>

    <!-- Loading State -->
    <v-alert v-if="loading" type="info" :border="loading ? 'left' : ''">
      Loading products...
    </v-alert>

    <!-- No Products Available State -->
    <v-alert v-else-if="products.length === 0" type="warning" border="left">
      No products available.
    </v-alert>

    <!-- Product List -->
    <v-row v-else>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card>
          <v-card-title>{{ product.name || 'Unnamed Product' }}</v-card-title>
          <v-card-subtitle>\${{ product.price || 'N/A' }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
        const response = await axios.get('/products', {
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
