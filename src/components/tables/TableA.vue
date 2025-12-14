<!--
*
* File:     TableA.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vut.cz)
* TableA component represents a rectangular table with four seats.
* Displays the table label and current occupancy/capacity.
* Emits a select event when the table or seat is clicked.
*
-->
<template>
  <div class="table-a-component" :class="{ active: selected }">
    <div class="seat top" @click.stop="handleTableClick"></div>
    <div class="main-table" @click.stop="handleTableClick">
      <div class="label" :style="{ transform: 'rotate(' + textRotation + 'deg)' }">
        <span class="table-label">{{ label }}</span>
        <span class="table-label-capacity">{{ currentCapacityLabel }}</span>
      </div>
    </div>
    <div class="seat left" @click.stop="handleTableClick"></div>
    <div class="seat right" @click.stop="handleTableClick"></div>
    <div class="seat bottom" @click.stop="handleTableClick"></div>
  </div>
</template>

<script setup>
/**
 * Emits when the table is selected.
 * @event select
 * @param {string} label - The label of the selected table.
 */
import { defineProps, defineEmits, computed } from 'vue'
import { useTableStore } from '@/stores/tableStore';

const tableStore = useTableStore();
const emit = defineEmits(['select'])

const props = defineProps({
  label: {
    type: String,
    default: 'T2'
  },
  capacityLabel: {
    type: String,
    default: '0/4'
  },
  tableColor: {
    type: String,
    default: '#552808'
  },
  seatColor: {
    type: String,
    default: '#552808'
  },
  selected: {
    type: Boolean,
    default: false
  },
  textRotation: {
    type: Number,
    default: 0
  }
})

const tableData = computed(() => tableStore.getTableById(props.label));

const currentCapacityLabel = computed(() => {
  const data = tableData.value;
  if (data) {
    return `${data.occupied}/${data.capacity}`;
  }
  return props.capacityLabel;
});

const handleTableClick = () => {
  emit('select', props.label);
};
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
  background-color: #513C2C;
}

.table-a-component:hover {
  filter: brightness(1.1);
  cursor: pointer;
}

.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 1.5rem;
}

.table-label {
  font-weight: bold;
  text-transform: uppercase;
}

.table-label-capacity {
  font-weight: normal;
  margin-top: 3px;
}
</style>