<!--
*
* File:     ProgressBar.vue
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    UI Element for showing step progress on recipe
*
-->

<template>
    <div class="progress_bar">
        <ProgressCircle :category-name="'Size'" :is-active="isActive('sizes')" :is-done="isStepDone('sizes')" />
        <ProgressLine :is-done="isStepDone('sizes')" />

        <ProgressCircle :category-name="'Alcohol'" :is-active="isActive('alcohols')" :is-done="isStepDone('alcohols')" />
        <ProgressLine :is-done="isStepDone('alcohols')" />

        <ProgressCircle :category-name="'Non-Alcoholic'" :is-active="isActive('softDrinks')" :is-done="isStepDone('softDrinks')" />
        <ProgressLine :is-done="isStepDone('softDrinks')" />

        <ProgressCircle :category-name="'Bitters'" :is-active="isActive('bitters')" :is-done="isStepDone('bitters')" />
        <ProgressLine :is-done="isStepDone('bitters')" />

        <ProgressCircle :category-name="'Others'" :is-active="isActive('others')" :is-done="isStepDone('others')" />
    </div>
</template>

<script setup>
    import { useDrinkRecipe, STEPS } from '@/stores/drinkRecipe';
    import ProgressCircle from './ProgressCircle.vue';
    import ProgressLine from './ProgressLine.vue';

    const store = useDrinkRecipe();

    const getStep = (category) => STEPS.indexOf(category);
    const isStepDone = (category) => getStep(category) < store.currentStep;
    const isActive = (category) => getStep(category) == store.currentStep;
</script>

<style scoped>
    .progress_bar {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: -30px;
        align-self: stretch;
    }
</style>