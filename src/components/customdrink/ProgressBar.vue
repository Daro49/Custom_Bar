<template>
    <div class="progress_bar">
        <ProgressCircle :category-name="'Size'" />
        <ProgressLine />
        <ProgressCircle :category-name="'Alcohol'" />
        <ProgressLine />
        <ProgressCircle :category-name="'Non-Alcoholic'" />
        <ProgressLine />
        <ProgressCircle :category-name="'Bitters'" />
        <ProgressLine />
        <ProgressCircle :category-name="'Others'" />
    </div>
</template>

<script setup>
import ProgressCircle from './ProgressCircle.vue';
import ProgressLine from './ProgressLine.vue';
</script>

<style scoped>
    .progress_bar {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: -30px;
        align-self: stretch;
    }
</style>