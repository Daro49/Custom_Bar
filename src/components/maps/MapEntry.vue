<template>
  <div class="table-b-layout">
    <div class="out-tables-1">
      <br><br>
      <TableD class="table-d-instance" label="E1" :textRotation="90" :selected="selectedTable === 'E1'" @select="$emit('selectTable', $event)" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" />
      <TableD class="table-d-instance" label="E2" :textRotation="90" :selected="selectedTable === 'E2'" @select="$emit('selectTable', $event)" />
      <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" />
      <TableD class="table-d-instance" label="E3" :textRotation="90" :selected="selectedTable === 'E3'" @select="$emit('selectTable', $event)" /> <br> <br> <br>
      <TableA class="table-a-instance" label="E4" :textRotation="45" :selected="selectedTable === 'E4'" @select="$emit('selectTable', $event)" />
    </div>

    <div class="out-tables-2">
      <div class="bar-instance" v-html="Bar"></div> <br> <br>
      <TableD class="table-d-instance" label="E8" :textRotation="90" :selected="selectedTable === 'E8'" @select="$emit('selectTable', $event)" />
      <br>
      <TableD class="table-d-instance" label="E7" :textRotation="90" :selected="selectedTable === 'E7'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="E6" :textRotation="45" :selected="selectedTable === 'E6'" @select="$emit('selectTable', $event)" />
      <TableA class="table-a-instance" label="E5" :textRotation="45" :selected="selectedTable === 'E5'" @select="$emit('selectTable', $event)" />
    </div>

    <div class="group" @click="$emit('navigate', 'terrace'); $emit('close')" style="cursor: pointer;">
      <div class="text-wrapper">TERRACE</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" style="transform: rotate(90deg);"/>
    </div>

    <div class="group2" @click="$emit('navigate', 'back'); $emit('close')" style="cursor: pointer;">
      <img class="entry" alt="Entry" src="../../assets/Entry.png" style="transform: rotate(180deg);"/>
      <div class="text-wrapper">BACK</div>
    </div>
  </div>
</template>

<script setup>
import TableA from '../tables/TableA.vue'
import TableD from '../tables/TableD.vue'
import Plant from '../Plant.vue'
import Bar from '@/assets/bar.svg?raw';

defineProps({
  selectedTable: String
})

defineEmits(['selectTable', 'navigate', 'close'])
</script>

<style scoped>
.table-b-layout {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 917px;
  width: 70%;
}
@media (max-width: 768px) {
  .table-b-layout {
    width: 100%;
  }
}

.table-b-layout .table-a-instance {
  transform : rotate(-45deg) translateX(-30px);
}

.table-b-layout .table-d-instance {
  transform: rotate(-90deg) scale(120%);
}

.table-b-layout .bar-instance {
  width: 100px;
  height: 50px;
  transform: translateX(-20px);
}

.table-b-layout .out-tables-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 80%;
  margin-top: 85px;
}
.table-b-layout .out-tables-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 90%;
  margin-top: 10px;
}

.table-b-layout .group {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.table-b-layout .group2 {
  position: absolute;
  top: 20px;
  left: 60px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.table-b-layout .text-wrapper {
  color: #000000;
  font-family: "Josefin Slab-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  height: 25px;
  letter-spacing: 0;
}

.table-b-layout .group2 .text-wrapper {
  margin-top: 8px;
}
</style>
