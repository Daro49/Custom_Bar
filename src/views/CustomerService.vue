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
          class="section-divider-instance"
          img="polygon-2-2.svg"
          polygon="image.svg"
        />
        <div class="frame-3">
          <MenuButton txt = "Coupons"/>
          <MenuButton txt = "Packages"/>
          <MenuButton txt = "Milestones"/>
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

export default {
  name: 'CustomerService',
  components: {
    Header,
    SectionDivider,
    ShiningHeader,
    MenuButton
  },
};
</script>

<style>
.customer-service {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ), linear-gradient(0deg, rgba(13, 86, 75, 1) 0%, rgba(13, 86, 75, 1) 100%);
  background-color: var(--green);
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: 917px;
  width: 412px;
}

.customer-service .header-child-instance {
  height: 76px !important;
  left: unset !important;
  top: unset !important;
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

.customer-service .section-divider-instance {
  left: unset !important;
  top: unset !important;
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

.customer-service .component-1 {
  align-self: stretch !important;
  background: unset !important;
  border-radius: unset !important;
  height: 1px !important;
  left: unset !important;
  top: unset !important;
  width: 100% !important;
}

.customer-service .component-instance {
  height: 3200% !important;
  left: 36.20% !important;
  top: -1567.18% !important;
  width: 27.86% !important;
}

.customer-service .frame-4 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 49px;
  position: relative;
  width: 100%;
}

.customer-service .component-2 {
  align-self: stretch;
  height: 92px;
  position: relative;
  width: 100%;
}

.customer-service .rectangle-2 {
  background: linear-gradient(
    180deg,
    rgba(254, 188, 47, 1) 0%,
    rgba(213, 179, 111, 1) 41%,
    rgba(179, 118, 6, 1) 100%
  );
  border-radius: 20px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.customer-service .MENU-2 {
  align-items: center;
  color: var(--green);
  display: flex;
  font-family: var(--buttons-font-family);
  font-size: var(--buttons-font-size);
  font-style: var(--buttons-font-style);
  font-weight: var(--buttons-font-weight);
  height: 34.78%;
  justify-content: center;
  left: 35.16%;
  letter-spacing: var(--buttons-letter-spacing);
  line-height: var(--buttons-line-height);
  position: absolute;
  text-align: center;
  top: 32.82%;
  white-space: nowrap;
  width: 29.95%;
}

.customer-service .MENU-3 {
  align-items: center;
  color: var(--green);
  display: flex;
  font-family: var(--buttons-font-family);
  font-size: var(--buttons-font-size);
  font-style: var(--buttons-font-style);
  font-weight: var(--buttons-font-weight);
  height: 34.78%;
  justify-content: center;
  left: 33.85%;
  letter-spacing: var(--buttons-letter-spacing);
  line-height: var(--buttons-line-height);
  position: absolute;
  text-align: center;
  top: 32.82%;
  white-space: nowrap;
  width: 32.29%;
}

.customer-service .component-1-instance {
  align-self: stretch !important;
  left: unset !important;
  top: unset !important;
  width: 100% !important;
}

.customer-service .design-component-instance-node {
  left: 31.25% !important;
  width: 37.76% !important;
}
</style>