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
    color: black;
    outline: black; 
    border: black;
    background: yellow;
}
.SongButton {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 10px;
    color: black;
    background: #D4AF37;
    outline: none; 
    border: none;
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    margin-left: 16px;
}
.secondariActions{
    display: flex;
    gap: 8px;
}
</style>