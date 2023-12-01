// github.com/mdn/dom-examples/blob/main/web-workers/simple-web-worker/worker.js
// https://developer.mozilla.org/en-US/docs/Web/API/Worker

onmessage = function (e: MessageEvent) {
  console.log('Worker: Message received from main script');
  const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = `Result: ${result}`;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }
};
