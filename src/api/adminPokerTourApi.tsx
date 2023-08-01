import { mainAxios } from "./axiosCofig";

const url = "api/pokertour";
const pokerTourApi = {
    getPokerTour: () => {
        return mainAxios.get(`${url}`);
    },
    createPokerTour: (data: Object) => {
        return mainAxios.post(`${url}`, { data });
    },
}

export default pokerTourApi;
