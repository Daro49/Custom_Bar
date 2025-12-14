<template>
  <div class="milestone-container" :class="{ 'completed-glow': progress >= goal }">
    <div class="inner-border">
      
      <div class="card-header">
        <h3 class="milestone-tag">{{ tag }}</h3>
        <div class="reward-box">
          <span class="reward-amount">{{ reward }}</span>
        </div>
      </div>

      <p class="milestone-text">{{ text }}</p>

      <div class="progress-area">
        <ProgressBar :progress="(progress / goal) * 100" />
        <div class="progress-labels">
          <span class="count">{{ (progress).toFixed(2) }} / {{ (goal).toFixed(2) }}</span>
          <span class="count" v-if="claimed">Claimed</span>
          <span class="percent">{{ Math.round((progress / goal) * 100) }}%</span>
        </div>
      </div>
      <button 
          v-if="progress >= goal && !claimed" 
          class="claim-button" 
          @click="$emit('claim')"
        >
        CLAIM REWARD
      </button>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar.vue'

export default {
  name: 'MilestoneCard',
  components: {
    ProgressBar,
  },
  props: {
    tag: { type: String, default: 'Milestone' },
    text: { type: String, required: true },
    progress: { type: Number, default: 0 },
    reward: { type: Number, required: true },
    goal: { type: Number, required: true },
    claimed: { type: Boolean, default: false }
  },
  emits: ['claim']
}
</script>

<style scoped>
.milestone-container {
  width: 90%;
  background-color: var(--wood);
  padding: 12px;
  border: 3px solid #222;
  border-radius: 12px;
  margin-bottom: 25px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
  position: relative;
}

.inner-border {
  border: 1px solid var(--gold);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.milestone-tag {
  color: var(--gold);
  font-family: 'Serif', serif;
  font-size: 1.3rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px black;
}

.reward-box {
  background: var(--headerv2);
  border: 1px solid var(--gold);
  padding: 4px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.reward-amount {
  color: var(--background-green);
  font-weight: 1000;
  font-size: 24px;
  line-height: 1;
}


.milestone-text {
  color: #f0f0f0;
  font-size: 20px;
  line-height: 1.4;
  margin: 5px 0 15px 0;
  text-align: left;
  font-style: italic;
}

.progress-area {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-family: var(--button-font-family);
  font-size: 0.8rem;
  color: var(--gold);
  font-weight: bold;
}

.completed-glow {
  border-color: var(--gold);
  box-shadow: 0 0 30px rgba(212, 167, 74, 0.4);
}
.count,
.percent {
  font-size: 20px;
}

.claim-button {
  margin-top: 10px;
  background-color: var(--gold);
  color: black;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--button-font-family);
  transition: transform 0.1s;
}

.claim-button:active {
  transform: scale(0.95);
}

.claimed-text {
  color: var(--gold);
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
}
</style>