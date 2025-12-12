<template>
  <Header :rightIcon="cart" :rightFunction="order">
      <template #title>
      <span class="custom-title">{{ currentMap }}</span>
    </template>
  </Header>
  <div class="horizontal-center-parent">
    <SlidePanel class="slide-up-table-layout" :currentMap="currentMap" @navigate="switchMap" @close="closeSlidePanel" />
    <component :is="mapComponents[currentMap]" :selectedTable="selectedTable" @selectTable="selectTable" @navigate="switchMap" @close="closeSlidePanel" />
</div>
</template>

<script>
import SlidePanel from '../components/SlidePanel.vue';
import Header from '@/components/Header.vue';
import cart from "@/assets/OrderHistory.svg?raw";
import MapTerrace from '../components/maps/MapTerrace.vue';
import MapEntry from '../components/maps/MapEntry.vue';
import MapBack from '../components/maps/MapBack.vue';
import MapGarden from '../components/maps/MapGarden.vue';
import { activeUser } from '@/stores/Login.js';

export default {
  name: "TableLayoutA",
  data() {
    return {
      selectedTable: null,
      currentMap: 'terrace',
      previousMap: 'terrace',
      cart,
      expirationChecker: null, 
    }
  },
  created() {
    if (activeUser.value && activeUser.value.table) {
      this.selectedTable = activeUser.value.table;
      console.log('Restored selected table:', this.selectedTable);
    }
    this.checkTableExpiration();
  },
  mounted() {
    this.expirationChecker = setInterval(this.checkTableExpiration, 60000); 
  },
  beforeDestroy() {
    clearInterval(this.expirationChecker); 
  },
  methods: {
    checkTableExpiration() {
      const expiration = activeUser.value.tableExpiration;
      const table = activeUser.value.table;
      
      if (table && expiration) {
        const now = Date.now();
        const expiryTime = new Date(expiration).getTime(); 
        
        if (now >= expiryTime) {
          console.log(`Table ${table} reservation expired. Releasing.`);
          this.releaseTable(table); 
        }
      }
    },

    async releaseTable(tableLabel) {
      this.selectedTable = null;
      activeUser.value.table = null;
      activeUser.value.tableExpiration = null; 
      localStorage.setItem('activeUser', JSON.stringify(activeUser.value)); 

      try {
        const username = activeUser.value.username;
        await fetch(`https://itu-wb12.onrender.com/users/${username}/table/release`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tableCode: tableLabel })
        });
        console.log(`Server notified: Table ${tableLabel} released.`);
      } catch (error) {
          console.error('Error releasing table on server:', error);
        }
    },

    async selectTable(label) {
      const isDeselecting = this.selectedTable === label;
      
      if (isDeselecting) {
        await this.releaseTable(label);
        return;
      }

      this.selectedTable = label;
      activeUser.value.table = this.selectedTable;
      
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      
      activeUser.value.tableExpiration = expirationTime; 

      localStorage.setItem('activeUser', JSON.stringify(activeUser.value));

      try {
        const username = activeUser.value.username
        console.log('Sending table select request for:', label)
        const response = await fetch('https://itu-wb12.onrender.com/users/' + username + '/table/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            tableCode: label,
            expirationTime: expirationTime
          }) 
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
    },
    order(){ this.$router.push({ name: 'order' })}
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
    MapTerrace,
    MapEntry,
    MapBack,
    MapGarden,
    Header
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

.custom-title {
  flex-grow: 1;
  text-align: center;
  color: black;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>