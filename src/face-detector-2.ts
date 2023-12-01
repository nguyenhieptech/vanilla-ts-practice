import * as faceapi from '@vladmandic/face-api';

const video = document.querySelector('#video') as HTMLVideoElement;

async function start() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/src/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/src/models');
  await faceapi.nets.faceRecognitionNet.loadFromUri('/src/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/src/models');
}

async function startVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    video.srcObject = stream;
  } catch (error) {
    console.log(error);
  }
}

start();
startVideo();

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});
