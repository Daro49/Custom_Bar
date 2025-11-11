<template>
  <div>
    <div class="out-tables-1" style="display:flex; flex-direction:column; gap:0">
      <!-- left: decorative plants down the side -->
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" style="margin:-10px 0" />
    </div>

    <div class="out-tables-2" style="display:flex; flex-direction:column; gap:0">
      <TableB class="table-b-instance" label="G1" :selected="selectedTable === 'G1'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
      <TableB class="table-b-instance" label="G2" :selected="selectedTable === 'G2'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
      <TableB class="table-b-instance" label="G3" :selected="selectedTable === 'G3'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
      <TableB class="table-b-instance" label="G4" :selected="selectedTable === 'G4'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
      <TableB class="table-b-instance" label="G5" :selected="selectedTable === 'G5'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
      <TableB class="table-b-instance" label="G6" :selected="selectedTable === 'G6'" @select="$emit('selectTable', $event)"  style="margin:-30px 0"/>
    </div>

    <!-- <div class="group">
      <div class="text-wrapper-2">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div> -->

    <LayoutHeader class="layout-header-instance" label="garden" />
  </div>
</template>

<script setup>
import TableB from '../tables/TableB.vue'
import Plant from '../Plant.vue'
import LayoutHeader from '../LayoutHeader.vue'

defineProps({
  selectedTable: String
})

defineEmits(['selectTable'])
</script>

<style scoped>
.out-tables-1 {
  margin-top: -20px;
  margin-left: -25px;
  margin-bottom: 10px;
}

.out-tables-2 {
  margin-top: 10px;
  margin-left: -30px;
  margin-right: 30px;
  margin-bottom: 10px;
}
.table-b-instance {
  transform: rotate(-90deg);
}
</style>
