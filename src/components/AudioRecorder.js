import { useState, useEffect, useRef } from "react";
import { Waveform } from "./Waveform";
import { BiMicrophoneOff, BiMicrophone } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import { WaveformBars } from "./WaveformBars";
import { TestAudioLine } from "./TestAudioLine";

navigator.userMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

export function AudioRecorder() {
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const animationRef = useRef()

  useEffect(() => {
    if (recorder) {
      recorder.start();
      let chunks = [];

      recorder.ondataavailable = function (ev) {
        chunks.push(ev.data);
      };

      recorder.onstop = (ev) => {
        let blob = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        let audioUrl1 = window.URL.createObjectURL(blob);
        setAudioUrl(audioUrl1);
      };
    }
  }, [recorder]);

  useEffect(() => {
    const audio = document.getElementsByClassName("app_audio")[0];
    audio.src = audioUrl;
  }, [audioUrl]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    const seconds = audioPlayer.current.duration.toFixed(2);
    console.log(seconds)
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlay = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const finishedPlaying = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioPlayer.current.currentTime = 0;
  };

  const changePlayerCurrentTime = () => {
    setCurrentTime(audioPlayer.current.currentTime);
  };
  const startVideo = async () => {
    setPlaying(true);
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setAudioStream(mediaStream);
    setRecorder(new MediaRecorder(mediaStream));
  };

  const stopVideo = () => {
    setPlaying(false);
    audioStream.getTracks()[0].stop();
    setTimeout(() => {
      recorder.stop();
    }, 500);
  };

  return (
    <div className="app">
      <div className="app__container">
        <audio
          onPlay={togglePlay}
          onPause={togglePlay}
          onEnded={finishedPlaying}
          preload="auto"
          ref={audioPlayer}
          controls
          className="app_audio"
        ></audio>
      </div>

      <div className="app__input">
        {playing ? (
          <button onClick={stopVideo}>
            <BiMicrophoneOff />
          </button>
        ) : (
          <button onClick={startVideo}>
            <BiMicrophone />
          </button>
        )}
      </div>

      {audioUrl && (
        <>
          <Waveform audio={audioUrl} time={currentTime} duration={duration} />
          {/* <a href={audioUrl} download={`user-audio.mp3`}>
            <AiOutlineDownload />
          </a>
          <Waveform audio={audioUrl} time={currentTime} duration={duration} />
          <WaveformBars
            audio={audioUrl}
            time={currentTime}
            duration={duration}
          />
          <TestAudioLine time={currentTime} duration={duration} /> */}
        </>
      )}
    </div>
  );
}
