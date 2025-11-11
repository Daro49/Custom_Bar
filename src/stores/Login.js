import { ref } from 'vue';
import User from '@/stores/User.js';

export var activeUser = ref(new User(''));


export async function login(username) {
    try {
      const response = await fetch('https://itu-wb12.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error('Login failed\n');

      const data = await response.json();
      
      activeUser.value = new User(data.user.username, data.user.points, data.user.email);
      
      localStorage.setItem('activeUser', JSON.stringify(activeUser.value));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
      return false;
    }
}