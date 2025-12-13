<template>
  <div class="jukebox-page">
    <Header :showPoints="true"/>
    <div class="jukebox-content">
      <div class="jukebox"  v-if="!(showSearchPanel)" >
        <div class="current" v-if="currentSong">
          <SongButton
            :imageSrc="getCover(currentSong.title)"
            :title="currentSong.title"
            :artist="currentSong.artist"
            :song="currentSong"
            :showAdd="false"
            :showCut="false"
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
        <h1 class="priecka"> -------------------------------------------</h1>
        <div class="playlist-scroll">
          <div class="playlist">
            <SongButton
            v-for="song in nextSongs"
            :key="song.id"
            :imageSrc="getCover(song.title)"
            :title="song.title"
            :artist="song.artist"
             @promote="promoteSongHandler(song)"
            :showAdd="false"
            />
            <h1 v-if="playlist.length===0"> Playlist je prazdny </h1>
          </div>
        </div>

        <button class="add-button" @click="switchAddToQueue">
          ADD TO QUEUE
        </button>
      </div>

      <div v-if="showSearchPanel" class="searchPanel">
        <button class="back_btn" @click="ReturnBackQueue"> Spat </button>
        <div class="searchbar">
          <input
            v-model="search"
            class="search-input"
            type="text"
            placeholder="Vyhladaj piesen"
          />
        </div>
        <div class="search-scroll">
          <SongButton 
            v-for="song in filteredSongs"
            :key="song.id"
            :imageSrc="getCover(song.title)"
            :title="song.title"
            :artist="song.artist"
            :song="song"
            @add="addToQueue(song)"
            :showPromote="false"
            :showCut="false"
          />
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import SongButton from '../components/SongButton.vue'
import Header from '@/components/Header.vue'
import { addPoints } from '@/stores/AddPoints'
import { usePlaylist } from '@/stores/Playlist'
import { useProgresionJukebox } from '@/stores/ProgresionJukebox'

const { playlist, fetchPlaylist } = usePlaylist()

const songs = ref([])
const currentSong = computed(()=>progressState.currentSong)
const showSearchPanel = ref(false)
const search = ref('')
const showDetailSearch = ref(false)
const showDetailQueue = ref(false)
const selectedSong = ref(null)
let refreshTimer = null;


const {
  state: progressState,
  startProgress,
  stopProgress,
  elapsedFormatted,
  totalFormatted,
} = useProgresionJukebox()

// ready for refactor
async function fetchSongHandler() {
  await fetchPlaylist()

  if(progressState.isPlaying && progressState.currentSong)
  {
    console.log('už sa hrá:', progressState.currentSong.title)
    return
  }

  else if (playlist.value.length === 0){
    console.log('current song sa nenacital')
    stopProgress()
    return
  }
  const song = playlist.value[0];
  console.log('song is:', song.title)
  startProgress(song)
}

const nextSongs = computed(() => {
  if (!currentSong.value) return playlist.value
  return playlist.value.filter(song => song.id !== currentSong.value.id)
})

onMounted(()=> {
  fetchSongHandler();
  refreshTimer = setInterval( async () => {
    await fetchPlaylist()
  }, 3500);
}) 


const ReturnBackQueue = () => {
  showDetailSearch.value = false;
  showSearchPanel.value = false;
  showDetailQueue.value = false;
}

async function fetchSongs() {
  try {
    const response = await fetch('https://itu-wb12.onrender.com/songs')
    if(!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    songs.value = data;
    console.log('Songs loaded successfully', songs.value)
  } catch(e) {
    console.log('Songs loading failed', e)
  }
}

const switchAddToQueue = () => {
  fetchSongs();
  showSearchPanel.value = true
}

async function addToQueue(song) {
  try {
    const request = await fetch('https://itu-wb12.onrender.com/playlist/add', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ 
        songTitle:song.title 
      }),
    })
    if(!request.ok) {
      throw new Error(`Server error: ${request.status}`);
    }
    const data = await request.json()
    console.log('Song added successfully', data)
  } catch(e) {
    console.log('Song add failed', e)
  }
  fetchPlaylist();
  showDetailSearch.value = false;
  showSearchPanel.value = false;
}

async function promoteSongHandler(song) {
  promoteSong(song)
  addPoints(-10)
}

// toto dat do stores
async function promoteSong(song) {
  try {
    const url = `https://itu-wb12.onrender.com/playlist/${encodeURIComponent(song.title)}/rate`
    const request = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(!request.ok) {
      throw new Error(`Server error: ${request.status}`);
    }
    const data = await request.json()
    console.log('Song added successfully', data)
  } catch(e) {
    console.log('Song add failed', e)
  }
  fetchPlaylist();
  showDetailSearch.value = false;
  showSearchPanel.value = false;
  showDetailQueue.value = false;
}

const filteredSongs = computed(() => {
  const searchSong = search.value.toLowerCase()
  return songs.value.filter(song =>
    song.title.toLowerCase().includes(searchSong)
  )
})

function getCover ()
{}

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
    border-radius: 999px;
    color: #D4AF37;
    height: 50px;
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
  font-size: 12px;
  color: #000;
}

.progress_bar {
  width: 100%;
  height: 6px;
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
</style>