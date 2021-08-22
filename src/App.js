import React from "react";
import {Options} from "./components/Options";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioRecorder } from "./components/AudioRecorder";

function App() {
  return (
    <>
      <div className="app">
        <Options />
        
        <AudioPlayer/>
        <AudioRecorder />
      </div>
    </>
  );
}

export default App;
