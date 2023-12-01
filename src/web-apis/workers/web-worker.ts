// https://github.com/mdn/dom-examples/blob/main/web-workers/simple-web-worker/main.js

// const app = document.querySelector('#app') as HTMLDivElement;
const first = document.querySelector('#number1') as HTMLInputElement;
const second = document.querySelector('#number2') as HTMLInputElement;
const result = document.querySelector('.result') as HTMLParagraphElement;

// app.innerHTML = `
//   <h1>Web Workers basic example</h1>
//     <div class="controls" tabindex="0">
//       <form>
//         <div>
//           <label for="number1">Multiply number 1: </label>
//           <input type="text" id="number1" value="0" />
//         </div>
//         <div>
//           <label for="number2">Multiply number 2: </label>
//           <input type="text" id="number2" value="0" />
//         </div>
//       </form>

//       <p class="result">Result: 0</p>
//     </div>
// `;

if (window.Worker) {
  const myWorker = new Worker('worker.ts');

  [first, second].forEach((input) => {
    input.onchange = function () {
      myWorker.postMessage([first.value, second.value]);
      console.log('Message posted to worker');
    };
  });

  myWorker.onmessage = function (e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
