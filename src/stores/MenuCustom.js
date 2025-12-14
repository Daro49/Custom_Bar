/**
 * @file MenuCustom.js
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia dotazu na ziskanie Menu Custom drinkov
 * @date 2025-12-13
 */

import { ref } from "vue";

export const drinks = ref(null);
export const drinksError = ref(null);
export const drinksLoading = ref(false);

export async function loadDrinks(username) {
  drinksLoading.value = true;

  try {
    const response = await fetch('https://itu-wb12.onrender.com/customDrinks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.customDrinks);
    drinks.value = data.customDrinks;

    drinksError.value = null;
  } catch (err) {
    drinksError.value = err.message;
  } finally {
    drinksLoading.value = false;
  }
}
