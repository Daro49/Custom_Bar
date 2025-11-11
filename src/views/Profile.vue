<script setup>
import Edit from '@/assets/edit.svg?raw'
import ProfileImg from '@/assets/user.png'
import { activeUser } from '@/stores/Login.js'

</script>

<template>
  <div class="profile">
    <Header :right-icon="Edit" :rightFunction="edit" />

    <img :src="ProfileImg" alt="Profile Picture" class="picture" />

    <div class="username">
      <h2>{{activeUserRef.username}}</h2>
    </div>

    <SectionDivider />

    <div class="details">
      <div class="row">
        <span class="label">Email:</span>
        <span class="value">{{activeUserRef.email}}</span>
      </div>

      <div class="row">
        <span class="label">Points:</span>
        <span class="value">{{activeUserRef.points}}</span>
      </div>
    </div>

    <button class="profile-button">My Drinks</button>
    <button class="profile-button">My Checks</button>
    <button class="profile-button" @click="logout">Logout</button>
  </div>
</template>

<script>
import router from '@/router'
import Header from '@/components/Header.vue'
import SectionDivider from '@/components/SectionDivider.vue'

export default {
  name: 'Profile',
  components: {
    Header,
    SectionDivider,
  },
  data() {
    return {
      activeUserRef: activeUser, 
    }
  },
  methods: {
    edit() {
      router.push({ name: 'edit_profile' })
    },
    logout() {
      localStorage.removeItem('activeUser')
      activeUser.value = null
      router.push({ name: 'login' })
    },
  },

}
</script>

<style>
.profile {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}

.picture {
  align-self: center;
  margin: 20px 0;
  width: 300px;
  height: 300px;
  border-radius: 50%;
}

.username {
  align-self: center;
  font-family: var(--profile-font-family);
  font-size: clamp(24px, 4vw, 48px);
  color: white;
  margin-bottom: 10px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: var(--headerv2);
  font-size: 32px;
  color: black;
  border-radius: 10px;
}

.row {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.label {
  font-weight: bold;
}

.value {
  text-align: right;
}

.profile-button {
  margin-top: 20px;
  padding: 10px;
  font-size: 24px;
  font-family: var(--button-font-family);
  background-color: var(--gold);
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 80%;
  align-self: center;
}
</style>
