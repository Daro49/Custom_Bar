<template>
    <Header :rightIcon = "cart" :rightFunction = "order" />
  <div class="app">
    <div>
    <RouterLink to="/alcoholmenu" class="nav-btn"><-</RouterLink>
    <RouterLink to="/menu" class="nav-btn">-></RouterLink>
</div>

<p v-if="drinksLoading && (!drinks || drinks.length === 0)">
  Loading...
</p>

    <!-- Other drinks -->
    <DrinkCard
  v-for="drink in drinks"
  :key="drink.id"
  :drink="drink"
  @info="goToDrink"
/>
</div>

</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import DrinkCard from "@/components/MenuDrinkCard.vue";

import { drinks, loadDrinks } from "@/stores/MenuSoft.js";
import Header from "@/components/Header.vue";
import cart from "@/assets/OrderHistory.svg?raw";
const router = useRouter();

onMounted(() => {
  loadDrinks();
});

function goToDrink(name) {
  router.push({
    name: "softdrinksmenuitem",
    params: { name },
    query: { from: "/softdrinksmenu" }
  });
}

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
    height: 917px;
    overflow-y: auto;
        box-sizing: border-box;
    height: 100%;
  }
.drink-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2e4c43;
  border-radius: 12px;
  padding: 10px 16px;
  width: 640px;
  height: 121px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
}
@media (max-width: 768px) {
.drink-card,
.drinkCard {
  width: 90%;
}}

.drink-image {
   width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: contain; 
  background-color: #fff; 
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
  object-fit: cover;
  border-radius: 8px;
}

.drink-info {
  flex: 1;
  margin-left: 16px;
  color: #f7d77c;
  font-family: 'Poppins', sans-serif;
  text-align: left;
}

.drink-name {
  color: var(--gold, #d4af37);
  text-align: center;


  font-family: 'Josefin Slab';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: stretch;
}

.drink-price {
  color: var(--gold, #d4af37);
  text-align: center;


  font-family: 'Josefin Slab';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: stretch;
}

.info-button {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg, #f7c244, #c98f00);
  color: black;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.info-button:hover {
  transform: scale(1.05);
}

.drinkCardFe {
  width: 362px;
  height: 121px;
  background: linear-gradient(180deg, #d8a543 0%, #a8792b 100%);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: 'Georgia', serif;
  color: #000;
  overflow: hidden;
   margin-bottom: 16px;
}

.drinkHeader {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  letter-spacing: 1px;
}

.drinkImage {
  object-fit: contain;
}

.drinkFooter {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  color: #2a1800;
}
.drinkCardFe:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}


/* TODO -> still temporary*/
.nav-btn { 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background: #d8a543;
  border-radius: 8px;
  text-decoration: none;
  color: black;
  font-weight: bold;
}

.featured-container {
  display: flex;
  justify-content: center; 
  width: 100%;              
  margin-bottom: 16px;
}

</style>

