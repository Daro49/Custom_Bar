<template>
    <div class="song">
        <button 
            class="SongButton"
            @click="$emit('click', song)"
        >
        <img :src="imageSrc" alt="cover" class="song-cover"/>
        <div class="Song_info">
            <h2 class="title">{{ title }} </h2>
            <p class="artist">{{ artist }} </p>
        </div>
        </button>

        <!--action-buttons-->
        <div class="actionButtons">
            <button 
                v-if="showPromote"
                class="promoteButton" 
                @click="$emit('promote',song)"
            >
            <h4 class="Promote">Promote </h4>
            </button>

            <button 
                v-if="showAdd"
                class="addButton" 
                @click="$emit('add',song)"
            >
            <h4 class="Add">add </h4>
            </button>


            <div class="secondariActions">
                <button 
                    v-if="showCut"
                    class="cutButton"
                    @click="$emit('cut', song)"
                >
                <h4 class="Cut">cut </h4>
                </button>
            </div>        
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    imageSrc: String,
    title: String,
    artist: String,
    song: Object, 

    showPromote: { type: Boolean, default: true },
    showAdd:     { type: Boolean, default: true },
    showCut:     { type: Boolean, default: true },
})
defineEmits(['click', 'promote', 'add', 'cut'])
</script>

<style scoped>
.song{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    min-width: 72px;
    color: black;
    outline: black; 
    border: 2px solid;
    border-radius: 999px;
    background: var(--headerv2);
    display: inline-flex;
}
.SongButton {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
    color: #0D564B;
    font-family: var(--button-font-family);
    background: transparent;
    outline: none; 
    border: none;
    justify-content: center;
    line-height: 1;
}
.songInfo{
    display: flex;
    flex-direction: column;
    align-items:flex-start;
}
.title {
    margin: 0;
    text-align: left !important;
}
.artist {
    margin: 0;
    text-align: left !important;
}
.actionButtons{
    appearance: none;
    display: flex;
    align-items: center;
    color: #0D564B;
    cursor: pointer;
    font-family: var(--button-font-family);
    gap: 6px;
    margin-left: 16px;
}
.secondariActions{
    display: flex;
    cursor: pointer;
    color: #0D564B;
    font-family: var(--button-font-family);
    gap: 8px;
}
</style>