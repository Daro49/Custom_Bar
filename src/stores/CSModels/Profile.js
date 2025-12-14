/**
 * File: Profile.js
 * Author: Samuel Kudla <xkudlas00@stud.fit.vutbr.cz>
 * Brief: Function providing API funcitons for user
 */
import { ref } from "vue";
import { activeUser } from "../Login";
export const fetchedUser = ref(null)

/**
 * @brief Function getting user from server by username
 * @param {string} username 
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function getUser(username) {
  fetchedUser.value = null;
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}`);

    if (!response.ok) {
      throw new Error(`Fetching user failed.`);
    }

    const data = await response.json();
    fetchedUser.value = data;
    return true;
  } catch (error) {
    console.log(`User ${username} does not exist.`);
    return false;
  }
}

/**
 * @brief Function saving profile changes of local stored user
 * @param {string} username - 
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function saveProfileChanges(loggedIn) {
  try {
    const response = await fetch(
      `https://itu-wb12.onrender.com/users/${loggedIn}/edit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'newUsername': activeUser.value.username,
          'email': activeUser.value.email,
          'imgurl': activeUser.value.imgurl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Profile update failed');
    }

    localStorage.setItem('activeUser', JSON.stringify(activeUser.value));
    return true;
  } catch (error) {
    console.error('Profile update error:', error);
    alert('Profile update error: ' + error.message);
    return false;
  }
}
