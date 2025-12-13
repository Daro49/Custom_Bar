<template>
  <div class="table-a-layout">
    <div class="out-tables-1">
      <TableA class="table-a-instance" label="T2" :selected="selectedTable === 'T2'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="T3" :selected="selectedTable === 'T3'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="T4" :selected="selectedTable === 'T4'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="T5" :selected="selectedTable === 'T5'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="T6" :selected="selectedTable === 'T6'" @select="$emit('selectTable', $event)" />
    </div>

    <div class="out-tables-2">
      <TableE class="table-e-instance" label="T1" :selected="selectedTable === 'T1'" @select="$emit('selectTable', $event)" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" />
      <TableE class="table-e-instance" label="T7" :selected="selectedTable === 'T7'" @select="$emit('selectTable', $event)" />
    </div>

    <div class="group" @click="$emit('navigate', 'entry'); $emit('close')" style="cursor: pointer;">
      <div class="text-wrapper">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div>
  </div>
</template>

<script setup>
import TableA from '../tables/TableA.vue'
import TableE from '../tables/TableE.vue'
import Plant from '../Plant.vue'

defineProps({
  selectedTable: String
})

defineEmits(['selectTable', 'navigate', 'close'])
</script>

<style scoped>
.table-a-layout {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 917px;
  width: 70%;
}
@media (max-width: 768px) {
  .table-a-layout {
    width: 100%;
  }
}

.table-a-layout .table-e-instance {
  left: unset;
  position: relative;
  top: unset;
}

.table-a-layout .table-a-instance {
  transform: rotate(-45deg);
}

.table-a-layout .plant-instance {
  align-items: unset;
  display: unset;
  height: 95.96px;
  left: unset;
  min-width: unset;
  top: unset;
  width: 96.23px;
}

.table-a-layout .text-wrapper {
  color: #000000;
  font-family: "Josefin Slab-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  height: 16px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
  width: 55px;
}

.table-a-layout .out-tables-1 {
  display: flex;
  flex-direction: column;
  height: 90%;
  justify-content: space-between;
  width: 115px;
  margin-top: 30px;
  margin-bottom: 150px;
}

.table-a-layout .out-tables-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 87%;
  margin-top: 30px;
  margin-bottom: 150px;
}

.table-a-layout .group {
  position: absolute;
  right: 80px;
  top: 49%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
</style>
