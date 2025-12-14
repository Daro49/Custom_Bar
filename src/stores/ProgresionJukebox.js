////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: ProgresionJukebox.js  //
////////////////////////////////////////

import { reactive, computed } from "vue"
import { usePlaylist } from "./Playlist"

const { playlist, current_song_update } = usePlaylist()

const state = reactive ({
    currentSong: null,
    songDuration: 0,
    elapsedTime: 0,
    progress: 0,
    startedAt: null,
    isPlaying: false,
})

let progressTimer = null

function formatTime (duration) {
  const mins = Math.floor(duration/60)
  const sec = Math.floor(duration%60)
  return `${String(mins).padStart(2, '0')}:${String(sec).padStart(2,'0')}`
}

function startProgress(song) {
  if (!song) return
  state.currentSong = song
  state.songDuration = song.duration
  state.isPlaying = true
  state.startedAt = Date.now()
  state.elapsedTime = 0
  state.progress = 0

  if(progressTimer) {
      clearInterval(progressTimer)
  }

  const tick = 500

  progressTimer = setInterval(async ()=> {
      
      if(!state.startedAt) return
      const elapsedSec = (Date.now() - state.startedAt) / 1000
      state.elapsedTime = Math.min(elapsedSec, state.songDuration)
      state.progress = (state.elapsedTime/state.songDuration) * 100
      if(state.elapsedTime>=state.songDuration)
      {
        state.elapsedTime = state.songDuration
        stopProgress()
        await current_song_update(state.currentSong) 

        if(playlist.value.length > 0) {
          const next = playlist.value[0]
          startProgress(next)
        } else {
          state.currentSong = null
        }
      }
  }, tick)
}

function stopProgress() {
  state.isPlaying = false
  if(progressTimer) {
    clearInterval(progressTimer)
    progressTimer = null
  }
  state.startedAt = null
}

const elapsedFormatted = computed(() => formatTime(state.elapsedTime))
const totalFormatted = computed(() => formatTime(state.songDuration))

export function useProgresionJukebox() {
  return {
    state,
    startProgress,
    stopProgress,
    elapsedFormatted,
    totalFormatted
  }
}  

