import '/src/style.css';

const videoElement = document.querySelector('#my-video') as HTMLVideoElement;
const fullscreenButton = document.querySelector('#fullscreen-button') as HTMLButtonElement;

fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenEnabled) {
    videoElement.requestFullscreen();
  }
});

// Exit fullscreen when the video ends
videoElement.addEventListener('ended', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
});
