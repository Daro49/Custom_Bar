<template>
    <Header :rightIcon = "cart" :rightFunction = "order" />
  <div class="app">
    
        <MenuNavigation
  label="Custom drinks Leaderboard"
  @prev="goToLeaderboard"
  @next="goToLeaderboard"
/>

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
  loadLeaderboard(activeUser.value.username);
  intervalId = setInterval(() => {
    loadLeaderboard(activeUser.value.username);
  }, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
function order(){
      router.push({ name: 'order' })
    };

import MenuNavigation from "@/components/MenuNavigation.vue";
import { activeUser } from "@/stores/Login";
function goToLeaderboard() {
  router.push("/leaderboard");
}


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
    height: 100vh; 
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 100px;
}

.app > * {
    flex-shrink: 0;
    transition: all 0.3s ease-in-out;
}
</style>
