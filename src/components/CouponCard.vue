<!--
/**
 * @file CouponCard.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief CouponCard component
 */
-->

<template>
  <div class="coupon-card">
    <div v-if="!detailsEnabled" class="coupon-header">
      <img :src="couponData.imgurl" alt="Coupon image" class="coupon-image" />
      <div class="coupon-info">
        <ActivateButton :activation_points="couponData.price" :is-active-prop="isActive" @toggle="handleToggle" />
        <div class="coupon-text">{{ couponData.code }}</div>
      </div>
      <button class="btns" @click="showDetails" v-html="Info"></button>
    </div>

    <div v-if="detailsEnabled" class="coupon-details">
      <div class="details-content">{{ couponData.description }}</div>

      <button class="btns" @click="showDetails" v-html="Close"></button>
    </div>
  </div>
</template>

<script>
import Info from '@/assets/info.svg?raw'
import Close from '@/assets/cancel-x.svg?raw'
import ActivateButton from './ActivateButton.vue'
import { activateCoupon, deactivateCoupon, getUserCoupons } from '@/stores/CSModels/Coupons';
import { activeUser } from '@/stores/Login';
import { addPoints } from '@/stores/AddPoints';

export default {
  name: 'CouponCard',
  components: {
    ActivateButton,
  },
  props: {
    couponData: { type: Object, required: true },
    activated: { type: Boolean, default: false, required: true },
  },

  data() {
    return {
      isActive: this.activated,
      detailsEnabled: false,

      Info,
      Close,
    }
  },
  watch: {
    activated(newVal) {
      this.isActive = newVal;
    }
  },

  mounted() {
    if (this.activated) {
      this.isActive = true
    }
  },

  methods: {
    showDetails() {
      this.detailsEnabled = !this.detailsEnabled;
    },
    async handleToggle(requestedStatus) {
      const user = activeUser.value.username;
      const couponObject = this.couponData;
      const points = this.couponData.price;

      if (requestedStatus === true) {
        const success = await activateCoupon(user, couponObject);

        if (success) {
          // if activation succesfull, remove price points
          await addPoints(-points);
          this.isActive = true;
          await getUserCoupons(user);
        } else {
          this.isActive = false;
        }
      } else {
        const success = await deactivateCoupon(user, this.couponData.id);
        if (success) {
          // if activation succesfull, revert price points removal
          await addPoints(points);
          this.isActive = false;
          await getUserCoupons(user);
        }
      }
    },
  }
}
</script>

<style scoped>
* {
  margin-top: 5px;
  gap: 5px;
}

.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  padding: 0;
}

.coupon-card {
  background: var(--headerv2);
  border: 3px solid;
  border-color: #000000;
  border-radius: 10px;
  height: 20vh;
  position: relative;
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.coupon-header {
  margin-top: 0;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  align-items: flex-start;
  height: 100%;
}

.coupon-header>.btns {
  margin-left: auto;
}

.coupon-image {
  margin-top: 0;
  width: 25%;
  height: 100%;
  border-radius: 6px 0 0 6px;
  object-fit: cover;

}

.coupon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.valid-date {
  background-color: #5c3a1a;
  color: white;
  text-align: center;
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 24px;
}

.coupon-text {
  margin: 5px 0;
  font-size: 24px;
  color: #035f5c;
}

.activate-button {
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  background: linear-gradient(180deg, #045209 0%, #03800e 100%);
  color: white;
}

.coupon-details {
  padding: 8px;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.details-content {
  margin-left: 10px;
  flex: 1;
  font-size: 24px;
  color: var(--background-green);
  word-break: break-word;
  padding-right: 15px;
  overflow-y: auto;
  max-height: 100%;
}
</style>
