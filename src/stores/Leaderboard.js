import { ref } from "vue";

export const leaderboard = ref(null);
export const leaderboardError = ref(null);
export const leaderboardLoading = ref(false);

export async function loadLeaderboard() {
  leaderboardLoading.value = true;

  try {
    const res = await fetch("https://itu-wb12.onrender.com/drinksleaderboard");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    leaderboard.value = await res.json();
    leaderboardError.value = null;
  } catch (err) {
    leaderboardError.value = err.message;
    console.error(err);
  } finally {
    leaderboardLoading.value = false;
  }
}
