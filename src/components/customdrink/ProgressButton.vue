<template>
    <div class="button">
        <p>{{ props.buttonName }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        buttonName: String
    })
</script>

<style scoped>
    .button {
        display: flex;
        height: 65px;
        width: 100%;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        gap: 10px;

        border-radius: 20px;
        background: #D9D9D9;
    }

    p {
        color: #552808;
        text-align: center;
        font-family: "Josefin Slab", sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
</style>