<template>
  <header class="header">
    <div class="back-btn-wrapper">
      <button class="back-btn" @click="back" v-if="backButton" v-html="ArrowLeftSvg"></button>
    </div>

    <div class="center-content">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="right-content">
      <slot name="table">
        <span class="default-table-text">
          <span class="table-id">
            <span v-if="selectedTable !== 'N/A'">{{ selectedTable }}</span>
            <span v-else>Table N/A</span>
          </span>

          <span v-if="timeRemainingMs > 0" class="timer">
            {{ formattedTime }}
          </span>
        </span>
      </slot>
      <slot name="right">
        <button @click="openProfile" class="avatar-button" v-if="avatar">
          <img :src="activeUser?.imgurl || avatar" class="avatar" />
        </button>
        <button
          class="back-btn"
          @click="rightFunction"
          v-if="rightIcon"
          v-html="rightIcon"
        ></button>
      </slot>
    </div>
  </header>
</template>

<script>
import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw'
import router from '@/router'
import { activeUser } from '@/stores/Login.js';
import { computed, ref, onBeforeUnmount, watch } from 'vue'; 

function formatTime(ms) {
    if (ms <= 0) return '0 s'; 
    
    const totalSeconds = Math.floor(ms / 1000); 

    if (totalSeconds < 60) {
        const seconds = totalSeconds % 60;
        return `${seconds} s`;
    }

    let totalMinutes = Math.floor(totalSeconds / 60); 
    
    if (totalMinutes === 60) {
        return '59 min';
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const pad = (num) => String(num); 
    
    if (hours > 0) {
        return `${pad(hours)}:${String(minutes).padStart(2, '0')}`;
    } else {
        return `${minutes} min`; 
    }
}

export default {
  name: 'Header',
  props: {
    previous: { type: Boolean, default: false },
    backButton: { type: Boolean, default: true },
    title: { type: String, default: '' },
    avatar: { type: String, default: null },
    rightIcon: { type: String, default: null },
    rightFunction: { type: Function, default: null },
  },
  setup() {
    const selectedTable = computed(() => activeUser.value?.table || 'N/A');
    const timeRemainingMs = ref(0);
    let intervalId = null; 

    const updateTimer = () => {
      const expiration = activeUser.value.tableExpiration;

      if (expiration) {
        const expiryTime = new Date(expiration).getTime();
        const now = Date.now();
        const remaining = expiryTime - now;

        timeRemainingMs.value = remaining > 0 ? remaining : 0;
      } else {
        timeRemainingMs.value = 0;
      }
    };
    
    const startInterval = (duration) => {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateTimer, duration);
    };

    watch(() => activeUser.value.tableExpiration, (newExpiration) => {        
        updateTimer(); 
        
        if (newExpiration) {
            const expiryTime = new Date(newExpiration).getTime();
            const remainingMs = expiryTime - Date.now();
            
            if (remainingMs > 0 && remainingMs < 60000) {
                // Menej ako minúta: Sekundový interval
                startInterval(1000);
            } else if (remainingMs >= 60000) {
                // Viac ako minúta: Minútový interval
                startInterval(60000); 
            }
        } else {
            // Žiadna rezervácia, zastavíme interval
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
        }
    }, { immediate: true }); // 🚀 KĽÚČOVÉ: Spustí sa hneď po načítaní!
    
    // watch: Dynamická zmena intervalu (z minútového na sekundový)
    watch(timeRemainingMs, (newVal) => {
        if (newVal > 0 && newVal < 60000) {
            // Prechod na sekundový interval
            if (intervalId && intervalId._idleTimeout !== 1000) { 
                 console.log("HEADER DEBUG: 5. Prepínam interval na 1 sekundu.");
                 startInterval(1000);
            }
        } else if (newVal >= 60000) {
             // Návrat na minútový interval (ak došlo k predĺženiu, ktoré bežalo na sekundách)
             if (intervalId && intervalId._idleTimeout === 1000) {
                 console.log("HEADER DEBUG: 6. Prepínam interval na 60 sekúnd.");
                 startInterval(60000);
             }
        }
    });

    onBeforeUnmount(() => {
      if (intervalId) clearInterval(intervalId);
    });
    
    const formattedTime = computed(() => formatTime(timeRemainingMs.value));
    
    return { 
      ArrowLeftSvg, 
      selectedTable, 
      formattedTime,
      timeRemainingMs,
      activeUser
    }
  },
  methods: {
    back() {
      if (this.previous) {
        router.back();
        return
      }
      const current = this.$route.path.split('/')
      current.pop()

      const parent = current.join('/') || '/'

      this.$router.push(parent)
    },
    openProfile() {
      router.push({ name: 'profile' })
    },
    menu()  {
      router.push({ name: 'main' })
    },
    
  },
}
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  padding: 10px 14px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
}

.back-btn-wrapper {
  width: 100px;
  min-width: 100px;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
}

.back-btn :deep(svg) {
  width: 32px;  
  height: 32px;
  display: block;
}

.center-content {
  flex: 1;
  text-align: center; 
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100px;
  min-width: 100px;
  justify-content: flex-end;
}

.default-table-text {
  display: flex; 
  flex-direction: column;
  align-items: center; 
}

.table-id {
  font-weight: 700;
  font-size: 14px;
  color: black;
}

.timer {
  font-weight: 400;
  font-size: 10px;
  color: black; 
  margin-top: -2px;
}

.expired-timer {
  display: none; 
}

.avatar-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
