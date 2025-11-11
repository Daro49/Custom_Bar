<template>
    <div class="popup">
        <div v-for="ingredient in ingredients"
        :key="ingredient.name"
        class="ingredient"
        @click="addToRecipe(ingredient.name)"
        >
            {{ ingredient.name }}
        </div>
    </div>
</template>

<script setup>
import { useDrinkRecipe } from '@/stores/drinkRecipe';
import { watch, ref } from 'vue';

const props = defineProps({
    category: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    }
})

const recipe = useDrinkRecipe();

const ingredients = ref([])

watch(
  () => props.visible,
  async (newVal) => {
    if (newVal) {
      ingredients.value = await recipe.fetchIngredients(props.category)
      console.log(ingredients.value)
    }
  },
  { immediate: false }
)

function addToRecipe(ingredient){
    console.log("Added to recipe: " + ingredient);
    recipe.addIngredient(ingredient);
}

</script>

<style scoped>
    .popup {
        display: flex;
        width: 400px;
        height: 650px;
        padding: 30px 40px;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        gap: 45px;
        flex-wrap: wrap;
        overflow-y: auto;

        border-radius: 50px;
        background: linear-gradient(180deg, #FEBC2F 0%, #D5B36F 40.87%, #B37606 100%);
    }

    .ingredient {
        display: flex;
        width: 125px;
        height: 175px;
        /* flex-direction: column; */
        justify-content: center;
        align-items: center;
        gap: 25px;
        flex-shrink: 0;

        border-radius: 50px;
        background: #0D564B;
        color: #D4AF37;
    }
</style>