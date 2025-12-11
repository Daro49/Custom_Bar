<template>
    <div class="ingredient_list">
        <h3>{{ props.category_name }}</h3>
        <p>{{ ingredientsString }}</p>
    </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        category_name: String,
        ingredients: Array
    })

    const ingredientsString = computed(() => {
        if (!props.ingredients || props.ingredients.length == 0) {
            return 'Not selected'
        }
        else {
            return props.ingredients.join(', ')
        }
    })
</script>

<style scoped>
    .ingredient_list {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        border-top: 1px solid #552808;
    }

    h3 {
        margin-top: 5px;
        margin-bottom: 0px;
        margin-left: 2px;

        color: #552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

    p {
        margin: 5px;
        margin-left: 2px;

        color: #552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>