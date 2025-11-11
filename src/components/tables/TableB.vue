<template>
  <div class="table-b-component" :class="{ active: selected }">
    <div class="top-seat" @click.stop="$emit('select', label)"></div>

    <div class="middle">
      <div class="side-seats left">
        <div v-for="i in 3" :key="`l-${i}`" class="seat" @click.stop="$emit('select', label)"></div>
      </div>

      <div class="main-table" @click.stop="$emit('select', label)">
        <span class="table-label">{{ label }}</span>
      </div>

      <div class="side-seats right">
        <div v-for="i in 3" :key="`r-${i}`" class="seat" @click.stop="$emit('select', label)"></div>
      </div>
    </div>

    <div class="bottom-seat" @click.stop="$emit('select', label)"></div>
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
.table-b-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 80px; /* overall group width per design */
  padding: 6px;
  box-sizing: border-box;
}
.middle { display:flex; gap: 6px; align-items:center }
.main-table {
  width: 47px; /* approx 47.06 */
  height: 117px; /* approx 117.32 */
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 14px;
  display:flex; align-items:center; justify-content:center;
}
.side-seats { display:flex; flex-direction:column; gap: 8px }
.seat { width: 11px; height: 29px; background-color: v-bind(seatColor); border: 1px solid black; border-radius: 8px }
.top-seat, .bottom-seat { width: 29px; height: 12px; background-color: v-bind(seatColor); border:1px solid black; border-radius: 12px }
.table-label { font-family: "Georgia","Times New Roman", serif; font-size: 1.2rem; font-weight:700; color: black }
.table-b-component.active .main-table, .table-b-component.active .seat, .table-b-component.active .top-seat, .table-b-component.active .bottom-seat { 
  background-color: #513C2C !important;
  transform: scale(1.02);
}
.main-table:hover, .seat:hover, .top-seat:hover, .bottom-seat:hover { 
  filter: brightness(1.05); 
  cursor: pointer 
}
</style>
