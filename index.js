// Music Container
const musicContainer = document.querySelector("#musicContainer");
// Previous button
const previousButton = document.querySelector("#previous");
// Play button
const playButton = document.querySelector("#play");
// Next Button
const nextButton = document.querySelector("#next");
// The music (audio)
const music = document.querySelector("#music");
// Progress Container
const progressContainer = document.querySelector("#progressContainer");
// The progress
const progress = document.querySelector("#progress");
// Name of the song
const musicTitle = document.querySelector("#musicTitle");
// Cover of the song
const cover = document.querySelector("#cover");

// Name of the songs
const songs = [
  "I Really Want to Stay at Your House",
  "Please",
  "Burning Hour",
  "Let Me Down Slowly",
  "It's Part of Human Nature",
];

// Keep track of songs
let songIndex = 0;

// Load songs into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  musicTitle.innerText = song;
  music.src = `Music/${song}.mp3`;
  cover.src = `Covers/${song}.jpg`;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

function playSong() {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");

  music.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.add("fa-play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");

  music.pause();
}

function previousSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

playButton.addEventListener("click", checkSong);

function checkSong() {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

previousButton.addEventListener("click", previousSong);
nextButton.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

music.addEventListener("ended", nextSong);
