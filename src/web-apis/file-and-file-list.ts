// HTML5 File and FileList Objects
// https://youtu.be/7fybEXre70o?si=hiuXcBQCAtvZ1v9e

// Uploading Multiple Files with Fetch
// https://youtu.be/ubHIayJKhac?si=0K5eeOZdUir4WgqP

import '/src/style.css';
import 'typed-query-selector';

const app = document.querySelector('#app') as HTMLDivElement;

app.innerHTML = `
  <header>
      <h1>File and FileList (and fetch too)</h1>
    </header>
    <main>
      <h2>Gather Your Files</h2>
      <form name="my-form" id="my-form" action="#">
        <p>
          <label>Pick Files</label>
          <input
            type="file"
            id="input-file"
            multiple
            accept=".png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png"
          />
        </p>
        <!--
          text/html,.html,text/xml,.xml
          text/css,.css
          application/json,.json,text/json
          image/*,.png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png
        -->
        <p><button id="button-toggle">Toggle File Input</button></p>
        <p><button id="button-pick">Pick Files</button></p>
        <p><button id="button-info">Show File Info</button></p>
      </form>
    </main>
    <!--
      Images from
      https://unsplash.com/@dorographie
      https://unsplash.com/photos/0o_GEzyargo
    -->
`;

const inputFile = document.querySelector('#input-file') as HTMLInputElement;
const buttonToggle = document.querySelector('#button-toggle') as HTMLButtonElement;
const buttonPick = document.querySelector('#button-pick') as HTMLButtonElement;
const buttonInfo = document.querySelector('#button-info') as HTMLButtonElement;

document.addEventListener('dom', () => {
  inputFile.addEventListener('change', filesPicked);
  buttonInfo.addEventListener('click', showFileInfo);
  buttonToggle.addEventListener('click', toggleInput);
  buttonPick.addEventListener('click', askForFiles);
});

function filesPicked(e: Event): void {
  // any time one or more files are picked in the file picker dialog
  const input = e.target as HTMLInputElement;
  const files = input.files as FileList;
  console.log({ files });
  if (files && files.length > 0) {
    showFileInfo(e);
  }
}

function showFileInfo(e: Event): void {
  if (e.type === 'click') {
    e.preventDefault();
  }
  // loop through all the files in the FileList
  // and display the name, size, type, and lastModified date
  const files = inputFile.files as FileList;
  const len = files.length ?? 0;

  for (let i = 0; i < len; i++) {
    console.group();
    console.log(files[i].name);
    console.log(files[i].size);
    console.log(files[i].type);
    console.log(files[i].lastModified);
    console.groupEnd();
  }
}

function toggleInput(e: MouseEvent): void {
  // hide or show the <input type="file">
  e.preventDefault();
  const control = inputFile.parentElement as HTMLParagraphElement;
  // we want to apply this class to the parent
  control.classList.toggle('hidden');
}

function askForFiles(e: MouseEvent): void {
  // open the file picker dialog
  e.preventDefault();
  const control = inputFile;
  control.click();
}
