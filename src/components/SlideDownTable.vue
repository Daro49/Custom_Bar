<!--
*
* File:     SlideDownTable.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vutbr.cz)
* SlideDownTable component displays navigation buttons for switching between maps.
* Emits navigation and close events when a button is clicked.
*
* @prop {String} currentMap - The currently active map.
* @event navigate - Emitted with the target map name.
* @event close - Emitted to close the panel.
*
-->
<template>
  <div class="slide-up-content">
    <div class="button-container">
      <button
        class="nav-button"
        :class="{ active: currentMap === 'terrace' }"
        @click="$emit('navigate', 'terrace'); $emit('close')"
      >
        TERRACE
      </button>
      <button
        class="nav-button"
        :class="{ active: currentMap === 'entry' }"
        @click="$emit('navigate', 'entry'); $emit('close')"
      >
        ENTRY
      </button>
      <button
        class="nav-button"
        :class="{ active: currentMap === 'back' }"
        @click="$emit('navigate', 'back'); $emit('close')"
      >
        BACK
      </button>
      <button
        class="nav-button"
        :class="{ active: currentMap === 'garden' }"
        @click="$emit('navigate', 'garden'); $emit('close')"
      >
        GARDEN
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['navigate', 'close'])

defineProps({
  currentMap: {
    type: String,
    default: 'terrace'
  }
})
</script>

<style scoped>
.slide-up-content {
  width: 80%;
  height: 567px;
  background-color: #552808;
  border: 2px solid black;
  border-radius: 0;
  border-top: none;
  padding: 40px 15px;
  color: white;
  overflow-y: auto;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding: 0;
}

.nav-button {
  width: 90%;
  height: 89px;
  background-color: #D4AF37;
  border: 2px solid black;
  border-radius: 25px;
  color: black;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.22s ease, background-color 0.2s ease;
  box-sizing: border-box;
}

.nav-button:hover {
  transform: translateY(-3px);
  background-color: #c49f32;
}

.nav-button.active {
  background: linear-gradient(to bottom, #017579 0%, #013C3E 100%);
  color: black;
}
</style>