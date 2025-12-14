<!--
*
* File:     Plant.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vut.cz)
* Plant component renders a decorative SVG plant with optional flower.
* Used for visual enhancement in map layouts.
*
-->
<template>
  <div class="plant-container">
    <svg viewBox="0 0 200 200" class="plant-svg">
      <g v-for="(leaf, index) in outerLeaves" :key="`outer-${index}`" :transform="`rotate(${leaf.rotate} 100 100)`">
        <ellipse cx="100" cy="100" rx="40" ry="70" :fill="leafColor" stroke="black" stroke-width="2" :transform="`rotate(${leaf.offsetRotate} 100 100)`"/>
      </g>
      <g v-for="(leaf, index) in innerLeaves" :key="`inner-${index}`" :transform="`rotate(${leaf.rotate} 100 100)`">
        <ellipse cx="100" cy="100" rx="35" ry="60" :fill="leafColor" stroke="black" stroke-width="2" :transform="`rotate(${leaf.offsetRotate} 100 100)`"/>
      </g>

      <g v-if="hasFlower" class="flower">
        <circle cx="100" cy="100" r="25" fill="#FF69B4" stroke="black" stroke-width="1"/>
        <circle cx="100" cy="100" r="15" fill="#C71585" stroke="black" stroke-width="1"/>
        <circle cx="100" cy="100" r="8" fill="#FF0000" stroke="black" stroke-width="1"/>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  hasFlower: {
    type: Boolean,
    default: false
  },
  leafColor: {
    type: String,
    default: '#4CAF50'
  }
});

const outerLeaves = computed(() => {
  const leaves = [];
  for (let i = 0; i < 8; i++) {
    leaves.push({ rotate: i * 45, offsetRotate: i * 0 });
  }
  return leaves;
});

const innerLeaves = computed(() => {
  const leaves = [];
  for (let i = 0; i < 8; i++) {
    leaves.push({ rotate: i * 45 + 22.5, offsetRotate: i * 0 });
  }
  return leaves;
});
</script>

<style scoped>
.plant-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.plant-svg {
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
}
</style>