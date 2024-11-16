<template>
  <div>
    <h2>Products</h2>
    <div v-for="product in products" :key="product.id">
      <p>{{ product.name }} - ${{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  mounted() {
    this.$store.dispatch('fetchProducts')
  },
  methods: {
    addToCart(product) {
      this.$store.commit('ADD_TO_CART', {
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    }
  }
}
</script>
