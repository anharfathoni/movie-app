import axios from "axios";

// Axios Instance
export const api = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_SOURCE_API}`,
    headers,
    params: {
      apikey: process.env.REACT_APP_APIKEY,
    },
  });

  return instance;
};
