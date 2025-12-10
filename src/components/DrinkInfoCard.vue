<template>
  <div class="drink-info-card">
    <div class="arrow" @click="$emit('back')">⌄</div>

    <img v-if="drink.image" :src="drink.image" class="drink-info-image" />

    <div class="drink-info-header">
      <h2 class="drink-info-name">{{ drink.name }}</h2>

      
    </div>
    <div class="drink-info-sub" v-if="drink.rating != null">
        <span>#{{ drink.position }}</span>
        <span>rating: {{ drink.rating }}</span>
      </div>

    <p class="drink-description" v-if="drink.description">
      {{ drink.description }}
    </p>

    <div class="drink-ingredients" v-if="drink.ingredients">
      {{ ingredientsLine }}
    </div>

    <div class="drink-actions" v-if="drink.rating != null">
      <button class="action-button" @click="$emit('rate', 1)">❤</button>
      <button class="action-button" @click="$emit('rate', -1)">💔</button>
    </div>

    <button class="order-section" @click="$emit('order')">
      <span>ORDER:</span>
      <span class="order-price">{{ drink.price }}€</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  drink: { type: Object, required: true }
});

defineEmits(["back", "rate", "order"]);

const ingredientsLine = computed(() => {
  const ing = props.drink?.ingredients;
  if (!ing) return "";
  return Array.isArray(ing) ? ing.join(", ") : String(ing);
});
</script>

<style scoped>
@media (min-width: 768px) {
.drink-info-card {
  width: 620px;
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
}

@media (max-width: 768) {
    .drink-info-card {
   width: 90%;
  height: 100%;
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
