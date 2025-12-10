<template>
    <div class="ingredient_box">
        <h2>{{ props.category_name }}</h2>
        <div v-for="ingredient in ingredients">
            <IngredientListItem :name="ingredient.name" />
        </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import IngredientListItem from './IngredientListItem.vue';

    const props = defineProps({
        category_name: String
    })

    const recipe = useDrinkRecipe();

    const ingredients = ref([]);

    onMounted(async () => {
        ingredients.value = await recipe.fetchIngredients(ingredient_category.name);
    })
</script>

<style scoped>

    .ingredient_box {
        display: flex;
        height: 675px;
        padding: 30px;
        flex-direction: column;
        align-items: flex-start;
        gap: 25px;
        align-self: stretch;

        border-radius: 50px;
        border: 2px solid #552808;
    }

</style>