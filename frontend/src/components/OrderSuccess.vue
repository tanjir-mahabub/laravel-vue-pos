<template>
  <div class="order-success">
    <h2>Order Placed Successfully!</h2>
    <p>Your order has been placed successfully. You will receive an email confirmation shortly.</p>
    <router-link to="/products">Go back to Products</router-link>
  </div>
</template>

<script>
export default {
  name: 'OrderSuccess',
};
</script>

<style scoped>
.order-success {
  text-align: center;
  padding: 20px;
}
</style>
