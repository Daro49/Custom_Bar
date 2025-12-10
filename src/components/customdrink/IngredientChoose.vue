<template>
    <div class="ingredient_box">
        <h2>{{ props.category_name }}</h2>

        <IngredientListItem 
            v-for="ingredient in ingredients"
            :name="ingredient.name" 
        />
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import IngredientListItem from './IngredientListItem.vue';

    const props = defineProps({
        category_name: String
    })

    const recipe = useDrinkRecipe();

    const ingredients = ref([]);

    onMounted(async () => {
        ingredients.value = await recipe.fetchIngredients(props.category_name);
    })
</script>

<style scoped>

    .ingredient_box {
        display: flex;
        padding: 30px;
        flex-direction: column;
        align-items: flex-start;
        gap: 25px;
        align-self: stretch;

        border-radius: 50px;
        border: 2px solid #552808;
    }

    h2 {
        color: #552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

</style>