<!--
/**
 * @file Milestones.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief View of mielstones
 */
-->

<script setup>
import Header from '@/components/Header.vue'
import MilestoneCard from '@/components/MilestoneCard.vue'
import Profile from '@/assets/user.png'
import { onMounted, ref } from 'vue';
import { claimReward, getMilestonesOfUser, milestones } from '@/stores/CSModels/Milestones';
import PointsPresenter from '@/components/PointsPresenter.vue';

let loaded = ref(false);

onMounted(async () => {
  loaded.value = false;
  await getMilestonesOfUser();
  loaded.value = true;
});

/**
 * Triggers reward claiming process for a completed milestone.
 * @param {Object} milestone - Milestone object containing reward and status data.
 */
async function handleClaimReward(milestone) {
  let result = await claimReward(milestone);
  if (!result) {
    return;
  }
}
</script>

<template>
  <div class="milestones">
    <Header :avatar="Profile" :previous="true" />
    <PointsPresenter />
    <div class="milestones-list" v-if="loaded">
      <MilestoneCard v-for="m in milestones" :progress="m.progress" :reward="m.reward" :text="m.text" :tag="m.tag"
        :goal="m.goal" :claimed="m.claimed" @claim="handleClaimReward(m)" />
    </div>
    <div class="loading" v-else>
      Loading...
    </div>
  </div>
</template>
<style>
.milestones {
  background: var(--background-green);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow-y: auto;
}

.milestones-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.loading {
  font-family: var(--button-font-family);
  font-size: 50px;
  color: white;
  text-align: center;
}
</style>
