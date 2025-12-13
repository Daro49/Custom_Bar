<template>
  <div class="slide-panel-wrapper">
    <Transition name="expand">
        <SlideDownTable
          v-show="isExpanded"
          class="expanded-panel"
          :currentMap="currentMap"
          @navigate="$emit('navigate', $event)"
          @close="toggleExpand"
        />
      </Transition>
    <SlideUpTable 
      class="handle-panel" 
      :class="{ rotated: isExpanded }" 
      :expanded="isExpanded"
      @toggle="toggleExpand" 
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
  width: 90%;
  height: 607px;
  box-sizing: border-box;
  pointer-events: none;
}

.expanded-panel {
  position: absolute;
  bottom: 0;
  width: 80%;
  height: 567px;
  transform-origin: bottom;
  pointer-events: auto;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s ease;
  transform-origin: bottom;
}

.expand-enter-from,
.expand-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  transform: scaleY(1);
  opacity: 1;
}

.handle-panel {
  position: absolute;
  transition: transform 0.4s ease;
  transform: translateY(0);
  bottom: 0;
  z-index: 101;
  pointer-events: auto;
}

.handle-panel.rotated {
  transform: translateY(-567px);
}
</style>
