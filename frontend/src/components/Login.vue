<template>
  <form @submit.prevent="loginUser">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return { email: '', password: '' };
  },
  methods: {
    async loginUser() {
        try {
            // Dispatch the login action and pass credentials
            await this.$store.dispatch('login', { email: this.email, password: this.password });

            // After login, check if token is stored
            const token = localStorage.getItem('authToken');
            console.log('Stored token:', token);  // Make sure the token is being stored

            if (token) {
                // Redirect to dashboard or homepage
                this.$router.push('/');  // Redirect after successful login
            } else {
                alert('Login failed, please try again!');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

  },
};
</script>
