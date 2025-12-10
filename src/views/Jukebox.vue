<template>
  <div class="jukebox"  v-if="!(showSearchPanel || showDetailSearch || showDetailQueue)" >
    <div class="current" v-if="currentSong">
      <SongButton
        :imageSrc="getCover(currentSong.title)"
        :title="currentSong.title"
        :artist="currentSong.artist"
        :song="currentSong"
        @click="openDetailQueue(currentSong)"
      />
      <div class="progress_wrapper">
        <div class="progress_timer">
          <span>{{ elapsedFormatted }}</span>
          <span>{{ totalFormatted }}</span>
        </div>
        <div class="progress_bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
      </div>    
    </div>
    <h1 class="priecka"> ----------------------------------------------------------------------------------------------------------------------------------------------</h1>
    <div class="playlist">
      <SongButton
      v-for="song in nextSongs"
      :key="song.id"
      :imageSrc="getCover(song.title)"
      :title="song.title"
      :artist="song.artist"
       @click="openDetailQueue(song)"
      :showAdd="false"
      />
      <h1 v-if="playlist.length===0"> Playlist je prazdny </h1>
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
    
    <SongButton 
      v-for="song in filteredSongs"
      :key="song.id"
      :imageSrc="getCover(song.title)"
      :title="song.title"
      :artist="song.artist"
      :song="song"
      @click="DetailSearch(song)"
      :showPromote="false"
      :showCut="false"
    />
  </div>

  <div v-if="showDetailSearch && selectedSong" class="showDetailAdd">
    <button class="back_btn" @click="ReturnBackSearch"> Spat </button>
    <SongButton
      :imageSrc="getCover(selectedSong.title)"
      :title="selectedSong.title"
      :artist="selectedSong.artist"
      :song="selectedSong"
    />
    <button class="add_btn" @click="addToQueue(selectedSong)"> Pridaj do zoznamu </button>

  </div>

  <div v-if="showDetailQueue && selectedSong" class="showDetailQueue">
    <button class="back_btn" @click="ReturnBackQueue"> Spat </button>
    <SongButton
      :imageSrc="getCover(selectedSong.title)"
      :title="selectedSong.title"
      :artist="selectedSong.artist"
      :song="selectedSong"
    />
    <button class="promote_btn" @click="promoteSong(selectedSong)"> Promote </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import SongButton from '../components/SongButton.vue'
const songs = ref([])
const playlist = ref([])
const currentSong = ref(null)
const showSearchPanel = ref(false)
const search = ref('')
const showDetailSearch = ref(false)
const showDetailQueue = ref(false)
const selectedSong = ref(null)
let refreshTimer = null;
const isPlaying =ref(false)

const songDuration = ref(0)
const elapsedTime = ref(0)
const progress = ref(0)

let progressTimer = null

function formatTime (duration) {
  const mins = Math.floor(duration/60)
  const sec = Math.floor(duration%60)
  return `${String(mins).padStart(2, '0')}:${String(sec).padStart(2,'0')}`
}

const elapsedFormatted = computed(() => formatTime(elapsedTime.value))
const totalFormatted = computed(() => formatTime(songDuration.value))

async function current_song_update() {
  console.log('Piesen skoncila')
  isPlaying.value = false
  try {
    const request = await fetch('https://itu-wb12.onrender.com/playlist/remove', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ 
        songTitle: currentSong.value.title 
      }),
    })
    if(!request.ok) {
      throw new Error(`Server error: ${request.status}`);
    }
    const data = await request.json()
    console.log('Song removed successfully', data)
  } catch(e) {
    console.log('Song remove failed', e)
  }
  await fetchPlaylist()
}

function stopProgress() {
  if(progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
}

function startProgress() {
  if (!currentSong.value) return
  stopProgress()
  elapsedTime.value = 0
  progress.value = 0

  songDuration.value = currentSong.value.duration

  const tick = 0.5

  progressTimer = setInterval(()=> {
    elapsedTime.value += tick
    if(elapsedTime.value >= songDuration.value) {
      elapsedTime.value = songDuration.value
      progress.value = 100
      stopProgress() 
      current_song_update()
    } else {
      progress.value = (elapsedTime.value / songDuration.value) * 100
    }
  }, tick * 1000)
}

watch (currentSong, (newSong, oldSong) => {
  if(newSong) {
    startProgress()
  } else {
    stopProgress()
  }
})

async function fetchPlaylist() {
  try {
    const response = await fetch('https://itu-wb12.onrender.com/playlist')
    if(!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    playlist.value = data;
    console.log('Playlist loaded successfully', playlist.value)
    
    if(playlist.value.length > 0 && isPlaying.value === false) {
      currentSong.value = playlist.value[0];
      isPlaying.value = true;
      console.log('current song: ', currentSong.value)
    }
    else if (playlist.value.length === 0 && isPlaying.value === false){
      console.log('current song sa nenacital')
      currentSong.value = null;
    }
  } catch(e) {
    console.log('Playlist loading failed', e)
  }
}

const nextSongs = computed(() => {
  if (!currentSong.value) return playlist.value
  return playlist.value.filter(song => song.id !== currentSong.value.id)
})

onMounted(()=> {
  fetchPlaylist();
  refreshTimer = setInterval( async () => {
    await fetchPlaylist()
  }, 3500);
}) 

const ReturnBackSearch = () => {
  showDetailSearch.value = false;
  showSearchPanel.value = true;
}

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

function DetailSearch(song) {
  showDetailSearch.value = true
  showSearchPanel.value = false
  selectedSong.value = song
}

function openDetailQueue(song) {
  showDetailQueue.value = true
  selectedSong.value = song
}

function getCover ()
{}

onUnmounted(() => {
  console.log('Unmounting')

  if (refreshTimer) clearInterval(refreshTimer)
  if (progressTimer) clearInterval(progressTimer)
})

</script>

<style scoped>
  .add-button {
    background: #0D564B;
    color: #D4AF37;
  }
  .searchPanel {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #D4AF37;
    display:flex;
    flex-direction: column;
    gap: 8px;
  }
  .searchbar {
    display: flex;
    justify-content: center;
  }
  .jukebox {
    margin-top: 8px;
    padding: 8px;
    border-radius: 8px;
    background: #D4AF37;
    display:flex;
    flex-direction: column;
    gap: 8px;
  }
  .currentSong {
    display: flex;
    justify-content: center;
  }
  .playlist {
    display: flex;
    flex-direction: column;
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