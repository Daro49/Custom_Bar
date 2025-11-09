<template>
  <header class="header">
    <button class="back-btn" @click="$emit('back')">
      <ArrowLeftIcon v-if="backButton" class="w-7 h-7" />
    </button>

    <div class="center-content">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <div class="right-content">
      <slot name="right">
        <img v-if="avatar" :src="avatar" class="avatar" />
        <i v-else-if="rightIcon" :class="rightIcon"></i>
      </slot>
    </div>
  </header>
</template>

<script>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

export default {
  name: "Header",
  props: {
    backButton: { type: Boolean, default: true},
    title: { type: String, default: "" },
    avatar: { type: String, default: null },
    rightIcon: { type: String, default: null }
  }
};
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
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
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
