import { createSlice } from "@reduxjs/toolkit";

interface ResultPrize {
  _id: string;
  playerName: string;
  place: number;
  prize: number;
}

interface EventData {
  _id: string;
  nameEvent: string;
  buyIn: number;
  dateEvent: string;
  entries: number;
  resultsPrize: ResultPrize[];
  __v: number;
}

const initialState: EventData = {
  _id: "",
  nameEvent: "",
  buyIn: 0,
  dateEvent: "",
  entries: 0,
  resultsPrize: [],
  __v: 0,
};

const detailsEventSlice = createSlice({
  name: "detailsEventSlice",
  initialState: initialState,
  reducers: {
    requireDetailsEvent: (state, action) => {
      const { _id, nameEvent, buyIn, dateEvent, entries, resultsPrize } = action.payload;
      state._id = _id;
      state.nameEvent = nameEvent;
      state.buyIn = buyIn;
      state.dateEvent = dateEvent;
      state.entries = entries;
      state.resultsPrize = resultsPrize;
      console.log(state.resultsPrize);
      
    },
  },
});

export const { requireDetailsEvent } = detailsEventSlice.actions;
export const detailsEvent = (state: any) => state.detailsEvent;

export default detailsEventSlice;