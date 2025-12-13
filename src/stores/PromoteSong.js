//TODO complite this

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
    fetchPlaylist();
    showDetailSearch.value = false;
    showSearchPanel.value = false;
    showDetailQueue.value = false;
}