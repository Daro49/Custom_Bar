////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: AddSongToPlaylist.js  //
////////////////////////////////////////

/**
 * @brief POST function that sends server info about song to be added to playlist
 * @param song 
 */
export async function addToQueue(song) {
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
}