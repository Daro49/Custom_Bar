<template>
  <div 
    class="slide-panel-wrapper"
    :class="{ 'is-open': isExpanded }" 
  >
    <SlideUpTable 
      class="handle-panel" 
      :class="{ rotated: isExpanded }" 
      :expanded="isExpanded"
      @toggle="toggleExpand" 
    />
    <SlideDownTable
      class="expanded-panel"
      :currentMap="currentMap"
      @navigate="$emit('navigate', $event)"
      @close="toggleExpand"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['navigate'])
defineProps({
  currentMap: {
    type: String,
    default: 'terrace'
  }
})
import SlideUpTable from './SlideUpTable.vue'
import SlideDownTable from './SlideDownTable.vue'

const isExpanded = ref(false)
const toggleExpand = () => (isExpanded.value = !isExpanded.value)
</script>

<style scoped>
.slide-panel-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  width: 100%; 
  height: 607px;
  box-sizing: border-box;
  pointer-events: none;
  position: fixed; 
  bottom: 0; 
  left: 0; 
  transform: translateY(567px); 
  transition: transform 0.4s ease; 
}

.slide-panel-wrapper.is-open {
  transform: translateY(0); 
}

.expanded-panel {
  width: 80%;
  height: 567px;
  pointer-events: auto;
}

.handle-panel {
  z-index: 101;
  pointer-events: auto;
  width: 80%; 
}
</style>