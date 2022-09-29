const musicList = [
  {
    songId: 1,
    name: "Unstoppable",
    singer: "Sia Kate Isobelle Furler",
    songPath: "audios/Unstoppable.mp3",
    thumbnail: "images/unstoppable.png"
  },
  {
    songId: 2,
    name: "Hall Of Fame",
    singer: "Danny O'Donoghue",
    songPath: "audios/The-script-wall-of-fame.mpeg",
    thumbnail: "images/hall-fame.png"
  },
  {
    songId: 3,
    name: "Memories",
    singer: "Maroon 5 - Rock Band",
    songPath: "audios/Memories.mpeg",
    thumbnail: "images/memories.png"
  },
  {
    songId: 4,
    name: "Thunder",
    singer: "Imagine Dragons - Rock band",
    songPath: "audios/Thunder.mpeg",
    thumbnail: "images/thunder.png"
  }
];
// Variable Declarations
let currAudio = document.getElementById("song");
const songImage = document.querySelector(".song-image");
const songName = document.querySelector(".song-name");
const singer = document.querySelector(".song-singer");
const currTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");
const volumeIcon = document.querySelector(".volume-icon");
const totolSongs = document.querySelector(".number-songs");


const btnRepeat = document.querySelector(".btn-repeat");
const btnPrev = document.querySelector(".btn-prev");
const btnPlay = document.querySelector(".btn-play");
const btnPause = document.querySelector(".btn-pause");
const btnNext = document.querySelector(".btn-next");
const timeSlider = document.querySelector(".time-slider");
const volumeSlider = document.querySelector(".volume-slider");
const volumeContainer = document.querySelector(".volume-container");
const volumeRange = document.querySelector(".volume-range");

let volumeIntail = 0;
let volumeIncrease, volumeDecrease;

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
let setPosition;


// Event Listeners
btnRepeat.addEventListener("click", repeatSong);
btnPlay.addEventListener("click", playPauseSong);
btnNext.addEventListener("click", nextSong);
btnPrev.addEventListener("click", prevSong);
timeSlider.addEventListener("change", calcSongDuration);
volumeSlider.addEventListener("change", calcSongVolume);
volumeContainer.addEventListener("click", toggleVolume);


// Functionalites Starts here
loadSong(trackIndex);
function loadSong(trackIndex) {
  clearInterval(updateTimer);
  resetTime();

  currAudio.src = musicList[trackIndex].songPath;
  currAudio.load();
  songImage.src = musicList[trackIndex].thumbnail;
  songName.innerText = musicList[trackIndex].name;
  singer.innerText = musicList[trackIndex].singer;
  totolSongs.innerText = `Playing ${musicList[trackIndex].songId} of ${musicList.length} Songs`;

  updateTimer = setInterval(setUpdate, 1000);
  currAudio.addEventListener("ended", nextSong);
}

function resetTime() {
  currTime.innerText = "00:00";
  totalTime.innerText = "00:00";
  timeSlider.value = 0;
}


function playPauseSong() {
  isPlaying ? pauseSong() : playSong();
}

function playSong() {
  currAudio.play();
  isPlaying = true;
  btnPlay.innerHTML = '<i class="fa-sharp fa-solid fa-pause"></i>';
}

function pauseSong() {
  currAudio.pause();
  isPlaying = false;
  btnPlay.innerHTML = ' <i class="fa-solid fa-play"></i>';
}

function nextSong() {
  if (trackIndex < musicList.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadSong(trackIndex);
  playSong();
}

function prevSong() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = musicList.length - 1;
  }
  loadSong(trackIndex);
  playSong()
}

function repeatSong() {
  let currSong = trackIndex;
  loadSong(currSong);
  playSong();
}

function toggleVolume() {
  volumeRange.classList.toggle("hidden");
}

function calcSongVolume() {
  let audioVolume = currAudio.value = volumeSlider.value / 100;
  currAudio.volume = volumeSlider.value / 100;
  if (audioVolume > 0.4) {
    volumeIcon.innerHTML = '<i class="fa fa-volume-up"></i>';
  } else if (audioVolume < 0.2) {
    volumeIcon.innerHTML = '<i class="fa fa-volume-down"></i>'
  }
}

function calcSongDuration() {
  let timeUpdate = currAudio.duration * (timeSlider.value / 100);
  currAudio.currentTime = timeUpdate;

}

function setUpdate() {
  let setPosition = 0;
  if (!isNaN(currAudio.duration)) {
    setPosition = currAudio.currentTime * (100 / currAudio.duration);
    timeSlider.value = setPosition;

    let currentMinutes = Math.floor(currAudio.currentTime / 60);
    let currentSeconds = Math.floor(currAudio.currentTime - currentMinutes * 60);

    let durantionMinutes = Math.floor(currAudio.duration / 60);
    let durantionSeconds = Math.floor(currAudio.duration - durantionMinutes * 60);

    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durantionMinutes < 10) {
      durantionMinutes = "0" + durantionMinutes;
    }
    if (durantionSeconds < 10) {
      durantionSeconds = "0" + durantionSeconds;
    }
    currTime.innerText = currentMinutes + ":" + currentSeconds;
    totalTime.innerText = durantionMinutes + ":" + durantionSeconds;

    //console.log(currentMinutes, currentSeconds);
  }
}
