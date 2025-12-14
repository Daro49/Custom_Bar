<!-------------ITU-PROJECT------------->
<!---author:-Jozef-Matus-(xmatusj00)--->
<!---file-name:-Jukebox.vue------------>
<!------------------------------------->

<template>
  <div class="jukebox-page">
    <Header :showPoints="true"/>
    <div class="jukebox-content">
      <div class="jukebox"  v-if="!(showSearchPanel)" >
        <div class="current" v-if="currentSong">
          <SongButton
            :imageSrc="currentSong.image"
            :title="currentSong.title"
            :artist="currentSong.artist"
            :song="currentSong"
            :showAdd="false"
            @like="songLikeHandle(currentSong)"
            :showPromote="false"
          />
          <div class="progress_wrapper">
            <div class="progress_timer">
              <span>{{ elapsedFormatted }}</span>
              <span>{{ totalFormatted }}</span>
            </div>
            <div class="progress_bar">
              <div class="progress-fill" :style="{ width: progressState.progress + '%' }"></div>
            </div>
          </div>    
        </div>
        <div v-else>
          <div class="placeholder">
            <h1>There is nothing to play</h1>
          </div>
          <div class="progress_wrapper">
            <div class="progress_timer">
              <span>00:00</span>
              <span>00:00</span>
            </div>
            <div class="progress_bar">
              <div class="progress-fill" :style="{ width: '0%' }"></div>
            </div>
          </div>    
        </div>
        <SectionDivider class="divider" color="white"></SectionDivider>
        <div class="playlist-scroll">
          <div class="playlist">
            <SongButton
            v-for="song in nextSongs"
            :key="song.id"
            :imageSrc="song.image"
            :title="song.title"
            :artist="song.artist"
            :song="song"
            :rating="song.rating"
             @promote="promoteSongHandler(song)"
             @like="songLikeHandle(song)"
            :showAdd="false"
            :showRC="true"
            />
            <h1 v-if="playlist.length===0" class="placeholder-playlist-msg"> Wow! Such empty! </h1>
          </div>
        </div>

        <button class="add-button" @click="switchAddToQueue">
          ADD TO QUEUE
        </button>
      </div>

      <div v-if="showSearchPanel" class="searchPanel">
        <button class="back_btn" @click="ReturnBackQueue"> 
          <img :src="iconBack" alt="back" class="back_btn_img"/>
        </button>
        <div class="searchbar">
          <input
            v-model="search"
            class="search-input"
            type="text"
            placeholder="Vyhladaj piesen"
          />
        </div>

        <SectionDivider color="white"></SectionDivider>
        
        <div class="search-scroll">
          <SongButton 
            v-for="song in filteredSongs"
            :key="song.id"
            :imageSrc="song.image"
            :title="song.title"
            :artist="song.artist"
            :song="song"
            @add="addToQueueHandler(song)"
            @like="songLikeHandle(song)"
            :showPromote="false"
          />
        </div>  
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import SongButton from '../components/SongButton.vue'
import Header from '@/components/Header.vue'
import { addPoints } from '@/stores/AddPoints'
import { usePlaylist } from '@/stores/Playlist'
import { useProgresionJukebox } from '@/stores/ProgresionJukebox'
import SectionDivider from '@/components/SectionDivider.vue'
import { addToast } from '@/stores/ToastStore'
import iconBack from '@/assets/Chevron_Down.svg'
import { addToQueue } from '@/stores/AddSongToPlaylist'
import { useSongs } from '@/stores/FetchSong'
import { promoteSong } from '@/stores/PromoteSongs'
import { addToFavouritesToggle } from '@/stores/AddToFavourite'

const { playlist, fetchPlaylist } = usePlaylist()
const { songs, fetchSongs } = useSongs() 
const currentSong = computed(()=>progressState.currentSong)
const showSearchPanel = ref(false)
const search = ref('')
const showDetailSearch = ref(false)
const showDetailQueue = ref(false)
let refreshTimer = null;


const {
  state: progressState,
  startProgress,
  stopProgress,
  elapsedFormatted,
  totalFormatted,
} = useProgresionJukebox()

/**
 * @brief watches if new song was added to playlist and starts playing first song contained in playlist
 */
watch(
  () => playlist.value.length,
  (len, prevLen) => {
    if(prevLen === 0 && len > 0 && !progressState.isPlaying && !progressState.currentSong)
    {
      console.log('spustam pesnicku')
      startProgress(playlist.value[0])
    }
  }
)

/**
 * @brief Handles interaction with like button. It operates as toggle between liked and normal song for each different user. After pressing it, it updates the liked state in the playlist, and if that same song is currently playing, it updates the current song too.
 * @param song 
 */
async function songLikeHandle(song) {
  const data = await addToFavouritesToggle(song)
  song.liked = data.liked

  await fetchPlaylist()

  if (progressState.currentSong) {
    const updated = playlist.value.find(s => s.id === progressState.currentSong.id)
    if (updated) progressState.currentSong = updated
  }
}

/**
 * @brief Handles fetching songs from the playlist and makes sure playback starts if nothing is currently playing and the playlist is not empty after the fetch.
 */
async function fetchSongHandler() {
  await fetchPlaylist()

  if(progressState.isPlaying && progressState.currentSong)
  {
    console.log('Currently playing:', progressState.currentSong.title)
    return
  }

  else if (playlist.value.length === 0){
    console.log('current song didnt load')
    stopProgress()
    return
  }
  const song = playlist.value[0];
  console.log('song is:', song.title)
  startProgress(song)
}

/**
 * @brief If a song is playing, it returns the rest of the playlist without the current song.
 */
const nextSongs = computed(() => {
  if (!currentSong.value) return playlist.value
  return playlist.value.filter(song => song.id !== currentSong.value.id)
})

/**
 * @brief Handles first load of the page. Fetches songs and playlist.
 */
onMounted(()=> {
  fetchSongHandler();
  refreshTimer = setInterval( async () => {
    await fetchPlaylist()
  }, 3500);
}) 

/**
 * @brief Handles return to playlist from song search
 */
const ReturnBackQueue = () => {
  showDetailSearch.value = false;
  showSearchPanel.value = false;
  showDetailQueue.value = false;
}

/**
 * @brief Handles switch from playlist to song search
 */
const switchAddToQueue = () => {
  fetchSongs();
  showSearchPanel.value = true
}

/**
 * @brief Handles adding song to playlist and returns user to playlist view. addToast was created by Adam Babaca
 * @param song 
 */
async function addToQueueHandler(song) {
  addToQueue(song)
  fetchPlaylist();
  showDetailSearch.value = false;
  showSearchPanel.value = false;
  // Created by Adam Babaca
  addToast("Song added to a playlist")
}

/**
 * @brief Handles promotion of song and updates playlist, function addPoints was created by Samo Kudla and addToast by Adam Babaca
 * @param song 
 */
async function promoteSongHandler(song) {
  promoteSong(song)
  fetchPlaylist();
  // Created by Samo Kudla
  addPoints(-10)
  // Created by Adam Babaca
  addToast("Song promoted -10 points")
}

/**
 * @brief Handles sorting (first song shown are favorite) and searching for songs or interpret
 */
const filteredSongs = computed(() => {
  const q = search.value.toLowerCase().trim()

  const base = q
    ? songs.value.filter(s => {
        const title = (s.title ?? "").toLowerCase()
        const artist = (s.artist ?? "").toLowerCase()
        return title.includes(q) || artist.includes(q)
      })
    : songs.value

  const idx = base.map((_, i) => i)
  idx.sort((ia, ib) => {
    const a = base[ia]
    const b = base[ib]
    const al = a.liked ? 1 : 0
    const bl = b.liked ? 1 : 0
    if (al !== bl) return bl - al
    return ia - ib
  })

  return idx.map(i => base[i])
})

/**
 * @Brief Handles leaving of page
 */
onUnmounted(() => {
  console.log('Unmounting')

  if (refreshTimer) clearInterval(refreshTimer)
})

</script>

<style scoped>
  .jukebox-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .jukebox-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .add-button {
    background: #0D564B;
    font-family: var(--button-font-family);
    font-size:25px;
    border-radius: 999px;
    color: #D4AF37;
    height: 75px;
    cursor: pointer;
  }
  .add-button:hover {
    filter: brightness(1.08); 
    box-shadow:
      0 0 0 3px rgba(13, 86, 75, 0.25),  
      0 10px 22px rgba(0,0,0,0.18);     
    transform: translateY(-1px);
  }
  .add-button:active{
    transform: translateY(0px) scale(0.98);
    box-shadow: 0 0 0 2px rgba(13, 86, 75, 0.18);
  }
  .searchPanel {
    flex: 1;
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #D4AF37;
    display:flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
  }
  .search-scroll{
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .searchbar {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .search-input{
    width: 100%;
    max-width: 520px;      
    height: 44px;          
    padding: 0 14px;

    border: 2px solid #000;
    border-radius: 999px;  
    background: rgba(255,255,255,0.35);

    font-size: 16px;
    font-weight: 600;
    color: #000;

    outline: none;
    box-sizing: border-box;
  }
  .jukebox {
    flex: 1;
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #D4AF37;
    display:flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;  
  }
  .playlist-scroll{
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .currentSong {
    display: flex;
    justify-content: center;
  }
  .playlist {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .showDetailAdd {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #D4AF37;
    display:flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
  .back_btn {
    display: flex;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    outline: none; 
    border: none;
  }
  .back_btn:hover{
    transform: scale(1.1);
  }
  .current {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .progress_wrapper {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.progress_timer {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #000;
}

.progress_bar {
  width: 100%;
  height: 15px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: #0D564B;
  transition: width 0.2s linear;
}

.priecka {
  display: flex;
  justify-content: center;
}

.showDetailQueue{
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  background: #D4AF37;
  display:flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}
.placeholder{
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100px;
  color: #0D564B;
  font-family: var(--button-font-family);
  font-size: 30px;
}
.placeholder-playlist-msg{
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0D564B;
  font-family: var(--button-font-family);
}
</style>