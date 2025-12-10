<template>
  <Header :rightIcon="pastOrders" :rightFunction="goOrderHistory" :previous="true"/>
  <div class="order-container">
    <!-- Content -->
    <div class="content">
      <!-- Title with divider -->
      <div class="order-title">
        <svg 
          class="chevron-icon"
          viewBox="0 0 100 50"
        >
          <path 
            d="M10 40 L50 10 L90 40" 
            stroke="black" 
            stroke-width="8" 
            fill="none" 
            stroke-linecap="round"
          />
        </svg>
        <h2>ORDER</h2>
        <div class="divider-line"></div>
      </div>

      <!-- Order Items -->
      <div class="order-items">
        <div v-if="isLoading" class="loading">Loading order...</div>
        <div v-else-if="error" class="error">Error: {{ error }}</div>
        <div v-else-if="orderItems.length === 0" class="empty">You are dry</div>
        <div v-for="item in orderItems" :key="item.id" class="order-item">
          <div class="item-left">
            <span class="item-name">{{ item.name }}</span>
          </div>
          <div class="item-right">
            <span class="price">{{ item.price }}€</span>
            <img src="../assets/Info.svg" class="info-icon" />
          </div>
        </div>
      </div>

      <!-- Apply Coupons -->
      <div class="apply-coupons">
        <a href="#" @click.prevent="router.push('/coupons')">apply coupons</a>
      </div>

      <!-- Pay Button -->
      <button class="pay-button" @click="handleButtonClick">
        {{ orderItems.length === 0 ? 'ORDER SOMETHING' : 'PAY' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { activeUser } from '@/stores/Login.js'
import Header from '@/components/Header.vue'
import pastOrders from "@/assets/OrderHistory.svg?raw";

const router = useRouter()
const orderItems = ref([])
const isLoading = ref(true)
const error = ref(null)

const goOrderHistory = () => {
  router.push('/orders')
}

const fetchOrder = async () => {
  try {
    isLoading.value = true
    const username = activeUser.value.username
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch order')
    }
    
    const data = await response.json()
    orderItems.value = data
    console.log('Order items fetched:', data)
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const confirmOrder = async () => {
  try {
    const username = activeUser.value.username
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/order/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to confirm order')
    }
    
    const data = await response.json()
    console.log('Order confirmed:', data)
    
    // Clear the order items and show success
    orderItems.value = []
    alert('Order confirmed! Thank you for your purchase.')
    
    // Optionally redirect back or to a success page
    setTimeout(() => {
      router.back()
    }, 1000)
  } catch (err) {
    console.error('Error confirming order:', err)
    alert('Failed to confirm order: ' + err.message)
  }
}

const handleButtonClick = () => {
  if (orderItems.value.length === 0) {
    // Route to menu if no items
    router.push('/menu')
  } else {
    // Confirm order if items exist
    confirmOrder()
  }
}

onMounted(() => {
  fetchOrder()
})
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

.chevron-icon {
  width: 75px;
  height: 20px;
  transform: rotate(180deg);
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
  font-size: 26px;
  color: black;
  padding: 100px;
}

.error {
  color: #c41e3a;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 12px 16px;
  border-radius: 8px;
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

/* Apply Coupons */
.apply-coupons {
  text-align: center;
  margin: 16px 0;
}

.apply-coupons a {
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 14px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
}

/* Pay Button */
.pay-button {
  width: 90%;
  height: 122px;
  align-self: center;
  background-color: #2d5f5f;
  border: 2px solid black;
  border-radius: 24px;
  color: #d39e30;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 32px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  margin-top: auto;
}

.pay-button:hover {
  transform: translateY(-3px);
  background-color: #1a3a3a;
}

.pay-button:active {
  transform: translateY(-1px);
}
</style>
