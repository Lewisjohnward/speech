import { useState, useEffect, useRef } from "react";

import { AudioPlayerWindow } from "../AudioPlayerWindow";
import { AudioRecorder } from "../AudioRecorder";
export const AudioWindow = ({ audioUrl, text, thumbsUp, thumbsDown }) => {
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [replay, setReplay] = useState(false);
  const [trackNum, setTrackNum] = useState(0);

  const audioPlayer = useRef(); //Ref for out audio component
  const animationRef = useRef();
  const testAudioPlayer = useRef()

  useEffect(() => {
    const seconds = audioPlayer.current.duration.toFixed(2);
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  useEffect(() => {
    console.log('audioUrl changed');
    setIsPlaying(false)
  }, [audioUrl]);

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
    changePlayerCurrentTime();
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

  const activateReplay = () => {
    const replayPrev = replay;
    setReplay(!replayPrev);
  };


  return (
    <>
      <div id="audioPlayer">
        <audio
          onEnded={finishedPlaying}
          ref={audioPlayer}
          src={audioUrl}
          loop={replay ? true : false}
          preload="auto"
        />
      </div>
      <AudioPlayerWindow
        text={text}
        togglePlay={togglePlay}
        isPlaying={isPlaying}
        onEnded={finishedPlaying}
        replay={replay}
        setReplay={activateReplay}
        audio={audioUrl}
        time={currentTime}
        duration={duration}
        thumbsUp={thumbsUp}
        thumbsDown={thumbsDown}
      />
      {/* <AudioRecorder /> */}
    </>
  );
};
