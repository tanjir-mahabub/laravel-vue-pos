<template>
  <div class="confirmation">
    <h2>Thank you for your order!</h2>
    <p>Your order has been successfully placed.</p>
    <router-link to="/products">Go back to products</router-link>
  </div>
</template>

<script>
export default {
  name: 'CheckoutConfirmation',
};
</script>

<style scoped>
.confirmation {
  text-align: center;
  margin-top: 50px;
}
</style>
