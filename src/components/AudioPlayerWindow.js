import styled from "styled-components";
import { GrPause, GrPlay } from "react-icons/gr";
import { GiPerspectiveDiceSixFacesFour } from "react-icons/gi";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { FaRegSadCry } from "react-icons/fa";
import { BiHappyAlt } from "react-icons/bi";
import { ReplayIcon } from "./ReplayIcon";
import { WaveformBars } from "./WaveformBars";
import { ItFlagIcon } from "./other/ItFlagIcon";

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

const WindowContainer = styled.div`


`;
const IconContainer = styled.div`
  margin-bottom: 0px;
`;

const TestContainer = styled.div`
  display: flex;
  margin-left: 90px;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

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
}) => {
  return (
    <WindowContainer>
      <TestContainer>
        <p>{text}</p>
        <IconContainer>
          <ItFlagIcon />
        </IconContainer>
      </TestContainer>

      <PlayBackContainer>
        <PlayerContainer>
          <div onClick={togglePlay}>{isPlaying ? <GrPause /> : <GrPlay />}</div>
          <ReplayIcon replay={replay} setReplay={setReplay} />
          <GiPerspectiveDiceSixFacesFour onClick={randomiseTrack} />
        </PlayerContainer>
        <VoteContainer>
          <BiHappyAlt />
          <FiThumbsUp />
          <FiThumbsDown />
          <FaRegSadCry />
        </VoteContainer>
        <WaveformBars
          trackNum={trackNum}
          audio={audio}
          time={time}
          duration={duration}
        />
      </PlayBackContainer>
    </WindowContainer>
  );
};
