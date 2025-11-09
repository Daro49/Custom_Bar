<template>
  <div class="table-layout-a">
    <SlideUpTable
      class="slide-up-table-layout"
      vectorClassName="slide-up-table-instance"
    />
    <div class="out-tables-1">
      <TableA
        class="table-a-instance"
        label="T2"
      />
      <TableA
        class="table-a-instance"
        label="T3"
      />
      <TableA
        class="table-a-instance"
        label="T4"
      />
      <TableA
        class="table-a-instance"
        label="T5"
      />
      <TableA
        class="table-a-instance"
        label="T6"
      />

    </div>

    <div class="out-tables-2">
      <TableE
        class="table-e-instance"
        label="T1"
      />
      <Plant
        class="plant-instance"
        overlapGroupClassName="plant-2"
        prop="normal"
      />
      <Plant
        class="plant-instance"
        overlapGroupClassName="plant-2"
        prop="normal"
      />
      <TableE
        class="table-e-instance"
        label="T7"
      />
    </div>

    <div class="group">
      <div class="text-wrapper-2">ENTRY</div>
      <img class="entry" alt="Entry" src="../../assets/Entry.png" />
    </div>

    <LayoutHeader
      class="layout-header-instance"
      label="terrace"
    />
  </div>
</template>

<script>
import SlideUpTable from '../../components/SlideUpTable.vue';
import PropertyDefault from '../../components/PropertyDefault.vue';
import TableE from '../../components/TableE.vue';
import Plant from '../../components/Plant.vue';
import LayoutHeader from '../../components/LayoutHeader.vue';
import TableA from '../../components/TableA.vue'

export default {
  name: "TableLayoutA",
  components: {
    SlideUpTable,
    PropertyDefault,
    TableE,
    Plant,
    LayoutHeader,
    TableA
  }
};
</script>

<style>
.table-layout-a {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ), linear-gradient(0deg, rgba(13, 86, 75, 1) 0%, rgba(13, 86, 75, 1) 100%);
  background-color: var(--green);
  border: 1px solid;
  border-color: #000000;
  height: 917px;
  position: relative;
  width: 412px;
}

.table-layout-a .slide-up-table-layout {
  left: 16px !important;
  position: absolute !important;
  top: 877px !important;
}

.table-layout-a .out-tables-1 {
  display: flex;
  flex-direction: column;
  height: 760px;
  justify-content: space-between;
  left: 5px;
  position: absolute;
  top: 95px;
  width: 115px;
}

.table-layout-a .out-tables-2 {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 760px;
  justify-content: space-between;
  left: 290px;
  padding: 0px -20px;
  position: absolute;
  top: 76px;
  width: 100px;
}

.table-layout-a .table-e-instance {
  left: unset !important;
  position: relative !important;
  top: unset !important;
}

.table-layout-a .table-a-instance {
  transform: rotate(-45deg);
}

.table-layout-a .plant-instance {
  align-items: unset !important;
  display: unset !important;
  height: 95.96px !important;
  left: unset !important;
  min-width: unset !important;
  top: unset !important;
  width: 96.23px !important;
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

.table-layout-a .layout-header-instance {
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
}
</style>