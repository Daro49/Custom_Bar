import { ref } from 'vue';

export const packages = ref([]);
export const pkg = ref([]);

export async function getPackages() {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Fetching packages failed');
    }

    const data = await response.json();

    packages.value = data;

    return true;
  } catch (error) {
    console.error('Packages error:', error);
    alert('Error occured while fetching packages:' + error.message);
    return false;
  }
}

export async function getPackageById(id) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Fetching package failed');
    }

    const data = await response.json();

    pkg.value = data;

    return true;
  } catch (error) {
    console.error('Package error:', error);
    alert('Error occured while fetching package:' + error.message);
    return false;
  }
} 