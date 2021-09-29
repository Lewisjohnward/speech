//Icon imports
import { PlayIcon } from "./icons/PlayIcon";
import { ReplayIcon } from "./icons/ReplayIcon";
import { ThumbsUpIcon } from "./icons/ThumbsUpIcon";
import { ThumbsDownIcon } from "./icons/ThumbsDownIcon";
import { BackIcon } from "./icons/BackIcon";

import { WaveformBars } from "../../components/WaveformBars";
import audio from "../../audio/01-È un grande sollievo scriverne.mp3";

//Styling
import {
  AudioIconsContainer,
  AudioContainer,
  AudioWaveformContainer,
  TextContainer,
  IconContainer,
} from "./styles/Audio";

const width = 1000;
const height = 150;

export const AudioPlayer = () => {
  return (
    <AudioContainer width={width}>
      <TextContainer>
        Occaecat exercitation pariatur cillum ex ea exercitation anim
        adipisicing non nisi. Mollit anim cillum veniam eiusmod. Mollit anim
        cillum veniam eiusmod. . Mollit anim cillum veniam eiusmod.. Mollit anim
        cillum veniam eiusmod.
      </TextContainer>
      <AudioWaveformContainer>
        <WaveformBars
          audio={audio}
          time={10}
          duration={10}
          completed={false}
          parentWidth={width}
          parentHeight={height}
        />
      </AudioWaveformContainer>
      <AudioIconsContainer>
        <IconContainer>
          <PlayIcon />
        </IconContainer>
        <IconContainer>
          <ReplayIcon />
        </IconContainer>
        <IconContainer>
          <BackIcon />
        </IconContainer>
        <IconContainer>
          <ThumbsUpIcon />
        </IconContainer>
        <IconContainer>
          <ThumbsDownIcon />
        </IconContainer>
      </AudioIconsContainer>
    </AudioContainer>
  );
};
