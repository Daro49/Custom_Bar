<template>
  <div class="order-container">
    <!-- Header -->
    <div class="header">
      <img src="../../assets/Back.png" class="header-icon back-icon" @click="goBack" />
      <div class="header-center">ORDER</div>
      <img src="../../assets/Order History.svg" class="header-icon order-history-icon" />
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Title with divider -->
      <div class="order-title">
        <span class="chevron">⌄</span>
        <h2>ORDER</h2>
        <div class="divider-line"></div>
      </div>

      <!-- Order Items -->
      <div class="order-items">
        <div v-for="item in 4" :key="item" class="order-item">
          <div class="item-left">
            <span class="item-name">Gabor's<br />Secret</span>
          </div>
          <div class="item-right">
            <span class="price">5,20€</span>
            <img src="../../assets/Info.svg" class="info-icon" />
          </div>
        </div>
      </div>

      <!-- Apply Coupons -->
      <div class="apply-coupons">
        <a href="#" @click.prevent="router.push('/coupons')">apply coupons</a>
      </div>

      <!-- Pay Button -->
      <button class="pay-button">PAY</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.order-container {
  width: 412px;
  height: 917px;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
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

.header-center {
  flex-grow: 1;
  text-align: center;
  color: black;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Content */
.content {
  flex: 1;
  background-color: #e9c15b;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
}

/* Order Title */
.order-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.chevron {
  font-size: 28px;
  font-weight: bold;
  color: black;
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
  width: 382px;
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
