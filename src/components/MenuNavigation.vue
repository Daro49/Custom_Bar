<!--
/**
 * @file MenuNavigation.vue
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia modulu pre zobrazenie drinku v Menu
 * @date 2025-12-13
 */
-->

<template>
  <div class="menu-navigator">
    <button class="nav-arrow" @click="$emit('prev')">◀</button>
    <div class="menu-label">{{ label }}</div>
    <button class="nav-arrow" @click="$emit('next')">▶</button>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true }  
});

defineEmits(["prev", "next"]);
</script>

<style scoped>
.menu-navigator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #7b2320;
  color: #d4af37;            
  border-radius: 16px;
  padding: 12px 20px;
  width: 100%;
  max-width: 640px;
  font-family: 'Georgia', serif;
  user-select: none;
}

.nav-arrow {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s;
}

.nav-arrow:hover {
  transform: scale(1.2);
}

.menu-label {
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
