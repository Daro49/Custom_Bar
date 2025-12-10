<template>
    <div class="progress_in_recipe">
        <div class="circle"></div>

        <p>{{ progress_category.categoryName }}</p>
    </div>
</template>

<script setup>
    const progress_category = defineProps({
        categoryName: String
    })
</script>

<style scoped>
    .progress_in_recipe {
        display: flex;
        width: 125px;
        flex-direction: column;
        align-items: center;
        gap: -20px;
    }

    .circle {
        width: 50px;
        height: 50px;

        border-radius: 50px;
        background: #D9D9D9;
    }

    p {
        display: flex;
        height: 20px;
        flex-direction: column;
        justify-content: center;
        align-self: stretch;

        color: #552808;
        text-align: center;
        font-family: "Josefin Slab", sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>