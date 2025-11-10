<template>
    <header class="header">
        <button
            v-if="showBack"
            class="back-btn"
            @click="goHome"
        >
        <- Main menu
        </button>
        <RouterLink to="/profile" class="profile-link">
            profile
        </RouterLink>    
    </header>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #D4AF37;
    color: black;
    text-align: center;
    padding: 12px 16px;
}
</style>
