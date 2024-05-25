let data = {
    title: [
        "Back To Black",
        "It's A Man's, Man's, Man's World",
        "Shine on You Crazy Diamond",
        "Still Got The Blues",
    ],
    singer: [
        "Amy Winehouse",
        "James Brown",
        "Pink Floyd",
        "Gary Moore",
    ],
    song: [
        "music/Amy_Winehouse-Back_To_Black.mp3",
        "music/James Brown – It's A Man's, Man's, Man's World.mp3",
        "music/Pink Floyd - Shine on You Crazy Diamond (Parts 1-5).mp3",
        "music/Gary Moore – Still Got The Blues.mp3",
    ],
    poster: [
        "images/amy-winehouse-back-2-high.jpg",
        "images/James_Brown_the_man_world.jpg",
        "https://i1.sndcdn.com/artworks-000044442011-50k6ec-t500x500.jpg",
        "https://i.scdn.co/image/ab67616d0000b273b586fc87d8bde3ba953f233a",
    ],
    shadow: [
        "0 0 50px 10px rgb(57 121 249 / 50%), 0 0 100px 20px rgba(165, 192, 255, 0.7)",
        "0 0 50px 10px rgba(255, 255, 255, 0.5), 0 0 100px 20px rgba(255, 255, 255, 0.3)",
        "",
    ],
    lyrics: [
        [
            { time: 0, text: "..." },
            { time: 16, text: "He left no time to regret" },
            { time: 22, text: "Kept his lips wet" },
            { time: 25, text: "With his same old safe bet" },
            { time: 31, text: "Me and my head high" },
            { time: 37, text: "And my tears dry" },
            { time: 40, text: "Get on without my guy" },
            { time: 46, text: "You went back to what you knew" },
            { time: 53, text: "So far removed" },
            { time: 56, text: "From all that we went through" },
            { time: 62, text: "And I tread a troubled track" },
            { time: 68, text: "My odds are stacked" },
            { time: 72, text: "I'll go back to black" },
            { time: 78, text: "We only said goodbye with words" },
            { time: 82, text: "I died a hundred times" },
            { time: 86, text: "You go back to her" },
            { time: 89, text: "And I go back to" },
            { time: 93, text: "I go back to us" },
            { time: 99, text: "I love you much" },
            { time: 103, text: "It's not enough" },
            { time: 105, text: "You love blow and I love puff" },
            { time: 112, text: "And life is like a pipe" },
            { time: 118, text: "And I'm a tiny penny rolling up the walls inside" },
            { time: 129, text: "We only said goodbye with words" },
            { time: 133, text: "I died a hundred times" },
            { time: 137, text: "You go back to her" },
            { time: 140, text: "And I go back to" },
            { time: 143, text: "We only said goodbye with words" },
            { time: 148, text: "I died a hundred times" },
            { time: 152, text: "You go back to her" },
            { time: 155, text: "And I go back to" },
            { time: 158, text: "..." },
            { time: 164, text: "Black, black, black, black" },
            { time: 181, text: "Black, black, black" },
            { time: 194, text: "I go back to" },
            { time: 198, text: "I go back to" },
            { time: 202, text: "We only said goodbye with words" },
            { time: 206, text: "I died a hundred times" },
            { time: 210, text: "You go back to her" },
            { time: 213, text: "And I go back to" },
            { time: 218, text: "We only said goodbye with words" },
            { time: 222, text: "I died a hundred times" },
            { time: 225, text: "You go back to her" },
            { time: 228, text: "And I go back to" },
            { time: 233, text: "Black" },
            { time: 235, text: "..." },
        ],
        [
            { time: 0, text: "This is a man's world" },
            { time: 5, text: "This is a man's world" },
            { time: 10, text: "But it wouldn't be nothing, nothing" },
            // Add more lines with timestamps
        ],
        [
            { time: 0, text: "Remember when you were young, you shone like the sun" },
            { time: 5, text: "Shine on you crazy diamond" },
            // Add more lines with timestamps
        ],
        [
            { time: 0, text: "Used to be so easy to give my heart away" },
            { time: 5, text: "But I found out the hard way" },
            { time: 10, text: "There's a price you have to pay" },
            // Add more lines with timestamps
        ]
    ]
};
let song = new Audio();
song.volume = 0.5; 
let currentSong = 0;
let repeatMode = false;
let shuffleMode = false;
let shuffledIndices = [];

window.onload = function() {
    playSong();
};

function playSong() {
    song.src = data.song[currentSong];
    document.getElementById("songTitle").textContent = data.title[currentSong];
    document.getElementById("songSinger").textContent = data.singer[currentSong];
    document.getElementsByClassName("song-img")[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    document.getElementsByClassName("song-img")[0].style.boxShadow = data.shadow[currentSong];
    displayLyrics();
    song.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    updateTotalTime();
}

function displayLyrics() {
    const lyricsContainer = document.getElementById("lyrics");
    lyricsContainer.innerHTML = '';
    data.lyrics[currentSong].forEach(lyric => {
        const line = document.createElement('div');
        line.className = 'lyric-line';
        line.dataset.time = lyric.time;
        line.textContent = lyric.text;
        lyricsContainer.appendChild(line);
    });
}

function highlightLyric() {
    const currentTime = song.currentTime;
    const lyricsContainer = document.getElementById("lyrics");
    const lines = lyricsContainer.getElementsByClassName('lyric-line');
    for (let i = 0; i < lines.length; i++) {
        const time = parseFloat(lines[i].dataset.time);
        if (currentTime >= time && (i === lines.length - 1 || currentTime < parseFloat(lines[i + 1].dataset.time))) {
            lines[i].classList.add('active');
            lines[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            lines[i].classList.remove('active');
        }
    }
}

song.addEventListener("timeupdate", function() {
    updateProgressBar();
    convertTime(song.currentTime);
    highlightLyric();
    if (song.ended) {
        if (repeatMode) {
            song.currentTime = 0;
            song.play();
        } else {
            next();
        }
    }
});









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
        if (repeatMode) {
            song.currentTime = 0;
            song.play();
        } else {
            next();
        }
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
    if (shuffleMode) {
        currentSong = getNextShuffledIndex();
    } else {
        currentSong++;
        if (currentSong >= data.song.length) {
            currentSong = 0;
        }
    }
    playSong();
}

function prev() {
    if (shuffleMode) {
        currentSong = getPrevShuffledIndex();
    } else {
        currentSong--;
        if (currentSong < 0) {
            currentSong = data.song.length - 1;
        }
    }
    playSong();
}

function toggleRepeat() {
    repeatMode = !repeatMode;
    let repeatButton = document.querySelector('.fa-repeat');
    if (repeatMode) {
        repeatButton.style.color = '#EAF0FF'; 
    } else {
        repeatButton.style.color = 'rgba(137, 150, 184, 0.6)'; 
    }
}

function toggleShuffle() {
    shuffleMode = !shuffleMode;
    let shuffleButton = document.querySelector('.fa-shuffle');
    if (shuffleMode) {
        shuffleButton.style.color = '#EAF0FF'; 
        shuffledIndices = generateShuffledIndices();
    } else {
        shuffleButton.style.color = 'rgba(137, 150, 184, 0.6)'; 
        shuffledIndices = [];
    }
}

function generateShuffledIndices() {
    let indices = [...Array(data.song.length).keys()];
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
}

function getNextShuffledIndex() {
    const currentIndex = shuffledIndices.indexOf(currentSong);
    const nextIndex = (currentIndex + 1) % shuffledIndices.length;
    return shuffledIndices[nextIndex];
}

function getPrevShuffledIndex() {
    const currentIndex = shuffledIndices.indexOf(currentSong);
    const prevIndex = (currentIndex - 1 + shuffledIndices.length) % shuffledIndices.length;
    return shuffledIndices[prevIndex];
}

function toggleVolumeSlider() {
    const volumeContainer = document.getElementById('volume-container');
    volume.style.color = "#EAF0FF"
    if (volumeContainer.classList.contains('hidden')) {
        volumeContainer.classList.remove('hidden');
        volumeContainer.classList.add('visible');
        volumeContainer.style.display = "block"
    } else {
        volumeContainer.classList.remove('visible');
        volumeContainer.classList.add('hidden');
        volumeContainer.style.display = "none"
        volume.style.color = "#8996b899"
    }
}

document.getElementById("volume-slider").addEventListener("input", function() {
    song.volume = this.value / 100;
    this.style.background = `linear-gradient(to right, #fff ${this.value}%, #808080 ${this.value}%)`;
    const volume = document.getElementById("volume")
    if(this.value == 0){
        volume.classList.remove("fa-volume-low")
        volume.classList.add("fa-volume-xmark")
    }
    else if(this.value == 100){
        volume.classList.remove("fa-volume-low")
        volume.classList.add("fa-volume-high")
    }
    else if(this.value > 0 || this.value <= 99){
        volume.classList.remove("fa-volume-xmark")
        volume.classList.remove("fa-volume-high")
        volume.classList.add("fa-volume-low")
    }

});












