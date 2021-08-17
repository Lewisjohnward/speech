import audio from "../audio/veroeproprio.wav";
import { useEffect, useState, useRef } from "react";
import { Waveform } from "./Waveform";
import { WaveformBars } from "./WaveformBars";
import { TestAudioLine } from "./TestAudioLine";

export const TestAudio = () => {
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef(); //Ref for out audio component
  const animationRef = useRef(); 
  
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


  return (
    <>
      <audio
        onPlay={togglePlay}
        onPause={togglePlay}
        onEnded={finishedPlaying}
        ref={audioPlayer}
        controls
        className="app_audio"
        src={audio}
        preload="auto"
        
      />
      <Waveform audio={audio} time={currentTime} duration={duration}/>
      <WaveformBars audio={audio} time={currentTime} duration={duration}/>
      <TestAudioLine time={currentTime} duration={duration}/>
      
    </>
  );
};

