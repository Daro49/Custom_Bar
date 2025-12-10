
<template>
  <div v-bind="$attrs">
    <Header :rightIcon="cart" :rightFunction="order" />
    <div class="app">
      <p v-if="drinkLoading && (!drinkData || drinkData.length === 0)">
        Loading...
      </p>

      <DrinkInfoCard
        v-else-if="drinkData"
        :drink="drinkData"
        @back="goBackToList"
        @rate="rate"
        @order="addDrinkToOrder"
      />

      <p v-else>Error: {{ drinkError }}</p>
    </div>
  </div>
</template>


<script setup>
  
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import cart from "@/assets/OrderHistory.svg?raw";
import DrinkInfoCard from "@/components/DrinkInfoCard.vue";
import {
  drinkData,
  drinkError,
  drinkLoading,
  loadDrink,
  startDrinkAutoRefresh,
  stopDrinkAutoRefresh,
  rateDrink,
  addToOrder
} from "@/stores/DrinkInfo.js";

import Header from "@/components/Header.vue";

const router = useRouter();
const route = useRoute();

function goBackToList() {
  if (route.query.from) return router.push(route.query.from);
  router.back();
}


function rate(value) {
  rateDrink(value, route.params.name, route.path.includes("custommenu") ? "custom" : "regular");
}

async function addDrinkToOrder() {
  try {
    const result = await addToOrder(drinkData.value);
    console.log("Order added:", result);
  } catch (err) {
    console.error("Failed to add order:", err);
  }
}

onMounted(() => {
  loadDrink(route);
  startDrinkAutoRefresh(route);
});

onBeforeUnmount(() => {
  stopDrinkAutoRefresh();
});

function order(){
      router.push({ name: 'order' })
    };
const props = defineProps({
  drink: Object,
  name: String
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
    overflow-y: auto;
     height: 917px;
  }
</style>
