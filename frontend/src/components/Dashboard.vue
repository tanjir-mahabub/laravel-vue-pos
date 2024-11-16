<template>
  <div class="dashboard">
    <h2>Welcome to the Dashboard</h2>
    <p v-if="!user">You are not logged in.</p>
    <p v-else>Hello, {{ user.email }}!</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style scoped>
/* Add styles for dashboard */
</style>
