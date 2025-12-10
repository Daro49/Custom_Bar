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

    <!-- <div class="group" @click="$emit('navigate', 'entry'); $emit('close')" style="cursor: pointer;">
      <div class="text-wrapper-2">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div> -->
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 917px;
    width: 70%;
    /* border: 1px solid;
    border-color: #000000; */
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

.table-layout-a .group {
  display: flex;
  gap: 8px;
  height: 16px;
  left: 274px;
  position: absolute;
  top: 468px;
  width: 115px;
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
  height: 760px;
  justify-content: space-between;
  width: 115px;
}

.table-layout-a .out-tables-2 {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 760px;
  justify-content: space-between;
  padding: 0px -20px;
  width: 100px;
}
</style>
