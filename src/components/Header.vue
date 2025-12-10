<template>
  <header class="header">
    <button class="back-btn" @click="back" v-if="backButton" v-html="ArrowLeftSvg"></button>

    <div class="center-content">
      <slot name="title">{{ title }}</slot>
    </div>

    <div class="right-content">
      <slot name="right">
        <img v-if="avatar" :src="avatar" class="avatar" @click="openProfile" />
        <button
          class="back-btn"
          @click="rightFunction"
          v-if="rightIcon"
          v-html="rightIcon"
        ></button>
      </slot>
    </div>
  </header>
</template>

<script>
import ArrowLeftSvg from '@/assets/arrow-left-circle.svg?raw'
import router from '@/router'

export default {
  name: 'Header',
  props: {
    previous: { type: Boolean, default: false }, /* on true goes back to previous page, else goes to parent route */
    backButton: { type: Boolean, default: true }, /* show/hide back button */
    title: { type: String, default: '' }, /* title text in middle */
    avatar: { type: String, default: null }, /* avatar icon on right */
    rightIcon: { type: String, default: null }, /* other icon on right */
    rightFunction: { type: Function, default: null }, /* function activating when clicking on icon on right */
  },
  setup() {
    return { ArrowLeftSvg }
  },
  methods: {
    back() {
      /* Go back to previous page */
      if (this.previous) {
        router.back();
        return
      }
      /* Go to parent route */
      const current = this.$route.path.split('/')
      current.pop()

      const parent = current.join('/') || '/'

      this.$router.push(parent)
    },
    openProfile() {
      router.push({ name: 'profile' })
    },
    menu()  {
      router.push({ name: 'main' })
    },
    
  },
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, #d39e30, #e9c15b, #d39e30);
    padding: 10px 14px;

    width: 100%;
    box-sizing: border-box;
  }

  .back-btn {
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

  .center-content {
    flex: 1;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }
</style>
