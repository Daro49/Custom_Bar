<template>
  <div class="section-divider">
    <span class="line left" :style="{ backgroundColor: color }"></span>
    <span class="circle" :style="{ backgroundColor: color }"></span>
    <span class="line right" :style="{ backgroundColor: color }"></span>
  </div>
</template>

<script>
export default {
  name: "SectionDivider",
  props:{
    color: { type: String, default: "white"},
  }
};
</script>

<style>
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  margin: 20px 0;
}

.section-divider .line {
  flex: 1;
  height: 2px;
  background-color: white;
}

.section-divider .circle {
  width: 16px;
  height: 16px;
  background-color: white;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>