import { defineStore } from "pinia";

const ML_AMOUNT = 20;
export const STEPS = ['sizes', 'alcohols', 'softDrinks', 'bitters', 'others'];

export const useDrinkRecipe = defineStore("recipe", {

    state: () => ({
        currentStep: 0,
        isLoading: false,
        ingredientsCache: {},
        selectedIngredients: {}
    }),

    getters: {
        currentCategory: (state) => STEPS[state.currentStep],
        currentStepIngredients: (state) => state.ingredientsCache[STEPS[state.currentStep]] || [],

        getSelectedIngredients: (state) => (category) => {
            const selected = state.selectedIngredients[category];

            // No selected ingredients in this category
            if (!selected) {
                return [];
            }

            const ingredientsArray = Object.values(selected);

            return ingredientsArray.map(item => {
                if (category === 'bitters' || category === 'others') {
                    return item.name;
                }
                return `${item.name} (${item.amount} ml)`;
            })
        },

        maxCapacity: (state) => {
            const sizes = state.selectedIngredients['sizes'];

            if (!sizes) {
                return 0;
            }

            const value = Object.values(sizes)[0];

            return value ? value.amount : 0;
        },

        currentVolume: (state) => {
            let totalVolume = 0;
            const include = ['alcohols', 'softDrinks'];

            for (const category in state.selectedIngredients) {
                if (include.includes(category)) {
                    const ingredients = state.selectedIngredients[category]

                    for (const ingredient in ingredients) {
                        totalVolume += ingredients[ingredient].amount;
                    }
                }
            }
            return totalVolume;
        },

        remainingVolume() {
            const max = this.maxCapacity;
            const current = this.currentVolume;

            return Math.max(0, max - current);
        },

        maxSliderValue() {
            return Math.floor(this.remainingVolume / ML_AMOUNT);
        }
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

        updateIngredient({ category, ingredient, amount, isSelected }) {
            if (!this.selectedIngredients[category]) {
                this.selectedIngredients[category] = {};
            }

            const selectedCategory = this.selectedIngredients[category];

            if (isSelected) {
                selectedCategory[ingredient] = { name: ingredient, amount: amount };
            }
            else {
                delete selectedCategory[ingredient];

                if (Object.keys(selectedCategory).length == 0) {
                    delete this.selectedIngredients[category];
                }
            }
        },

        selectSingleSize({ category, ingredient, amount }) {
            this.selectedIngredients[category] = {}

            this.selectedIngredients[category][ingredient] = {
                name: ingredient,
                amount: amount
            }
        },

        deselectSingleSize(category) {
            delete this.selectedIngredients[category];
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
