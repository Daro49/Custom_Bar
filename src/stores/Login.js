import { ref } from 'vue';
import User from '@/stores/User.js';

const API_BASE_URL = 'https://itu-wb12.onrender.com';

function getLocalUsername() {
    const storedUserString = localStorage.getItem('activeUser');
    if (storedUserString) {
        try {
            const userData = JSON.parse(storedUserString);
            return userData.username;
        } catch (e) {
            console.error("Failed to parse user data from localStorage:", e);
            localStorage.removeItem('activeUser');
        }
    }
    return null;
}
async function fetchAndInitializeUser() {
    const username = getLocalUsername();
    
    if (username) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${username}`);
            
            if (!response.ok) {
                console.error(`Failed to fetch user data. Status: ${response.status}`);
                localStorage.removeItem('activeUser');
                return new User('').toJSON();
            }
            
            const userData = await response.json();
            
            const userInstance = new User(
                userData.username || '', 
                userData.points || 0, 
                userData.email || null, 
                userData.table || null,
                userData.tableExpiration 
            );

            const plainUserObject = userInstance.toJSON();

            localStorage.setItem('activeUser', JSON.stringify(plainUserObject));
            
            return plainUserObject;

        } catch (e) {
            console.error("Error fetching user:", e);
            localStorage.removeItem('activeUser');
            return new User('').toJSON();
        }
    }
    return new User('').toJSON();
}
export var activeUser = ref(new User('').toJSON()); 

async function initializeStore() {
    const initialUserObject = await fetchAndInitializeUser();
    
    activeUser.value = initialUserObject;
}

initializeStore();

export async function login(username) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      
      const newUser = new User(
        data.user.username, 
        data.user.points, 
        data.user.email, 
        data.user.table,
        data.user.tableExpiration
      );
      
      activeUser.value = newUser.toJSON();
      
      localStorage.setItem('activeUser', JSON.stringify(activeUser.value));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error: ' + error.message);
      return false;
    }
}