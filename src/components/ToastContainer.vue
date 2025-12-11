<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { toasts } from '@/stores/ToastStore.js';
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 70px; 
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
}

.toast {
  background: #f7c244;
  padding: 10px 16px;
  border-radius: 10px;
  color: #000;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0,0,0,0.25);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
