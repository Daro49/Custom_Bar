<script setup>
import Profile from '@/assets/user.png'
import { coupons, userCoupons } from '@/stores/CSModels/Coupons'
import { onMounted } from 'vue'
import { getCoupons, getUserCoupons } from '@/stores/CSModels/Coupons'
import { activeUser } from '@/stores/Login.js';

onMounted(async () => {
  await Promise.all([
    getUserCoupons(activeUser.value.username),
    getCoupons()
  ]);
})

const isActivated = (couponId) => {
  return userCoupons.value.some(c => String(c.id) === String(couponId));
}
</script>

<template>
  <div class="coupons">
    <Header :avatar="Profile" :previous="true" />
    <PointsPresenter/>
    <div class="coupon-list">
      <CouponCard
        v-for="coupon in coupons"
        :couponData ="coupon"
        :validUntil="date"
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
  },
  data() {
    return {
      date: '22.11.2025',
    }
  },
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

.coupons .coupon-list {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 980px;
  margin-top: 21px;
  position: relative;
  width: 100%;
}
</style>
