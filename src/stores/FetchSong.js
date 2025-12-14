////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: FetchSong.js          //
////////////////////////////////////////

import { ref } from "vue";
import { activeUser } from "./Login";

const songs = ref([]) 


async function fetchSongs() {
    const username = activeUser.value.username 
    try {
      const response = await fetch(`https://itu-wb12.onrender.com/songs?username=${encodeURIComponent(username)}`)
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

export function useSongs() {
    return {
        songs,
        fetchSongs,
    }
}