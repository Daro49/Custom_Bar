<template>
  <div class="slide-up-handle" @click="$emit('toggle')">
    <svg 
      class="chevron-icon" 
      :class="{ rotated: expanded }"
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
defineProps({
  expanded: Boolean
})
defineEmits(['toggle'])
</script>

<style scoped>
.slide-up-handle {
  width: 80%;
  height: 40px;
  background-color: #552808;
  border: 2px solid black;
  border-radius: 20px 20px 0 0;
  border-bottom: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
}

.chevron-icon {
  width: 75px;
  height: 20px;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}
</style>
