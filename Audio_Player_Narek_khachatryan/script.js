let data = {
    title: [
        "It's A Man's, Man's, Man's World",
        "Shine on You Crazy Diamond",
        "Still Got The Blues",
    ],
    singer: [
        "James Brown",
        "Pink Floyd",
        "Gary Moore",
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
};

let song = new Audio();
let currentSong = 0;

window.onload = function() {
    playSong();
};

function playSong() {
    song.src = data.song[currentSong];
    document.getElementById("songTitle").textContent = data.title[currentSong];
    document.getElementById("songSinger").textContent = data.singer[currentSong];
    document.getElementsByClassName("song-img")[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    song.play();
    updateTotalTime();
    document.getElementById("play").classList.remove("fa-play");
    document.getElementById("play").classList.add("fa-pause");
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

song.addEventListener("timeupdate", function() {
    updateProgressBar();
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

function updateProgressBar() {
    let seekBar = document.getElementById("seek-bar");
    let position = (song.currentTime / song.duration) * 100;
    seekBar.value = position;
    seekBar.style.background = `linear-gradient(to right, #FFF ${position}%, #808080 ${position}%)`;
}

document.getElementById("seek-bar").addEventListener("input", function() {
    let seekBar = document.getElementById("seek-bar");
    let seekPosition = (seekBar.value / 100) * song.duration;
    song.currentTime = seekPosition;
    updateProgressBar();
});

document.getElementById("seek-bar").addEventListener("change", function() {
    let seekBar = document.getElementById("seek-bar");
    let seekPosition = (seekBar.value / 100) * song.duration;
    song.currentTime = seekPosition;
    updateProgressBar();
});

function convertTime(seconds) {
    let currentTime = document.getElementById("currentTime");
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;
}

function updateTotalTime() {
    song.onloadedmetadata = function() {
        let totalTime = document.getElementById("totalTime");
        let min = Math.floor(song.duration / 60);
        let sec = Math.floor(song.duration % 60);
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        totalTime.textContent = min + ":" + sec;
        document.getElementById("seek-bar").max = 100;
    }
}

function next() {
    currentSong++;
    if (currentSong >= data.song.length) {
        currentSong = 0;
    }
    playSong();
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = data.song.length - 1;
    }
    playSong();
}

