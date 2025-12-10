<script setup>
import Check from '@/assets/check.svg?raw'
import Header from '@/components/Header.vue'
import router from '@/router'
import { activeUser } from '@/stores/Login'
import { saveProfileChanges } from '@/stores/SaveProfileChanges'
const before = activeUser.value.username;

function save() {
  saveProfileChanges(before).then(() => {
    router.push({ name: 'profile' })
  })
}
</script>

<template>
  <Header :previous = "true"/>
  <div class="edit-profile">
    <div class="frame">
      Username:
      <input class="input-frame" v-model="activeUser.username" />
      Email:
      <input class="input-frame" v-model="activeUser.email" />
    </div>
  </div>
</template>

<style>
.edit-profile {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.frame {
  background: var(--headerv2);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 32px;
  font-family: var(--profile-font-family);
  color: black;
}

.frame .input-frame {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  width: 100%;
  font-weight: bold;
  font-family: var(--profile-font-family);
  align-content: left;
  border-radius: 8px;
  text-align: right;
}
</style>
