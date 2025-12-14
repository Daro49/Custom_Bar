<!--
*
* File:     RecipeIngredientList.vue
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Recipe List showing user what ingredients were selected
*
-->

<template>
    <RecipeIngredientListItem
        v-for="category in CATEGORIES"
        :key="category.key"
        :category_name="category.name"
        :ingredients="store.getSelectedIngredients(category.key)"
    />
</template>

<script setup>
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import RecipeIngredientListItem from './RecipeIngredientListItem.vue';

    const store = useDrinkRecipe();

    const CATEGORIES = [
        { key: 'sizes', name: 'Size' },
        { key: 'alcohols', name: 'Alcohol' },
        { key: 'softDrinks', name: 'Non-Alcoholic' },
        { key: 'bitters', name: 'Bitters' },
        { key: 'others', name: 'Others' }
    ];
</script>