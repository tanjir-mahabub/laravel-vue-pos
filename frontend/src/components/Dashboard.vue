<template>
  <v-container class="dashboard">
    <v-row>
      <v-col cols="12">
        <v-btn v-if="!user" color="primary" outlined @click="login">Login</v-btn>
        <v-alert v-else type="success" border="left">
          Hello, {{ user.email }}!
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user; // Get user data from Vuex store
    }
  },
  methods: {
    login() {
      // Implement login functionality here, e.g., show login modal or redirect
      console.log('Redirect to login page...');
    }
  }
};
</script>

<style scoped>
/* Add custom styles if needed */
.dashboard {
  padding: 20px;
}
</style>
