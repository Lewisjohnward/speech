import axios from "axios";

  export async function thumbsUpHook() {
    //Add a day to audio review
    //Add seen number of audio to user and update review date
    await axios.post(`http://localhost:5000/api/auth/thumbsup`);
  }
  export async function thumbsDownHook() {
    //Review audio again tomorrow
    //Add seen number of audio to user and update review date
    await axios.post(`http://localhost:5000/api/auth/thumbsdown`);
  }
