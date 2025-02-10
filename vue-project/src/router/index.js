import { createRouter, createWebHistory } from 'vue-router'
const Search = () => import('../views/search.vue');
const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search
  }
  // 如果需要其他路由，可以在这里添加
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
