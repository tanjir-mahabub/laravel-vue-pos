<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
        <v-card>
          <v-card-title class="headline">Product Stock Report</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="stockReport"
              item-key="id"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Product Stock Report</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:item.name="{ item }">
                <td>{{ item.name }}</td>
              </template>
              <template v-slot:item.stock="{ item }">
                <td>{{ item.stock }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const stockReport = ref([]);
const errorMessage = ref('');

const headers = [
  { text: 'Product Name', align: 'start', key: 'name' },
  { text: 'Available Stock', align: 'start', key: 'stock' },
];

const fetchStockReport = async () => {
  try {
    const response = await axios.get('/stock');
    stockReport.value = response.data;
  } catch (error) {
    errorMessage.value = 'Failed to fetch stock report. Please try again.';
    console.error(error);
  }
};

onMounted(() => {
  fetchStockReport();
});
</script>

<style scoped>
/* You can add custom styles here if necessary */
</style>
