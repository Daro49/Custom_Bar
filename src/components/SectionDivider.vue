<template>
  <div class="section-divider">
    <span class="line left"></span>
    <span class="circle"></span>
    <span class="line right"></span>
  </div>
</template>

<script>
export default {
  name: "SectionDivider",
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