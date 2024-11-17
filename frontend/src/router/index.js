import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Dashboard from '@/components/Dashboard.vue';
import ProductList from '@/components/ProductList.vue';
import SalesReport from '@/components/SalesReport.vue';
import StockReport from '@/components/StockReport.vue';
import ReportFilters from '@/components/ReportFilters.vue';

const routes = [
  { path: '/', name: 'Home', component: Login },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, roles: ['admin', 'staff'] }
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/sales-report',
    name: 'SalesReport',
    component: SalesReport,
    meta: { requiresAuth: true, roles: ['admin', 'staff'] }
  },
  {
    path: '/stock-report',
    name: 'StockReport',
    component: StockReport,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/report-filter',
    name: 'ReportFilter',
    component: ReportFilters,
    meta: { requiresAuth: true, roles: ['admin', 'staff'] }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  const userRole = store.getters.userRole;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.matched.some(record => record.meta.roles && !record.meta.roles.includes(userRole))) {
      next('/'); // Redirect to home if user does not have the required role
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
