import axios from "axios";

const mainAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export { mainAxios };
