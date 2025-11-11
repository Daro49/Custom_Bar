<template>
  <header class="header">
    <button class="back-btn" @click="back" 
    v-if="backButton" v-html="ArrowLeftSvg">
    </button>
    
    <div class="center-content">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="right-content">
      <slot name="right">
        <img v-if="avatar" :src="avatar" class="avatar" @click="openProfile"/>
        <button class="back-btn" @click="rightFunction" 
          v-if="rightIcon" v-html="rightIcon">
        </button>
      </slot>
    </div>
  </header>
  
</template>

<script>
import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw';
import router from '@/router';

export default {
  name: "Header",
  props: {
    backButton: { type: Boolean, default: true },
    title: { type: String, default: "" },
    avatar: { type: String, default: null },
    rightIcon: { type: String, default: null },
    rightFunction: { type: Function, default: null }
  },
  setup() {
    return { ArrowLeftSvg }
  },
  methods: {
    back() {
      router.back();
    },
    openProfile() {
      router.push({ name: 'profile' });
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#e0b04d, #be8e21);
  padding: 10px 14px;
  border-radius: 8px;

  width: 100%;
  box-sizing: border-box;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: black; 
}

.center-content {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
</style>
