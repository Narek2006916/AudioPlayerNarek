let data = {
    title: [
        "James Brown – It's A Man's, Man's, Man's World",
        "Pink Floyd - Shine on You Crazy Diamond",
        "Gary Moore – Still Got The Blues",
    ],
    song: [
        "music/James Brown – It's A Man's, Man's, Man's World.mp3",
        "music/Pink Floyd - Shine on You Crazy Diamond (Parts 1-5).mp3",
        "music/Gary Moore – Still Got The Blues.mp3",
    ],
    poster: [
        "https://i1.sndcdn.com/artworks-000044442011-50k6ec-t500x500.jpg",
        "https://i1.sndcdn.com/artworks-000044442011-50k6ec-t500x500.jpg",
        "https://i.scdn.co/image/ab67616d0000b273b586fc87d8bde3ba953f233a",
    ],
}

let song = new Audio();
let currentSong = 0;

window.onload = function() {
    playSong();
}

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.getElementById("songTitle");
    songTitle.textContent = data.title[currentSong];
    let img = document.getElementsByClassName("row1");
    img[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    // let main = document.getElementsByClassName("main");
    // main[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
}

function playOrPause() {
    let play = document.getElementById("play");
    if (song.paused) {
        song.play();
        play.classList.remove("fa-play");
        play.classList.add("fa-pause");
    } else {
        song.pause();
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    }
}