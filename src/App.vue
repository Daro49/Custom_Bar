<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
      <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  background-color: var(--background-green);
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
/* PC adjustment */
@media (min-width: 768px) {
  .wrapper {
    max-width: 540px;
    margin: 0 auto;
    padding: 0 var(--section-gap);
    background-color: var(--background-green);
    height: 100%;

  }

}

header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
}

.logo {
  margin: 0 2rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  max-width: 540px;
}

nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 1rem;
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: -10;
}

</style>
