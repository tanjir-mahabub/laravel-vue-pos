<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="headline">Generate Report</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="generateReport">
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="startDate"
                    label="Start Date"
                    type="date"
                    required
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="endDate"
                    label="End Date"
                    type="date"
                    required
                  />
                </v-col>
              </v-row>
              <v-btn @click="generateReport" color="primary" block>
                Generate Report
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
/* Scoped styles if needed */
</style>
