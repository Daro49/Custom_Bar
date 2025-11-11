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
      path: '/customleaderboard',
      name: 'customleaderboard',
      component: () => import('../views/CustomLeaderboard.vue'),
    },
    {
      path: '/menu/order',
      name: 'order',
      component: () => import('../views/Order.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../views/BarMap.vue'),
    },
    {
      path: '/menu/:name',
      name: 'menuitem',
      component: () => import('../views/MenuItem.vue'),
      props: true,  
    },
    {
      path: '/custommenu',
      name: 'custommenu',
      component: () => import('../views/CustomMenu.vue'),
    },
    {
      path: '/alcoholmenu',
      name: 'alcoholmenu',
      component: () => import('../views/AlcoholMenu.vue'),
    },
    {
      path: '/softdrinksmenu',
      name: 'softdrinksmenu',
      component: () => import('../views/SoftDrinksMenu.vue'),
    },
    {
      path: '/custommenu/:name',
      name: 'custommenuitem',
      component: () => import('../views/MenuItem.vue'),
      props: true,  
    },{
      path: '/softdrinksmenu/:name',
      name: 'softdrinksmenuitem',
      component: () => import('../views/MenuItem.vue'),
      props: true,  
    },
    {
      path: '/alcoholmenu/:name',
      name: 'alcoholmenuitem',
      component: () => import('../views/MenuItem.vue'),
      props: true,  
    },
    {
      path: '/orders', //TODO fix later
      name: 'orders',
      component: () => import('../views/PastOrder.vue'),
    },
  ],
})

export default router
