/**
 * @file ToastStore.js
 * @author Adam Babaca - xbabaca00@stud.fit.vutbr.cz
 * @brief implementacia upozornenia na pridanie napoja
 * @date 2025-12-13
 */

import { ref } from 'vue';

export const toasts = ref([]);

/**
 * @brief pridanie noveho upozornenia, na 2s
 */
export function addToast(message, duration = 2000) {
  const id = Date.now();
  toasts.value.push({ id, message });

  // automaticky odstranene
  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) toasts.value.splice(index, 1);
  }, duration);
}
