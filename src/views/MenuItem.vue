<!--
/**
 * @file MenuItem.vue
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacie viewu pre detail napoja
 * @date 2023-10-27
 */
-->

<template>
  <div v-bind="$attrs">
    <!--hlavicka-->
    <Header :previous="true" :rightIcon="cart" :rightFunction="order" />
    <div class="app">
      <p v-if="initialLoading">
  Loading...
</p>
      <!--component detail s predanymi parametrami-->
      <DrinkInfoCard
        v-else-if="drinkData"
        :drink="drinkData"
        :liked="liked"
        :disliked="disliked"
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
import { activeUser } from "@/stores/Login";
import {
  drinkData,
  drinkError,
  drinkLoading,
  liked,
  disliked,
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
  rateDrink(value, route.params.name, route.path.includes("custommenu") ? "custom" : "regular", activeUser.value.username);
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
  await loadDrink(route, activeUser.value.username );       
  initialLoading.value = false; 
  startDrinkAutoRefresh(route); 
});


onBeforeUnmount(() => {
  stopDrinkAutoRefresh();
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
     height: 917px;
  }
</style>
