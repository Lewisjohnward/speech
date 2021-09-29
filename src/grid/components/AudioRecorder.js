import { MicrophoneIcon } from "./icons/MicrophoneIcon";
import { BinIcon } from "./icons/BinIcon";

import { AudioIconsContainer, AudioContainer } from "./styles/Audio";
export const AudioRecorder = () => {
  return (
    <AudioContainer>
      <AudioIconsContainer>
        <MicrophoneIcon />
        <BinIcon />
      </AudioIconsContainer>
    </AudioContainer>
  );
};
