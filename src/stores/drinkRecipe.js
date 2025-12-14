/**
* File:     drinkRecipe.js
* Author:   Matej Daransky (xdaranm00@stud.fit.vut.cz)
*
* Brief:    Model for Custom Drink Recipe maker
*/

import { defineStore } from "pinia";
import { useNotificationStore } from "./notificationStore";
import { activeUser } from "./Login";
import { addToast } from "./ToastStore";

const ML_AMOUNT = 20;
const API_URL = "https://itu-wb12.onrender.com";

export const STEPS = ['sizes', 'alcohols', 'softDrinks', 'bitters', 'others'];

export const useDrinkRecipe = defineStore("recipe", {

    state: () => ({
        currentStep: 0,
        isLoading: false,
        drinkName: '',
        drinkDescription: '',
        ingredientsCache: {},
        selectedIngredients: {}
    }),

    getters: {
        currentCategory: (state) => STEPS[state.currentStep],
        currentStepIngredients: (state) => state.ingredientsCache[STEPS[state.currentStep]] || [],

        isLastStep: (state) => {
            return state.currentStep === STEPS.length - 1;
        },

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

        sizeSelected: (state) => {
            return Object.keys(state.selectedIngredients['sizes'] || {}).length === 1;
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
            return Math.max(0, this.maxCapacity - this.currentVolume);
        },

        maxSliderValue() {
            return Math.floor(this.remainingVolume / ML_AMOUNT);
        },

        liquidLayers() {
            const maxCapacity = this.maxCapacity;

            if (maxCapacity === 0) return [];
            
            let layers = [];
            const include = ['alcohols', 'softDrinks'];

            let cumulativePercentage = 0;

            for (const category in this.selectedIngredients) {
                if (include.includes(category)) {
                    const ingredients = this.selectedIngredients[category];

                    for (const ingredient in ingredients) {
                        const item = ingredients[ingredient];

                        const percentage = (item.amount / maxCapacity) * 100;

                        layers.push({
                            color: item.color,
                            start: cumulativePercentage,
                            end: cumulativePercentage + percentage
                        })

                        cumulativePercentage += percentage;
                    }
                }
            }

            return layers;
        },

        customDrinkRecipePayload: (state) => {
            let ingredients = [];

            for (const category in state.selectedIngredients) {
                if (category !== 'sizes') {
                    const ing = state.selectedIngredients[category]

                    ingredients = ingredients.concat(Object.keys(ing));
                }
            }

            return {
                name: state.drinkName,
                description: state.drinkDescription,
                ingredients: ingredients,
                username: activeUser.value.username
            }
        }
    },

    actions: {
        async fetchStepIngredients(category) {
            this.isLoading = true;

            try {
                const response = await fetch(`${API_URL}/${category}`)

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

        async postDrinkRecipe() {
            const notification = useNotificationStore();

            const payload = this.customDrinkRecipePayload;

            if (!payload.name) {
                notification.showNotification("Your drink has to have a name!", 'warning');
                return false;
            }
            else if (payload.ingredients.length === 0) {
                notification.showNotification("Choose at least one ingredient!", 'warning');
                return false;
            }

            try {
                const response = await fetch(`${API_URL}/addcustomDrinks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }

                const data = await response.json();

                return true;
            }
            catch (error) {
                notification.showNotification(error, 'warning');
                return false;
            }
        },

        updateIngredient({ category, ingredient, amount, color, isSelected }) {
            if (!this.selectedIngredients[category]) {
                this.selectedIngredients[category] = {};
            }

            const selectedCategory = this.selectedIngredients[category];

            if (isSelected) {
                if (category === 'alcohols' || category === 'softDrinks') {
                    selectedCategory[ingredient] = { name: ingredient, amount: amount, color: color };
                }
                else {
                    selectedCategory[ingredient] = { name: ingredient, amount: amount };
                }
            }
            else {
                delete selectedCategory[ingredient];

                if (Object.keys(selectedCategory).length == 0) {
                    delete this.selectedIngredients[category];
                }
            }
        },

        selectSingleSize({ category, ingredient, amount }) {

            const currentVolume = this.currentVolume;

            const existingSize = Object.keys(this.selectedIngredients['sizes'] || {})[0];

            if (amount < currentVolume ) {
                this.resetWithSize();
            }

            this.selectedIngredients[category] = {}

            this.selectedIngredients[category][ingredient] = {
                name: ingredient,
                amount: amount
            }
        },

        deselectSingleSize(category) {
            delete this.selectedIngredients[category];
        },

        resetWithSize() {
            const currentSize = this.selectedIngredients['sizes'] || {};

            this.selectedIngredients = {};

            this.selectedIngredients['sizes'] = currentSize;
        },

        nextStep() {
            if (this.currentCategory === 'sizes') {
                if (!this.sizeSelected) {
                    const store = useNotificationStore();

                    store.showNotification("Size must be chosen", 'warning');

                    return;
                }
            }

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

        setName(name) {
            this.drinkName = name;
        },

        setDescription(desc) {
            this.drinkDescription = desc;
        },

        informUser() {
            addToast(`Drink '${this.drinkName}' was created!`);
        },

        resetRecipe() {
            this.$reset();
        }
    },
});
