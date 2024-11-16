<template>
  <div>
    <h1>Product List</h1>
    <div v-if="loading">Loading products...</div>
    <div v-else>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} - ${{ product.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  computed: {
    ...mapState({
      // If you're using Vuex for managing products, map the state here
      // products: state => state.products
    }),
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await this.$axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    // Fetch products when the component mounts
    this.fetchProducts();
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
