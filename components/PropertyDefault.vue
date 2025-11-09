<template>
  <div class="property-default-container">
    <div class="table-shape">
      <span class="table-label">{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  // This prop holds the content (e.g., "T2", "T3") that the component displays.
  text: {
    type: String,
    required: true
  }
});
</script>

