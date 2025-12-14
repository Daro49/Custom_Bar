<!-------------ITU-PROJECT------------->
<!---author:-Jozef-Matus-(xmatusj00)--->
<!---file-name:-SongButton.vue--------->
<!------------------------------------->

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
            <img :src="iconPromote" alt="promote" class="promote"/>
            </button>

            <button 
                v-if="showAdd"
                class="addButton" 
                @click="$emit('add',song)"
            >
            <img :src="iconAdd" alt="add" class="add"/>
            </button>


            <div class="secondariActions">
                <button 
                    v-if="showLike"
                    class="likeButton"
                    @click="$emit('like', song)"
                >
                <img :src="heartIcon" alt="like" class="like"/>
                </button>
            </div>        
        </div>
    </div>
</template>

<script setup>
import iconPromote from "@/assets/Crown.svg"
import iconFavourite from "@/assets/Heart.svg"
import iconAdd from "@/assets/Plus.svg"
import iconFavouriteFill from "@/assets/Favorite.svg"
import { computed } from "vue"


const props = defineProps({
    imageSrc: String,
    title: String,
    artist: String,
    song: Object, 

    showPromote: { type: Boolean, default: true },
    showAdd:     { type: Boolean, default: true },
    showLike:     { type: Boolean, default: true },
})
defineEmits(['click', 'promote', 'add', 'like'])

const heartIcon = computed(() =>
  props.song?.liked ? iconFavourite : iconFavouriteFill
)
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
    min-height: 100px;
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
    overflow: hidden;
}
.song-cover{
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  object-fit: cover;          
  display: block;
}
.Song_info{
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
    background: transparent;
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
.promoteButton,
.likeButton,
.addButton{
    background: transparent;
    cursor: pointer;
    outline: none; 
    border: none;
    justify-content: center;
}
.promote,
.like,
.add{
  width: 45px;
  height: 45px;
  display: block;      
  object-fit: contain; 
}
.promoteButton:hover .promote,
.likeButton:hover .like,
.addButton:hover .add{
    transform: scale(1.1);
}
</style>