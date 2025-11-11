<template>
  <div class="progress-bar">
    <div class="fill" :style="{ width: progress + '%' }" />
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: { type: Number, default: 0 },
  },
}
</script>

<style>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: white;
  border: 2px solid #000;
  border-radius: 6px;
  box-sizing: border-box;
}

.fill {
  height: 100%;
  background: var(--progress-bar-green);
  border-radius: 6px;
  transition: width 0.3s ease-in-out;
}
</style>
