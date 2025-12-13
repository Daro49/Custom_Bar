<script setup>
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
import { onMounted, ref } from 'vue';
import { getUserDrinks, mydrinks } from '@/stores/CSModels/MyDrinks';
import MenuDrinkCard from '@/components/MenuDrinkCard.vue';
import { addToOrder } from '@/stores/DrinkInfo';
import { addToast } from '@/stores/ToastStore';

let loaded = ref(false);

onMounted(async () => {
  loaded.value = false;
  await getUserDrinks();
  loaded.value = true; 
});

function goToDrink(name) {
  router.push({
    name: "custommenuitem",
    params: { name },
    query: { from: "/custommenu" }
  });
}

async function handleOrder(drink) {
  try {
    await addToOrder(drink);
    addToast(`${drink.name} added to cart!`);
    console.log("Added to order:", drink.name);
  } catch (err) {
    addToast(`Failed to add to cart. Please select table first.`, 5000);
    console.error("Order failed:", err);
  }
}

</script>

<template>
  <div class="my-drinks">
    <Header :avatar="Profile" :previous="true"/>
    <div class="my-drinks-banner">
      <span class="banner-text">My Drinks</span>
    </div>
    <div class = "drinks-list" v-if="loaded">
      <MenuDrinkCard
        v-for="drink in mydrinks"  
        :key="drink.id"
        :drink="drink"
        @info="goToDrink"
        @addToOrder="handleOrder"
      />
    </div>
    <div v-else class="loading">
      Loading...
    </div>
  </div>
</template>

<style>
.my-drinks {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.my-drinks .drinks-list {
  display: flex;
  flex-direction: column;
  align-items: center; 
  align-self: center;
  gap: 14px;
  margin-top: 21px;
  width: 80%;
  padding: 0 10px; 
}

.my-drinks-banner {
  background-color: #7a1f1f; 
  
  width: 80%;
  margin: 20px auto;
  padding: 25px 10px;
  
  border-radius: 12px;
  border: 2px solid #d4a74a;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  
  outline: 1px solid #d4a74a;
  outline-offset: -8px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.banner-text {
  color: #d4a74a; 
  font-family: 'Serif', 'Times New Roman', serif;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
}

.loading {
  font-family: var(--button-font-family);
  font-size: 50px;
  color: white;
  text-align: center;
}
</style>