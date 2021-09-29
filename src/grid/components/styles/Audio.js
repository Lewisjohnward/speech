import styled from "styled-components";

//Audio + text container
export const AudioContainer = styled.div`
  width: ${({ width }) => width}px;
  position: relative;
  font-size: 1.5rem;
  height: 200px;
`;

//Text container
export const TextContainer = styled.p`
  padding: 5px;
  background: lightgray;
  border-radius: 10px;

  color: black;
  font-size: 1rem;
`;

//Waveform Container
export const AudioWaveformContainer = styled.div``;

//All Icons Container div
export const AudioIconsContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;

  svg:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

//Individual Icon Container Div
export const IconContainer = styled.div`
  display: flex;
  background: black;
  color: white;
  margin: 2px;
  padding: 2px;
  border-radius: 5px;
`;
