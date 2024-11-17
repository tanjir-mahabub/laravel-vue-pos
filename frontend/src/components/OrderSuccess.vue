<template>
  <v-container class="order-success">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Order Placed Successfully!</v-card-title>
          <v-card-text>
            <p>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="$router.push('/products')"
              block
            >
              Go back to Products
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderSuccess',
};
</script>

<style scoped>
.order-success {
  padding: 20px;
}
</style>
