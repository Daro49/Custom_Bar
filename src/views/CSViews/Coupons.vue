<script setup>
import Profile from '@/assets/user.png'
import { coupons, userCoupons } from '@/stores/CSModels/Coupons'
import { onMounted, ref } from 'vue'
import { getCoupons, getUserCoupons } from '@/stores/CSModels/Coupons'
import { activeUser } from '@/stores/Login.js';

let isLoading = ref(false);

onMounted(async () => {
  try {
    await Promise.all([
      getUserCoupons(activeUser.value.username),
      getCoupons()
    ]);
  } finally {
    isLoading.value = false;
  }
})

const isActivated = (couponId) => {
  if (!userCoupons.value) return false;
  return userCoupons.value.some(c => String(c.id) === String(couponId));
}
</script>

<template>
  <div class="coupons">
    <Header :avatar="Profile" :previous="true" />
    <PointsPresenter/>
    <div v-if="isLoading" class="loading-state">

    </div>
    <div v-else class="coupon-list">
      <CouponCard
        v-for="coupon in coupons"
        :couponData ="coupon"
        :activated="isActivated(coupon.id)"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SectionDivider from '@/components/SectionDivider.vue'
import CouponCard from '@/components/CouponCard.vue'
import PointsPresenter from '@/components/PointsPresenter.vue'

export default {
  name: 'Coupons',
  components: {
    Header,
    SectionDivider,
    CouponCard,
    PointsPresenter,
  }
}
</script>

<style>
.coupons {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.coupons .loading-state {
  font-size: 24px;
  color: white;
}
.coupons .coupon-list {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 80%;
  margin-top: 21px;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}
</style>
