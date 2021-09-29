import styled from "styled-components";

const Container = styled.div`

  display: flex;

  padding: 20px 10px;

  background: lemonchiffon;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: end
    & * {
        margin-left: 10px;
        margin-right: 10px;
    }
`

export const Header = () => {
  return (
    <Container>
      <IconContainer>
        <p>Header</p>
      </IconContainer>
    </Container>
  );
};
