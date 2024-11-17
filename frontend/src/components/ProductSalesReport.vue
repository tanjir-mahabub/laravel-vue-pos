<template>
  <v-container>
    <!-- Report Filters Component -->
    <ReportFilters @generate-report="fetchProductSalesReport" />

    <!-- No Sales Data Message -->
    <v-alert v-if="productSales.length === 0" type="warning" border="left">
      No sales data for the selected date range.
    </v-alert>

    <!-- Product Sales Report -->
    <v-card v-else>
      <v-card-title>
        <h3>Product-wise Sales Report (Date Range: {{ startDate }} to {{ endDate }})</h3>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-for="(quantity, productId) in productSales" :key="productId">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Product ID: {{ productId }}</v-list-item-title>
                <v-list-item-subtitle>Quantity Sold: {{ quantity }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
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
/* Add custom styles if necessary */
</style>
