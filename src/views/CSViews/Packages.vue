<script setup>
import Profile from '@/assets/user.png'
import { packages } from '@/stores/CSModels/Packages'
import { onMounted } from 'vue'
import { getPackages } from '@/stores/CSModels/Packages'

onMounted(() => {
  getPackages()
})

</script>

<template>
  <div class="packages">
    <Header :avatar="Profile" :previous="true"/>
    <PointsPresenter/>
    <div class="package-list">
      <PackageCard
        v-for="packageItem in packages"
        :pkgId="packageItem.id"
        :name="packageItem.name"
        :img="packageItem.imgurl"
        :price="packageItem.price"
        :description="packageItem.description"
      />
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


.packages .package-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 33px;
  margin-top: 35px;
  width: 100%;
}

</style>
