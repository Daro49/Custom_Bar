<template>
    <Header :avatar="Profile" :previous="true"/>
  <div class="order-container">

    <!-- Content -->
    <div class="content">
      <!-- Title with divider -->
      <div class="order-title">
        <h2>ORDER</h2> <br>
        <div class="order-date">
          <svg class="chevron-icon1" viewBox="0 0 100 50" @click="prevOrder">
            <path 
              d="M10 40 L50 10 L90 40" 
              stroke="black" 
              stroke-width="8" 
              fill="none" 
              stroke-linecap="round"
            />
          </svg>

          {{ orderDate }}

          <svg class="chevron-icon2" viewBox="0 0 100 50" @click="nextOrder">
            <path 
              d="M10 40 L50 10 L90 40" 
              stroke="black" 
              stroke-width="8" 
              fill="none" 
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="divider-line"></div>
      </div>

      <!-- Order Items -->
      <div class="order-items">
        <div v-if="isLoading" class="loading">Loading order...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="orderItems.length === 0" class="empty">No items</div>
        <div v-for="item in orderItems" :key="item.id" class="order-item">
          <div class="item-left">
            <span class="item-name">{{ item.name }}</span>
          </div>
          <div class="item-right">
            <span class="price">{{item.quantity}} x {{ item.price }} = {{ (item.quantity * item.price).toFixed(2) }}€</span>
            <button class="addButton" @click="handleOrder(item)">+</button>
          </div>
        </div>
        <div v-if="orderItems.length > 0" class="order-item2">
          <span class="item-name">Order price: {{ orderItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2) }}€</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { activeUser } from '@/stores/Login.js'
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
import { addToast } from '@/stores/ToastStore.js';

const orderItems = ref([])
const orderDate = ref('')
const isLoading = ref(true)
const error = ref(null)
const orderIndex = ref(0)
const orderCount = ref(0)

const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

const fetchOrder = async () => {
  try {
    isLoading.value = true
    const username = activeUser.value.username
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/orders/${orderIndex.value}`)
    if (!response.ok) {
      throw new Error('No past orders')
    }
    const data = await response.json()
    orderItems.value = data.items ?? data
    orderDate.value = data.date ? formatDate(data.date) : ''
    orderCount.value = data.totalOrders ?? orderCount.value
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const nextOrder = () => {
  if (orderCount.value === 0) return
  orderIndex.value = (orderIndex.value + 1) % orderCount.value
  fetchOrder()
}

const prevOrder = () => {
  if (orderCount.value === 0) return
  orderIndex.value = (orderIndex.value - 1 + orderCount.value) % orderCount.value
  fetchOrder()
}

onMounted(() => {
  fetchOrder()
})

async function addToOrder(drink) {
  if (!activeUser.value?.username || !activeUser.value?.table) {
    throw new Error("User not logged in or table not set");
  }
  const username = activeUser.value.username;
  const payload = {
    drink,
    tableCode: activeUser.value.table
  };
  try {
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
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function handleOrder(drink) {
  try {
    await addToOrder(drink);
    addToast(`${drink.name} added to cart!`);
    console.log("Added to order:", drink.name);
  } catch (err) {
    addToast(`Failed to add to cart. Please select table first.`);
    console.error("Order failed:", err);
  }
}
</script>

<style scoped>
.order-container {
  width: 100%;
  height: 90%;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  bottom: 0;
}

/* Content */
.content {
  flex: 1;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 2px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-top: 30px;
}

/* Order Title */
.order-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.chevron-icon1 {
  width: 60px;
  height: 15px;
  transform: rotate(-90deg) translateX(-4px);
}
.chevron-icon2 {
  width: 60px;
  height: 15px;
  transform: rotate(90deg) translateX(4px);
}

.order-title h2 {
  margin: 0;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 32px;
  font-weight: 700;
  color: black;
  letter-spacing: 2px;
}

.divider-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
  margin-top: 8px;
}

/* Order Date */
.order-date {
  text-align: center;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 14px;
  color: black;
  margin-bottom: 16px;
}

/* Order Items */
.order-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.loading,
.error,
.empty {
  text-align: center;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 28px;
  color: black;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error {
  color: #000000;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 12px 16px;
  border-radius: 8px;
}

.order-item2 {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.3);
  padding: 12px 16px;
  border-radius: 8px;
  width: 30%; 
  margin: 10px auto;
}

.item-left {
  display: flex;
  align-items: center;
}

.item-name {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 16px;
  color: black;
  line-height: 1.3;
}

.item-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 16px;
  font-weight: 600;
  color: black;
}

.info-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

</style>
