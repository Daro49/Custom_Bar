////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: Playlist.js           //
////////////////////////////////////////

import { ref } from "vue";
import { activeUser } from "./Login";

const playlist = ref([]) 

async function fetchPlaylist() {
  const username = activeUser.value.username
    try {
      const response = await fetch(`https://itu-wb12.onrender.com/playlist?username=${encodeURIComponent(username)}`)
      if(!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
      playlist.value = data;
      console.log('Playlist loaded successfully', playlist.value)
      
    } catch(e) {
      console.log('Playlist loading failed', e)
    }
}
  

async function current_song_update(song) {
    console.log('Piesen skoncila')
    try {
      const request = await fetch('https://itu-wb12.onrender.com/playlist/remove', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ 
          songTitle: song.title 
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

export function usePlaylist() {
    return {
        playlist,
        fetchPlaylist,
        current_song_update,
    }
}
  