import { mainAxios } from "./axiosCofig";

const url = "api/pokerroom";
const pokerRoomApi = {
  getPokerRoom: () => {
    return mainAxios.get(`${url}`);
  },
  createPokerRoom: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
  updatePokerRoom: (id: String, data: Object) => {
    return mainAxios.post(`${url}/update/${id}`, { data });
  },
  deletePokerRoom: (id: String) => {
    return mainAxios.post(`${url}/delete/${id}`);
  },
};

export default pokerRoomApi;
