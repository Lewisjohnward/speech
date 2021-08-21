import React from "react";
import {Options} from "./components/OptionsIcon";
import { AudioPlayer } from "./components/AudioPlayer";
import { TestRecorder } from "./components/TestRecorder";
import { AudioRecorder } from "./components/AudioRecorder";

function App() {
  return (
    <>
      <div className="app">
        <Options />
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/7j9_WX19nUA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> */}
        <AudioRecorder />
        <AudioPlayer/>
        <TestRecorder />
      </div>
    </>
  );
}

export default App;
