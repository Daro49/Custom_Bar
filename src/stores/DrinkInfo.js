
import { ref } from "vue";
export const drinkData = ref(null);
export const drinkError = ref(null);
export const drinkLoading = ref(false);
export const liked = ref(false);
export const disliked = ref(false);

let intervalId = null;

export function stopDrinkAutoRefresh() {
  if (intervalId) clearInterval(intervalId);
}
export async function loadDrink(route, username) {
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

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username  
      })
    });

    if (!res.ok) throw new Error("HTTP " + res.status);

    let response = await res.json();
    drinkData.value = response.drink;
    liked.value = response.liked;
    disliked.value = response.disliked;
    drinkError.value = null;
  } catch (err) {
    drinkError.value = err.message;
  } finally {
    drinkLoading.value = false;
  }
}

export function startDrinkAutoRefresh(route) {
  stopDrinkAutoRefresh();
  intervalId = setInterval(() => loadDrink(route, activeUser.value.username ), 5000);
}

export async function rateDrink(action, name, type = "regular", username) {
  try {

    const endpointBase =
      type === "custom"
        ? `https://itu-wb12.onrender.com/customDrinks/${encodeURIComponent(name)}`
        : `https://itu-wb12.onrender.com/drinks/${encodeURIComponent(name)}`;

    const endpoint = `${endpointBase}/${action}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const result = await res.json();

    if (result.drink) {
      drinkData.value = result.drink;
      liked.value = result.liked;
      disliked.value = result.disliked;
    }

    return result; 
  } catch (err) {
    console.error(err);
  }
}

import { activeUser } from './Login.js';

export const orderItems = ref([]);

export async function addToOrder(drink) {
  if (!activeUser.value?.username || !activeUser.value?.table) {
    
    throw new Error("User not logged in or table not set");
  }


  const existing = orderItems.value.find(i => i.id === drink.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    orderItems.value.push({ ...drink, quantity: 1 });
  }


  try {
    await fetch(
      `https://itu-wb12.onrender.com/users/${activeUser.value.username}/order/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drink, tableCode: activeUser.value.table })
      }
    );
  } catch (err) {
    console.error("Failed to add to server order:", err);
  }
}