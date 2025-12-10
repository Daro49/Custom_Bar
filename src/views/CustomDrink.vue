<template>
  <Header :avatar = "Profile"/>
  <div id="tied" @click="toggleShow">

    <div id="middlePanel">
      <!-- Left-side buttons -->
      <div class="ingredientButton">
        <CustomDrink_Button class="leftButton" @click.stop="showLeftPopup('alcohols')" :category="'alcohols'" />
        <CustomDrink_Button class="leftButton" @click.stop="showLeftPopup('softDrinks')" :category="'softDrinks'" />
      </div>

      <div class="ingredientPopup" :class="{ visible: leftPopup.visible }">
        <CustomDrink_Ingredient :visible="leftPopup.visible" :category="leftPopup.category" />
      </div>

      <div id="image">
        <CustomDrink_Glass />
      </div>

      <div class="ingredientPopup" :class="{ visible: rightPopup.visible }">
        <CustomDrink_Ingredient :visible="rightPopup.visible" :category="rightPopup.category" />
      </div>

      <!-- Right-side buttons -->
      <div class="ingredientButton">
        <CustomDrink_Button class="rightButton" @click.stop="showRightPopup('bitters')" :category="'bitters'" />
        <CustomDrink_Button class="rightButton" @click.stop="showRightPopup('others')" :category="'others'" />
      </div>
    </div>

    <!-- Floating Recipe button -->
    <button id="recipeButton" @click="toggleShowRecipe">
      RECIPE
    </button>
  </div>

  <div class="recipeListOverlay"
  v-if="showRecipe"
  @click.self="toggleShowRecipe"
  >
    <RecipeMenu :ingredient-list="recipe.ingredients"/>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

import CustomDrink_Button from '@/components/CustomDrink_Button.vue';
import CustomDrink_Glass from '@/components/CustomDrink_Glass.vue';
import CustomDrink_Ingredient from '@/components/CustomDrink_Ingredient.vue';
import RecipeMenu from '@/components/RecipeMenu.vue';

import { useDrinkRecipe } from '@/stores/drinkRecipe';
import Header from '@/components/Header.vue';
import Profile from '@/assets/user.png';

const recipe = useDrinkRecipe();

const showRecipe = ref(false);

function toggleShowRecipe() {
  leftPopup.visible &&= false
  rightPopup.visible &&= false
  showRecipe.value = !showRecipe.value
}

const leftPopup = reactive({
  visible: false,
  category: 'alcohols'
})

function toggleShow() {
  leftPopup.visible &&= false
  rightPopup.visible &&= false
}

const rightPopup = reactive({
  visible: false,
  category: 'bitters'
})

function showLeftPopup(category) {
  console.log('Left Menu: ' + leftPopup.visible)
  if (leftPopup.visible && leftPopup.category === category) {
    leftPopup.visible = false
  }
  else {
    rightPopup.visible &&= false
    leftPopup.visible = true
    leftPopup.category = category
    console.log('Switched to: ' + leftPopup.visible)
  }
}

function showRightPopup(category) {
  if (rightPopup.visible && rightPopup.category === category) {
    rightPopup.visible = false
  }
  else {
    leftPopup.visible &&= false
    rightPopup.visible = true
    rightPopup.category = category
  }
}
</script>

<style scoped>
  #tied {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding-top: 25px;
    padding-bottom: 120px;

    background: #0D564B;
  }

  #middlePanel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  }

  .ingredientButton {
    display: flex;
    width: 100px;
    height: 312px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  #recipeButton {
    position: absolute;
    bottom: 5%;
    width: 512px;
    height: 78px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    border-radius: 50px;
    background: #552808;
  }

  .recipeListOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .ingredientPopup {
    visibility: hidden;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .ingredientPopup.visible {
    visibility: visible;
    pointer-events: auto;
  }
</style>