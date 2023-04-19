import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from '../views/SearchPage.vue';
import StatisticalPage from '../views/StatisticalPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchPage
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatisticalPage
    }
  ]
});

export default router;