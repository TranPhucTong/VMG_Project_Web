import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    playerName: "",
    city: "",
    country:"",
    linkInfo:"",
    image:"",
    historyEvent:[],
}

const updatePlayerSlice = createSlice({
    name: "updatePlayerSlice",
    initialState: initialState,
    reducers:{
        updateRequirePlayer: (state, action) => {
            state.id = action.payload._id
            state.playerName = action.payload.playerName
            state.city = action.payload.city 
            state.country = action.payload.country
            state.linkInfo = action.payload.linkInfo
            state.image = action.payload.avatarImage
            state.historyEvent = action.payload.historyEvent
        }
    }
})

export const { updateRequirePlayer } = updatePlayerSlice.actions;
export const updatePlayer = ( state : any ) => state.updatePlayer;

export default updatePlayerSlice;