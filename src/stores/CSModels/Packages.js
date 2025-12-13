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
 
export async function orderPackage(username, pkg) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${username}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pkg: pkg }) 
    });

    const data = await response.json(); 
    if (!response.ok) {
      return { 
        success: false, 
        status: response.status, 
        message: data.error || 'Unkown error' 
      };
    }

    return { success: true };
  }
  catch (error) {
    return { 
      success: false, 
      message: 'Network error: ' + error.message 
    };
  }
}

export async function removePackageFromOrder(username, pkgId)
{
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/packages/${username}/remove/${pkgId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Removing package failed.');
    }
    return true;
    } catch (error) {
      console.error('Pakcage removal error:', error);
      alert('Error occured while removing package from order: ' + error.message);
      return false;
    }  
}