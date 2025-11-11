<template>
  <div class="header-item">
    <img :src="backIcon" class="back-img" @click="goBack" />

    <span class="label">{{ label }}</span>

    <img src="../assets/user.png" class="profile-img" @click="navigateToProfile" />
  </div>
</template>

<script setup>
import avatar from '../assets/user.png';
import back from '../assets/Back.png'
import { useRouter } from 'vue-router'

const router = useRouter()

defineEmits(['back'])

// Props with a default image
defineProps({
  label: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: avatar
  },
  backIcon: {
    type: String,
    default: back
  }
});

const navigateToProfile = () => {
  router.push('/profile')
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.header-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 412px;
  box-sizing: border-box;
  padding: 0 14px;
  height: 76px;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  border: 1px solid #a37d25;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.label {
  flex-grow: 1;
  text-align: center;
  color: black;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.profile-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.back-img {
  width: 59px;
  height: 59px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.back-img:hover {
  transform: scale(1.05);
}
</style>
