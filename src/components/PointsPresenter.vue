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
  border: 10px dashed var(--gold);
  width: 100%;
  box-sizing: border-box;
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
  font-size: 24px;
  text-align: center;
}

.points .text-wrapper-2 {
  background: var(--headerv2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Century Schoolbook', Helvetica;
  font-size: 24px;
  text-align: center;
}
</style>
