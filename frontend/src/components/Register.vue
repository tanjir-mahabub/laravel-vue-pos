<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Register</v-card-title>
          <v-card-text>
            <!-- Registration Form -->
            <v-form @submit.prevent="register" ref="form">
              <v-text-field 
                v-model="name" 
                label="Name" 
                required 
                :rules="[nameRule]"
              />
              <v-text-field 
                v-model="email" 
                label="Email" 
                type="email" 
                required 
                :rules="[emailRule]"
              />
              <v-text-field 
                v-model="password" 
                label="Password" 
                type="password" 
                required 
                :rules="[passwordRule]"
              />
              <v-btn type="submit" color="primary" block>Register</v-btn>
            </v-form>

            <!-- Error Message -->
            <v-alert v-if="errorMessage" type="error" border="left" dismissible>
              {{ errorMessage }}
            </v-alert>
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
      name: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  computed: {
    nameRule() {
      return [v => !!v || 'Name is required'];
    },
    emailRule() {
      return [v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid'];
    },
    passwordRule() {
      return [v => !!v || 'Password is required', v => v.length >= 6 || 'Password must be at least 6 characters long'];
    },
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        this.$store.commit('SET_TOKEN', response.data.token); // Store the token in Vuex
        this.$router.push('/login');  // Redirect to login page after successful registration
      } catch (error) {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styling if needed */
</style>
