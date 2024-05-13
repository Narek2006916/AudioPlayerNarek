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

window.onload = function() {
    playSong();
}
let currentSong = 0;

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.getElementById("songTitle");
    songTitle.textContent = data.title[currentSong];
    let img = document.getElementsByClassName("row1");
    img[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    // let main = document.getElementsByClassName("main");
    // main[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    song.play()
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


song.addEventListener("timeupdate", function(){
    let fill = document.getElementsByClassName("fill")
    let position = song.currentTime / song.duration;
    fill[0].style.width = position * 100 + "%";

    convertTime(song.currentTime);
    if(song.ended){
        next()
    }
});

function convertTime(seconds){
    currentTime = document.getElementsByClassName("currentTime");
    let min = Math.floor(seconds/ 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime[0].textContent = min + ":" + sec;
    totalTime(Math.round(song.duration))
}

function totalTime(seconds){
    let min = Math.floor(seconds/ 60);
    let sec = Math.floor(seconds % 60);

    min = Math.floor(seconds/ 60);
    sec = Math.floor(seconds % 60);

    currentTime[0].textContent += " / " + min + ":" + sec;
}

function next(){
    currentSong ++;
    if(currentSong >= data.song.length){
        currentSong = 0
    }
    playSong();
    play.classList.add("fa-pause");
}

function prev(){
    currentSong --;
    if(currentSong < 0){
        currentSong = data.song.length-1
    }
    playSong();
    song.pause
    play.classList.add("fa-pause");
}


////


