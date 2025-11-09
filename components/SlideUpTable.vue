<template>
  <div 
    class="slide-up-handle-wrapper" 
    :class="{ expanded: isExpanded }" 
    @click="toggleExpand"
  >
    <svg 
      class="chevron-icon" 
      :class="{ rotated: isExpanded }" 
      viewBox="0 0 100 50"
    >
      <path 
        d="M10 40 L50 10 L90 40" 
        stroke="black" 
        stroke-width="8" 
        fill="none" 
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)
const toggleExpand = () => isExpanded.value = !isExpanded.value
</script>

<style scoped>
.slide-up-handle-wrapper {
  bottom: 0;
  width: 380px;
  height: 40px;
  background-color: #794D2C;
  border: 2px solid black;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.4s ease; /* smooth movement */
  z-index: 10;
}

/* Moves up when expanded */
.slide-up-handle-wrapper.expanded {
  transform: translateY(-600px);
}

/* Chevron arrow rotation */
.chevron-icon {
  width: 75px;
  height: 20px;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg); /* arrow points down when moved up */
}
</style>
