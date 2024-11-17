<template>
  <v-container class="confirmation" text-center>
    <v-row>
      <v-col cols="12">
        <v-typography variant="h2">Thank you for your order!</v-typography>
      </v-col>
      <v-col cols="12">
        <v-typography variant="body1">
          Your order has been successfully placed.
        </v-typography>
      </v-col>
      <v-col cols="12">
        <v-btn
          color="primary"
          to="/products"
          class="mt-4"
          large
        >
          Go back to products
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CheckoutConfirmation',
};
</script>

<style scoped>
.confirmation {
  margin-top: 50px;
}
</style>
