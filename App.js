import {useState, useEffect} from "react"
import React from "react";

navigator.userMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;
  
  
  function App() {
    
    const [playing, setPlaying] = useState(false);
    const [audioStream, setAudioStream] = useState(null)

    var mediaRecorder

    const startVideo = () => {
      setPlaying(true);
      navigator.mediaDevices.getUserMedia(
        {
          audio: true,
        }).then(
        (stream) => {
            let video = document.getElementsByClassName('app__videoFeed')[0];
            video.srcObject = stream
            
            mediaRecorder = new MediaRecorder(stream)
            let chunks = []
            
            mediaRecorder.start()

            setTimeout(() => {
              mediaRecorder.stop()
              
              let video = document.getElementsByClassName('app__videoFeed')[0];
		          video.srcObject.getTracks()[0].stop();
            }, 2000)
            
            mediaRecorder.ondataavailable = function(ev) {
              chunks.push(ev.data)
              
            }

            mediaRecorder.onstop = (ev) => {
              let blob = new Blob(chunks, {'type': 'audio/wav'})
              
              chunks = []
              let audioUrl = window.URL.createObjectURL(blob)
              
              video.src = audioUrl
            }

        })
        .catch((err) => console.error(err))
    };
  
    const stopVideo = () => {
      setPlaying(false);
		
    };

    

    return (
      <div className="app">
        <div className="app__container">
          <audio
          controls

            className="app__videoFeed"
          ></audio>
        </div>
        <div className="app__input">
          {playing ? (
            <button onClick={stopVideo}>Stop</button>
          ) : (
            <button onClick={startVideo}>Start</button>
          )}
        </div>
      </div>
    );
  }
  
  export default App;