
<template>
  <div v-bind="$attrs">
    <Header :rightIcon="cart" :rightFunction="order" />
    <div class="app">
      <p v-if="initialLoading">
  Loading...
</p>
 <!-- TODO ADD TOAST TO MENUS AND CHECK ADDING TO SERVER + FIX PSOITION IN DETAIL-->

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
 import { ref } from "vue";

const initialLoading = ref(true);
 

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
import { addToast } from '@/stores/ToastStore.js';
async function addDrinkToOrder() {
  try {
    const result = await addToOrder(drinkData.value);
        addToast(`${drinkData.value.name} added to cart!`);
    console.log("Order added:", result);
  } catch (err) {
    console.error("Failed to add order:", err);
  }
}

onMounted(async () => {
  initialLoading.value = true;
  await loadDrink(route);       // initial fetch
  initialLoading.value = false; // stop showing loading
  startDrinkAutoRefresh(route); // start background refresh
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
