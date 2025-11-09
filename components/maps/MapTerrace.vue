<template>
  <div>
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

    <div class="group">
      <div class="text-wrapper-2">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div>

    <LayoutHeader class="layout-header-instance" label="terrace" />
  </div>
</template>

<script setup>
import TableA from '../tables/TableA.vue'
import TableE from '../tables/TableE.vue'
import Plant from '../Plant.vue'
import LayoutHeader from '../LayoutHeader.vue'

defineProps({
  selectedTable: String
})

defineEmits(['selectTable'])
</script>

<style scoped>
/* Intentionally empty — layout styles live in BarMap.vue */
</style>
