import { mainAxios } from "./axiosCofig";

const url = "api/pokertour";
const pokerTourApi = {
  getPokerTour: () => {
    return mainAxios.get(`${url}`);
  },
  createPokerTour: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
  updatePokerTour: (id: String, data: Object) => {
    return mainAxios.post(`${url}/update/${id}`, { data });
  },
  deletePokerTour: (id: String) => {
    return mainAxios.post(`${url}/delete/${id}`);
  },
};

export default pokerTourApi;
