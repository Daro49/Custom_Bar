import { ref } from "vue";

export const leaderboard = ref(null);
export const leaderboardError = ref(null);
export const leaderboardLoading = ref(false);

export async function loadLeaderboard(username) {
  leaderboardLoading.value = true;

  try {
    const res = await fetch("https://itu-wb12.onrender.com/customDrinksleaderboard", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }), 
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    
    console.log(data);
    leaderboard.value = data.drinks || data; 
    
    leaderboardError.value = null;
  } catch (err) {
    leaderboardError.value = err.message;
    console.error("Leaderboard error:", err);
  } finally {
    leaderboardLoading.value = false;
  }
}