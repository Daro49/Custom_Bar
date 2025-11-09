<template>
    <header class="header">
        <div class="header-frame">
            <p class = "header-text">Today's special!</p>
        </div>
    </header>
</template>

<script>
export default {
    name: "ShiningHeader"
};
</script>

<style>

.header-frame {
  height: 200px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.header-text {
  text-align: center;
  font-family: 'Josefin Slab', serif;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
}
</style>
