<template>
  <div class="table-c-layout">
    <div class="out-tables-1">
      <TableD class="table-d-instance" label="B5" :textRotation="90" :selected="selectedTable === 'B5'"
        @select="$emit('selectTable', $event)" /><br><br><br><br><br>
      <TableD class="table-d-instance" label="B4" :textRotation="90" :selected="selectedTable === 'B4'"
        @select="$emit('selectTable', $event)" /><br><br><br><br><br>
      <TableD class="table-d-instance" label="B3" :textRotation="90" :selected="selectedTable === 'B3'"
        @select="$emit('selectTable', $event)" /><br>><br><br>

      <div class="bottom-cluster">
        <div class="b2-wrap">
          <TableC class="table-c-instance" label="B2" :selected="selectedTable === 'B2'"
            @select="$emit('selectTable', $event)" />
        </div>
        <div class="b1-wrap">
          <TableC class="table-c-instance" label="B1" :textRotation="90" layoutDirection="row"
            :selected="selectedTable === 'B1'" @select="$emit('selectTable', $event)" />
        </div>
        <div class="plant">
          <Plant class="plant-instance" overlapGroupClassName="plant-2" prop="normal" />
        </div>
      </div>
    </div>

    <div class="out-tables-2">
      <div class="b7-wrap">
        <TableB class="table-b-instance" label="B6" :selected="selectedTable === 'B6'"
          @select="$emit('selectTable', $event)" />
      </div>
      <div class="b8-wrap">
        <TableB class="table-b-instance" label="B7" :selected="selectedTable === 'B7'"
          @select="$emit('selectTable', $event)" />
      </div>
      <div class="b9-wrap">
        <TableB class="table-b-instance" label="B8" :selected="selectedTable === 'B8'"
          @select="$emit('selectTable', $event)" />
      </div>
    </div>

    <div class="group-rest">
      <img class="entry" alt="Entry" src="../../assets/Entry.png" style="transform: rotate(-90deg);" />
      <div class="text-wrapper">RESTROOMS</div>
    </div>

    <div class="group-map1" @click="$emit('navigate', 'garden'); $emit('close')" style="cursor: pointer;">
      <div class="text-wrapper">GARDEN</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div>

    <div class="group-map2" @click="$emit('navigate', 'entry'); $emit('close')" style="cursor: pointer;">
      <div class="text-wrapper">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div>
  </div>
</template>

<script setup>
import TableD from '../tables/TableD.vue'
import TableB from '../tables/TableB.vue'
import TableC from '../tables/TableC.vue'
import Plant from '../Plant.vue'
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/tableStore';

const tableStore = useTableStore();
defineProps({
  selectedTable: String
})

defineEmits(['selectTable', 'navigate', 'close'])

onMounted(() => {
  tableStore.fetchInitialTables();
});
</script>

<style scoped>
.table-c-layout {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 917px;
  width: 70%;
}

@media (max-width: 768px) {
  .table-c-layout {
    width: 100%;
  }
}

.table-c-layout .table-b-instance {
  transform: scale(120%);
}

.table-c-layout .table-d-instance {
  transform: rotate(-90deg) scale(140%);
}

.table-c-layout .out-tables-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 90%;
  margin-top: 80px;
  margin-bottom: 150px;
}

.table-c-layout .out-tables-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 65%;
  margin-top: 30px;
}

.table-c-layout .group-rest {
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.table-c-layout .group-map1 {
  position: absolute;
  bottom: 190px;
  right: -12px;
  transform: translateX(-38%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.table-c-layout .group-map2 {
  position: absolute;
  bottom: 60px;
  right: -12px;
  transform: translateX(-45%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.table-c-layout .text-wrapper {
  color: #000000;
  font-family: "Josefin Slab-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  height: 25px;
  letter-spacing: 0;
}

.table-c-layout .bottom-cluster {
  transform: translateX(-38px);
}

.table-c-layout .b2-wrap {
  transform: translateY(10px);
}

.table-c-layout .b1-wrap {
  transform: rotate(-90deg) translateY(140px);
}

.table-c-layout .group-map1 .text-wrapper {
  margin-top: 7px;
}

.table-c-layout .group-map2 .text-wrapper {
  margin-top: 7px;
}

.table-c-instance {
  transform: scale(1.3);
}

.plant {
  position: absolute;
  bottom: 10px;
  transform: translateX(-30%);
}
</style>
