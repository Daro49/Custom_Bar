<script setup>
import Profile from '@/assets/user.png'
import Img from '@/assets/alpa-francovka.jpg'
</script>

<template>
  <div class="packages">
    <Header :avatar="Profile" />
    <PointsPresenter/>
    <div class="package-list">
      <PackageCard :img="Img" name="Prelet nad alpami" price="1500 Points" />
      <PackageCard :img="Img" name="Prelet nad alpami" price="1500 Points" />
      <PackageCard :img="Img" name="Prelet nad alpami" price="1500 Points" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import PointsPresenter from '@/components/PointsPresenter.vue'
import PackageCard from '@/components/PackageCard.vue'

export default {
  name: 'Packages',
  components: {
    Header,
    PointsPresenter,
    PackageCard,
  },
}
</script>

<style>
.packages {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.packages .header-child-instance {
  height: 76px !important;
  left: unset !important;
  top: unset !important;
}

.packages .component {
  left: unset !important;
  margin-left: 28px !important;
  margin-top: 23px !important;
  position: unset !important;
  top: unset !important;
}

.packages .package-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 33px;
  margin-top: 35px;
  width: 100%;
}

.packages .package-instance {
  align-self: stretch !important;
  flex: 0 0 auto !important;
  left: unset !important;
  top: unset !important;
  width: 100% !important;
}

.packages .package-2 {
  top: 0 !important;
}
</style>
