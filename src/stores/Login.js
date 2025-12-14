/**
 * @file Login.js
 * @brief User authentication and state management.
 * @authors ..., Matej Marušinec (xmarusm00@stud.fit.vut.cz) (clearTable function)
 *
 * Handles user authentication, user state, and local storage for the active user.
 * Provides functions to fetch and initialize user data from the backend API.
 */
import { ref } from 'vue';
import User from '@/stores/User.js';


/**
 * Base URL for backend API.
 */
const API_BASE_URL = 'https://itu-wb12.onrender.com';

/**
 * Retrieves the username of the active user from localStorage, if available.
 * @returns {string|null} Username or null if not found/invalid
 */
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

/**
 * Fetches user data from the backend and initializes the user in localStorage.
 * @returns {Object} User object
 */
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
                userData.tableExpiration, 
                userData.imgurl,
                userData.orderLength || 0
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

/**
 * Initializes the Pinia store with the user from backend/localStorage.
 */
async function initializeStore() {
    const initialUserObject = await fetchAndInitializeUser();
    activeUser.value = initialUserObject;
}

initializeStore();

/**
 * Logs in a user by username, updates local state and localStorage.
 * @param {string} username - Username to log in
 * @returns {boolean} True if login successful, false otherwise
 */
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
            data.user.tableExpiration,
            data.user.imgurl,
            data.user.orderLength || 0
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

/**
 * Clears the user's table reservation both locally and on the server.
 * @param {string|null} tableCodeToRelease - Table code to release (optional)
 */
export async function clearTable(tableCodeToRelease = null) {
    activeUser.value.table = 'N/A';
    activeUser.value.tableExpiration = null;

    localStorage.setItem('activeUser', JSON.stringify(activeUser.value));

    try {
        const username = activeUser.value.username;
        const url = `https://itu-wb12.onrender.com/users/${username}/table/release`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tableCode: tableCodeToRelease })
        });

        if (!response.ok) {
            console.warn("Server failed to fully release table, but local state is cleared.");
        } else {
            console.log(`Table released successfully on server.`);
        }

    } catch (error) {
        console.error('Error connecting to server to release table:', error);
    }
}