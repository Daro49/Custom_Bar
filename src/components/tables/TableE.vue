<template>
  <div class="table-e" :class="{ active: selected }">
    <div class="seat horizontal top" @click.stop="$emit('select', label)"></div>

    <div class="side-seats left">
      <div class="seat vertical" v-for="i in 5" :key="`left-seat-${i}`" @click.stop="$emit('select', label)"></div>
    </div>

    <div class="main-table" @click.stop="$emit('select', label)">
      <span class="table-label">{{ label }}</span>
    </div>

    <div class="seat horizontal bottom" @click.stop="$emit('select', label)"></div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  label: {
    type: String,
    default: 'T1'
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
.table-e {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  gap: 10px;
  align-items: center;
  justify-items: center;

  width: 80px;
  height: 225px;
  padding: 15px;
  box-sizing: border-box;
  cursor: default;
  transition: filter 0.2s ease, background-color 0.2s ease;
}

.seat.horizontal.top {
  grid-column: 2;
  grid-row: 1;
}
.seat.horizontal.bottom {
  grid-column: 2;
  grid-row: 3;
}
.main-table {
  grid-column: 2;
  grid-row: 2;
  width: 47px;
  height: 194px;
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}

.side-seats.left {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  text-transform: uppercase;
}

.seat {
  background-color: v-bind(seatColor);
  border: 1px solid black;
  border-radius: 10px;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
}
.seat.horizontal {
  width: 30px;
  height: 10.5px;
}
.seat.vertical {
  width: 10.5px;
  height: 30px;
}

.table-e.active .main-table,
.table-e.active .seat {
  background-color: #513C2C;
}
.main-table:hover,
.seat:hover {
  filter: brightness(1.1);
}

.main-table,
.seat {
  cursor: pointer;
}
</style>
