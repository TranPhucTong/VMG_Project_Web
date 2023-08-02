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
        return mainAxios.post(`${url}/delete/${idTournament}`)
    },
}

export default adminTournamentsApi;