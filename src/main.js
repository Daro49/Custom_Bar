import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { activeUser } from '@/stores/Login.js'
import User from '@/stores/User.js';

import App from './App.vue'
import router from './router'

const savedUser = localStorage.getItem('activeUser');
if (savedUser) {
  const u = JSON.parse(savedUser);
  activeUser.value = new User(u.username, u.points, u.email);
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
