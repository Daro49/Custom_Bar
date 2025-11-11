<template>
  <div class="app">
<div>
  <button @click="$router.push('/custommenu')"><-</button >
  <button @click="$router.push('/softdrinksmenu')">-></button >
    </div>
  <div class="drink-card" v-for="drink in data" :key="drink.id">
    <img class="drink-image" :src="imageUrl" :alt="IMG" />
    <div class="drink-info">
      <div class="drink-name">{{ drink.name }}</div>
      <div class="drink-price">{{ drink.price }}€</div>
    </div>
    <button class="info-button" @click="goToDrink(drink.name)">Info</button>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const data = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://itu-wb12.onrender.com/alcohols')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    data.value = await response.json()
    console.log(data.value)
  } catch (err) {
    error.value = err.message
  }
})

function goToDrink(name) {
  router.push({ name: 'alcoholmenuitem', params: { name } })
}
</script>

<style>
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
  padding: 10px 16px;
  width: 362px;
  height: 121px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
}

.drink-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
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

  /* Song name */
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

  /* Song name */
  font-family: 'Josefin Slab';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  align-self: stretch;
  color: var(--gold, #d4af37);
  text-align: center;

  /* Song name */
  font-family: 'Josefin Slab';
  font-size: 20px;
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
</style>
