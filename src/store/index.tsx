import { configureStore } from "@reduxjs/toolkit";
import updatePlayerSlice from "../reducers/slices/updatePlayerSlice";
const store = configureStore({
  reducer: {
    updatePlayer :  updatePlayerSlice.reducer,
  },
});
export default store;
