<template>
  <div  class="drink-card" @click="$emit('info',drink.name)">
    <img :src="drink.image" class="drink-image" :alt="drink.name" />
  <div 
  v-if="drink.liked || drink.disliked" 
  class="status-badge" 
  :class="{ 'favorite': drink.liked, 'disliked': drink.disliked }"
>
  {{ drink.liked ? '❤️' : '💔' }}
</div>
    <div class="drink-info">
      <div class="drink-name">{{ drink.name }}</div>
      <div class="drink-meta">
        <span>#{{ drink.position }}</span>
       <span>
        rating: {{ drink.rating }}
        <span v-if="drink.trend === 1">⭡</span>
         <span v-else-if="drink.trend === 2">⭣</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>


const props = defineProps({
  drink: { type: Object, required: true },
  index: { type: Number, required: true }
});


</script>


<style scoped>

@media (max-width: 768px) {
  .drink-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #2e4c43;
    border-radius: 12px;
    padding: 10px 16px;
    width: 90%;
    height: 121px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    color: #f7d77c;
    font-family: 'Josefin Slab', serif;
    margin-bottom: 16px;
    gap: 20px;
    position: relative;
  }
}

@media (min-width: 768px) {
  .drink-card {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #2e4c43;
    border-radius: 12px;
    padding: 10px 16px;
    width: 640px;
    height: 121px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
    color: #f7d77c;
    font-family: 'Josefin Slab', serif;
    margin-bottom: 16px;
    gap: 20px;
     position: relative;
  }
}


.drink-image {
  width: 70px;
  height: 70px; 
  border-radius: 8px;
  object-fit: cover;
  background-color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
  pointer-events: none; 
}

.drink-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center; 
}
.drink-name {
  font-size: 16px;
  font-weight: 600;
}

.drink-meta {
    font-size: 16px;
  font-weight: 600;
  gap: 18px;
  margin-top: 4px;
  display: flex;
  text-align: center;
  justify-content: center;
}

.info-button {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f7c244, #c98f00);
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.info-button:hover {
  transform: scale(1.05);
}

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
