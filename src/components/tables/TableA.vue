<template>
  <div class="table-a-component" :class="{ active: selected }">
    <div class="seat top" @click.stop="$emit('select', label)"></div>

    <div class="main-table" @click.stop="$emit('select', label)">
      <span class="table-label">{{ label }}</span>
    </div>

    <div class="seat left" @click.stop="$emit('select', label)"></div>
    <div class="seat right" @click.stop="$emit('select', label)"></div>

    <div class="seat bottom" @click.stop="$emit('select', label)"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  label: {
    type: String,
    default: 'T2'
  },
  tableColor: {
    type: String,
   default: '#552808'
  },
  seatColor: {
    type: String,
   default: '#552808'
  }
  ,
  selected: {
    type: Boolean,
    default: false
  }
})

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
  cursor: default;
  transition: filter 0.2s ease, background-color 0.2s ease;
}
.seat.top {
  grid-column: 2;
  grid-row: 1;
  width: 43px;
  height: 10px;
}
.main-table {
  grid-column: 2;
  grid-row: 2;
  width: 81.5px;
  height: 81.5px;
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}
.seat.left {
  grid-column: 1;
  grid-row: 2;
  width: 10px;
  height: 43px;
}
.seat.right {
  grid-column: 3;
  grid-row: 2;
  width: 10px;
  height: 43px;
}
.seat.bottom {
  grid-column: 2;
  grid-row: 3;
  width: 43px;
  height: 10px;
}

.seat {
  background-color: v-bind(seatColor);
  border: 1px solid black;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.main-table,
.seat {
  cursor: pointer;
}

.table-a-component.active .main-table,
.table-a-component.active .seat {
  background-color: #513C2C !important;
}
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
