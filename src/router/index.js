import { createRouter, createWebHistory } from 'vue-router'
import MainMenuView from '../views/MainMenuView.vue'
import { activeUser } from '@/stores/Login.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainMenuView,
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
      path: '/orders',
      name: 'orders',
      component: () => import('../views/PastOrder.vue'),
    },
    {  
      path: '/coupons',
      name: 'coupons',
      component: () => import('../views/CSViews/Coupons.vue'),
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('../views/CSViews/Packages.vue'),
    },
    {
      path: '/milestones',
      name: 'milestones',
      component: () => import('../views/CSViews/Milestones.vue'),
    },
    {
      path: '/edit_profile',
      name: 'edit_profile',
      component: () => import('../views/CSViews/EditProfile.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/my_drinks',
      name: 'my_drinks',
      component: () => import('../views/CSViews/MyDrinks.vue'),
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
