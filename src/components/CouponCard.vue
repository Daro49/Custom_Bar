<template>
  <div class="coupon-card">
    <div v-if="!detailsEnabled" class="coupon-header">
      <img :src="image" alt="Coupon image" class="coupon-image" />
      <div class="coupon-info">
        <div class="valid-date">Valid until {{ validUntil }}</div>
        <div class="coupon-text">{{ description }}</div>
        <ActivateButton :activation_points="activationPoints" />
      </div>
      <button class="btns" @click="showDetails" 
        v-html="Info">
      </button>
    </div>

    <div v-if="detailsEnabled" class="coupon-details">
      {{ details }}
      <button class="btns" @click="showDetails" 
        v-html="Close">
      </button>
    </div>
  </div>
</template>

<script>
import Info from '@/assets/info.svg?raw';
import Close from '@/assets/cancel-x.svg?raw';
import ActivateButton from './ActivateButton.vue';

export default {
  name: "CouponCard",
  components: {
    ActivateButton
  },
  props: {
    image: String,
    validUntil: String,
    description: String,
    details: {type: String, default: ""},
    activationPoints: Number
  },

  data() {
    return {
      isActive: false,
      detailsEnabled: false,

      Info,
      Close
    }
  },

  methods: {
    activate() {
      this.isActive = !this.isActive;
    },
    showDetails() {
      this.detailsEnabled = !this.detailsEnabled;
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: black; 
}

.coupon-card {
  background: var(--headerv2);
  border: 3px solid;
  border-color: #000000;
  border-radius: 10px;
  height: auto;
  position: relative;
  width: 380px;
}

.coupon-header {
  display: flex;
  width:100%;
  box-sizing: border-box;
  gap: 10px;
}

.coupon-image {
  width: 100px;
  height: auto;
  border-radius: 6px;
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
  font-size: 12px;
}

.coupon-text {
  margin: 5px 0;
  font-size: 16px;
  color: #035f5c;
}

.activate-button {
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  background: linear-gradient(180deg, #045209 0%, #03800E 100%);
  color: white;
}

.coupon-details {
  margin-top: 10px;
  background: var(--headerv2);
  border-radius: 6px;
  padding: 8px;
  position: relative;
}

.close-details {
  position: absolute;
  right: 5px;
  top: 5px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
