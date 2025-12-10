// /stores/DrinkInfo.js
import { ref } from "vue";

export const drinkData = ref(null);
export const drinkError = ref(null);
export const drinkLoading = ref(false);

let intervalId = null;

export function stopDrinkAutoRefresh() {
  if (intervalId) clearInterval(intervalId);
}

export async function loadDrink(route) {
  drinkLoading.value = true;

  try {
    let url;
    const name = encodeURIComponent(route.params.name);

    if (route.path.includes("softdrinksmenu")) {
      url = `https://itu-wb12.onrender.com/softDrinks/${name}`;
    } else if (route.path.includes("alcoholmenu")) {
      url = `https://itu-wb12.onrender.com/alcohols/${name}`;
    } else if (route.path.includes("custommenu")) {
      url = `https://itu-wb12.onrender.com/customDrinks/${name}`;
    } else {
      url = `https://itu-wb12.onrender.com/drinks/${name}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);

    drinkData.value = await res.json();
    drinkError.value = null;
  } catch (err) {
    drinkError.value = err.message;
  } finally {
    drinkLoading.value = false;
  }
}

export function startDrinkAutoRefresh(route) {
  stopDrinkAutoRefresh();
  intervalId = setInterval(() => loadDrink(route), 5000);
}

export async function rateDrink(value, name, type = "regular") {
  try {
    const endpoint =
      type === "custom"
        ? `https://itu-wb12.onrender.com/customDrinks/${encodeURIComponent(name)}/rate`
        : `https://itu-wb12.onrender.com/drinks/${encodeURIComponent(name)}/rate`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: value })
    });

    const result = await res.json();

    // Update reactive data with server response
    if (result.drink) {
      drinkData.value = result.drink;
    }
  } catch (err) {
    console.error(err);
  }
}

import { activeUser } from './Login.js';

export async function addToOrder(drink) {
  if (!activeUser.value?.username || !activeUser.value?.table) {
    throw new Error("User not logged in or table not set");
  }

  const payload = {
    drink,
    tableCode: activeUser.value.table
  };

  try {
    const res = await fetch(
      `https://itu-wb12.onrender.com/users/${activeUser.value.username}/order/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}