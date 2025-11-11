<template>
  <div>
    <div class="out-tables-1">
      <!-- left column: mixed sofas (TableD) and rotate for variety -->
      <TableD class="table-d-instance" label="E1" :selected="selectedTable === 'E1'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="E2" :selected="selectedTable === 'E2'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="E3" :selected="selectedTable === 'E3'" @select="$emit('selectTable', $event)" />
    </div>

    <div class="out-tables-2">
      <!-- right column: bar seating and rectangular groups -->
      <TableC class="table-c-instance" label="E6" :selected="selectedTable === 'E6'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="E7" :selected="selectedTable === 'E7'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="E8" :selected="selectedTable === 'E8'" @select="$emit('selectTable', $event)" />
    </div>

    <!-- <div class="group">
      <div class="text-wrapper-2">TERRACE</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div> -->
    <LayoutHeader class="layout-header-instance" label="entry" />
  </div>
</template>

<script setup>
import TableD from '../tables/TableD.vue'
import TableC from '../tables/TableC.vue'
import Plant from '../Plant.vue'
import LayoutHeader from '../LayoutHeader.vue'

defineProps({
  selectedTable: String
})

defineEmits(['selectTable'])
</script>

<style scoped>
/* placeholder; layout styles are in BarMap.vue */
</style>
