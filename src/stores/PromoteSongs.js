////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: PromoteSongs.js       //
////////////////////////////////////////

/**
 * @brief POST function to send server information that song was promoted
 * @param  song 
 */
export async function promoteSong(song) {
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
}