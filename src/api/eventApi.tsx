import { mainAxios } from "./axiosCofig";

const url = "api/events";
const eventApi = {
  getEvent: () => {
    return mainAxios.get(`${url}`);
  },
};
export default eventApi;
