<template>
  <div class="app">
    
    <div>
      <button @click="$router.push('/leaderboard')"><-</button>
      <button @click="$router.push('/leaderboard')">-></button>
    </div>

    <!-- Loading / Error states -->
 <p v-if="leaderboardLoading && (!leaderboard || leaderboard.length === 0)">
  Loading...
</p>
    <p v-if="leaderboardError">{{ leaderboardError }}</p>

    <!-- Drink Cards -->
    <LeaderboardDrinkCard
      v-for="(drink, i) in leaderboard"
      :key="drink.id"
      :drink="drink"
      :index="i"
      @info="goToDrink"
    />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

import {
  leaderboard,
  leaderboardError,
  leaderboardLoading,
  loadLeaderboard
} from "@/stores/CustomLeaderboard.js";

import LeaderboardDrinkCard from "@/components/LeaderboardDrinkCard.vue";

const router = useRouter();
let intervalId = null;

function goToDrink(name) {
  router.push({
    name: "menuitem",
    params: { name },
    query: { from: "/leaderboard" }
  });
}

onMounted(() => {
  loadLeaderboard();
  intervalId = setInterval(loadLeaderboard, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.app {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    display:flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    height: 917px;
    overflow-y: auto;
  }
.drink-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2e4c43; 
  border-radius: 12px;
  padding: 10px 16px;        /* from larger card */
  width: 90%;              /* larger width */
  height: 121px;             /* larger height */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  color: #f7d77c;
  font-family: 'Josefin Slab', serif;
  margin-bottom: 16px;
}

/* Keep smaller image look but proportionally nice in bigger card */
.drink-image {
  width: 70px;               /* a bit larger than small, still balanced */
  height: 70px;
  border-radius: 8px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0D564B;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  height: 917px;
  overflow-y: auto;
}
</style>
