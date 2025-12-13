<script setup>
  import { activeUser } from "@/stores/Login"
  const activeUserRef = activeUser
</script>

<template>
  <div class="points-jukebox">
    <div class="pointer-wrapper">
      <div class="div">
        <div class="text-wrapper">Points: {{ activeUserRef.points }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.points-jukebox{
    padding: 4px 10px;
    border-radius: 9999px;      
    background: white;          
    color: #222;
    font-weight: 600;
    font-size: 17px;
    line-height: 1;
    border: 1px solid rgba(0, 0, 0, 0.2);
    white-space: nowrap;
}
</style>