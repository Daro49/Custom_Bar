<template>
  <div class="drink-card">
    <img :src="drink.image" class="drink-image" :alt="drink.name" />

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

    <button class="info-button" @click="$emit('info', drink.name)">ℹ️</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  drink: { type: Object, required: true },
  index: { type: Number, required: true }
});

defineEmits(["info"]);

// Track rating trend
const trend = ref("same");

// Watch for rating changes
watch(
  () => props.drink.rating,
  (newVal, oldVal) => {
    if (newVal > oldVal) trend.value = "up";
    else if (newVal < oldVal) trend.value = "down";
    else trend.value = "same";
  }
);
</script>


<style scoped>
.drink-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2e4c43;
  border-radius: 12px;
  padding: 10px 16px;
  width: 90%;
  height: 121px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  color: #f7d77c;
  font-family: 'Josefin Slab', serif;
  margin-bottom: 16px;
}

.drink-image {
  width: 70px;
  height: 70px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 2px;
}

.drink-info {
  flex: 1;
  margin-left: 12px;
}

.drink-name {
  font-size: 16px;
  font-weight: 600;
}

.drink-meta {
  font-size: 12px;
  display: flex;
  gap: 8px;
  margin-top: 4px;
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
</style>
