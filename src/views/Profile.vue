<script setup>
import { ref } from 'vue'
import ProfileImg from '@/assets/user.png'
import { activeUser } from '@/stores/Login.js'
import Header from '@/components/Header.vue'
import SectionDivider from '@/components/SectionDivider.vue'
import router from '@/router'
import { getUser, saveProfileChanges } from '@/stores/CSModels/Profile'
import edit from '@/assets/edit.svg?raw'
import { addToast } from '@/stores/ToastStore'

const isEditingUsername = ref(false);
const newUsername = ref(activeUser.value.username);
const isEditingEmail = ref(false);
const newEmail = ref(activeUser.value.email);
const isEditingImage = ref(false);
const newImage = ref(activeUser.value.imgurl);

let errorMessage = ref('');
let isError = ref(false);
// added to put focus in edit input (immediatly start editing)
const vFocus = {
  mounted: (el) => el.focus()
}

// if invalid img url set default
const handleImageError = (event) => {
  addToast("Invalid image url inputed.", 5000)
  event.target.src = ProfileImg;
};

// function setting username to 
async function syncChangesWithServer(oldUsername) {
  const success = await saveProfileChanges(oldUsername);
  if (success) {
    console.log("Server updated successfully");
  }
  else {
    isError.value = true;
    errorMessage.value = "Cannot save profile changes";
  }
}

async function saveUsername() {
  errorMessage.value = '';
  isError.value = false;
  const oldUsername = activeUser.value.username;
  const cleanedName = newUsername.value.trim();

  if (cleanedName === oldUsername) {
    isEditingUsername.value = false;
    return;
  }

  if (!cleanedName) {
    newUsername.value = oldUsername;
    isEditingUsername.value = false;
    return;
  }

  // synchronisation here, wait to check if user exists!
  const userExists = await getUser(cleanedName);

  if (userExists) {
    isError.value = true;
    errorMessage.value = `User with username \"${cleanedName}\" already exists!`;
    newUsername.value = oldUsername;
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  } else {
    activeUser.value.username = cleanedName;
    await syncChangesWithServer(oldUsername);
  }

  isEditingUsername.value = false;
}

async function saveEmail() {
  const oldUsername = activeUser.value.username;
  const cleanedEmail = newEmail.value.trim();

  if (cleanedEmail !== '' && cleanedEmail.includes('@')) {
    activeUser.value.email = cleanedEmail;
    await syncChangesWithServer(oldUsername);
  } else {
    newEmail.value = activeUser.value.email;
  }
  isEditingEmail.value = false;
}

async function saveImg() {
  const oldUsername = activeUser.value.username;

  if (newImage.value !== activeUser.value.imgurl) {
    activeUser.value.imgurl = newImage.value;
    await syncChangesWithServer(oldUsername);
  }
  isEditingImage.value = false;
}

const startEditing = () => {
  newImage.value = activeUser.value.imgurl || '';
  isEditingImage.value = true;
};

</script>

<template>
  <Header :previous="true" />
  <div class="profile" v-if="activeUser">
    <div class="picture-wrapper">
      <img :src="activeUser.imgurl || ProfileImg" alt="Profile Picture" class="picture" @error="handleImageError" />
      <div class="edit-icon" @click="startEditing" v-html="edit"></div>
    </div>

    <div v-if="isEditingImage" class="image-edit-container-static">
      <input v-model="newImage" @blur="saveImg" @keyup.enter="saveImg" v-focus
        :placeholder="!newImage && activeUser.imgurl ? 'Paste url of image here.' : 'Paste url of image here.'"
        class="edit-input-inline" />
    </div>

    <div class="message-container">
      <Transition name="fade">
        <p v-if="errorMessage" :class="isError ? 'error-message' : 'success-message'">
          {{ errorMessage }}
        </p>
      </Transition>
    </div>
    <div class="username">
      <input v-if="isEditingUsername" v-model="newUsername" @blur="saveUsername" @keyup.enter="saveUsername" v-focus
        class="edit-input" />
      <h2 v-else @click="isEditingUsername = true">
        {{ activeUser.username }}
      </h2>
    </div>

    <SectionDivider />

    <div class="details">
      <div class="row">
        <span class="label">Email</span>
        <input v-if="isEditingEmail" v-model="newEmail" @blur="saveEmail" @keyup.enter="saveEmail" v-focus
          class="edit-input-inline" />
        <span v-else class="value clickable-text" @click="isEditingEmail = true">
          {{ activeUser.email }}
        </span>
      </div>
      <div class="row">
        <span class="label">Points</span>
        <span class="value-points">{{ activeUser.points }} <small>pts</small></span>
      </div>
    </div>

    <div class="actions">
      <button class="profile-button" @click="drinks">My Drinks</button>
      <button class="profile-button" @click="orders">Order History</button>
      <button class="profile-button" @click="myorder">Current Order</button>
      <button class="profile-button logout" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
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
    logout() {
      localStorage.removeItem('activeUser')
      activeUser.value = null
      router.push({ name: 'login' })
    },
    drinks() {
      router.push({ name: 'my_drinks' })
    },
    orders() {
      router.push({ name: 'orders' })
    },
    myorder() {
      router.push({ name: "order" })
    }
  }
}
</script>

<style>
.profile {
  background: var(--background-green);
  display: flex;
  flex-direction: column;

  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px 40px 10px;
}

.edit-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--gold);
  color: white;
  font-family: var(--profile-font-family);
  font-size: clamp(24px, 4vw, 48px);
  text-align: center;
  outline: none;
  width: 100%;
}

.picture {
  align-self: center;
  margin: 20px 0;
  width: 30%;
  height: 30%;
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
  width: 80%;
  align-self: center;
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

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}

.row:last-child {
  border-bottom: none;
}

.details {
  background: linear-gradient(135deg, #e9c15b, #d39e30);
  box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.3), 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 25px;
  font-size: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  flex-shrink: 0;
  margin-bottom: 30px;
}

.profile-button {
  background: var(--gold);
  border-bottom: 3px solid #b8860b;
  transition: all 0.2s ease;
  font-weight: 600;
}

.profile-button:active {
  transform: translateY(2px);
  border-bottom: 1px solid #b8860b;
}

.picture {
  width: 180px;
  height: 180px;
  border: 4px solid var(--gold);
  padding: 5px;
  align-self: center;
  background: white;
}

.error-message {
  color: var(--error-red, #df5252);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
}

.success-message {
  color: var(--success-green, #4CAF50);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.clickable {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clickable:hover {
  transform: scale(1.05);
}

.image-edit-overlay {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
}

.image-edit-container {
  background: var(--headerv2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid var(--gold);
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.image-edit-container label {
  font-weight: bold;
  font-size: 14px;
  color: black;
}

.image-edit-container-static {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 80%;
  background: var(--headerv2);
  padding: 12px;
  border-radius: 10px;
  border: 2px solid var(--gold);
  margin-bottom: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.picture-wrapper {
  position: relative;
  align-self: center;
  margin: 20px 0 10px 0;
  width: 180px;
  height: 180px;
  margin-bottom: 80px;
}

.edit-input-inline {
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  color: black;
  font-size: 16px;
}

.edit-icon {
  position: absolute;
  bottom: -40px;
  right: -20px;
  background: var(--gold);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid var(--background-green);
  transition: transform 0.2s ease;
  padding: 6px;
  box-sizing: border-box;
}

.edit-icon:hover {
  transform: scale(1.1);
}

.edit-icon svg {
  width: 100%;
  height: 100%;
  fill: black;
}
</style>
