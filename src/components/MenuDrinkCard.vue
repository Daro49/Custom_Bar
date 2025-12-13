<!--
/**
 * @file MenuDrinkCard.vue
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia modulu pre zobrazenie drinku v Menu
 * @date 2023-10-27
 */
-->

<template>
  <div class="drink-card" @click="$emit('info', drink.name)">
    <!--znacka ci je liked/disliked-->
    <div 
  v-if="drink.liked || drink.disliked" 
  class="status-badge" 
  :class="{ 'favorite': drink.liked, 'disliked': drink.disliked }"
>
  {{ drink.liked ? '❤️' : '💔' }}
</div>

    <img class="drink-image" :src="drink.image" :alt="drink.name" />
    <!--menu a cena-->
    <div class="drink-info">
      <div class="drink-name">{{ drink.name }}</div>
      <div class="drink-price">{{ drink.price }}€</div>
    </div>
    <!--pridanie do objednavky-->
    <button class="info-button" @click.stop="$emit('addToOrder', drink)">+</button>
  </div>
</template>
<script setup>

defineProps({
  drink: { type: Object, required: true }
})

defineEmits(["info",  "addToOrder"]);

</script>

<style scoped>
.drink-card {
  position: relative;
    flex-shrink: 0;
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
  transition: 0.2s ease;
}
.drink-card:hover{
  transform: scale(1.1);
}

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

@media (max-width: 768px) {
.drink-card,
.drinkCard {
  width: 90%;
}}

.status-badge {
  position: absolute;
  top: -8px;    
  right: -8px;  
  background: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 10;
}

.status-badge.favorite {
  border: 2px solid #ff4d4d;
}

.status-badge.disliked {
  border: 2px solid #808080;
  filter: grayscale(1); 
}

</style>
