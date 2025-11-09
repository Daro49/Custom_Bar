<template>
  <div class="table-c-component" :class="{ active: selected }">
    <div class="main-table" @click.stop="$emit('select', label)">
      <span class="table-label">{{ label }}</span>
    </div>

    <div class="seats">
      <div v-for="n in 5" :key="`seat-${n}`" class="seat" @click.stop="$emit('select', label)"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  label: { type: String, default: 'T1' },
  tableColor: { type: String, default: '#552808' },
  seatColor: { type: String, default: '#552808' },
  selected: { type: Boolean, default: false }
})
</script>

<style scoped>

.table-c-component {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 50px; /* container roughly 50px wide per design */
  padding: 6px;
  box-sizing: border-box;
  cursor: default;
}

.main-table {
  width: 27px; /* approx 27px */
  height: 135px; /* approx 135px */
  background-color: v-bind(tableColor);
  border: 2px solid black;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seat {
  width: 20px;
  height: 20px;
  background-color: v-bind(seatColor);
  border: 2px solid black;
  border-radius: 50%;
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.6rem;
  font-weight: bold;
  color: black;
}

.table-c-component.active .main-table,
.table-c-component.active .seat {
  background-color: #513C2C !important;
}

.main-table:hover, .seat:hover { filter: brightness(1.05); cursor: pointer }
</style>
