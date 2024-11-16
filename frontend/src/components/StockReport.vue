<template>
  <div>
    <h3>Product Stock Report</h3>
    <ul>
      <li v-for="(product, index) in stockReport" :key="index">
        Product: {{ product.name }} | Available Stock: {{ product.stock }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stockReport: []
    };
  },
  async created() {
    try {
      const response = await this.$axios.get('/stock');
      this.stockReport = response.data;
    } catch (error) {
      console.error('Failed to fetch stock report:', error);
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
li {
  margin-bottom: 10px;
}
</style>
