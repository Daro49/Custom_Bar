<template>
  <div class="drink-card">
    <img class="drink-image" :src="drink.image" :alt="drink.name" />

    <div class="drink-info">
      <div class="drink-name">{{ drink.name }}</div>
      <div class="drink-price">{{ drink.price }}€</div>
    </div>

    <button class="info-button" @click="$emit('info', drink.name)">Info</button>
  </div>
</template>

<script setup>

defineProps({
  drink: { type: Object, required: true }
})

defineEmits(["info"]);
</script>

<style scoped>
.drink-card {
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

</style>
