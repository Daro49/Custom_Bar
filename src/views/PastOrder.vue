<template>
  <div class="order-container">
    <!-- Header -->
    <div class="header">
      <img src="../assets/Back.png" class="header-icon back-icon" @click="goBack" />
      <img src="../assets/avatar.png" class="header-icon profile-icon" @click="goToProfile" />
    </div>

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
        <!-- Date, TODO: change content to &lt; {{ orderDate }} &gt;-->
        <div class="order-date">
            &lt; 11.11.2025 &gt;
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
            <span class="price">{{ item.price }}€</span>
            <img src="../assets/Info.svg" class="info-icon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const orderItems = ref([])
const orderDate = ref('')
const isLoading = ref(true)
const error = ref(null)

const goBack = () => {
  router.back()
}

const goToProfile = () => {
  router.push('/profile')
}

const fetchOrder = async () => {
  try {
    isLoading.value = true
    const username = 'Matej' // TODO: replace with dynamic username
    const index = '0';
    const response = await fetch(`https://itu-wb12.onrender.com/users/${username}/orders/${index}`)
    
    if (!response.ok) {
      throw new Error('No past orders')
    }
    
    const data = await response.json()
    orderItems.value = data
    orderDate.value = new Date().toLocaleDateString()
    console.log('Past order items fetched:', data)
  } catch (err) {
    console.error('Error fetching order:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchOrder()
})
</script>

<style scoped>
.order-container {
  width: 412px;
  height: 917px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ), linear-gradient(0deg, rgba(13, 86, 75, 1) 0%, rgba(13, 86, 75, 1) 100%);
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  padding: 0 14px;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  border-bottom: 1px solid #a37d25;
  box-sizing: border-box;
}

.header-icon {
  width: 59px;
  height: 59px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.header-icon:hover {
  transform: scale(1.05);
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
