<template>
  <Header :avatar="Profile"/>
  <div class="app">
    
    <div>
      <button @click="$router.push('/customleaderboard')"><-</button>
      <button @click="$router.push('/customleaderboard')">-></button>
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
import Profile from '@/assets/user.png';
import Header from "@/components/Header.vue";

import {
  leaderboard,
  leaderboardError,
  leaderboardLoading,
  loadLeaderboard
} from "@/stores/Leaderboard.js";

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
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  height: 917px;
  overflow-y: auto;
}
</style>
