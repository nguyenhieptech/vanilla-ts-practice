// https://github.com/WebDevSimplified/Face-Recognition-JavaScript/tree/master
// https://www.youtube.com/watch?v=AZ4PdALMqx0

import '/src/style.css';
import * as faceapi from '@vladmandic/face-api';

const inputImageUpload = document.querySelector('#image-upload') as HTMLInputElement;

async function loadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromUri('/src/face-api-examples/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/src/face-api-examples/models');
  await faceapi.nets.ssdMobilenetv1.loadFromUri('/src/face-api-examples/models');
}

async function start() {
  const container = document.createElement('div');
  container.style.position = 'relative';
  document.body.append(container);
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

  let image: HTMLImageElement;
  let canvas: HTMLCanvasElement;

  document.body.append('Loaded');
  inputImageUpload.addEventListener('change', async () => {
    if (image) {
      image.remove();
    }
    if (canvas) {
      canvas.remove();
    }
    if (inputImageUpload.files) {
      image = await faceapi.bufferToImage(inputImageUpload.files[0]);
    }

    container.append(image);
    canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);

    const displaySize: faceapi.IDimensions = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));

    results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
      drawBox.draw(canvas);
    });
  });
}

function loadLabeledImages() {
  const labels = [
    // 'Black Widow',
    // 'Captain America',
    // 'Captain Marvel',
    // 'Hawkeye',
    // 'Jim Rhodes',
    // 'Thor',
    // 'Tony Stark',
    'Billy',
    'Tom',
    'Tony',
  ];

  return Promise.all(
    labels.map(async (label) => {
      const descriptions: faceapi.LabeledFaceDescriptors['descriptors'] = [];

      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          // `https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`
          `mock-images/${label}/${i}.jpg`
        );
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections!.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

loadModels();
start();
