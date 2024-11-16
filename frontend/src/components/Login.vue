<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const user = {
        email: this.email,
        password: this.password,
      };
      // Call the backend API for authentication (not implemented yet)
      // If successful, commit the user to Vuex store
      this.$store.dispatch('login', user);
      this.$router.push('/dashboard'); // Redirect to dashboard after login
    }
  }
};
</script>

<style scoped>
/* Add styles for the login form */
</style>
