import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in redux slice is:", action.payload);
      return action.payload; // Update the state with the user data
    },
    clearUser: () => {
      return null; // Clear the user state
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer; // This will be used in the store [ it is default export so we can import it as userReducer @ Having different name in appStore.js ]

// Selector to access user state
export const selectUser = (state) => state.user; // Selector to access user state
