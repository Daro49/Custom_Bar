import { reactive, computed } from "vue"

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
    state.currentSong = song
    state.songDuration = song.duration
    state.isPlaying = true
    state.startedAt = Date.now
    state.elapsedTime = 0
    state.progress = 0

    if(progressTimer) {
        clearInterval(progressTimer)
    }

    /* if (!currentSong.value) return
    stopProgress() */
  
    const tick = 500
  
    progressTimer = setInterval(()=> {
        if(!state.startedAt) return
        const elapsedSec = (Date.now() - state.startedAt) / 1000
        state.elapsedTime = Math.min(elapsedSec, state.songDuration)
        state.progress = (elapsedTime/state.songDuration) / 100
        if(state.elapsedTime>=state.songDuration)
        {
            
        }
      /* elapsedTime.value += tick
      if(elapsedTime.value >= songDuration.value) {
        elapsedTime.value = songDuration.value
        progress.value = 100
        stopProgress() 
        current_song_update()
      } else {
        progress.value = (elapsedTime.value / songDuration.value) * 100
      } */
    }, tick)
  }
  

