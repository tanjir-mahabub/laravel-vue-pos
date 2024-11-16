<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name</label>
        <input v-model="name" type="text" id="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('http://localhost/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$router.push('/login');  // Redirect to login page after successful registration
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* Add styling for register form */
.error-message {
  color: red;
}
</style>
