<script setup>
import Header from '@/components/Header.vue';
import { useRoute } from 'vue-router';
import Profile from '@/assets/user.png';
import { getPackageById } from '@/stores/CSModels/Packages'
import { ref, onMounted } from 'vue';
import { pkg } from '@/stores/CSModels/Packages'

const route = useRoute();
const packageId = route.params.pkgId;
let loaded = ref(false);

onMounted(async () => {
    const success = await getPackageById(packageId);
    loaded.value = success;
});
</script>

<template>
    <div class="package-details-root">
        <Header :previous="true" :avatar="Profile"/>
        <div class="package-details" v-if="loaded">
        <div class="card">
            <div class="details-content">
                <div class="package-name">{{ pkg.name }}</div>
                <div class="package-image">
                    <img :src="pkg.imgurl" alt="Package Image" />
                </div>
                    <div class="package-price">Price: {{ pkg.price }}</div>
                <div class="package-description" >{{ pkg.description }}</div>
            </div>
        </div>
        </div> 
        <div v-else class = "package-loading">
            <div>Loading...</div>
        </div>
    </div> 
</template>

<style>
* {
  box-sizing: border-box; 
}

.package-details-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.package-details {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%; 
  overflow-y: auto;
  padding: 20px;
  align-items: center;
  width: 100%;
}

.package-loading {
  justify-content: center;
  font-size: 24px;
  color: white;
  display: flex;
}

.package-details .card {
  width: 100%;
  height: 100%;
  align-items: center;
}

.details-content {
  background: var(--wood);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.5), 
    inset 0 0 20px rgba(0, 0, 0, 0.3);
  border: 2px solid #5a3200;
  align-items: center;
  width: 80%; 
  height: 100%;
  margin: 0 auto;

  outline: 1px solid #c9c3b8; 
  outline-offset: -5px;
}

.package-name {
  text-align: center;
  font-family: Bebas Neue;
  font-size: 48px;
  color: white;
  margin-bottom: 8px;
  width: 100%;
  border-radius: 6px;
  background-color: #8f4101;
  align-self: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px 0; 
}

.package-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  
  height: 50%;
  aspect-ratio: 4 / 3; 
  
  overflow: hidden;
  border-radius: 10px;
  position: relative; 
}
.package-image img {
  width: 100%;
  height: 100%;
  
  object-fit: cover; 
  
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
}

.details-content .package-price {
    font-size: 32px; 
    margin-bottom: 10px;
    color: #ffc107; 
    font-family: Georgia, serif; 
    font-weight: bold;
    text-align: center;
}

.details-content .package-description {
  font-size: 24px;
  line-height: 1.6; 
  color: #f0f0f0; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  text-align: center;
}
</style>