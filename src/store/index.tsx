import { configureStore } from "@reduxjs/toolkit";
import updatePlayerSlice from "../reducers/slices/updatePlayerSlice";
import detailsEventSlice from "../reducers/slices/detailEventSlice";
const store = configureStore({
  reducer: {
    updatePlayer :  updatePlayerSlice.reducer,
    detailsEvent : detailsEventSlice.reducer,
  },
});
export default store;
