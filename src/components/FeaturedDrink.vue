<template>
  <div class="drinkCard" @click="$emit('select', drink.name)">
    <div class="drinkHeader">POPULAR NOW</div>

    <img :src="drink.image" :alt="drink.name" class="drinkImage" />

    <div class="drinkFooter">{{ drink.name }}</div>

    <div class="status-badge" v-if="drink.liked || drink.disliked">
      <span v-if="drink.liked">❤️</span>
      <span v-else-if="drink.disliked">💔</span>
    </div>

    <div class="priceFloating">{{ drink.price }}€</div>

    <button class="orderFloating" @click.stop="$emit('order', drink)">
      +
    </button>
  </div>
</template>

<script setup>
defineProps({
  drink: { type: Object, required: true },
});

defineEmits(["select", "order"]);
</script>

<style scoped>
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
  overflow: visible;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;
}

.drinkCard:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
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

.status-badge {
  position: absolute;
  top: 8px;    
  right: 8px;  
  background: white;
  border-radius: 50%;
  width: 34px; 
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.4);
  z-index: 20;
  transition: all 0.2s ease;
}


.status-badge.favorite {
  border: 2px solid #ff4d4d;
}

.status-badge.disliked {
  border: 2px solid #808080;
  filter: grayscale(1); /* Ak chceš, aby bolo neobľúbené menej výrazné */
}


.orderFloating {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f7c244;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}

.orderFloating:hover {
  background: #ffdb75;
  transform: scale(1.1);
}

.priceFloating {
  position: absolute;
  bottom: 64px; 
  right: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #3a2400;
  padding: 2px 6px;
  border-radius: 8px;
}
</style>
