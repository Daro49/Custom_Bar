<script setup>
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
</script>

<template>
    <Header :avatar="Profile" :back-button="false"/>
  <div class = "button-group">
    <button class="btn">
      <RouterLink to="/menu">Menu</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/jukebox">Jukebox</RouterLink>
    </button>
    <button class="btn">
      <RouterLink to="/customer_service">CustomerService</RouterLink>
    </button>
  </div>

  <div class ="bottom-button-group">
    <button class="btn-bottom">
      <RouterLink to="/map">Map</RouterLink>
    </button>
    <button class="btn-bottom">
      <RouterLink to="/customdrink">Custom Drink</RouterLink>
    </button>
    <button class="btn-bottom">
      <RouterLink to="/menu/order">Order</RouterLink>
    </button>
  </div>
</template>

<style>
.button-group {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn {
  background-color: #D4AF37;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
}

.bottom-button-group {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.btn-bottom {
  background-color: #D4AF37;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: bold;
}
:root {
  --background-green: #0d564b;
  --headerv2: linear-gradient(
    180deg,
    rgba(254, 188, 47, 1) 0%,
    rgba(213, 179, 111, 1) 41%,
    rgba(179, 118, 6, 1) 100%
  );
  --button-font-family: 'Josefin Slab', serif;
  --profile-font-family: 'Century Schoolbook', sans-serif;
  --wood: #552808;
  --gold: #d4af37;
  --background-red: #7b2424;
  --progress-bar-green: linear-gradient(180deg, #045209 0%, #03800e 100%);
}
</style>