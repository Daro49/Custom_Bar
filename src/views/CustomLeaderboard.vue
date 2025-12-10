<template>
    <Header :rightIcon = "cart" :rightFunction = "order" />
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
import Header from "@/components/Header.vue";
import cart from "@/assets/OrderHistory.svg?raw";

const router = useRouter();
let intervalId = null;

function goToDrink(name) {
  router.push({
    name: "custommenuitem",
    params: { name },
    query: { from: "/customleaderboard" }
  });
}

onMounted(() => {
  loadLeaderboard();
  intervalId = setInterval(loadLeaderboard, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
function order(){
      router.push({ name: 'order' })
    };
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
    overflow-y: auto;
    padding-bottom: 71px;
  }

</style>
