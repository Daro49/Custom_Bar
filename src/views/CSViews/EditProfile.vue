<script setup>
import Check from '@/assets/check.svg?raw';
import Header from '@/components/Header.vue';
const email = "amir@gmail.com";
const phone = "+45 12345678";
</script>

<template>
  <div class="edit-profile">
    <Header :right-icon="Check" :right-function="save"/>
    <div class = "frame">
      Email:
      <input class = "input-frame" v-model:="email"/>
    </div>
    <div class = "frame">
      Phone:
      <input class = "input-frame" v-model:="phone"/>
    </div>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: "EditProfile",
  components: {
    Header
  },
  methods: {
    save() {
      // Save profile changes logic here
      router.push({ name: 'profile' });
    }
  } 
}
</script>

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