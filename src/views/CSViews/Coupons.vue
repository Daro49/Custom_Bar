<script setup>
import Profile from "@/assets/amir.jpg";
import drinksImg from "@/assets/bottles.jpg";
</script>

<template>
  <div class="coupons">
    <Header :avatar="Profile" />
    <PointsPresenter :pts="45" />
    <div class="coupon-list">
        
        <CouponCard
          :activationPoints="4"
          :image="drinksImg"
          :validUntil="date"
          description="blablabla"
          details="more blablabla"
        />

        <CouponCard
          :activationPoints="7"
          :image="drinksImg"
          :validUntil="date"
          description="another"
          details="another description"
        />

        <CouponCard
          :activationPoints="9"
          :image="drinksImg"
          :validUntil="date"
          description="another one"
          details="another description one"
        />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import SectionDivider from "@/components/SectionDivider.vue";
import CouponCard from "@/components/CouponCard.vue";
import PointsPresenter from "@/components/PointsPresenter.vue";

export default {
  name: "Coupons",
  components: {
    Header,
    SectionDivider,
    CouponCard,
    PointsPresenter
  },
  data() {
    return {
      date: "22.11.2025"
    }
  }
};
</script>


<style>
.coupons {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ), linear-gradient(0deg, rgba(13, 86, 75, 1) 0%, rgba(13, 86, 75, 1) 100%);
  background-color: var(--green);
  border: 1px solid;
  border-color: #000000;
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