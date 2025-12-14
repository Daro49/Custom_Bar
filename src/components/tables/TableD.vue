<!--
*
* File:     TableD.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vutbr.cz)
* TableD component represents a table with two couches and a main table.
* Displays the table label and current occupancy/capacity.
* Emits a select event when the table is clicked.
*
-->
<template>
  <div class="table-d-component" :class="{ active: selected }" @click.stop="handleTableClick">
    <div class="layout">
      <div class="couch-wrapper left">
        <img :src="selected ? couchActiveSvg : couchSvg" alt="couch" class="couch" />
      </div>

      <div class="main-table">
        <div class="label" :style="{ transform: 'rotate(' + textRotation + 'deg)' }">
          <span class="table-label">{{ label }}</span>
          <span class="table-label-capacity">{{ currentCapacityLabel }}</span>
        </div>
      </div>

      <div class="couch-wrapper right">
        <img :src="selected ? couchActiveSvg : couchSvg" alt="couch" class="couch" />
      </div>
    </div>
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
import couchSvg from '../../assets/couch.svg'
import couchActiveSvg from '../../assets/couchActive.svg'

const tableStore = useTableStore();
const emit = defineEmits(['select'])

const props = defineProps({
  label: { type: String, default: 'T1' },
  capacityLabel: {
    type: String,
    default: '0/4'
  },
  tableColor: { type: String, default: '#552808' },
  seatColor: { type: String, default: '#552808' },
  selected: { type: Boolean, default: false },
  textRotation: { type: Number, default: 0 }
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
  gap: 0px;
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

.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.1;
}

.table-label {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: black;
  text-transform: uppercase;
}

.table-label-capacity {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 0.65rem;
  font-weight: normal;
  color: black;
  margin-top: 1px;
}

.table-d-component.active .main-table {
  background-color: #513C2C;
  border-color: #000;
}

.table-d-component:hover {
  filter: brightness(1.05);
}
</style>