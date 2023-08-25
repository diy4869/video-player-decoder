import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

function App() {
  const [count, setCount] = useState(0)
  const [playURL, setPlayURL] = useState('')
  const ffmpeg = createFFmpeg({ log: true });

  const transcode = async ({ target: { files } }) => {

    await ffmpeg.load();
    const inputPaths = [];
    for (const file of files) {
      const { name } = file;
      ffmpeg.FS('writeFile', name, await fetchFile(file));
      inputPaths.push(`file ${name}`);
    }
    console.log(inputPaths)
    ffmpeg.FS('writeFile', 'concat_list.txt', inputPaths.join('\n'));
    await ffmpeg.run('-f', 'concat', '-safe', '0', '-i', 'concat_list.txt', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');
    // const video = document.getElementById("output-video");
    const blob = URL.createObjectURL(
      new Blob([data.buffer], {
        type: "video/mp4"
      })
    );
    setPlayURL(blob)
  };
  // const elm = document.getElementById("uploader");


  return (
    <>
      <div>
      <video id="output-video" controls src={playURL}></video><br />
      <input type="file" id="uploader" multiple onChange={(e) => {
        console.log(e)
        transcode(e)
      }}/>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
