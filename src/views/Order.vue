<template>
  <Header :rightIcon="pastOrders" :rightFunction="goOrderHistory" :previous="true"/>
  <div class="order-container">
    <div class="content">
      <div class="order-title">
        <h2>ORDER</h2>
        <div class="divider-line"></div>
      </div>

      <div class="order-items">
        <div v-if="isLoading" class="loading">Loading order...</div>
        <div v-else-if="error" class="error">Error: {{ error }}</div>
        <div v-else-if="orderItems.length === 0" class="empty">You are dry</div>
        <div v-for="item in orderItems" :key="item.id" class="order-item">
          <div class="item-left">
            <span class="item-name">{{ item.name }}</span>
          </div>
          <div class="item-right">
            <span class="price">{{item.quantity}} x {{ item.price }} = {{ (item.quantity * item.price).toFixed(2) }}€</span>
            <button class="remove-button" @click="removeFromOrder(item)">-</button>
            <button class="add-button" @click="addToOrder(item)">+</button>
          </div>
        </div>
      </div>

      <div class="apply-coupons">
        <a href="#" @click.prevent="$router.push('/coupons')">apply coupons</a>
      </div>

      <button class="pay-button" @click="handleButtonClick">
        {{ orderItems.length === 0 
          ? 'ORDER SOMETHING' 
          : 'PAY ' + orderItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2) + '€' 
        }}
      </button>
    </div>
  </div>
</template>
<script>
import options from '@/stores/Order.js'
export default options
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
  box-sizing: border-box;
  border-top: 2px solid black;
  border-radius: 30px 30px 0px 0px;
  margin-top: 30px;
}

.order-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
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

.order-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-bottom: 130px;
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

.remove-button,
.add-button {
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  background-color: #d39e30;
  border: 1px solid black;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
