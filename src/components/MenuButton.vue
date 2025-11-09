<template>
  <header class = "header">
    <button class = "button-frame">
      <p class="button-text">{{txt}}</p>
    </button>
  </header>

</template>

<script>
export default{
  name: "MenuButton",
  props: {
    txt: { type: String, default: null }
  }
}
</script>

<style>
.header {
  position: relative;
  height: 100px; 
  width: 100%;
  box-sizing: border-box;
}

.button-frame {
  background: var(--headerv2);
  border-radius: 20px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.button-text {
  text-align: center;
  font-family: var(--button-font-family);
  font-size: 32px;
  color: var(--background-green)
}
</style>