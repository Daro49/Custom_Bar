<script setup>
import { RouterLink } from 'vue-router'
import Header from '@/components/Header.vue'
import Profile from '@/assets/user.png'
import MenuButton from '@/components/MenuButton.vue'

import orderIcon from '@/assets/order.svg?raw'; 
import shakerIcon from '@/assets/shaker.svg?raw'; 
import mapIcon from '@/assets/map.svg?raw';
</script>

<template>
  <Header :avatar="Profile" :back-button="false"/>
  <div class = "button-group">
    <MenuButton txt="Menu" :to="{ name: 'menu' }" />
    <MenuButton txt="Leaderboard" :to="{ name: 'leaderboard' }" />
    <MenuButton txt="Jukebox" :to="{ name: 'jukebox' }" />
    <MenuButton txt="Customer Service" :to="{ name: 'customer_service' }" />
  </div>

<div class="bottom-nav-container">
  <div class="nav-links">
    <div class="nav-segment right-segment">
      <RouterLink to="/map" class="nav-icon-link">
        <div class="icon-svg" v-html="mapIcon"></div>
      </RouterLink>
    </div>

    <div class="nav-segment left-segment">
      <RouterLink to="/menu/order" class="nav-icon-link">
        <div class="icon-svg" v-html="orderIcon"></div>
      </RouterLink>
    </div>
  </div>
  
  <RouterLink to="/customdrink" class="center-overlay-btn">
    <div class="shaker-icon" v-html="shakerIcon"></div>
  </RouterLink>
</div>
</template>

<style>
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

.button-group {
  padding: 12px 16px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
}

.bottom-nav-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: var(--wood);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20%;
}

.center-overlay-btn {
    position: absolute;
    bottom: 10px; 
    left: 50%;
    transform: translateX(-50%); 
    
    width: 90px; 
    height: 90px;
    border-radius: 50%;
    background: var(--headerv2);
    border: 3px solid #554422;
    
    z-index: 20; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.shaker-icon {
  transform: scale(0.8);
}

.nav-segment {
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
}

.left-segment {
    justify-content: flex-end;
    padding-right: 10px;
}

.right-segment {
    justify-content: flex-start;
    padding-left: 10px;
}

.nav-icon-link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--gold, #d4af37);
    opacity: 0.7;
    transition: opacity 0.2s ease, background-color 0.2s ease;
}

.nav-icon-link:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.05);
}

</style>