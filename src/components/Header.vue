<!--
/**
 * @file Header.vue
 * @author Samuel Kudla - xkudlas00@stud.fit.vutbr.cz
 * @brief Header component
 */
-->

<template>
  <header class="header">
    <div class="back-btn-wrapper">
      <button class="back-btn" @click="back" v-if="backButton" v-html="ArrowLeftSvg"></button>
    </div>

    <div class="center-content">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="right-content">
      <slot name="table">
        <span class="default-table-text" @click="goToMap">
          <span class="table-id">
            <span v-if="selectedTable !== 'N/A'">{{ selectedTable }}</span>
            <span v-else>Table<br></br>N/A</span>
          </span>

          <span v-if="timeRemainingMs > 0" class="timer">
            {{ formattedTime }}
          </span>
        </span>
      </slot>
      <slot name="right">
        <PointsPresenterJukebox v-if="showPoints" class="PointPresenterHeader" />
        <button @click="openProfile" class="avatar-button" v-if="avatar">
          <img :src="activeUser?.imgurl || avatar" class="avatar" />
        </button>

        <div v-if="rightIcon" class="icon-with-badge" @click="rightFunction">
          <button class="back-btn" v-html="rightIcon"></button>
          <span v-if="isCart" class="cart-badge">
            {{ orderLength}}
          </span>
        </div>

      </slot>
    </div>
  </header>
</template>

<script>
import options from '@/stores/Header.js'
export default options
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
  padding: 10px 14px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
}

.back-btn-wrapper {
  width: 100px;
  min-width: 100px;
}

.icon-with-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
}

.back-btn :deep(svg) {
  width: 32px;
  height: 32px;
  display: block;
}

.cart-badge {
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: #FF0000;
  color: black;
  border-radius: 50%;
  padding: 3px 0px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  min-width: 18px;
  text-align: center;
  transform: translate(50%, -50%);
  box-shadow: 0 0 0 1px black;
  z-index: 10;
  cursor: pointer;
}

.center-content {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.right-content {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100px;
  min-width: 100px;
  justify-content: flex-end;
}

.default-table-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.table-id {
  font-weight: 700;
  font-size: 14px;
  color: black;
}

.timer {
  font-weight: 400;
  font-size: 10px;
  color: black;
  margin-top: -2px;
}

.expired-timer {
  display: none;
}

.avatar-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
