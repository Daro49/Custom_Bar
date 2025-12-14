/**
 * File: MyDrinks.js
 * Author: Samuel Kudla <xkudlas00@stud.fit.vutbr.cz>
 * Brief: Function for created custom drinks API
 */

import { activeUser } from "../Login";
import { ref } from "vue";

export const mydrinks = ref([]);

/**
 * @brief Function getting all custom drinks that user created.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
export async function getUserDrinks() {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/mydrinks/${activeUser.value.username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Error while fetching mydrinks.');
    }

    const data = await response.json();

    mydrinks.value = data;
    return true;
  } catch (error) {
    console.error(error);
    alert('My drinks cannot be loaded.');
    return false;
  }
}