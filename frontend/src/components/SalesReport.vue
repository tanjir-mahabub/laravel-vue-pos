<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="startDate"
          label="Start Date"
          type="date"
          outlined
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="endDate"
          label="End Date"
          type="date"
          outlined
        />
      </v-col>
      <v-col cols="12" sm="6" md="4" class="d-flex align-center">
        <v-btn @click="fetchSalesReport" color="primary" block>Generate Report</v-btn>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="sales" item-key="id">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Sales Report</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:item.product_name="{ item }">
        <td>{{ item.product_name }}</td>
      </template>
      <template v-slot:item.quantity="{ item }">
        <td>{{ item.quantity }}</td>
      </template>
      <template v-slot:item.total="{ item }">
        <td>{{ item.total }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const startDate = ref('');
const endDate = ref('');
const sales = ref([]);

const headers = [
  { text: 'Product', align: 'start', key: 'product_name' },
  { text: 'Quantity Sold', align: 'start', key: 'quantity' },
  { text: 'Total', align: 'start', key: 'total' }
];

const fetchSalesReport = async () => {
  try {
    const response = await axios.get('/sales-report', {
      params: { start_date: startDate.value, end_date: endDate.value },
    });
    sales.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
/* Add any custom styling here */
</style>
