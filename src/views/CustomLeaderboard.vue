<template>
    <div class="app">
<div>
<button @click="$router.push('/leaderboard')"><-</button >
  <button @click="$router.push('/leaderboard')">-></button >
  </div>
  <div class="drink-card" v-for="(drink,i) in data" :key="drink.id">
  <img src={{drink.image}} alt="Gabor's Secret" class="drink-image" />
  
  <div class="drink-info">
    <div class="drink-name">{{ drink.name }}</div>
    <div class="drink-meta">
      <span>#{{i+1}}</span>
      <span>{{drink.rating}}⭡</span>
    </div>
  </div>

  <button class="info-button" @click="goToDrink(drink.name)">ℹ️</button>
</div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

import { ref, onMounted, onBeforeUnmount } from 'vue'

const data = ref(null)
const error = ref(null)
let intervalId = null

function goToDrink(name) {
  router.push({ name: 'custommenuitem', params: { name: name }, query: { from: '/customleaderboard' } })
}

async function fetchLeaderboard() {
  try {
    const res = await fetch('https://itu-wb12.onrender.com/customdrinksleaderboard')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
  
    error.value = null
  } catch (err) {
    error.value = err.message
    console.error(err)
  }
}

onMounted(() => {
  fetchLeaderboard() 
  intervalId = setInterval(fetchLeaderboard, 5000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})


</script>


<style >
.app {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
   background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0D564B;
    display:flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    height: 917px;
    overflow-y: auto;
  }
.drink-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2e4c43; 
  border-radius: 12px;
  padding: 8px 12px;
  width: 180px; 
  height: 66px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  color: #f7d77c;
  font-family: 'Josefin Slab', serif;
  margin-bottom: 12px;
}

.drink-image {
   width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: contain; /* show the full image inside the circle */
  background-color: #fff; /* optional: fill background */
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 2px; /* small inner margin if needed */
  object-fit: cover;
  border-radius: 8px;
}

.drink-info {
  flex: 1;
  margin-left: 8px;
  text-align: left;
}

.drink-name {
  font-size: 12px;
  font-weight: 600;
  color: #f7d77c;
}

.drink-meta {
  font-size: 10px;
  color: #f7d77c;
  display: flex;
  gap: 8px;
  margin-top: 2px;
}

.info-button {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #f7c244, #c98f00);
  color: black;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.info-button:hover {
  transform: scale(1.05);
}
</style>
