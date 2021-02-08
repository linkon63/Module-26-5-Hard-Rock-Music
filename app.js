const searchSongs = async () => {
    const searchText = document.getElementById('search-filed').value;
    //console.log(searchText);
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    // const res = await fetch(url);
    // const data = await res.json();
    // displaySongs(data.data);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(console.error('error to load API'))
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/ogg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);

    });
}


const getLyric = async (artist, title) => {

    try {
        const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);
    } catch (error) {
        console.log('error');
    }


}

// const getLyric = (artist, title) => {
//     const url=`https://api.lyrics.ovh/v1/${artist}/${title}`;
//     console.log(url);
//     fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         displayLyric(data.lyrics);
//     })

const displayLyric = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}