<template>
  <div class="table-layout-a">
  <SlidePanel class="slide-up-table-layout" :currentMap="currentMap" @navigate="switchMap" @close="closeSlidePanel" />
  <LayoutHeader class="layout-header-instance" label="bar" @back="goToPreviousMap" />
    <component :is="mapComponents[currentMap]" :selectedTable="selectedTable" @selectTable="selectTable" @navigate="switchMap" @close="closeSlidePanel" />
  </div>
</template>

<script>
import SlidePanel from '../components/SlidePanel.vue';
import TableE from '../components/tables/TableE.vue';
import Plant from '../components/Plant.vue';
import LayoutHeader from '../components/LayoutHeader.vue';
import TableA from '../components/tables/TableA.vue'
import MapTerrace from '../components/maps/MapTerrace.vue'
import MapEntry from '../components/maps/MapEntry.vue'
import MapBack from '../components/maps/MapBack.vue'
import MapGarden from '../components/maps/MapGarden.vue'
import { activeUser } from '@/stores/Login.js'

export default {
  name: "TableLayoutA",
  data() {
    return {
      selectedTable: null,
      currentMap: 'terrace',
      previousMap: 'terrace'
    }
  },
  methods: {
    async selectTable(label) {
      this.selectedTable = this.selectedTable === label ? null : label
      activeUser.value.table = this.selectedTable
      // Send POST request to server when table is selected
      if (this.selectedTable) {
        try {
          const username = activeUser.value.username
          console.log('Sending table select request for:', label)
          const response = await fetch('https://itu-wb12.onrender.com/users/' + username + '/table/select', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableCode: label })
          })
          
          console.log('Response status:', response.status)
          const data = await response.json()
          console.log('Response data:', data)
          
          if (!response.ok) {
            console.error('Failed to select table:', data)
          } else {
            console.log('Table selected:', data)
          }
        } catch (error) {
          console.error('Error selecting table:', error)
        }
      }
    },
    switchMap(name) {
      if (['terrace', 'entry', 'back', 'garden'].includes(name)) {
        this.previousMap = this.currentMap
        this.currentMap = name
      }
    },
    goToPreviousMap() {
      const temp = this.currentMap
      this.currentMap = this.previousMap
      this.previousMap = temp
    },
    closeSlidePanel() {
    }
  },
  computed: {
    mapComponents() {
      return {
        terrace: MapTerrace,
        entry: MapEntry,
        back: MapBack,
        garden: MapGarden
      }
    }
  },
  components: {
    SlidePanel,
    TableE,
    Plant,
    LayoutHeader,
    TableA,
    MapTerrace,
    MapEntry,
    MapBack,
    MapGarden
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
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
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

.table-layout-a .layout-header-instance {
  left: 0;
  position: absolute;
  top: 0;
}
</style>