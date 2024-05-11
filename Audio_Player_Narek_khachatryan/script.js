let data  = {
    title : [
        "James Brown – It's A Man's, Man's, Man's World",
        "Pink Floyd - Shine on You Crazy Diamond",
        "Gary Moore – Still Got The Blues"
    ],
    song : [
        "music/James Brown – It's A Man's, Man's, Man's World.mp3",
        "music/Pink Floyd - Shine on You Crazy Diamond (Parts 1-5).mp3",
        "Gary Moore – Still Got The Blues.mp3"
    ],
    poster: [
        "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://i1.sndcdn.com/artworks-000044442011-50k6ec-t500x500.jpg",
        "https://i.scdn.co/image/ab67616d0000b273b586fc87d8bde3ba953f233a"
    ],
}


let song = new Audio();

window.onload = function (){
    playSong()
}
let currentSong = 0
function playSong(){
    song.src = data.song[currentSong];
    let songTitle = document.getElementById("songTitle")
    songTitle.textContent = data.title[currentSong]
    let img = document.getElementsByClassName("row1")
    img[0].style.backgroundImage = "url("+ data,poster[currentSong] +")"
    let main = document.getElementsByClassName("main");
    main[0].style.backgroundImage = "url("+ data,poster[currentSong] +")"
}

function playOrPause(){
        let play = document.getElementById("play")
        if(song.paused){
            song.play()
            play.src = "images/pause.png"
        }else{
            song.pause()
            play.src = "images/play-button-arrowhead.png"
        }
}