import React from "react";
import {Options} from "./components/Options";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioRecorder } from "./components/AudioRecorder";
import Login from "./components/Login";

function App() {
  return (
    <>
    
      <div className="app">
        <Login />
        <Options />
        <AudioPlayer/>
        <AudioRecorder />
      </div>
    </>
  );
}

export default App;
