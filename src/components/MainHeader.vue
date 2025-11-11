<template>
    <header class="header">
        <button
            v-if="route.name !=='main'"
            class="back-btn"
            @click="goHome"
        >
        Main menu
        </button>
        <RouterLink to="/profile" class="profile-link">
            profile
        </RouterLink>    
    </header>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #D4AF37;
    color: black;
    text-align: center;
    padding: 12px 16px; 
}

.back-btn {
    background-color: #222;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-weight: bold;
}
</style>
