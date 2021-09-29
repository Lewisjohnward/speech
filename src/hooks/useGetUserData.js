import { useState, useEffect } from "react";
import axios from "axios";

export const useGetUserData = () => {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:5000/api/audio/userdata`);
      setUserData(data);
    }
    fetchData();
  }, []);

  return userData;
};
