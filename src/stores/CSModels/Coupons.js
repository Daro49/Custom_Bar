import { ref } from 'vue';
import { addToast } from '../ToastStore';
import { activeUser } from '../Login';
import { orderItems } from '../DrinkInfo';

export const coupons = ref([]);
export const userCoupons = ref([]);

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
    addToast('Error occured while fetching coupons: ' + error.message);
    return false;
  }
}

export async function getUserCoupons(username) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/coupons/${username}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Fetching user coupons failed');
    }

    const data = await response.json();

    userCoupons.value = data;
    return true;
  }
  catch (error) {
    console.error('User Coupons error:', error);
    addToast('Error occured while fetching user coupons: ' + error.message);
    return false;
  }
}

export async function activateCoupon(username, coupon) {
  if (!activeUser.value?.username || !activeUser.value?.table || activeUser.value?.table === 'N/A') {
    addToast("Failed to add to cart. Please select table.");
    return false;
  }
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coupon: coupon }),
    });

    if (!response.ok) {
      throw new Error('Activating coupon failed');
    }

    const couponAsItem = {
      ...coupon, //same as before, but add item data
      name: `COUPON: ${coupon.code}`,
      quantity: 1,
      isCoupon: true
    };
    const payload = {
      drink: couponAsItem,
      tableCode: activeUser.value.table
    };
    
    const res = await fetch(
      `https://itu-wb12.onrender.com/users/${username}/order/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();
    orderItems.value = result.order;

    return result;
  } catch (error) {
    console.error('Activate Coupon error:', error);
    addToast('Error occured while activating coupon: ' + error.message);
    return false;
  }
}

export async function deactivateCoupon(username, couponId) {
  try {
    const response = await fetch(`https://itu-wb12.onrender.com/coupons/${username}/remove/${couponId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Deactivating coupon failed');
    }
    return true;
  } catch (error) {
    console.error('Deactivate Coupon error:', error);
    addToast('Error occured while deactivating coupon: ' + error.message);
    return false;
  }
}