import { mainAxios } from "./axiosCofig";

const url = "api/events";
const eventApi = {
  getEvent: () => {
    return mainAxios.get(`${url}`);
  },
  getEventById: (id: string) => {
    return mainAxios.get(`${url}/${id}`);
  },
  createEvent: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
  deleteEvent: (idEvent: String) => {
    return mainAxios.post(`${url}/delete/${idEvent}`)
  },
  updateEvent : (idEvent : String, data : Object) => {
    return mainAxios.post(`${url}/update/${idEvent}`, {data})
  }
};
export default eventApi;
