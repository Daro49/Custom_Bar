<!--
*
* File:     MapGarden.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vutbr.cz)
* This component renders the Garden map layout with tables and navigation buttons.
* It emits events for table selection and map navigation.
*
-->
<template>
  <div class="table-d-layout">
    <div class="garden" v-html="Garden"></div>

    <div class="out-tables-2">
      <TableB class="table-b-instance" label="G1" :textRotation="90" :selected="selectedTable === 'G1'" @select="$emit('selectTable', $event)"/>
      <TableB class="table-b-instance" label="G2" :textRotation="90" :selected="selectedTable === 'G2'" @select="$emit('selectTable', $event)"/>
      <TableB class="table-b-instance" label="G3" :textRotation="90" :selected="selectedTable === 'G3'" @select="$emit('selectTable', $event)"/>
      <TableB class="table-b-instance" label="G4" :textRotation="90" :selected="selectedTable === 'G4'" @select="$emit('selectTable', $event)"/>
      <TableB class="table-b-instance" label="G5" :textRotation="90" :selected="selectedTable === 'G5'" @select="$emit('selectTable', $event)"/>
      <TableB class="table-b-instance" label="G6" :textRotation="90":selected="selectedTable === 'G6'" @select="$emit('selectTable', $event)"/>
    </div>

    <div class="group" @click="$emit('navigate', 'back'); $emit('close')" style="cursor: pointer;">
      <img class="entry" alt="Entry" src="../../assets/Entry.png" style="transform: rotate(180deg);"/>
      <div class="text-wrapper-2">BACK</div>
    </div>
  </div>
</template>

<script setup>
/**
 * Emits when a table is selected.
 * @event selectTable
 * @param {string} label - The label of the selected table.
 *
 * Emits when navigation to another map is requested.
 * @event navigate
 * @param {string} map - The target map name.
 *
 * Emits when the map panel should be closed.
 * @event close
 */
import TableB from '../tables/TableB.vue';
import Garden from '../../assets/garden.svg?raw';
import { useTableStore } from '@/stores/tableStore';

const tableStore = useTableStore();

defineProps({
  selectedTable: String
})

defineEmits(['selectTable', 'navigate', 'close'])

</script>

<style scoped>
.table-d-layout {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 917px;
  width: 70%;
}
@media (max-width: 768px) {
  .table-d-layout {
    width: 100%;
  }
}

.table-d-layout .out-tables-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin-top: 10px;
}

.table-d-layout .out-tables-2 > * {
  margin: -20px 0;
}

.table-d-layout .table-b-instance {
  transform: rotate(-90deg) scale(120%);
}

.table-d-layout .garden {
  height: 80%;
  transform: scale(110%) translateY(30px);
}

.table-d-layout .group {
  position: absolute;
  left: 40px;
  bottom: 50px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
</style>

