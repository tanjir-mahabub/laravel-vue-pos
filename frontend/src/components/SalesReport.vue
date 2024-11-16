<template>
  <div>
    <h2>Sales Report</h2>
    <input v-model="startDate" type="date" />
    <input v-model="endDate" type="date" />
    <button @click="fetchSalesReport">Generate Report</button>
    <table>
      <tr>
        <th>Product</th>
        <th>Quantity Sold</th>
        <th>Total</th>
      </tr>
      <tr v-for="sale in sales" :key="sale.id">
        <td>{{ sale.product_name }}</td>
        <td>{{ sale.quantity }}</td>
        <td>{{ sale.total }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const startDate = ref('');
const endDate = ref('');
const sales = ref([]);

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
