import { useState, useEffect } from "react";
import { useGetUserData } from "../../hooks/useGetUserData";
import { AudioWindow } from "./AudioWindow";
import { Reviews } from "../reviespanel/Reviews";

import axios from "axios";

export const Audio = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [text, setText] = useState(null);
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    updateUserData()
  }, [])


  useEffect(() => {
    const fetch = async () => {
      await updateAudio()
      await updateText();
    }
    fetch()
  }, []);
  
  useEffect(() => {
    console.log(text)
  }, [text]);

  const updateText = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/audio/text`);
    setText(data.text);
  };

  const updateAudio = async () => {
    const res = await axios.get(`http://localhost:5000/api/audio/audio`, {
      responseType: "blob",
    });
    const audioBlobObjectURL = URL.createObjectURL(res.data);
    setAudioUrl(audioBlobObjectURL);
  };

  const updateUserData = async () => {
    axios.get(`http://localhost:5000/api/audio/userdata`).then(response => setUserData(response.data))
  }

  const thumbsUpUpdate = async () => {
    await axios.post(`http://localhost:5000/api/audio/thumbsup`);
  };

  const thumbsUp = async () => {
    await thumbsUpUpdate();
    await updateUserData()
    setAudioUrl("")
    setText("")

    await updateAudio();
    await updateText();
    
  };
  const thumbsDown = () => {
    console.log("TD");

  };
  const handleAddNewAudio = async() => {
    console.log("Adding 5 new audio")
    setAudioUrl(null)
    setText(null)
    await axios.get(`http://localhost:5000/api/audio/addNewAudio`)
    await updateAudio();
    await updateText();
    await updateUserData()
   
}

  return (
    <>
    <Reviews addNewAudio={handleAddNewAudio} userData={userData}/>
      <AudioWindow
        audioUrl={audioUrl}
        text={text}
        thumbsUp={thumbsUp}
        thumbsDown={thumbsDown}
      />
    </>
  );
};
