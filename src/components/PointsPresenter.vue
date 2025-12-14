<!--
/**
 * @file PointsPresenter.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief PointPresenter component
 */
-->

<script setup>
  import { activeUser } from "@/stores/Login"
</script>

<template>
  <div class="points">
    <div class="frame-wrapper">
      <div class="div">
        <div class="text-wrapper">Club points:</div>
        <div class="text-wrapper-2">{{ activeUserRef.points }}</div>
      </div>
    </div>
    <SectionDivider color="white" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import SectionDivider from '@/components/SectionDivider.vue'

export default defineComponent({
  name: 'PointsPresenter',
  components: {
    SectionDivider,
  },
  data() {
    return {
      activeUserRef: activeUser, 
    }
  },
})
</script>
<style>
.points {
  margin: 10px;
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  box-sizing: border-box;
}

.points .frame-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 20px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 
    inset 0 0 10px rgba(0, 0, 0, 0.7), 
    inset 0 0 0 4px var(--gold);
  outline: 10px solid var(--wood-dark, #5a3200);
  outline-offset: 5px;
  border: 1px solid var(--gold);
}

.points .div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.points .text-wrapper {
  color: #ffffff;
  font-family: 'Century Schoolbook', Helvetica;
  font-size: 34px;
  text-align: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8); 
}

.points .text-wrapper-2 {
  background: var(--headerv2);
  -webkit-text-fill-color: transparent;
  font-family: 'Century Schoolbook', Helvetica;
  font-size: 38px;
  text-align: center;
}
</style>
