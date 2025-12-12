<script setup>
import { ref } from 'vue'
import router from '@/router'
import { login } from '@/stores/Login.js';

const username = ref('')
const error = ref('')

async function loginHandle() {
  const success = await login(username.value);
  if (success) {
    error.value = '';
    router.push({ name: 'main' });
  } else {
    error.value = 'Login failed.';
    alert('Login failed. Please try again.');
  }
}
</script>

<template>
  <div class="login">
    <h1>Welcome to Custom Bar 🍸</h1>
    <input v-model="username" placeholder="Enter your username" class="input" />
    <button @click="loginHandle" class="btn">Login</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--background-green);
  color: white;
  font-family: var(--profile-font-family);
}

.input {
  padding: 10px;
  border-radius: 8px;
  border: none;
  width: 240px;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
}

.btn {
  margin-top: 20px;
  background: var(--gold);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
