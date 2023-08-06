import { mainAxios } from "./axiosCofig";

const url = "api/players";
const playerApi = {
  getPlayer: () => {
    return mainAxios.get(`${url}`);
  },
  getPlayerById: (id: string) => {
    return mainAxios.get(`${url}/${id}`);
  },
  getPlayerSortVpoy: () => {
    return mainAxios.get(`${url}?vpoyPoint=true`);
  },
  getPlayersSortCountry: (country: string, sortBy: string) => {
    return mainAxios.get(`${url}?country=${country}&${sortBy}=true`);
  },
  getPlayersSortCity: (city: string, sortBy: string) => {
    return mainAxios.get(`${url}?city=${city}&${sortBy}=true`);
  },
  createPlayer: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
  updatePlayer: (data: Object, id: string) => {
    return mainAxios.post(`${url}/update/${id}`, { data });
  },
  deletePlayer: (id: String) => {
    return mainAxios.post(`${url}/delete/${id}`);
  },
};
export default playerApi;
