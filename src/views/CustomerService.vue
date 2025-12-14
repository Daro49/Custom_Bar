<!--
/**
 * @file CustomerService.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief View of Loyalty Hub
 */
-->

<script setup>
import Profile from '@/assets/user.png'
</script>

<template>
  <div class="customer-service">
    <Header :avatar="Profile" />
    <PointsPresenter/>
    <div class="frame">
      <div class="frame-2">
        <Minigame/>
        <SectionDivider />
        <div class="frame-3">
          <MenuButton txt="Coupons" :to="{ name: 'coupons' }" />
          <MenuButton txt="Packages" :to="{ name: 'packages' }" />
          <MenuButton txt="Milestones" :to="{ name: 'milestones' }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SectionDivider from '@/components/SectionDivider.vue'
import MenuButton from '@/components/MenuButton.vue'
import Minigame from '@/components/Minigame.vue';
import PointsPresenter from '@/components/PointsPresenter.vue';

export default {
  name: 'CustomerService',
  components: {
    Header,
    SectionDivider,
    MenuButton,
  },
}
</script>

<style scoped>
/* Main container for the Loyalty Hub */
.customer-service {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

/* Centered layout frame for content */
.customer-service .frame {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 814px;
  width: 80%;
  position: relative;
  background: var(--background-green);
}

/* Wrapper for minigame and buttons */
.customer-service .frame-2 {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 15px;
  position: relative;
  width: 100%;
}

/* Vertical navigation list for loyalty subsections */
.customer-service .frame-3 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 420px;
  position: relative;
  width: 100%;
}
</style>
