import React, { useState, useRef, useEffect } from "react";
import audio from "../audio/veroeproprio.wav";
import { TiArrowRightOutline, TiArrowLeftOutline } from "react-icons/ti";
import { BsPlay } from "react-icons/bs";
import { IoPause } from "react-icons/io5";
import "../customAudioPlayer.css";

export const CustomAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef(); //Ref for out audio component
  const progressBar = useRef(); //Ref to our progress bar
  const animationRef = useRef(); //Ref the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const togglePlay = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };


  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const finishedPlaying = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioPlayer.current.currentTime = 0;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirtySeconds = () => {
    progressBar.current.value = Number(progressBar.current.value - 1);
    
    changeRange();
  };

  const forwardThirtySeconds = () => {
    progressBar.current.value = Number(progressBar.current.value + 1);
    changeRange();
  };

  const calculateTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secs = Math.floor(seconds % 60);
    const returnedSeconds = secs < 10 ? `0${secs}` : `${secs}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  return (
    <div className="audioPlayer">
      <audio onEnded={finishedPlaying} ref={audioPlayer} src={audio}></audio>

      <div className="audioPlayerSlider">
        {/* current time */}
        <div className="currentTime">{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div>
          <input
            onChange={changeRange}
            ref={progressBar}
            className="progressBar"
            type="range"
            defaultValue="0"
          />
        </div>

        {/* duration */}
        <div className="duration">
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>

      {/* Play buttons */}
      <div className="audioPlayerButtons">
        <button onClick={backThirtySeconds} className="forwardBackward">
          <TiArrowLeftOutline />
        </button>
        <button className="playPause" onClick={togglePlay}>
          {isPlaying ? <IoPause /> : <BsPlay className="play" />}
        </button>
        <button onClick={forwardThirtySeconds} className="forwardBackward">
          <TiArrowRightOutline />
        </button>
      </div>
    </div>
  );
};
