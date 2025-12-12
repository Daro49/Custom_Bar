<template>
    <div class="linebox">
        <div :class="['line', lineClass]"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        isDone: Boolean
    })

    const lineClass = computed(() => {
        return props.isDone ? 'line--done' : 'line';
    })
</script>

<style scoped>
    .linebox {
        width: 120px;
        height: 30px;
    }

    .line {
        width: 120px;
        height: 5px;

        border-radius: 5px;
        background: #D9D9D9;
    }

    .line--done {
        background: #552808;
    }
</style>