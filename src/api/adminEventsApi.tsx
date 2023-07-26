import { mainAxios } from "./axiosCofig";

const url = "api/events";
const eventApi = {
  getEvent: () => {
    return mainAxios.get(`${url}`);
  },
  createEvent: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
};
export default eventApi;
