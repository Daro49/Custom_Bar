<template>
  <Header :rightIcon = "cart" :rightFunction = "order" />
  <div class="app">

    <MenuNavigation
  label="custom drinks"
  @prev="goToMenu"
  @next="goToAlcoholMenu"
/>
<div class="filter-section">
  <div class="toggle-wrapper">
    <span class="toggle-label">All drinks</span>
    
    <label class="switch">
      <input type="checkbox" v-model="showOnlyLiked">
      <span class="slider round"></span>
    </label>
    
    <span class="toggle-label">Favourite drinks ❤️</span>
  </div>
</div>
<p v-if="drinksLoading && (!drinks || drinks.length === 0)">
  Loading...
</p>

<FeaturedDrink 
  v-if="featuredDrink && (!showOnlyLiked || featuredDrink.liked)"
  :drink="featuredDrink"
  @select="goToDrink"
  @order="handleOrder"
/>

<DrinkCard
  v-for="drink in secondaryDrinks"  
  :key="drink.id"
  :drink="drink"
  @info="goToDrink"
  @addToOrder="handleOrder"
/>

<p v-if="!drinksLoading && secondaryDrinks.length === 0 && (!featuredDrink || !featuredDrink.liked && showOnlyLiked)" class="empty-msg">
  No liked drinks yet ❤️
</p>
</div>

</template>

<script setup>
import { onMounted, ref, computed} from "vue";
import { useRouter } from "vue-router";
import DrinkCard from "@/components/MenuDrinkCard.vue";
import cart from "@/assets/OrderHistory.svg?raw";
import FeaturedDrink from "@/components/FeaturedDrink.vue";
import { addToOrder } from '@/stores/DrinkInfo';

import { drinks, loadDrinks,drinksLoading } from "@/stores/MenuCustom.js";
import Header from "@/components/Header.vue";

const router = useRouter();

onMounted(() => {
  loadDrinks(activeUser.value.username);
});

function goToDrink(name) {
  router.push({
    name: "custommenuitem",
    params: { name },
    query: { from: "/custommenu" }
  });
}
function order(){
      router.push({ name: 'order' })
    };

import { addToast } from '@/stores/ToastStore.js';
async function handleOrder(drink) {
  try {
    await addToOrder(drink);
    addToast(`${drink.name} added to cart!`);
    console.log("Added to order:", drink.name);
  } catch (err) {
    console.error("Order failed:", err);
  }
}

import MenuNavigation from "@/components/MenuNavigation.vue";
import { activeUser } from "@/stores/Login";
function goToAlcoholMenu() {
  router.push("/alcoholmenu");
}

function goToMenu() {
  router.push("/menu");
}

const showOnlyLiked = ref(false); 

const filteredDrinks = computed(() => {
  const allDrinks = drinks.value || [];
  
  if (!showOnlyLiked.value) {
    return allDrinks;
  }
  
  return allDrinks.filter(drink => drink.liked === true);
});

const featuredDrink = computed(() => {
  return (drinks.value || []).find(d => d.position === 1);
});

const secondaryDrinks = computed(() => {
  let list = (drinks.value || []).filter(d => d.position !== 1);
  
  if (showOnlyLiked.value) {
    list = list.filter(d => d.liked === true);
  }
  
  return list;
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
    height: 100vh; 
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 100px;
}

.app > * {
    flex-shrink: 0;
    transition: all 0.3s ease-in-out;
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

.drinkCard {
  width: 640px;
  height: 300px;
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
.drinkCard:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
@media (max-width: 768px) {
.drink-card,
.drinkCard {
  width: 90%;
}}

.featured-container {
  display: flex;
  justify-content: center; 
  width: 100%;              
  margin-bottom: 16px;
}

.filter-container {
  width: 100%;
  max-width: 640px;
  display: flex;
  justify-content: flex-start;
  padding: 8px 16px;
}

.checkbox-label {
  color: #f7d77c;
  font-family: 'Josefin Slab', serif;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  accent-color: #d8a543;
}

.empty-msg {
  color: #f7d77c;
  margin-top: 20px;
  font-style: italic;
}

.filter-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 15px 0;
  margin-bottom: 10px;
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(46, 76, 67, 0.5); 
  padding: 8px 20px;
  border-radius: 25px;
  border: 1px solid #d4af37; 
}

.toggle-label {
  color: #f7d77c;
  font-family: 'Josefin Slab', serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1a2e28;
  transition: .4s;
  border: 1px solid #d4af37;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background: linear-gradient(135deg, #f7c244, #c98f00); 
  transition: .4s;
}

input:checked + .slider {
  background-color: #2e4c43;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
