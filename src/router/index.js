import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenuView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainMenu,
    },
    {
      path: '/jukebox',
      name: 'jukebox',
      component: () => import('../views/Jukebox.vue'),
    },
    {
      path: '/customdrink',
      name: 'customdrink',
      component: () => import('../views/CustomDrink.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: () => import('../views/Coupons.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/Menu.vue'),
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/Leaderboard.vue'),
    },
    {
      path: '/menu/order',
      name: 'order',
      component: () => import('../views/Order.vue'),
    },
  ],
})

export default router
