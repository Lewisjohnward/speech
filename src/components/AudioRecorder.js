import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { GrPause, GrPlay } from "react-icons/gr";
import { WaveformBars } from "./WaveformBars";
import { ReplayIcon } from "./ReplayIcon";
import { BinIcon } from "./BinIcon";
import { MicrophoneIcon } from "./MicrophoneIcon";

const PlayBackContainer = styled.div`
  display: flex;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 25px;
  background: black;
  color: white;
  stroke: white;
  border-radius: 5px 0px 0px 5px;

  polygon {
    stroke: currentColor;
  }
  path {
    stroke: currentColor;
  }

  svg:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 25px;

  svg:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

navigator.userMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

export const AudioRecorder = () => {
  const [playing, setPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [replay, setReplay] = useState(false);

  const audioPlayer = useRef();
  const animationRef = useRef();

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
    const seconds = audioPlayer.current.duration.toFixed(2);
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const handleDelete = () => {
    setAudioUrl(null);
  };
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
  const activateReplay = () => {
    const replayPrev = replay;
    setReplay(!replayPrev);
  };

  return (
    <div>
      <div>
        <PlayBackContainer>
          <audio
            onEnded={finishedPlaying}
            preload="auto"
            ref={audioPlayer}
            src={audioUrl}
            loop={replay ? true : false}
          />
          <PlayerContainer>
            <MicrophoneIcon
              playing={playing}
              stopVideo={stopVideo}
              startVideo={startVideo}
            />
            {audioUrl &&
              <>
                <div onClick={togglePlay}>
                  {isPlaying ? <GrPause /> : <GrPlay />}
                </div>
                <ReplayIcon replay={replay} setReplay={activateReplay} />
              </>
            }
          </PlayerContainer>
          <VoteContainer>
            <BinIcon handleDelete={handleDelete} />
          </VoteContainer>

          <WaveformBars
            audio={audioUrl}
            time={currentTime}
            duration={duration}
          />
        </PlayBackContainer>
      </div>
    </div>
  );
};
