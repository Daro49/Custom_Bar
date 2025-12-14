<!--
/**
 * @file Leaderboard.vue
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia viewu pre rebricek najlepsich napojov
 * @date 2025-12-13
 */
-->


<template>
  <!--hlavicka-->
  <Header :rightIcon = "cart" :rightFunction = "order" :isCart="true"/>
  <div class="app">
  <!--sipky-->
    <MenuNavigation
  label="Leaderboard"
  @prev="goToCustomLeaderboard"
  @next="goToCustomLeaderboard"
/>
    <!-- nacitanie -->
 <p v-if="leaderboardLoading && (!leaderboard || leaderboard.length === 0)">
  Loading...
</p>
    <p v-if="leaderboardError">{{ leaderboardError }}</p>

    <!-- napoje -->
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
import cart from "@/assets/orderIcon.svg?raw";
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

function goToCustomLeaderboard() {
  router.push("/customleaderboard");
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
