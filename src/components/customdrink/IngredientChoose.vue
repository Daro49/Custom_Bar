<template>
    <div class="ingredient_box">
        <h2>{{ headerText }}</h2>

        <IngredientListItem 
            v-for="ingredient in recipe.currentStepIngredients"
            :name="ingredient.name" 
            :key="ingredient.id"
        />
    </div>
</template>

<script setup>
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import IngredientListItem from './IngredientListItem.vue';
    import { computed, onMounted } from 'vue';

    const recipe = useDrinkRecipe();

    onMounted(() => {
        recipe.fetchStepIngredients(recipe.currentCategory)
    })

    const headerText = computed(() => {
        switch (recipe.currentStep) {
            case 0:
                return 'Size of Glass';
        
            case 1:
                return 'Choose Alcohol';

            case 2:
                return 'Choose Non-Alcohol';

            case 3:
                return 'Choose Bitters';

            case 4:
                return 'Choose Other Addons';
            default:
                return 'Unkown Category';
        }
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
        margin: 5px;

        color: #552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }

</style>