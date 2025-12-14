/**
 * File: AddPoints.js
 * Author: Samuel Kudla <xkudlas00@stud.fit.vutbr.cz>
 * Brief: Function adding points to user.
 */

import { activeUser } from "./Login.js";
import { addToast } from "./ToastStore.js";

/**
 * Function adding points to user. To remove points, input negative value. 
 * @param {Number} points - The username to log in with.
 * @returns {Promise<boolean>} True if adding was successful, false otherwise 
 */
export async function addPoints(points) {
  const username = activeUser.value.username;
  const newPoints = activeUser.value.points + points;

  try {
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points: newPoints }),
    });

    if (!response.ok) {
      throw new Error('Profile points update failed');
    }

    activeUser.value.points = newPoints;
    localStorage.setItem('activeUser', JSON.stringify(activeUser.value));

    return true;
  } catch (error) {
    console.error('Profile update error:', error);
    addToast('Profile update error: ' + error.message);
    return false;
  }
}
