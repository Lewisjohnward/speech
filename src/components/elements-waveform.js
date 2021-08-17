import styled from 'styled-components';

export const WaveformContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: 100%;
  background: #fff;
  padding: 0px 0px 5px 10px;
`;

export const Wave = styled.div`
  width: 80%; 
  height: 70px;
  margin-left: 10px;
`;

export const PlayButton = styled.button`
  width: 60px;
  height: 60px;
  background: #EFEFEF;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  margin-top: 10px;
  padding-top: 3px;
  &:hover {
    background: #DDD;
  }
`;