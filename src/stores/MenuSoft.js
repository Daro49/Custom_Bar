/**
 * @file MenuSoft.js
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia dotazu na ziskanie Menu nealko drinkov
 * @date 2023-10-27
 */

import { ref } from "vue";

export const drinks = ref(null);
export const drinksError = ref(null);
export const drinksLoading = ref(false);

export async function loadDrinks() {
  drinksLoading.value = true;

  try {
    const response = await fetch('https://itu-wb12.onrender.com/softDrinks');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    drinks.value = await response.json();
  } catch (err) {
    drinksError.value = err.message;
  } finally {
    drinksLoading.value = false;
  }
}
