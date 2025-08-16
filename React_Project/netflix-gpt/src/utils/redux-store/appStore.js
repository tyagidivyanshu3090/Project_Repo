import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";



const appStore = configureStore({
  reducer: {
    user: userReducer, // User slice reducer
  },
});

export default appStore;
