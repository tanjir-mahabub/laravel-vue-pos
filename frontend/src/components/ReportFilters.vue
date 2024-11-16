<template>
  <div class="report-filters">
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <button @click="generateReport">Generate Report</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  methods: {
    generateReport() {
      this.$emit('generate-report', {
        start_date: this.startDate,
        end_date: this.endDate,
      });
    },
  },
};
</script>

<style scoped>
.report-filters {
  display: flex;
  gap: 10px;
}
input {
  padding: 5px;
}
button {
  padding: 5px 10px;
}
</style>
