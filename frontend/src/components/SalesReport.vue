<template>
  <div>
    <ReportFilters @generate-report="fetchSalesReport" />
    <div v-if="salesReport.length === 0">
      <p>No sales data for the selected date range.</p>
    </div>
    <div v-else>
      <h3>Sales Report (Date Range: {{ startDate }} to {{ endDate }})</h3>
      <ul>
        <li v-for="order in salesReport" :key="order.id">
          <strong>Order ID:</strong> {{ order.id }} | <strong>Customer:</strong> {{ order.user.name }}
          <ul>
            <li v-for="item in order.orderItems" :key="item.id">
              Product: {{ item.product.name }} | Quantity: {{ item.quantity }} | Total Price: ${{ item.price * item.quantity }}
            </li>
          </ul>
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
      salesReport: []
    };
  },
  methods: {
    async fetchSalesReport(dateRange) {
      this.startDate = dateRange.start_date;
      this.endDate = dateRange.end_date;
      try {
        const response = await this.$axios.get('/sales/date-wise', {
          params: {
            start_date: this.startDate,
            end_date: this.endDate
          }
        });
        this.salesReport = response.data;
      } catch (error) {
        console.error('Failed to fetch sales report:', error);
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
