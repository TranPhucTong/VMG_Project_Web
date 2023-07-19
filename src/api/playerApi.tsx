import { mainAxios } from "./axiosCofig";

const url = "api/players";
const playerApi = {
  getPlayer: () => {
    return mainAxios.get(`${url}`);
  },
  createPlayer: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
};
export default playerApi;
