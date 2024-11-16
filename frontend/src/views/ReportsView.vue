<template>
  <div>
    <h2>Sales Reports</h2>
    <form @submit.prevent="fetchReports">
      <input type="date" v-model="startDate" required />
      <input type="date" v-model="endDate" required />
      <button type="submit">Generate Report</button>
    </form>

    <div v-if="reports.sales.length">
      <h3>Sales Report</h3>
      <div v-for="order in reports.sales" :key="order.id">
        <p>{{ order.total_amount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    reports() {
      return this.$store.state.reports
    }
  },
  methods: {
    async fetchReports() {
      await this.$store.dispatch('fetchReports', {
        start_date: this.startDate,
        end_date: this.endDate
      })
    }
  }
}
</script>
