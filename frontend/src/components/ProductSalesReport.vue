<template>
  <div>
    <ReportFilters @generate-report="fetchProductSalesReport" />
    <div v-if="productSales.length === 0">
      <p>No sales data for the selected date range.</p>
    </div>
    <div v-else>
      <h3>Product-wise Sales Report (Date Range: {{ startDate }} to {{ endDate }})</h3>
      <ul>
        <li v-for="(quantity, productId) in productSales" :key="productId">
          Product ID: {{ productId }} | Quantity Sold: {{ quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ReportFilters from '@/components/ReportFilters.vue';
export default {
  components: {
    ReportFilters
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      productSales: {}
    };
  },
  methods: {
    async fetchProductSalesReport(dateRange) {
      this.startDate = dateRange.start_date;
      this.endDate = dateRange.end_date;
      try {
        const response = await this.$axios.get('/sales/product-wise', {
          params: {
            start_date: this.startDate,
            end_date: this.endDate
          }
        });
        this.productSales = response.data;
      } catch (error) {
        console.error('Failed to fetch product sales report:', error);
      }
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
