<template>
    <div class="ingredient_item_box">
        <div class="checkbox"></div>
        <div class="ingredient_item_name">{{ ingredient.name }}</div>
    </div>
</template>

<script setup>
    const ingredient = defineProps({
        name: String
    })
</script>

<style scoped>
    .ingredient_item_box {
        display: flex;
        height: 65px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        align-items: center;
        gap: 30px;

        border-radius: 20px;
        background: #D9D9D9;
    }

    .checkbox {
        width: 30px;
        height: 30px;

        border-radius: 15px;
        border: 2px solid #000;
    }

    .ingredient_item_name {
        display: flex;
        justify-content: center;

        color:#552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>