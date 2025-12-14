<!--
*
* File:     BarMap.vue
* Author:   Matej Marušinec (xmarusm00@stud.fit.vut.cz)
* This component renders the interactive bar map view, including map navigation, table selection, and the slide panel for table details.
* It integrates with the BarMap store logic and emits events for table selection and map navigation.
*
-->
<template>
  <Header :rightIcon="cart" :rightFunction="order" :previous="true" :isCart="true">
      <template #title>
      <span class="custom-title">{{ currentMap }}</span>
    </template>
  </Header>
  <div class="horizontal-center-parent">
    <SlidePanel class="slide-up-table-layout" :currentMap="currentMap" @navigate="switchMap" @close="closeSlidePanel" />
    <component :is="mapComponents[currentMap]" :selectedTable="selectedTable" @selectTable="selectTable" @navigate="switchMap" @close="closeSlidePanel" />
</div>
</template>

<script>
import options from '@/stores/BarMap.js';
export default options;
</script>

<style>
.horizontal-center-parent {
  display: flex;
  justify-content: center;
  width: 100%;
}

.slide-up-table-layout {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.custom-title {
  flex-grow: 1;
  text-align: center;
  color: black;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>