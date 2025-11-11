import { ref } from "vue";
import { defineStore } from "pinia";

export const useDrinkRecipe = defineStore("recipe", () => {
    const ingredientsCache = ref({})
    const ingredients = ref([]);

    function addIngredient(ingredient) {
            this.ingredients.push(ingredient);
    }

    function removeIngredient(index) {
        this.ingredients.splice(index, 1);
    }

    function clearRecipe() {
        this.ingredients = [];
    }

    async function fetchIngredients(category) {
        if (ingredientsCache.value[category]) {
            return ingredientsCache.value[category]
        }

        try {
            const response = await fetch(`https://itu-wb12.onrender.com/${category}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log(`${category} ingredients loaded`)
            for (const items of data) {
                console.log(items.name)
            }
            ingredientsCache.value[category] = data
            return data

        } catch (error) {
            console.log(error)
        }
    }

    return { ingredients, ingredientsCache, addIngredient, removeIngredient, clearRecipe, fetchIngredients };
})