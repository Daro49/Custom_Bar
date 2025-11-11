<template>
  <div class="frame">
    <div class="milestone-card">
      <div class="text">
        {{ text }}
      </div>
      <ProgressBar :progress="progress" />
    </div>
    <div class="milestone-label">
      <div class="text">
        {{ reward }}
      </div>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'MilestonesView',
  components: {
    ProgressBar,
  },
  props: {
    text: { type: String, required: true },
    progress: { type: Number, default: 0 },
    reward: { type: Number, required: true },
  },
}
</script>

<style>
.frame {
  display: flex;
  flex-direction: column;
  width: 90%;
}

.milestone-card {
  margin-top: 20px;
  border-radius: 10px 10px 0 10px;
  width: 100%;
  border: 2px solid black;
  background-color: var(--wood);
  height: 150px;
  font-size: 16px;
  font-family: var(--button-font-family);
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  display: flex;
}

.milestone-label {
  border: 2px solid black;
  height: 40px;
  align-self: flex-end;
  background: var(--headerv2);
  font-family: var(--button-font-family);
  font-size: 20px;
  font-weight: bold;
  width: 20%;
  justify-content: center;
  display: flex;
  margin-bottom: 50px;
}

.milestone-card .text {
  color: var(--gold);
  align-self: flex-start;
  margin-left: 20px;
  margin-bottom: 20px;
}

.milestone-label .text {
  color: var(--background-green);
}
</style>
