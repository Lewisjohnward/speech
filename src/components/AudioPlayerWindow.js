import styled from "styled-components";
import { GrPause, GrPlay } from "react-icons/gr";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";
import { ReplayIcon } from "./ReplayIcon";
import { WaveformBars } from "./WaveformBars";
import { ItFlagIcon } from "./other/ItFlagIcon";
import { AudioRecorder } from "./AudioRecorder";

const PlayBackContainer = styled.div`
  display: flex;
  max-width: 1305px;
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

const IconContainer = styled.div`
  margin-bottom: 0px;
`;

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
`;

const Text = styled.p`
  word-wrap: break-word;
`

export const AudioPlayerWindow = ({
  text,
  togglePlay,
  replay,
  setReplay,
  audio,
  time,
  duration,
  isPlaying,
  randomiseTrack,
  trackNum,
  thumbsUp,
  thumbsDown,
}) => {

  const completed = "Completed"
  return (
    <>
    <Text>{text}</Text>
      <TestContainer>
        
        {/* <IconContainer>
          <ItFlagIcon />
        </IconContainer> */}
      
      
      <PlayBackContainer>
        <PlayerContainer>
          <div onClick={togglePlay}>{isPlaying ? <GrPause /> : <GrPlay />}</div>
          <ReplayIcon replay={replay} setReplay={setReplay} />
          <GiPerspectiveDiceSixFacesFour onClick={randomiseTrack} />
        </PlayerContainer>
        <VoteContainer>
          {/* <BiHappyAlt /> */}
          <FiThumbsUp onClick={thumbsUp} />
          <FiThumbsDown onClick={thumbsDown} />
          {/* <FaRegSadCry /> */}
        </VoteContainer>

        <div>
          
        <WaveformBars
          completed={completed}
          trackNum={trackNum}
          audio={audio}
          time={time}
          duration={duration}
        />
        </div>
        </PlayBackContainer>
        <AudioRecorder />
        </TestContainer>
    </>
  );
};
