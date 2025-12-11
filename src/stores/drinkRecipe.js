import { defineStore } from "pinia";

const STEPS = ['sizes', 'alcohols', 'softDrinks', 'bitters', 'others'];

export const useDrinkRecipe = defineStore("recipe", {

    state: () => ({
        currentStep: 0,
        isLoading: false,
        ingredientsCache: {},
        selectedIngredients: {}
    }),

    getters: {
        currentCategory: (state) => STEPS[state.currentStep],
        currentStepIngredients: (state) => state.ingredientsCache[STEPS[state.currentStep]] || []
    },

    actions: {
        async fetchStepIngredients(category) {
            this.isLoading = true;

            try {
                const response = await fetch(`https://itu-wb12.onrender.com/${category}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                this.ingredientsCache[category] = data;
                
            }
            catch (error) {
                console.log(error)
            }
            finally {
                this.isLoading = false;
            }
        },

        toggleIngredient(id) {
            const category = this.currentStep;
            const selected = this.selectedIngredients[category];
            const index = selected.index(id);

            if (index > -1) {
                selected.splice(index, 1);
            }
            else {
                selected.push(id);
            }
        },

        nextStep() {
            if (this.currentStep < STEPS.length - 1) {
                this.currentStep++;
                this.fetchStepIngredients(this.currentCategory);
            }
        },

        previousStep() {
            if (this.currentStep > 0) {
                this.currentStep--;
            }
        },
    },
});


/*     const ingredientsCache = ref({})
    const ingredients = ref({});

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

    return { ingredients, ingredientsCache, addIngredient, removeIngredient, clearRecipe, fetchIngredients }; */