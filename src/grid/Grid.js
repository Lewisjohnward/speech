import styled from "styled-components";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioRecorder } from "./components/AudioRecorder";
import { ReviewsBanner } from "./components/ReviewsBanner";

const Container = styled.div`
  margin-top: 75px;  
  margin-left: 150px
`;


const AudioContainer = styled.div`
  height: 500px;
  width: 1000px;
`;

export const Grid = () => {
  return (
    <Container>
      <ReviewsBanner />
      <AudioContainer>
        <AudioPlayer />
        {/* <AudioRecorder /> */}
      </AudioContainer>
    </Container>
  );
};
