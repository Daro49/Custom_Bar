<!--
*
* File:     GlassLiquid.vue
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Computes color layers of glass (Glass.vue) by colors of the selected liquids
*
-->

<template>
    <div class="liquid" :style="liquidStyle"></div>
</template>

<script setup>
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import { computed } from 'vue';

    const store = useDrinkRecipe();


    /**
     * Compute the linear gradient of colors of the drink
     */
    const liquidStyle = computed (() => {
        const layers = store.liquidLayers;

        if (layers.length === 0) {
            return { height: '0%' };
        }

        const gradient = [];
        let currentStop = 0;

        layers.forEach(layer => {
            gradient.push(
                `${layer.color} ${layer.start}%`,
                `${layer.color} ${layer.end}%`
            )
            currentStop = layer.end;
        });

        if (currentStop < 100) {
            gradient.push(`transparent ${currentStop}%`);
        }

        return {
            height: `95%`,
            backgroundImage: `linear-gradient(to top, ${gradient})`
        }
    })
</script>

<style scoped>
    .liquid {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;

        border-radius: 0 0 100px 100px;
    }
</style>