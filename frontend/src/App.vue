<template>
  <v-app>
    <!-- AppBar for navigation -->
    <v-app-bar app>
      <v-toolbar-title>Pos System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/login" text>Login</v-btn>
    </v-app-bar>

    <!-- Main content area -->
    <v-main>
      <router-view/>
    </v-main>

    <!-- Footer -->
    <v-footer app>
      <v-spacer></v-spacer>
      <span>&copy; 2024 Your Company</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
