import { ref } from 'vue';

export const toasts = ref([]);

/**
 * Add a new toast
 * @param {string} message
 * @param {number} duration - in ms
 */
export function addToast(message, duration = 2000) {
  const id = Date.now();
  toasts.value.push({ id, message });

  // Remove automatically after duration
  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) toasts.value.splice(index, 1);
  }, duration);
}
