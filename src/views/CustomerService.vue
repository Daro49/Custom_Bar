<script setup>
import Profile from "@/assets/amir.jpg";
</script>

<template>
  <div class="customer-service">
    <Header
      :avatar = "Profile"
    />
    <div class="frame">
      <ShiningHeader class="header-instance" state="default" />

      <div class="frame-2">
        <div class="text-wrapper-2">Koniferium Borovička</div>
        <SectionDivider
        />
        <div class="frame-3">
          <MenuButton txt = "Coupons" :to="{ name: 'coupons' }"/>
          <MenuButton txt = "Packages" :to="{ name: 'packages' }"/>
          <MenuButton txt = "Milestones" :to="{ name: 'milestones' }"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ShiningHeader from "@/components/ShiningHeader.vue";
import SectionDivider from "@/components/SectionDivider.vue";
import MenuButton from "@/components/MenuButton.vue";
import router from "@/router";

export default {
  name: 'CustomerService',
  components: {
    Header,
    SectionDivider,
    ShiningHeader,
    MenuButton
  }
};
</script>

<style>
.customer-service {
  background: var(--background-green);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  width: 100%;
}

.customer-service .frame {
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 814px;
  position: relative;
  width: 384px;
}

.customer-service .header-instance {
  align-self: stretch !important;
  background-color: transparent !important;
  left: unset !important;
  top: unset !important;
  width: 100% !important;
}

.customer-service .rectangle {
  height: 215px;
  position: relative;
  width: 341px;
}

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

.customer-service .text-wrapper-2 {
  align-items: center;
  align-self: stretch;
  color: #ffffff;
  display: flex;
  font-family: var(--interpret-now-playing-font-family);
  font-size: var(--interpret-now-playing-font-size);
  font-style: var(--interpret-now-playing-font-style);
  font-weight: var(--interpret-now-playing-font-weight);
  justify-content: center;
  letter-spacing: var(--interpret-now-playing-letter-spacing);
  line-height: var(--interpret-now-playing-line-height);
  margin-top: -1.00px;
  position: relative;
  text-align: center;
}

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