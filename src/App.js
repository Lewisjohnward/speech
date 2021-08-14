import { useState, useEffect } from "react";
import React from "react";

navigator.userMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

function App() {
  const [playing, setPlaying] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null)

  useEffect(() => {
    if (recorder) {
      recorder.start();
      let chunks = [];

      recorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
        console.log(ev.data)
        console.log("pushing chunks");
      };

      recorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: "audio/wav" });
        console.log(blob);
        chunks = [];
        let audioUrl1 = window.URL.createObjectURL(blob);
        
        setAudioUrl(audioUrl1)
        // console.log(audioUrl);
        // audio.src = audioUrl;
        // console.log(audio)
      };
    }
  }, [recorder]);

  useEffect(() => {
    const audio = document.getElementsByClassName("app_audio")[0];
    audio.src = audioUrl
  }, [audioUrl]);

  const startVideo = async () => {
    setPlaying(true);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    // const audio = document.getElementsByClassName('app_audio')[0]
    // audio.srcObject = test
    // console.log(audio);
    console.log("Starting recording");
    setAudioStream(mediaStream);
    setRecorder(new MediaRecorder(mediaStream));
  };

  const stopVideo = () => {
    setPlaying(false);
    audioStream.getTracks()[0].stop();
    setTimeout(() => {
      recorder.stop();
      console.log("End recording");
    }, 500);
  };

  return (
    <div className="app">
      <div className="app__container">
        <audio controls className="app_audio"></audio>
      </div>
      <div className="app__input">
        {playing ? (
          <button onClick={stopVideo}>Stop</button>
        ) : (
          <button onClick={startVideo}>Start</button>
        )}
      </div>
      {audioUrl && <a href={audioUrl} download="hello.mp3">DownloadButton</a>}
    </div>
  );
}

export default App;
