import { useState, useEffect } from "react";
import axios from "axios";

export const useGetText = () => {
  const [text, setText] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:5000/audio/text`);
      setText(data.text);
    }
    fetchData();
  }, []);

  return text;
};
