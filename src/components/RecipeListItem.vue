<template>
    <div class="ingredient">
        {{ name.ingredientName }}
    </div>
</template>

<script setup>
    const name = defineProps({
        ingredientName: String
    })
</script>

<style>
    .ingredient {
        display: flex;
        width: 650px;
        height: 50px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        border-radius: 25px;
        background: #513C2C;
        color: #D4AF37;
    }
</style>