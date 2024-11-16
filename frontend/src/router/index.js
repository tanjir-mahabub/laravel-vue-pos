import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import ProductList from '@/components/ProductList.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

const routes = [
  {
    path: '/products',
    name: 'products',
    component: ProductList,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/',
    redirect: '/products',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
