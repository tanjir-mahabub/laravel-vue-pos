<template>
  <v-container class="login-form">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginUser">
              <!-- Email input -->
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                outlined
              />
              
              <!-- Password input -->
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                outlined
              />
              
              <!-- Submit button -->
              <v-btn type="submit" color="primary" block>Login</v-btn>
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

<style scoped>
/* Center the login form */
.login-form {
  padding: 20px;
}
</style>
