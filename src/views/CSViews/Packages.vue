<!--
/**
 * @file Packages.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief View of packages
 */
-->

<script setup>
import Profile from '@/assets/user.png'
import { packages } from '@/stores/CSModels/Packages'
import { onMounted, ref } from 'vue'
import { getPackages } from '@/stores/CSModels/Packages'

let loaded = ref(false);

onMounted(async () => {
  const success = await getPackages();
  loaded.value = success;
})

</script>

<template>
  <!-- Packages view root container -->
  <div class="packages">
    <!-- Header with avatar and back navigation -->
    <Header :avatar="Profile" :previous="true" />

    <!-- Points presenter component (shows current points) -->
    <PointsPresenter/>

    <!-- Render package cards when data is loaded -->
    <div class="package-list" v-if="loaded">
      <PackageCard
        v-for="packageItem in packages"
        :pkg = "packageItem"
      />
    </div>

    <!-- Loading fallback while packages are being fetched -->
    <div class = "loading" v-else>
      Loading packages...
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
/* Styles for the Packages view. Uses theme variables and sets
  layout for the package list and loading state. */
.packages {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.loading {
  font-family: var(--button-font-family);
  font-size: 50px;
  color: white;
  text-align: center;
}
.packages .package-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 33px;
  margin-top: 35px;
  width: 100%;
  margin-bottom: 50px;
}

</style>
