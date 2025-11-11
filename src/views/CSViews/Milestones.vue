<script setup>
  import Profile from '@/assets/amir.jpg';
</script>

<template>
  <div class="milestones">
    <Header :avatar="Profile" />

    <MilestoneCard text="First Milestone" :progress="25" :reward="500" />
    <MilestoneCard text="Second Milestone" :progress="50" :reward="500"/>
    <MilestoneCard text="Third Milestone" :progress="75" :reward="100"/>
    <MilestoneCard text="Final Milestone" :progress="100" :reward="1000"/>
    <MilestoneCard text="Second Milestone" :progress="50" :reward="500"/>
    <MilestoneCard text="Third Milestone" :progress="75" :reward="100"/>
    <MilestoneCard text="Final Milestone" :progress="100" :reward="1000"/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MilestoneCard from '@/components/MilestoneCard.vue';

export default {
  name: "Milestones",
  components: {
    MilestoneCard,
    Header
    
  }  
};

</script>

<style>
.milestones {
  background: var(--background-green);
  width: 100%;   
  height: 100%;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;      
  overflow-y: auto;
}


</style>