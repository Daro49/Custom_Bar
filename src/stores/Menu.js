import { ref } from "vue";

export const drinks = ref(null);
export const drinksError = ref(null);
export const drinksLoading = ref(false);

export async function loadDrinks(username) {
  drinksLoading.value = true;

  try {
    const response = await fetch('https://itu-wb12.onrender.com/drinks', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    drinks.value = data.drinks;

    drinksError.value = null;
  } catch (err) {
    drinksError.value = err.message;
  } finally {
    drinksLoading.value = false;
  }
}
