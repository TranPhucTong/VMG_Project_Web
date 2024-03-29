import { mainAxios } from "./axiosCofig";

const url = "api/tourement";
const adminTournamentsApi = {
  getAllTournaments: () => {
    return mainAxios.get(`${url}`);
  },
  createTournaments: (data: Object) => {
    return mainAxios.post(`${url}`, { data });
  },
  deleteTournament: (idTournament: String) => {
    return mainAxios.post(`${url}/delete/${idTournament}`);
  },
  getTournamentByID: (idTournament: String) => {
    return mainAxios.get(`${url}/${idTournament}`);
  },
  updateInfoTournament: (idTournament: String, data : Object) => {
    return mainAxios.post(`${url}/update/${idTournament}`, { data });
  }
};

export default adminTournamentsApi;
