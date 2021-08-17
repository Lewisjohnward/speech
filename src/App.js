import React from "react";
import {AudioRecorder} from "./components/AudioRecorder"
import { CustomAudioPlayer } from "./components/CustomAudioPlayer";
import { TestAudio } from "./components/TestAudio";

function App() {
  return (
    <>
    
    <div className="app">
    <CustomAudioPlayer />
      <AudioRecorder />
      <TestAudio />

    </div>
    </>
  );
}

export default App;
