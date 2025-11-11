<template>
  <button>
    {{ props.category }}
  </button>
</template>

<script setup>
    const props = defineProps ({
        category: String
    })
</script>

<style scoped>
    .leftButton {
        display: flex;
        height: 78px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        align-self: stretch;

        border-radius: 0 50px 50px 0;
        background: #552808;
        color: #D4AF37;
    }

    .rightButton {
        display: flex;
        height: 78px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        align-self: stretch;

        border-radius: 50px 0 0 50px;
        background: #552808;
        color: #D4AF37;
    }
</style>