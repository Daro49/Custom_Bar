<template>
    <div class="progress_in_recipe">
        <div :class="['circle', circleClass]"></div>

        <p>{{ props.categoryName }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        categoryName: String,
        isDone: Boolean,
        isActive: Boolean
    })

    const circleClass = computed(() => {
        if (props.isActive) {
            return 'circle--active';
        }
        else if (props.isDone) {
            return 'circle--done';
        }
        else {
            return 'circle';
        }
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
        box-sizing: border-box;

        border-radius: 50px;
        background: #D9D9D9;
    }

    .circle--active {
        border: 3px solid #552808;
    }

    .circle--done {
        background-color: #552808;
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