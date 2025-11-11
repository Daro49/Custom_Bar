<template>
  <div>
    <div class="out-tables-1">
      <!-- left: sofa clusters (TableD) -->
      <TableD class="table-d-instance" label="B3" :selected="selectedTable === 'B3'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="B4" :selected="selectedTable === 'B4'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="B5" :selected="selectedTable === 'B5'" @select="$emit('selectTable', $event)" />
      <TableD class="table-d-instance" label="B6" :selected="selectedTable === 'B6'" @select="$emit('selectTable', $event)" />

      <!-- bottom-left cluster (placed here so spacing puts it lower) -->
      <div class="bottom-cluster">
        <!-- B2 vertical table (TableC) -->
        <div class="b2-wrap">
          <TableC class="table-c-instance" label="B2" :selected="selectedTable === 'B2'" @select="$emit('selectTable', $event)" />
        </div>
        <!-- B1 is a rotated TableC (vertical table rotated to horizontal) -->
        <div class="b1-wrap">
          <TableC class="table-c-instance rotated" label="B1" :selected="selectedTable === 'B1'" @select="$emit('selectTable', $event)" />
        </div>
      </div>
    </div>

    <div class="out-tables-2">
      <!-- right: rectangular tables (TableB) placed with wrappers to tune vertical positions -->
      <div class="b7-wrap">
        <TableB class="table-b-instance" label="B7" :selected="selectedTable === 'B7'" @select="$emit('selectTable', $event)" />
      </div>
      <div class="b8-wrap">
        <TableB class="table-b-instance" label="B8" :selected="selectedTable === 'B8'" @select="$emit('selectTable', $event)" />
      </div>
      <div class="b9-wrap">
        <TableB class="table-b-instance" label="B9" :selected="selectedTable === 'B9'" @select="$emit('selectTable', $event)" />
      </div>
    </div>

    <!-- signs (visual helpers) --> TODO: revisit these
    <!-- <div class="restrooms" aria-hidden>
      <div class="arrow">↑</div>
      <div class="text-wrapper-2">RESTROOMS</div>
    </div> -->

    <!-- <div class="sign-right" aria-hidden>
      <div class="text-wrapper-2">GARDEN</div>
    </div> -->
    <!-- <div class="sign-entry" aria-hidden>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div> -->

    <!-- <div class="group">
      <div class="text-wrapper-2">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div> -->

    <LayoutHeader class="layout-header-instance" label="back" />
  </div>
</template>

<script setup>
import TableD from '../tables/TableD.vue'
import TableB from '../tables/TableB.vue'
import TableC from '../tables/TableC.vue'
import LayoutHeader from '../LayoutHeader.vue'

defineProps({
  selectedTable: String
})

defineEmits(['selectTable'])
</script>

<style scoped>
/* layout adjustments specific to MapBack */
.out-tables-1 {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
  padding-top: 20px;
}
.bottom-cluster {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.b1-wrap .rotated {
  transform: rotate(-90deg);
  transform-origin: center;
}
.out-tables-2 { 
  display: flex; 
  flex-direction: column;
  position: absolute;
  right: 20px;
  top: 100px;
  height: 100%;
}
.b7-wrap { margin-top: 20px; }
.b8-wrap { margin-top: 80px; }
.b9-wrap { margin-top: 100px; }

/* signs */
.restrooms {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 60px;
  display:flex; flex-direction:column; align-items:center; gap:6px; pointer-events:none;
  font-weight: 700;
  font-size: 14px;
}
.restrooms .arrow { font-size: 26px; }
.sign-right { position: absolute; right: 80px; top: 320px; pointer-events:none; font-weight: 700; font-size: 14px; }
.sign-entry { position: absolute; right: 80px; top: 380px; pointer-events:none; }

/* small tweaks so rotated tables don't overflow their wrappers */
.b1-wrap { display:flex; justify-content:center; align-items:center; height: 120px }

</style>
