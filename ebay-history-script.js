// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Global variables
var player;
var loadingTextInterval;
var isPlaying = false;

// This function creates a new YouTube player when the API is loaded.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

// Function to handle video state changes and audio fade
function onPlayerStateChange(event) {
    const backgroundMusic = document.getElementById('era-music');
    if (event.data == YT.PlayerState.PLAYING) {
      fadeAudio(backgroundMusic, 'out');
    } else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
      fadeAudio(backgroundMusic, 'in');
    }
}

// Function to smoothly fade audio in or out
function fadeAudio(audioElement, direction) {
    const volumeStep = 0.05;
    const fadeInterval = 50;

    if (direction === 'out') {
        const fadeOutInterval = setInterval(() => {
            if (audioElement.volume > volumeStep) {
                audioElement.volume -= volumeStep;
            } else {
                audioElement.volume = 0;
                audioElement.pause();
                clearInterval(fadeOutInterval);
            }
        }, fadeInterval);
    } else if (direction === 'in') {
        if (audioElement.paused) {
          audioElement.play();
          audioElement.volume = 0;
        }
        const fadeInInterval = setInterval(() => {
            if (audioElement.volume < 1 - volumeStep) {
                audioElement.volume += volumeStep;
            } else {
                audioElement.volume = 1;
                clearInterval(fadeInInterval);
            }
        }, fadeInterval);
    }
}

// Main event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    // Loading Text and Animation
    const loadingTextElement = document.querySelector('.loading-text');
    const messages = [
        'Calibrating auction prices...',
        'Compiling user reviews...',
        'Bypassing Y2K bugs...',
        'Discovering new products...',
        'Finalizing protocols...'
    ];

    let messageIndex = 0;
    loadingTextInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        loadingTextElement.textContent = messages[messageIndex];
    }, 2000);

    // Audio Player Controls
    const music = document.getElementById('era-music');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            music.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    volumeSlider.addEventListener('input', () => {
        music.volume = volumeSlider.value;
    });

    // AFK Redirect Button
    const afkPauseBtn = document.getElementById('afk-pause-btn');
    afkPauseBtn.addEventListener('click', () => {
        window.location.href = '../afk/brb-screen.html';
    });
});
