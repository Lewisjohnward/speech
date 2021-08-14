import { useState, useEffect } from "react";
import React from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition() ;

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

console.log(window);

function SpeechRecognitionApp() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mic is recording");
    };

    mic.onresult = (event) => {
      console.log(event)
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
        setNote(transcript)
        mic.onerror = event => {
          console.log(event.error)
        }
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote(null)
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current note</h2>
          {isListening ? <span>MIC</span> : <span>STOP</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prev) => !prev)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div>
          <div className="box">
            <h2>Notes</h2>
            {savedNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeechRecognitionApp;
