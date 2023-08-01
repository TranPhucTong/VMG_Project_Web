import { mainAxios } from "./axiosCofig";

const url = "api/pokerroom";
const pokerRoomApi = {
    getPokerRoom: () => {
        return mainAxios.get(`${url}`);
    },
    createPokerRoom: (data: Object) => {
        return mainAxios.post(`${url}`, { data });
    },
}

export default pokerRoomApi;