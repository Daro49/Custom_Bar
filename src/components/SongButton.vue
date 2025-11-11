<template>
    <button 
        class="SongButton"
        @click="$emit('click', song)"
    >
    <img :src="imageSrc" alt="cover" class="song-cover"/>
    <div class="Song_info">
        <h2>{{ title }} </h2>
        <p>{{ artist }} </p>
    </div>
    </button>
</template>

<script setup>
const props = defineProps({
    imageSrc: String,
    title: String,
    artist: String,
    song: Object, 
})
defineEmits(['click'])
</script>

<style scoped>
.SongButton {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
    color: black;
    background: transparent;
    outline: none; 
    border: none;
}
</style>