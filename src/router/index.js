import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import { activeUser } from '@/stores/Login.js';

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
      path: '/customer_service',
      name: 'customer_service',
      component: () => import('../views/CustomerService.vue'),
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
    {
      path: '/cs_views/coupons',
      name: 'coupons',
      component: () => import('../views/CSViews/Coupons.vue'),
    },
    {
      path: '/cs_views/packages',
      name: 'packages',
      component: () => import('../views/CSViews/Packages.vue'),
    },
    {
      path: '/cs_views/milestones',
      name: 'milestones',
      component: () => import('../views/CSViews/Milestones.vue'),
    },
    {
      path: '/cs_views/edit_profile',
      name: 'edit_profile',
      component: () => import('../views/CSViews/EditProfile.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && activeUser.value.username === '') {
    next({ name: 'login' }) 
  } else {
    next()
  }
})

export default router
