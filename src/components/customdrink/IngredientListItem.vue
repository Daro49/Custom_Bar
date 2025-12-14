<template>
    <div class="ingredient_item_box" @click="toggleIngredient">
        <div class="info">
            <div class="checkbox" :class="{ 'checked': isSelected }"></div>
            <div class="ingredient_item_name">{{ props.ingredient }}</div>
        </div>

        <div class="slider" v-if="sizeAmountVisible">
            <div class="ingredient_item_name">{{ props.amount }} ml</div>
        </div>

        <div class="slider" v-else-if="isSelected && sliderVisible">
            <input type="range" min="1" :max="sliderMax" v-model.number="sliderValue" @click.stop="() => {}">
            <div class="number">
                <div class="ingredient_item_name">{{ displayAmount }} ml</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useDrinkRecipe } from '@/stores/drinkRecipe';
    import { computed, ref, watch } from 'vue';

    const props = defineProps({
        ingredient: String,
        currentCategory: String,
        amount: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: 'fuchsia'
        }
    })

    const store = useDrinkRecipe();

    const ML_AMOUNT = 20;
    const sliderValue = ref(1);
    const NO_SLIDER = ['sizes', 'bitters', 'others'];
    const SINGLE_SELECT = 'sizes';

    const isSelected = computed(() => {
        return store.selectedIngredients[props.currentCategory]?.[props.ingredient];
    })

    const displayAmount = computed(() => sliderValue.value * ML_AMOUNT)
    const remainingVolume = computed(() => store.remainingVolume)
    const maxSliderValue = computed(() => store.maxSliderValue)

    const sliderVisible = computed(() => {
        return !NO_SLIDER.includes(props.currentCategory);
    })

    const sizeAmountVisible = computed(() => {
        return props.currentCategory === SINGLE_SELECT;
    })

    const sliderMax = computed(() => {
        const currentValue = isSelected.value ? sliderValue.value : 0;
        return currentValue + maxSliderValue.value;
    })

    const canToggle = computed(() => {
        if (isSelected.value) {
            return true;
        }

        if (sliderVisible.value) {
            return remainingVolume.value >= ML_AMOUNT;
        }

        return true;
    })

    watch(() => props.ingredient,() => {
        if (props.currentCategory === 'sizes') {
            return;
        }

        const selection = store.selectedIngredients[props.currentCategory]?.[props.ingredient];

        if (selection) {
            sliderValue.value = selection.amount / ML_AMOUNT;
        }
        else {
            sliderValue.value = 1;
        }
    }, { immediate: true })

    watch(sliderValue, (newValue) => {
        if (isSelected.value) {
            updateStore(true, newValue);
        }
    })

    const updateStore = (selected, amount) => {
        const amountML = amount * ML_AMOUNT;

        store.updateIngredient({ 
            category: props.currentCategory,
            ingredient: props.ingredient,
            amount: amountML,
            color: props.color,
            isSelected: selected
        })
    }

    const toggleIngredient = () => {
        const newState = !isSelected.value;

        if (!isSelected.value && !canToggle.value) {
            console.warn("Glass capacity full!");
            return;
        }

        if (sizeAmountVisible.value && newState) {
            store.selectSingleSize({
                category: props.currentCategory,
                ingredient: props.ingredient,
                amount: props.amount
            })
        }
        else if (sizeAmountVisible.value && !newState) {
            store.deselectSingleSize(props.currentCategory)
        }
        else {
            updateStore(newState, sliderValue.value);
        }
    }
</script>

<style scoped>
    .ingredient_item_box {
        display: flex;
        flex-direction: row;
        height: 65px;
        width: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        align-items: center;

        border-radius: 20px;
        background: #D9D9D9;

        cursor: pointer;
    }

    .ingredient_item_box:hover {
        background: #d9d9d976;
        outline: 2px solid #552808;
    }

    .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        gap: 30px;
    }

    .slider {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 20px;
    }

    .number {
        width: 50%;
    }

    .checkbox {
        width: 30px;
        height: 30px;

        border-radius: 15px;
        border: 2px solid #000;
    }

    .checkbox.checked {
        background: #000;
    }

    .ingredient_item_name {
        display: flex;
        justify-content: center;

        color:#552808;
        font-family: "Josefin Slab", sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>