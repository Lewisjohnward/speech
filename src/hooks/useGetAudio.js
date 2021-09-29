import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAudio = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:5000/audio/audio`, {
        responseType: "blob",
      });
      const audioBlobObjectURL = URL.createObjectURL(res.data);
      setAudioUrl(audioBlobObjectURL);
    }
    fetchData();
  }, []);

  return audioUrl;
};
