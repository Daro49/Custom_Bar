<template>
  <div class="header-item">
    <img :src="backIcon" class="back-img" />

    <span class="label">{{ label }}</span>

    <img :src="imageUrl" class="profile-img" />
  </div>
</template>

<script setup>
import avatar from '../assets/avatar.png';
import back from '../assets/Back.png'

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
</script>

<style scoped>
.header-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 412px;
  height: 76px;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  border: 1px solid #a37d25;
  /* border-radius: 8px; */
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
}

.back-img {
  width: 59px;
  height: 59px;
}
</style>
