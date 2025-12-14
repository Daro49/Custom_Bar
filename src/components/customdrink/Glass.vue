<template>
    <div class="glass">
        <GlassLiquid />
    </div>
</template>

<script setup lang="ts">
    import GlassLiquid from './GlassLiquid.vue';
</script>

<style>
    .glass {
        width: 280px;
        height: 360px;

        position: relative;

        border-radius: 10px 10px 100px 100px;
        background: rgba(255, 255, 255, 0.40);
        border: 1px solid #552808;
        overflow: hidden;
    }
</style>