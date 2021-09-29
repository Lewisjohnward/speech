import React from "react";
import { Options } from "./components/Options";
import { AudioPlayer } from "./components/AudioPlayer";
import { AudioRecorder } from "./components/AudioRecorder";
import Login from "./components/Login";
import Video from "./components/videoRetriever/Video";
import { Audio } from "./components/testbackendaudio/Audio";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Grid } from "./grid/Grid";
import { NavBar } from "./components/navbar/NavBar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function App() {
  return (
    <div>
      <Header />
      <Container>
        <NavBar />
        <Grid />
      </Container>
      {/* <Login />
        <Options />
        <AudioPlayer/>
        <AudioRecorder /> */}
      {/* <Video /> */}
      <Audio />
      <Footer />
    </div>
  );
}

export default App;
