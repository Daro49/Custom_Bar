////////////////////////////////////////
//             ITU-PROJECT            //
//   author: Jozef Matus (xmatusj00)  //
//   file-name: AddToFavorite.js      //
////////////////////////////////////////

import { activeUser } from "./Login";

export async function addToFavouritesToggle(song) {
    const username = activeUser.value.username
    if (!username) throw new Error("No active user");
    try {
        const request = await fetch(`https://itu-wb12.onrender.com/songs/${song.id}/like`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({ 
            username
          }),
        })
        if(!request.ok) {
          throw new Error(`Server error: ${request.status}`);
        }
        const data = await request.json()
        console.log('Song added successfully', data)
        return data
      } catch(e) {
        console.log('Song add failed', e)
      }
}