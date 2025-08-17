import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";  // By default export, we can import it as userReducer [ export default userSlice.reducer; ]

const appStore = configureStore({
  reducer: {
    user: userReducer, // User slice reducer
  },
});

export default appStore;
