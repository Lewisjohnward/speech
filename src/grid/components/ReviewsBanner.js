import styled from "styled-components";
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-items: stretch;
  align-items: stretch;
  width: 500px;
  height: 30px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 10px;
`;


export const ReviewsBanner = () => {
  return (
    <GridContainer>
      <Container>New: 0</Container>
      <Container>To review: 0</Container>
      <Container>Seen today: 0</Container>
    </GridContainer>
  );
};
