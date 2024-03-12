import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userCreated: null
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserCreatedStatus(state, action) {
      state.userCreated = action.payload
    }
  },
});

export const { setToken, setUserCreatedStatus } = authSlice.actions;
export default authSlice.reducer;
