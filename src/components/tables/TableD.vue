<template>
  <div class="table-d-component" :class="{ active: selected }" @click.stop="$emit('select', label)">
    <div class="layout">
      <!-- Left couch -->
      <div class="couch-wrapper left">
        <img :src="selected ? couchActiveSvg : couchSvg" alt="couch" class="couch" />
      </div>
      
      <!-- Center table -->
      <div class="main-table">
        <span class="table-label">{{ label }}</span>
      </div>
      
      <!-- Right couch (flipped) -->
      <div class="couch-wrapper right">
        <img :src="selected ? couchActiveSvg : couchSvg" alt="couch" class="couch" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import couchSvg from '../../assets/couch.svg'
import couchActiveSvg from '../../assets/couchActive.svg'

const emit = defineEmits(['select'])

const props = defineProps({
  label: { type: String, default: 'T1' },
  tableColor: { type: String, default: '#552808' },
  seatColor: { type: String, default: '#552808' },
  selected: { type: Boolean, default: false }
})
</script>

<style scoped>
.table-d-component {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
}

.layout {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}

.couch-wrapper {
  width: 45px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.couch-wrapper.left {
  transform: scaleX(1);
}

.couch-wrapper.right {
  transform: scaleX(-1);
}

.couch {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: hue-rotate(0deg) brightness(1);
}

.main-table {
  width: 45px;
  height: 80px;
  background-color: v-bind(tableColor);
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-label {
  font-family: "Georgia","Times New Roman", serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: black;
}

.table-d-component.active .main-table {
  background-color: #513C2C !important;
  border-color: #000 !important;
}

.table-d-component:hover {
  filter: brightness(1.05);
}
</style>
