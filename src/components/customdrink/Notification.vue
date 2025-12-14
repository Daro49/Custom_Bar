<!--
*
* File:     Notification.vue
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Popup notification to inform user
*
-->

<template>
    <Transition name="fade">
        <div v-if="notification.isVisible"
            :class="['container', `container-${notification.type}`]"
            @click="notification.hideNotification"
        >
            <p><b>{{ notification.message }}</b></p>
        </div>
    </Transition>
</template>

<script setup>
    import { useNotificationStore } from '@/stores/notificationStore';
    import { onUnmounted } from 'vue';

    const notification = useNotificationStore();

    onUnmounted(() => {
        if (notification.timeout) {
            clearTimeout(notification.timeout);
        }
    })
</script>

<style scoped>
    .container {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        top: 20px;
        
        padding: 12px 40px;
        border-radius: 50px;
        background-color: #D4AF37;
        border: 2px solid #552808;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 250px;
        text-align: center;
    }

    .container-warning {
        color: #7b2424;
    }

    .container-success {
        color: #0d564b;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px); 
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .fade-enter-to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }

    p {
        font-size: 1.5rem;
		font-family: "Josefin Slab", sans-serif;
    }
</style>