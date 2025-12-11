<template>
    <div class="ingredient_item_box" @click="isSelected = !isSelected">
        <div class="info">
            <div class="checkbox" :class="{ 'checked': isSelected }"></div>
            <div class="ingredient_item_name">{{ ingredient.name }}</div>
        </div>
        <div class="slider" v-if="isSelected">
            <input type="range" min="1" max="25" value="5" v-model.number="sliderValue" @click.stop="() => {}">
            <div class="number">
                <div class="ingredient_item_name"></div>
                <div class="ingredient_item_name">{{ sliderValue*20 }} ml</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const ingredient = defineProps({
        name: String
    })

    const isSelected = ref(false);

    const sliderValue = ref(12);
</script>

<style scoped>
    .ingredient_item_box {
        display: flex;
        flex-direction: row;
        height: 65px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        align-items: center;

        border-radius: 20px;
        background: #D9D9D9;
    }

    .ingredient_item_box:hover {
        background: #d9d9d976;
        outline: 2px solid #552808;
    }

    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 30px;
    }

    .slider {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 20px;
    }

    .number {
        width: 50%;
    }

    .checkbox {
        width: 30px;
        height: 30px;

        border-radius: 15px;
        border: 2px solid #000;
    }

    .checkbox.checked {
        background: #000;
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