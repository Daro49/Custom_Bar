<script setup>
import Profile from '@/assets/user.png'
</script>

<template>
  <div class="my-drinks">
    <Header :avatar="Profile" />
    
  </div>
</template>

<script>
import Header from '@/components/Header.vue'


export default {
  name: 'MyDrinks',
  components: {
    Header
  },
}
</script>

<style>
.my-drinks {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.my-drinks .coupon-list {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 980px;
  margin-top: 21px;
  position: relative;
  width: 100%;
}
</style>
