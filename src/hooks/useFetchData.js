import axios from "axios";
import React, { useState, useEffect } from "react";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const auth = "Bearer " + token;
  const url = process.env.REACT_APP_API_URI + endpoint;
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      let response = await axios.get(url, {
        mode: 'no-cors',
        headers: {
          Accept: "*/*",
          Authorization: auth,
        },
      });
      if(response){
        if(!response.data.error){
            setData(response.data.data)
        }
        else{
            setError(true)
        }
      }
      setLoading(false)
      console.log(response);
    };
    fetchData()
  }, [auth, url]);

  return { data, loading, error };
};
