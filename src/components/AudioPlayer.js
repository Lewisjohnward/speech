import audio1 from "../audio/01-È un grande sollievo scriverne.mp3";
import audio2 from "../audio/02-Non ho più dormito bene da quando ho ritrovato mio zio Otto morto.mp3";
import audio3 from "../audio/03-e più di una volta mi sono veramente doman-dato se fossi diventato pazzo o se lo diventerò.mp3";
import audio4 from "../audio/04- In un certo senso sarebbe stato tutto più misericordioso se non avessi avuto l_oggetto qui, nel mio studio.mp3";
import { useEffect, useState, useRef } from "react";
import { AudioPlayerWindow } from "./AudioPlayerWindow";

export const AudioPlayer = () => {
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [replay, setReplay] = useState(false);
  const [trackNum, setTrackNum] = useState(0);

  const audioPlayer = useRef(); //Ref for out audio component
  const animationRef = useRef();

  useEffect(() => {
    const seconds = audioPlayer.current.duration.toFixed(2);
    setDuration(seconds);
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

  useEffect(() => {
    changeTrack();
  }, []);

  const changeTrack = () => {
    setTrackNum(Math.floor(Math.random() * tracks.length));
  };

  const randomiseTrack = () => {
    changeTrack();
  };
  const activateReplay = () => {
    const replayPrev = replay;
    setReplay(!replayPrev);
  };

  const tracks = [audio1, audio2, audio3, audio4];
  const audio = tracks[trackNum];


  console.log(typeof audio1)

  const regex = /(?<=\-).*?(?=\.)/
  const text = audio.match(regex)[0].replace("_", "'")

  return (
    <>
      <div id="audioPlayer">
        <audio
          onEnded={finishedPlaying}
          ref={audioPlayer}
          src={audio}
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
        audio={audio}
        time={currentTime}
        duration={duration}
        randomiseTrack={randomiseTrack}
        trackNum={trackNum}
      />
    </>
  );
};
