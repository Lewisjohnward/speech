import styled from "styled-components";
import { GithubIcon } from "../grid/components/icons/GithubIcon";
import { LinkedInIcon } from "../grid/components/icons/LinkedInIcon";

const Container = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: lemonchiffon;
  font-size: 1.2rem
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: end;
    & * {
        margin-left: 10px;
        margin-right: 10px;
    }
`

export const Footer = () => {
  return (
    <Container>
      <IconContainer>
        <GithubIcon />
        <LinkedInIcon />
      </IconContainer>
    </Container>
  );
};
