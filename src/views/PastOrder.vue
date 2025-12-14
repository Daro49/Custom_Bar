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
          <div class="item-right" v-if="item.class === 'drink' || item.class === 'custom'">
            <span class="price">{{item.quantity}} x {{ item.price }} = {{ (item.quantity * item.price).toFixed(2) }}€</span>
            <button class="add-button" @click="handleOrder(item)">+</button>
          </div>
        </div>
        <div v-if="orderItems.length > 0" class="order-item2">
          <span class="item-name">Order price: {{ (orderPrice).toFixed(2)}} €</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PastOrderOptions from '@/stores/PastOrder.js';
export default { ...PastOrderOptions };
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

.chevron-icon1 {
  width: 60px;
  height: 15px;
  transform: rotate(-90deg) translateX(-4px);
  display: inline-block;
}
.chevron-icon2 {
  width: 60px;
  height: 15px;
  transform: rotate(90deg) translateX(4px);
  display: inline-block;
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

.order-date {
  text-align: center;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 14px;
  color: black;
  margin-bottom: 16px;
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
  font-family: var(--button-family-font);
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

.chevron-icon1:hover{
  cursor: pointer;
  box-shadow: 0 0 10px var(--gold);
  transform: rotate(-90deg) translateX(-4px) scale(1.3);
  transition: transform 0.3s, box-shadow 0.3s;
}
.chevron-icon2:hover {
  cursor: pointer;
  box-shadow: 0 0 10px var(--gold);
  transform: rotate(90deg) translateX(4px) scale(1.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.add-button {
  width: 30px;
  height: 30px;
  border-radius: 30%;
  background: rgba(255, 255, 255, 0.3);
  border: black 2px solid;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

</style>
