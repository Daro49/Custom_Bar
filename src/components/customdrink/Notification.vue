<template>
    <Transition name="fade">
        <div v-if="notification.isVisible"
            :class="['container', `container-${notification.type}`]"
            @click="notification.hideNotification"
        >
            <p>{{ notification.message }}</p>
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
        
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 250px;
        text-align: center;
    }

    .container-warning {
        background-color: #ff9800;
    }

    .container-success {
        background-color: #4CAF50;
    }

    .container-fade-enter-from, .container-fade-leave-to {
        opacity: 0;
        transform: translateX(-50%) translateY(20px); 
    }

    .container-fade-enter-active, .container-fade-leave-active {
        transition: all 0.5s ease;
    }

    .container-fade-enter-to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
</style>