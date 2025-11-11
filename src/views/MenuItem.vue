
<template>
  <h1>Menu Item: {{ name }}</h1>
  <button @click="router.push('/')">to Main Menu</button ><br />
  <button @click="goBackToList()"><-</button >
  <div class="drink-info-card">
  <button class="arrow" @click="goBackToList()">⌄</button>

  <!-- <img src="whiskey-old-fashioned.jpg" alt="Whiskey Old Fashioned" class="drink-info-image" /> -->

  <div class="drink-info-header">
    <h2 class="drink-info-name">{{ data?.name }}</h2>
    <div class="drink-info-sub" v-if="data && data.rating !=null" >
      <span>#1</span>
      <span>{{data?.rating}}</span>
    </div>
  </div>

  <p class="drink-description" v-if="data?.description">
   {{ data?.description }}
  </p>


  <div class="drink-ingredients" v-if="data?.ingredients">
{{ ingredientsLine }}
  </div>

  <div class="drink-actions" v-if="data && data.rating" >
    <button class="action-button" @click="rate(1)">♡</button>
    <button class="action-button" @click="rate(-1)">dislike</button>
  </div>

  <button class="order-section">
    <span>ORDER:</span>
  <span class="order-price">{{ data?.price }}€</span>
  </button>
</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { ref, onMounted } from 'vue'
import { onBeforeUnmount } from 'vue'

const router = useRouter()
const route = useRoute()

const ingredientsLine = computed(() => {
  const ing = data.value?.ingredients
  if (!ing) return ''
  if (Array.isArray(ing)) return ing.join(', ')
  return String(ing)
})

const name = computed(() => route.params.name)

function goBackToList() {
  const from = route.query.from
  if (from) {
    router.push(String(from))
    return
  }

  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push('/')
}
const data = ref(null)
const error = ref(null)
async function getData() {
try {
    var response;
    const drinkName = encodeURIComponent(route.params.name || name.value)
    if (route.path.includes('softdrinksmenu')) {
       response = await fetch(`https://itu-wb12.onrender.com/softDrinks/${drinkName}`)
    } else if (route.path.includes('alcoholmenu')) {
       response = await fetch(`https://itu-wb12.onrender.com/alcohols/${drinkName}`)
    } else if (route.path.includes('custommenu')) {
       response = await fetch(`https://itu-wb12.onrender.com/customDrinks/${drinkName}`)
    } else {
     response = await fetch(`https://itu-wb12.onrender.com/drinks/${drinkName}`)}
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    data.value = await response.json()
    console.log(data.value)
  } catch (err) {
    error.value = err.message
  }
}
var intervalId;
onMounted(() => {
  getData()
  intervalId = setInterval(getData, 5000)
})
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

async function rate(value) {
  var rating = {"rating": value};
  try {
    var response;
    const drinkName = encodeURIComponent(route.params.name || name.value)
    if (route.path.includes('custommenu')) {
        response = await fetch(`https://itu-wb12.onrender.com/customDrinks/${drinkName}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
      
    })
    console.log(response)
    } else {
      response = await fetch(`https://itu-wb12.onrender.com/drinks/${drinkName}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
    })
  console.log(response)
  }
  } catch (err) {

    return null
  }
}


</script>
<style scoped> 
.drink-info-card {
  width: 360px;
  background: linear-gradient(180deg, #d7a84d 0%, #ab7e2e 100%);
  border-radius: 16px;
  padding: 12px;
  font-family: 'Josefin Slab', serif;
  color: #2e1b00;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.arrow {
  font-size: 20px;
  color: #2e1b00;
  margin-bottom: 8px;
}

.drink-info-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 8px;
}

.drink-info-name {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.drink-info-sub {
  display: flex;
  justify-content: space-between;
  width: 80%;
  font-size: 14px;
  color: #2e1b00;
  margin-top: 2px;
}

.drink-description {
  background-color: #6e3d2c;
  color: #f7d77c;
  padding: 6px 10px;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 14px;
}

.drink-ingredients {
  background-color: #6e3d2c;
  color: #f7d77c;
  font-size: 13px;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  line-height: 1.4;
}

.drink-actions {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 8px;
}

.action-button {
  background-color: #1e463b;
  color: #f7d77c;
  border: none;
  border-radius: 10px;
  width: 50px;
  height: 24px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}

.action-button:hover {
  transform: scale(1.05);
}

.order-section {
  background-color: #2e4c43;
  border-radius: 10px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  margin-top: 12px;
  color: #f7d77c;
  font-weight: bold;
  font-size: 16px;
}

.order-price {
  color: #f7d77c;
}
</style>