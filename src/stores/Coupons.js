import { ref } from 'vue';

export const coupons = ref([]);

export async function getCoupons() {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/coupons`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Profile points update failed');
    }

    const data = await response.json();

    coupons.value = data;

    return true;
  } catch (error) {
    console.error('Coupons error:', error);
    alert('Coupons error: ' + error.message);
    return false;
  }
}
