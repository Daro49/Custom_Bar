<template>
  <LayoutHeader class="layout-header-instance" label="bar" @back="goToPreviousMap" />
  <div class="horizontal-center-parent">
    <SlidePanel class="slide-up-table-layout" :currentMap="currentMap" @navigate="switchMap" @close="closeSlidePanel" />
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
.horizontal-center-parent {
  display: flex;
  justify-content: center;
  width: 100%;
}

.slide-up-table-layout {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}
</style>