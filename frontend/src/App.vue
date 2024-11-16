<template>
  <div id="app">
    <!-- Global Header with Login/Logout Button -->
    <header>
      <div v-if="isAuthenticated">
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </header>

    <!-- Main Content (Dynamic Routing Based on Views) -->
    <router-view></router-view>

    <!-- Footer (Optional) -->
    <footer>
      <p>&copy; 2024 Retail POS System</p>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    // VueX store state to track whether user is authenticated
    ...mapState({
      isAuthenticated: state => state.auth.isAuthenticated,
    }),
  },

  methods: {
    logout() {
      // Logout logic using Vuex and API (Sanctum)
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Global Styles */
header {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: right;
}
footer {
  text-align: center;
  padding: 10px;
  background-color: #f1f1f1;
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
