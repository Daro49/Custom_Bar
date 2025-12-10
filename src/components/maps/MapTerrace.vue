<template>
  <div class="table-layout-a">
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
      <div class="text-wrapper-2">ENTRY</div>
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
  .table-layout-a {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 917px;
    width: 70%;
  }

.table-layout-a .table-e-instance {
  left: unset;
  position: relative;
  top: unset;
}

.table-layout-a .table-a-instance {
  transform: rotate(-45deg);
}

.table-layout-a .plant-instance {
  align-items: unset;
  display: unset;
  height: 95.96px;
  left: unset;
  min-width: unset;
  top: unset;
  width: 96.23px;
}

.table-layout-a .text-wrapper-2 {
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

.table-layout-a .out-tables-1 {
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
  width: 115px;
  margin-top: 50px;
  margin-bottom: 150px;
}

.table-layout-a .out-tables-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 80%;
  margin-top: 50px;
  margin-bottom: 150px;
}

.table-layout-a .group {
  position: absolute;
  right: 110px;
  top: 47%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}
</style>
