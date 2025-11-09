<template>
  <div class="table-a-component" @click="toggleActive" :class="{ active: isActive }">
    <div class="seat top"></div>

    <div class="main-table">
      <span class="table-label">{{ label }}</span>
    </div>

    <div class="seat left"></div>
    <div class="seat right"></div>

    <div class="seat bottom"></div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: 'T2'
  },
  tableColor: {
    type: String,
    default: '#794D2C'
  },
  seatColor: {
    type: String,
    default: '#794D2C'
  }
})

// ✅ Reactive state for gray toggle
const isActive = ref(false)

function toggleActive() {
  isActive.value = !isActive.value
}
</script>

<style scoped>
.table-a-component {
  display: grid;
  grid-template-columns: auto 1fr auto; 
  grid-template-rows: auto 1fr auto; 
  gap: 5px;
  align-items: center; 
  justify-items: center;

  width: 110px; 
  height: 110px; 
  padding: 10px;
  box-sizing: border-box;
  overflow: visible;
  cursor: pointer; /* indicate clickability */
  transition: filter 0.2s ease, background-color 0.2s ease;
}

/* Assign grid areas */
.seat.top {
  grid-column: 2; /* Center column */
  grid-row: 1; /* Top row */
  width: 43px;
  height: 10px;
}
.main-table {
  grid-column: 2;
  grid-row: 2;
  width: 81.5px;
  height: 81.5px;
  background-color: v-bind(tableColor);
  border: 2px solid black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}
.seat.left {
  grid-column: 1; /* Left column */
  grid-row: 2; /* Middle row */
  width: 10px;
  height: 43px;
}
.seat.right {
  grid-column: 3; /* Right column */
  grid-row: 2; /* Middle row */
  width: 10px;
  height: 43px;
}
.seat.bottom {
  grid-column: 2; /* Center column */
  grid-row: 3; /* Bottom row */
  width: 43px;
  height: 10px;
}

.seat {
  background-color: v-bind(seatColor);
  border: 2px solid black;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

/* 👇 When active, everything turns gray */
.table-a-component.active .main-table,
.table-a-component.active .seat {
  background-color: gray !important;
}

/* Optional hover effect */
.table-a-component:hover {
  filter: brightness(1.1);
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}
</style>