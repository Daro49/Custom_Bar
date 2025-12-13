<script setup>
import SectionDivider from '@/components/SectionDivider.vue'
import { useRouter } from 'vue-router'
import { defineProps, ref } from 'vue'
import { processPackageOrder } from '@/stores/CSModels/Packages'
import { activeUser } from '@/stores/Login'

const router = useRouter()
let errorMessage = ref('');
let isError = ref(false);

const props = defineProps({
  pkg : {type: Object, required: true},
})

function goToDetails() {
  router.push({
    name: 'package_details',
    params: { pkgId: props.pkg.id }
  })
}

const order = async () => {
  await processPackageOrder(
    props.pkg
  );
};
</script>

<template>
  <div class="package-card" @click="goToDetails">
    <div class="package-text-frame">
      <p class="package-text">{{ pkg.name }}</p>
    </div>
    <SectionDivider/>
    <div class="package-img">
      <img :src="pkg.imgurl"/>
    </div>

    <div class="package-price">
      <span class="price-label">Price:</span>
      <span class="price-value">{{ pkg.price }}</span>
    </div>
    <button class="order-package" @click.stop = "order">
      Click here to order
    </button>
    <Transition name="fade">
      <p v-if="errorMessage" :class="{'error-message': isError, 'success-message': !isError}">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.package-card {
  background: var(--wood);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 60%;
  height: 600px;
  max-height: 30%;
  border: 3px solid;
  border-color: black;
  box-shadow:
    -50px -50px 2px -40px var(--gold),
    50px 50px 2px -40px var(--gold);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 33px;
}


.package-card:hover {
  box-shadow: 0 0 10px var(--gold);
  transform: scale(1.05);
  transition: transform 0.3s, box-shadow 0.3s;
}
.package-img {
  width: 95%;
  border-radius: 12px;
  padding: 3px;
  background: conic-gradient(from 0deg, #ff7ab6, #7c5cff, #2dd4bf, #ff7ab6);
  background-size: 800% 800%;
  overflow: hidden;
  box-sizing: border-box;
  flex-grow: 0;       
  flex-shrink: 0;   
  height: 50%;  
}

.package-card .order-package {
  font-family: var(--button-font-family);
  font-size: 24px;
  color: white;
  background-color: #034909;
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: auto;
  border: solid 2px black;
  box-shadow: 
    2px 2px 0px 0px black;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.package-card .order-package:hover {
  box-shadow: 
    4px 4px 0px 0px black;
  transition: transform 0.2s, box-shadow 0.2s;
}
.package-img:hover {
  animation: gradientShift 2s ease infinite;
}

.package-img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 9px;
  background: #fff; 
}

.package-text-frame {
  text-align: center;
  font-family: var(--button-font-family);
  font-size: 34px;
  color: white;
  margin-bottom: 8px;
  width:  100%;
  border-radius: 6px;
  background-color: #8f4101;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  25% { background-position: 50% 50%; }
  50% { background-position: 100% 50%; }
  75% { background-position: 50% 50%; }
  100% { background-position: 0% 50%; }
}

.package-price {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-family: var(--button-font-family);
  font-size: 34px;
  color: white;
}

.price-label {
  font-weight: 500;
}

.price-value {
  font-weight: 700;
  color: var(--gold);
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
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
