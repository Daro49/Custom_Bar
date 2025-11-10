<template>
  <div id="tied">

    <div id="middlePanel">
      <!-- Left-side buttons -->
      <div class="ingredientButton">
        <CustomDrink_Button class="leftButton"/>
        <CustomDrink_Button class="leftButton"/>
      </div>

      <div id="image">
        <CustomDrink_Glass />
      </div>

      <!-- Right-side buttons -->
      <div class="ingredientButton">
        <CustomDrink_Button class="rightButton"/>
        <CustomDrink_Button class="rightButton"/>
      </div>
    </div>

    <!-- Floating Recipe button -->
    <button id="recipeButton">
      RECIPE
    </button>
  </div>
</template>

<script setup>
import CustomDrink_Button from '@/components/CustomDrink_Button.vue';
import CustomDrink_Glass from '@/components/CustomDrink_Glass.vue';
</script>

<style scoped>
  #tied {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    padding-top: 120px;
    padding-bottom: 120px;
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
</style>